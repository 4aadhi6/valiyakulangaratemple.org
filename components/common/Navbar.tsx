// import React, { useContext, useState } from "react";
// // 1. Import useLocation to be aware of the current page URL
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { AppContext } from "../../contexts/AppContext";
// import { Language } from "../../types";
// import { ROUTE_PATHS } from "../../constants";
// import {
//   SunIcon,
//   MoonIcon,
//   GlobeAltIcon,
//   Bars3Icon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";

// const Navbar: React.FC = () => {
//   const { theme, toggleTheme, language, setLanguage, isAuthenticated, logout } =
//     useContext(AppContext);
//   const navigate = useNavigate();
//   const location = useLocation(); // Get the current location object
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // 2. This is the key logic: We check if the current URL path starts with the admin route.
//   // This will be true for '/admin', '/admin/users', etc.
//   // NOTE: Make sure ROUTE_PATHS.ADMIN_DASHBOARD is correctly set in your constants, e.g., to '/admin'
//   const isAdminPage = location.pathname.startsWith(ROUTE_PATHS.ADMIN_DASHBOARD);

//   const navLinks = [
//     { name: "Home", nameMl: "ഹോം", path: ROUTE_PATHS.HOME },
//     { name: "History", nameMl: "ചരിത്രം", path: "#history" },
//     { name: "Poojas", nameMl: "പൂജകൾ", path: "#poojas" },
//     { name: "Festivals", nameMl: "ഉത്സവങ്ങൾ", path: "#festivals" },
//     { name: "Gallery", nameMl: "ഗാലറി", path: "#gallery" },
//     { name: "Contact", nameMl: "ബന്ധപ്പെടുക", path: "#contact" },
//   ];

//   const handleLogout = () => {
//     logout();
//     setIsMobileMenuOpen(false);
//     navigate(ROUTE_PATHS.HOME); // After logout, redirect to the public homepage
//   };

//   const handleScrollToSection = (path: string) => {
//     if (path.startsWith("#")) {
//       // If we are not on the homepage, first navigate there
//       if (location.pathname !== ROUTE_PATHS.HOME) {
//         navigate(ROUTE_PATHS.HOME);
//         // This timeout gives React Router time to switch pages before we try to scroll
//         setTimeout(() => {
//           const element = document.getElementById(path.substring(1));
//           if (element) {
//             element.scrollIntoView({ behavior: "smooth" });
//           }
//         }, 100);
//       } else {
//         // If already on the homepage, just scroll
//         const element = document.getElementById(path.substring(1));
//         if (element) {
//           element.scrollIntoView({ behavior: "smooth" });
//         }
//       }
//     } else {
//       navigate(path);
//     }
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg transition-all duration-300">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           <Link to={ROUTE_PATHS.HOME} className="flex items-center space-x-2">
//             <img
//               src="https://picsum.photos/seed/templelogo/40/40"
//               alt="Temple Logo"
//               className="h-10 w-10 rounded-full"
//             />
//             <span className="font-playfair text-xl font-bold text-orange-600 dark:text-orange-400">
//               {language === Language.EN
//                 ? "Valiyakulangara Devi"
//                 : "വലിയകുളങ്ങര ദേവി"}
//             </span>
//           </Link>

//           {/* Desktop Navigation - Only show public links if NOT on an admin page */}
//           {!isAdminPage && (
//             <div className="hidden md:flex items-center space-x-4">
//               {navLinks.map((link) => (
//                 <button
//                   key={link.path}
//                   onClick={() => handleScrollToSection(link.path)}
//                   className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   {language === Language.EN ? link.name : link.nameMl}
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* On Admin pages, you might want to show admin-specific links here, or nothing. */}
//           {isAdminPage && (
//             <div className="hidden md:flex items-center">
//               <span className="font-semibold text-gray-700 dark:text-gray-200">
//                 Admin Panel
//               </span>
//             </div>
//           )}

//           <div className="flex items-center space-x-3">
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//               aria-label="Toggle theme"
//             >
//               {theme === "light" ? (
//                 <MoonIcon className="h-6 w-6" />
//               ) : (
//                 <SunIcon className="h-6 w-6" />
//               )}
//             </button>
//             <button
//               onClick={() =>
//                 setLanguage(
//                   language === Language.EN ? Language.ML : Language.EN
//                 )
//               }
//               className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//               aria-label="Toggle language"
//             >
//               <GlobeAltIcon className="h-6 w-6" />
//             </button>

//             {/* 3. FINAL LOGIC: Logout button is ONLY shown if we are on an admin page AND the user is authenticated. */}
//             {isAdminPage && isAuthenticated && (
//               <button
//                 onClick={handleLogout}
//                 className="hidden md:inline-block px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 dark:hover:bg-red-700/50 transition-colors"
//               >
//                 {language === Language.EN ? "Logout" : "പുറത്ത് പോവുക"}
//               </button>
//             )}

