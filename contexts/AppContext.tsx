import React, { createContext, useState, useEffect, useCallback } from "react";
import { TempleData, Language } from "../types";
import * as templeDataService from "../services/templeDataService";
import { API_BASE_URL } from "../constants"; // For login

interface AppContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isAuthenticated: boolean;
  login: (token: string) => void; // Login now takes a token
  logout: () => void;
  templeData: TempleData;
  updateTempleData: (data: Partial<TempleData>) => Promise<void>; // For admin updates, now partial and async
  isLoadingData: boolean;
  fetchTempleData: () => Promise<void>; // Expose refetch
  authToken: string | null;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

// Default empty data structure
const defaultTempleData: TempleData = {
  info: {
    history: "",
    historyMalayalam: "",
    specialties: "",
    specialtiesMalayalam: "",
  },
  poojas: [],
  festivals: [],
  galleryImages: [],
  newsAlerts: [],
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const storedTheme = localStorage.getItem("theme");
    return (storedTheme as "light" | "dark") || "light";
  });
  const [language, setLanguageState] = useState<Language>(() => {
    const storedLang = localStorage.getItem("language");
    return (storedLang as Language) || Language.EN;
  });
  const [authToken, setAuthToken] = useState<string | null>(() =>
    localStorage.getItem("authToken")
  );
  const [templeData, setTempleData] = useState<TempleData>(defaultTempleData);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  const isAuthenticated = !!authToken;

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const login = useCallback((token: string) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    // Optionally redirect to home or login page via useNavigate if this context has router access
    // For now, components handle navigation.
  }, []);

  const fetchTempleData = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const data = await templeDataService.getInitialData(); // Fetches all data
      setTempleData(data);
    } catch (error) {
      console.error("Error fetching temple data in AppContext:", error);
      setTempleData(defaultTempleData); // Fallback to empty data on error
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  // Fetch initial data on mount
  useEffect(() => {
    fetchTempleData();
  }, [fetchTempleData]);

  // This updateTempleData is now more generic.
  // Specific updates (like adding a pooja) should go through specific service functions.
  // This one might be used for updating TempleInfo or as a general refetch trigger.
  const updateTempleData = useCallback(
    async (dataToUpdate: Partial<TempleData>) => {
      if (!isAuthenticated)
        throw new Error("Not authenticated to update data.");
      // Example: if only info is passed, update only info
      if (dataToUpdate.info) {
        await templeDataService.updateTempleInfo(dataToUpdate.info);
      }
      // For arrays like poojas, festivals etc., direct replacement is not ideal.
      // Admin components should use addPooja, updatePooja, deletePooja etc.
      // After any specific update, we refetch all data to ensure consistency.
      await fetchTempleData();
    },
    [fetchTempleData, isAuthenticated]
  );

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage: setLanguageState,
        isAuthenticated,
        login,
        logout,
        templeData,
        updateTempleData,
        isLoadingData,
        fetchTempleData, // Provide fetch function
        authToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
