import React, { useState, useEffect, useContext } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppContext } from "./contexts/AppContext";
import HomePage from "./pages/HomePage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import LoadingScreen from "./components/common/LoadingScreen";
import ProtectedRoute from "./components/core/ProtectedRoute";
import AudioPlayer from "./components/core/AudioPlayer";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useContext(AppContext);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Adjust time as needed for SVG intro/animation
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Basic PWA service worker registration
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("SW registered: ", registration);
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError);
          });
      });
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-100 via-amber-50 to-orange-100 dark:from-gray-800 dark:via-gray-900 dark:to-slate-800 text-gray-800 dark:text-gray-200">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
        <AudioPlayer src="./public/ammenarayanasong.mp3" />{" "}
        {/* Replace with actual temple audio */}
      </div>
    </HashRouter>
  );
};

export default App;