//             {/* Mobile Menu Button - Hide it on admin pages for a cleaner look or show it if you have a mobile admin menu */}
//             {!isAdminPage && (
//               <div className="md:hidden">
//                 <button
//                   onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                   className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//                   aria-label="Toggle mobile menu"
//                 >
//                   {isMobileMenuOpen ? (
//                     <XMarkIcon className="h-6 w-6" />
//                   ) : (
//                     <Bars3Icon className="h-6 w-6" />
//                   )}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu - Only render if not an admin page */}
//       {!isAdminPage && isMobileMenuOpen && (
//         <div className="md:hidden absolute top-20 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl py-2 z-40">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             {navLinks.map((link) => (
//               <button
//                 key={`mobile-${link.path}`}
//                 onClick={() => handleScrollToSection(link.path)}
//                 className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700 transition-colors"
//               >
//                 {language === Language.EN ? link.name : link.nameMl}
//               </button>
//             ))}
//             {/* There is no login or logout button here, as requested */}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import { Language } from "../../types";
import { ROUTE_PATHS } from "../../constants";
import {
  SunIcon,
  MoonIcon,
  GlobeAltIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Navbar: React.FC = () => {
  const { theme, toggleTheme, language, setLanguage, isAuthenticated, logout } =
    useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if the current page is an admin page
  const isAdminPage = location.pathname.startsWith(ROUTE_PATHS.ADMIN_DASHBOARD);

  const navLinks = [
    { name: "Home", nameMl: "ഹോം", path: ROUTE_PATHS.HOME },
    { name: "History", nameMl: "ചരിത്രം", path: "#history" },
    { name: "Poojas", nameMl: "പൂജകൾ", path: "#poojas" },
    { name: "Festivals", nameMl: "ഉത്സവങ്ങൾ", path: "#festivals" },
    { name: "Gallery", nameMl: "ഗാലറി", path: "#gallery" },
    { name: "Contact", nameMl: "ബന്ധപ്പെടുക", path: "#contact" },
  ];

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate(ROUTE_PATHS.HOME);
  };

  // ==================  UPDATED FUNCTION ==================
  // This version forces smooth scrolling using only JavaScript.
  const handleScrollToSection = (path: string) => {
    // This part handles hash links like '#history'
    if (path.startsWith("#")) {
      const sectionId = path.substring(1);

      // Case 1: We are on a different page (e.g., /admin) and need to go home first.
      if (location.pathname !== ROUTE_PATHS.HOME) {
        navigate(ROUTE_PATHS.HOME);

        // We wait briefly for the page to change, then find the element and scroll.
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            // Force smooth behavior here
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100); // 100ms delay is usually enough for the page to render.
      } else {
        // Case 2: We are already on the homepage. Just find the element and scroll.
        const element = document.getElementById(sectionId);
        if (element) {
          // Force smooth behavior here too
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // This part handles regular navigation to other pages like '/about'
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };
  // ========================================================

  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to={ROUTE_PATHS.HOME} className="flex items-center space-x-2">
            <img
              src="https://res.cloudinary.com/dfkw8x3yf/image/upload/v1749972274/sdllgwdtwglmmsg9rm3x.png"
              alt="Temple Logo"
              className="h-10 w-10 rounded-full"
            />
            <span className="font-playfair text-xl font-bold text-orange-600 dark:text-orange-400">
              {language === Language.EN
                ? "Valiyakulangara Devi"
                : "വലിയകുളങ്ങര ദേവി"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isAdminPage && (
            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleScrollToSection(link.path)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {language === Language.EN ? link.name : link.nameMl}
                </button>
              ))}
            </div>
          )}

          {isAdminPage && (
            <div className="hidden md:flex items-center">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Admin Panel
              </span>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <MoonIcon className="h-6 w-6" />
              ) : (
                <SunIcon className="h-6 w-6" />
              )}
            </button>
            <button
              onClick={() =>
                setLanguage(
                  language === Language.EN ? Language.ML : Language.EN
                )
              }
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle language"
            >
              <GlobeAltIcon className="h-6 w-6" />
            </button>

            {isAdminPage && isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden md:inline-block px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 dark:hover:bg-red-700/50 transition-colors"
              >
                {language === Language.EN ? "Logout" : "പുറത്ത് പോവുക"}
              </button>
            )}

            {!isAdminPage && (
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {!isAdminPage && isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl py-2 z-40">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={`mobile-${link.path}`}
                onClick={() => handleScrollToSection(link.path)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700 transition-colors"
              >
                {language === Language.EN ? link.name : link.nameMl}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
