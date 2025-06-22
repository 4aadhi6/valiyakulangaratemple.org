// import React, { useContext, useEffect } from "react";
// import { AppContext } from "../../contexts/AppContext"; // ✅ your shared context path
// import { Language } from "../../types"; // ✅ your shared enum

// const LandingSection: React.FC = () => {
//   const { language } = useContext(AppContext);

//   useEffect(() => {
//     // Inject marquee animation keyframes into DOM
//     const style = document.createElement("style");
//     style.textContent = `
//       @keyframes marquee {
//         0% { transform: translateX(0%); }
//         100% { transform: translateX(-100%); }
//       }
//     `;
//     document.head.appendChild(style);
//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   const title =
//     language === Language.EN
//       ? "Valiyakulangara Devi Temple"
//       : "വലിയകുളങ്ങര ദേവി ക്ഷേത്രം";

//   const subtitle =
//     language === Language.EN
//       ? "Mahadevikadu, Karthikappally - A Sacred Abode of Divine Grace"
//       : "മഹാദേവികാട്, കാര്‍ത്തികപ്പള്ളി - ദിവ്യാനുഗ്രഹത്തിന്‍റെ പുണ്യകേന്ദ്രം";

//   const callToAction =
//     language === Language.EN ? "Explore The Divine" : "ദിവ്യാനുഭവം തേടുക";

//   const marqueeText =
//     language === Language.EN
//       ? "Amme Sharanam, Devi Sharanam, Valiyakulangara Amme Sharanam"
//       : "അമ്മേ ശരണം, ദേവി ശരണം, വലിയകുളങ്ങര അമ്മേ ശരണം";

//   const handleScrollToContent = () => {
//     const firstSection = document.getElementById("history");
//     if (firstSection) {
//       firstSection.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="block">
//       <div className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden">
//         {/* Background Image */}
//         <img
//           src="landing.png"
//           alt="Valiyakulangara Devi Temple"
//           className="absolute inset-0 w-full h-full object-cover z-0"
//         />

//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black/50 z-10"></div>

//         {/* Main Content */}
//         <div className="relative z-20 text-center p-4 animate-fade-in-up">
//           <h1 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold drop-shadow-lg mb-4">
//             {title}
//           </h1>
//           <p className="text-lg sm:text-xl md:text-2xl mb-8 drop-shadow-md max-w-3xl mx-auto">
//             {subtitle}
//           </p>
//           <button
//             onClick={handleScrollToContent}
//             className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-700"
//           >
//             {callToAction}
//           </button>
//         </div>

//         {/* Floating Particles */}
//         <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
//           {[...Array(20)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute bg-white/10 rounded-full animate-float"
//               style={{
//                 width: `${Math.random() * 5 + 2}px`,
//                 height: `${Math.random() * 5 + 2}px`,
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDuration: `${Math.random() * 20 + 10}s`,
//                 animationDelay: `${Math.random() * 5}s`,
//               }}
//             />
//           ))}
//         </div>

//         {/* Scrolling Marquee */}
//         <div className="absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-sm py-3 overflow-hidden z-20">
//           <div
//             className="flex whitespace-nowrap"
//             style={{ animation: "marquee 30s linear infinite" }}
//           >
//             {[...Array(3)].map((_, i) => (
//               <span
//                 key={i}
//                 className="text-xl text-amber-200 font-semibold mx-12"
//               >
//                 {marqueeText}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingSection;
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Language } from "../../types";

const images = [
  { src: "/landing.png", alt: "Valiyakulangara Temple - View 1" },
  { src: "/landing2.jpg", alt: "Valiyakulangara Temple - View 2" },
  { src: "/landing3.png", alt: "Valiyakulangara Temple - View 3" },
  { src: "/landing4.jpg", alt: "Valiyakulangara Temple - View 4" },
  { src: "/landing5.jpg", alt: "Valiyakulangara Temple - View 5" },
];

const LandingSection: React.FC = () => {
  const { language } = useContext(AppContext);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    // Marquee keyframes
    const style = document.createElement("style");
    style.textContent = `
      @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-100%); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5s
    return () => clearInterval(interval);
  }, []);

  const title =
    language === Language.EN
      ? "Valiyakulangara Devi Temple"
      : "വലിയകുളങ്ങര ദേവി ക്ഷേത്രം";

  const subtitle =
    language === Language.EN
      ? "Mahadevikadu, Karthikappally - A Sacred Abode of Divine Grace"
      : "മഹാദേവികാട്, കാര്‍ത്തികപ്പള്ളി - ദിവ്യാനുഗ്രഹത്തിന്‍റെ പുണ്യകേന്ദ്രം";

  const callToAction =
    language === Language.EN ? "Explore The Divine" : "ദിവ്യാനുഭവം തേടുക";

  const marqueeText =
    language === Language.EN
      ? "Amme Sharanam, Devi Sharanam, Valiyakulangara Amme Sharanam"
      : "അമ്മേ ശരണം, ദേവി ശരണം, വലിയകുളങ്ങര അമ്മേ ശരണം";

  const handleScrollToContent = () => {
    const firstSection = document.getElementById("history");
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="block">
      <div className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden">
        {/* Carousel Image */}
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Main Content */}
        <div className="relative z-20 text-center p-4 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold drop-shadow-lg mb-4">
            {title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 drop-shadow-md max-w-3xl mx-auto">
            {subtitle}
          </p>
          <button
            onClick={handleScrollToContent}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-700"
          >
            {callToAction}
          </button>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 rounded-full animate-float"
              style={{
                width: `${Math.random() * 5 + 2}px`,
                height: `${Math.random() * 5 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Scrolling Marquee */}
        <div className="absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-sm py-3 overflow-hidden z-20">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "marquee 30s linear infinite" }}
          >
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className="text-xl text-amber-200 font-semibold mx-12"
              >
                {marqueeText}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingSection;

