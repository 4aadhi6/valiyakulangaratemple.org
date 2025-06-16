// frontend/services/templeDataService.ts

import {
  TempleData,
  Pooja,
  Festival,
  GalleryImage,
  NewsAlert,
  TempleInfo,
} from "../types";
import { API_BASE_URL } from "../constants";

const getAuthToken = (): string | null => localStorage.getItem("authToken");

// Helper function for making API requests
const apiRequest = async <T>(
  url: string,
  method: string = "GET",
  body: any = null,
  isFormData: boolean = false
): Promise<T> => {
  const headers: HeadersInit = {};
  const token = getAuthToken();

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // IMPORTANT: Do NOT set Content-Type for FormData. The browser does it automatically.
  if (!isFormData && body) {
    headers["Content-Type"] = "application/json";
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = isFormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config);
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      throw new Error(
        errorData.message || `API request failed with status ${response.status}`
      );
    }
    if (response.status === 204) {
      // No content
      return null as T;
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error(`API Error (${method} ${url}):`, error);
    throw error;
  }
};

// ** THE ONLY CHANGE IS ON THE NEXT LINE **
// I added `: Promise<TempleData>` to tell TypeScript what this function returns.
export const getInitialData = async (): Promise<TempleData> => {
  try {
    const data = await apiRequest<TempleData>("/temple-data");
    if (
      data &&
      data.info &&
      data.poojas &&
      data.festivals &&
      data.galleryImages &&
      data.newsAlerts
    ) {
      return data;
    }
    throw new Error("Fetched data is not in the expected TempleData format.");
  } catch (error) {
    console.error(
      "Failed to fetch initial temple data from API, returning default structure.",
      error
    );
    // Return a default structure on failure
    return {
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
  }
};

// Temple Info (History, Specialties)
export const getTempleInfo = (): Promise<TempleInfo> =>
  apiRequest<TempleInfo>("/temple-info");
export const updateTempleInfo = (
  infoData: Partial<TempleInfo>
): Promise<TempleInfo> =>
  apiRequest<TempleInfo>("/temple-info", "PUT", infoData);

// Poojas
export const getPoojas = (): Promise<Pooja[]> => apiRequest<Pooja[]>("/poojas");
export const addPooja = (poojaData: Omit<Pooja, "id">): Promise<Pooja> =>
  apiRequest<Pooja>("/poojas", "POST", poojaData);
export const updatePooja = (
  id: string,
  poojaData: Partial<Pooja>
): Promise<Pooja> => apiRequest<Pooja>(`/poojas/${id}`, "PUT", poojaData);
export const deletePooja = (id: string): Promise<void> =>
  apiRequest<void>(`/poojas/${id}`, "DELETE");

// Festivals
export const getFestivals = (): Promise<Festival[]> =>
  apiRequest<Festival[]>("/festivals");
export const addFestival = (
  festivalData: Omit<Festival, "id">
): Promise<Festival> =>
  apiRequest<Festival>("/festivals", "POST", festivalData);
export const updateFestival = (
  id: string,
  festivalData: Partial<Festival>
): Promise<Festival> =>
  apiRequest<Festival>(`/festivals/${id}`, "PUT", festivalData);
export const deleteFestival = (id: string): Promise<void> =>
  apiRequest<void>(`/festivals/${id}`, "DELETE");

// Gallery Images
export const getGalleryImages = (): Promise<GalleryImage[]> =>
  apiRequest<GalleryImage[]>("/gallery-images");
export const addGalleryImage = (formData: FormData): Promise<GalleryImage> =>
  apiRequest<GalleryImage>("/gallery-images", "POST", formData, true);
export const updateGalleryImage = (
  id: string,
  formData: FormData
): Promise<GalleryImage> =>
  apiRequest<GalleryImage>(`/gallery-images/${id}`, "PUT", formData, true);
export const deleteGalleryImage = (id: string): Promise<void> =>
  apiRequest<void>(`/gallery-images/${id}`, "DELETE");

// News Alerts
export const getNewsAlerts = (): Promise<NewsAlert[]> =>
  apiRequest<NewsAlert[]>("/news-alerts");
export const addNewsAlert = (
  newsData: Omit<NewsAlert, "id">
): Promise<NewsAlert> =>
  apiRequest<NewsAlert>("/news-alerts", "POST", newsData);
export const updateNewsAlert = (
  id: string,
  newsData: Partial<NewsAlert>
): Promise<NewsAlert> =>
  apiRequest<NewsAlert>(`/news-alerts/${id}`, "PUT", newsData);
export const deleteNewsAlert = (id: string): Promise<void> =>
  apiRequest<void>(`/news-alerts/${id}`, "DELETE");
