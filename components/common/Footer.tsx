// import React, { useContext } from "react";
// import { SOCIAL_LINKS, CONTACT_DETAILS } from "../../constants";
// import { AppContext } from "../../contexts/AppContext";
// import { Language } from "../../types";

// // Placeholder icons (replace with actual SVGs or an icon library if allowed)
// const FacebookIcon = () => (
//   <svg
//     className="w-6 h-6"
//     fill="currentColor"
//     viewBox="0 0 24 24"
//     aria-hidden="true"
//   >
//     <path
//       fillRule="evenodd"
//       d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//       clipRule="evenodd"
//     />
//   </svg>
// );
// const InstagramIcon = () => (
//   <svg
//     className="w-6 h-6"
//     fill="currentColor"
//     viewBox="0 0 24 24"
//     aria-hidden="true"
//   >
//     <path
//       fillRule="evenodd"
//       d="M12.315 2.188a4.5 4.5 0 014.174 0 4.502 4.502 0 012.336 1.106c.91.737 1.465 1.764 1.708 2.873.243 1.108.243 2.92 0 4.028-.243 1.11-.798 2.136-1.708 2.873a4.502 4.502 0 01-2.336 1.106 4.5 4.5 0 01-4.174 0 4.502 4.502 0 01-2.336-1.106c-.91-.737-1.465-1.764-1.708-2.873-.243-1.108-.243-2.92 0-4.028.243-1.11.798-2.136 1.708-2.873a4.502 4.502 0 012.336-1.106zm-.329 1.258a3.001 3.001 0 00-1.562.738c-.7.561-1.113 1.347-1.305 2.212-.193.865-.193 2.384 0 3.25.192.864.605 1.65 1.305 2.211a3.001 3.001 0 001.562.738 3.001 3.001 0 001.562-.738c.7-.561 1.113-1.347 1.305-2.211.193-.866.193-2.385 0-3.25-.192-.865-.605-1.649-1.305-2.212a3.001 3.001 0 00-1.562-.738zM12 7.163a4.837 4.837 0 100 9.674 4.837 4.837 0 000-9.674zm0 8.174a3.337 3.337 0 110-6.674 3.337 3.337 0 010 6.674zm5.083-8.828a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
//       clipRule="evenodd"
//     />
//   </svg>
// );
// const YoutubeIcon = () => (
//   <svg
//     className="w-6 h-6"
//     fill="currentColor"
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M12.0002 2C6.47737 2 2.00024 6.47713 2.00024 12C2.00024 17.5228 6.47737 22 12.0002 22C17.5231 22 22.0002 17.5228 22.0002 12C22.0002 6.47713 17.5231 2 12.0002 2ZM9.61562 15.6562V8.34375L15.8004 12L9.61562 15.6562Z"></path>
//   </svg>
// );

// const Footer: React.FC = () => {
//   const { language } = useContext(AppContext);
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-orange-50 dark:bg-gray-800 border-t border-orange-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
//       <div className="container mx-auto px-6 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//           <div>
//             <h5 className="font-semibold text-lg mb-3 text-orange-600 dark:text-orange-400 font-playfair">
//               {language === Language.EN
//                 ? "Valiyakulangara Devi Temple"
//                 : "വലിയകുളങ്ങര ദേവി ക്ഷേത്രം"}
//             </h5>
//             <p className="text-sm">{CONTACT_DETAILS.ADDRESS}</p>
//           </div>
//           <div>
//             <h5 className="font-semibold text-lg mb-3 text-orange-600 dark:text-orange-400 font-playfair">
//               {language === Language.EN ? "Quick Links" : "ദ്രുത ലിങ്കുകൾ"}
//             </h5>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <a
//                   href="#history"
//                   className="hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
//                 >
//                   {language === Language.EN
//                     ? "Temple History"
//                     : "ക്ഷേത്ര ചരിത്രം"}
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#poojas"
//                   className="hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
//                 >
//                   {language === Language.EN
//                     ? "Available Poojas"
//                     : "ലഭ്യമായ പൂജകൾ"}
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#festivals"
//                   className="hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
//                 >
//                   {language === Language.EN ? "Festivals" : "ഉത്സവങ്ങൾ"}
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#gallery"
//                   className="hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
//                 >
//                   {language === Language.EN ? "Gallery" : "ഗാലറി"}
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h5 className="font-semibold text-lg mb-3 text-orange-600 dark:text-orange-400 font-playfair">
//               {language === Language.EN
//                 ? "Connect With Us"
//                 : "ഞങ്ങളെ ബന്ധപ്പെടുക"}
//             </h5>
//             <div className="flex space-x-4">
//               <a
//                 href={SOCIAL_LINKS.FACEBOOK}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
//               >
//                 <FacebookIcon />
//               </a>
//               <a
//                 href={SOCIAL_LINKS.INSTAGRAM}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
//               >
//                 <InstagramIcon />
//               </a>
//               <a
//                 href={SOCIAL_LINKS.YOUTUBE}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
//               >
//                 <YoutubeIcon />
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="text-center border-t border-orange-200 dark:border-gray-700 pt-6">
//           <p className="text-sm">
//             &copy; {currentYear}{" "}
//             {language === Language.EN
//               ? "Valiyakulangara Devi Temple. All Rights Reserved."
//               : "വലിയകുളങ്ങര ദേവി ക്ഷേത്രം. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം."}
//           </p>
//           <p className="text-xs mt-1">
//             {language === Language.EN
//               ? "Designed with devotion"
//               : "ഭക്തിയോടെ രൂപകൽപ്പന ചെയ്തത്"}
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Language } from "../../types";

const InstagramIcon = () => (
  <svg
    className="w-5 h-5 mx-1.5 fill-gray-800 dark:fill-gray-200"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12.315 2.188a4.5 4.5 0 014.174 0 4.502 4.502 0 012.336 1.106c.91.737 1.465 1.764 1.708 2.873.243 1.108.243 2.92 0 4.028-.243 1.11-.798 2.136-1.708 2.873a4.502 4.502 0 01-2.336 1.106 4.5 4.5 0 01-4.174 0 4.502 4.502 0 01-2.336-1.106c-.91-.737-1.465-1.764-1.708-2.873-.243-1.108-.243-2.92 0-4.028.243-1.11.798-2.136 1.708-2.873a4.502 4.502 0 012.336-1.106zm-.329 1.258a3.001 3.001 0 00-1.562.738c-.7.561-1.113 1.347-1.305 2.212-.193.865-.193 2.384 0 3.25.192.864.605 1.65 1.305 2.211a3.001 3.001 0 001.562.738 3.001 3.001 0 001.562-.738c.7-.561 1.113-1.347 1.305-2.211.193-.866.193-2.385 0-3.25-.192-.865-.605-1.649-1.305-2.212a3.001 3.001 0 00-1.562-.738zM12 7.163a4.837 4.837 0 100 9.674 4.837 4.837 0 000-9.674zm0 8.174a3.337 3.337 0 110-6.674 3.337 3.337 0 010 6.674zm5.083-8.828a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
      clipRule="evenodd"
    />
  </svg>
);

const Footer: React.FC = () => {
  const { language } = useContext(AppContext);
  const developerInstaUrl = "https://www.instagram.com/_4aadhi_6/";

  const textContent = (
    <span className="inline-flex items-center mx-6 whitespace-nowrap">
      {language === Language.EN
        ? "Developed & Maintained by"
        : "വികസിപ്പിച്ചതും പരിപാലിക്കുന്നതും"}
      <InstagramIcon />
      <span className="font-semibold text-gray-800 dark:text-gray-200">
        _4aadhi_6
      </span>
    </span>
  );

  return (
    <footer className="w-full bg-orange-100 dark:bg-gray-900 border-t border-orange-200 dark:border-gray-700">
      <div className="relative overflow-hidden h-8">
        <div className="marquee-track">
          <a
            href={developerInstaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs text-gray-700 dark:text-gray-300 gap-6"
          >
            {textContent}
            {textContent}
            {textContent}
            {textContent}
            {textContent}
          </a>
        </div>
      </div>

      <style>{`
        .marquee-track {
          display: inline-block;
          white-space: nowrap;
          will-change: transform;
          animation: scroll-left 15s linear infinite;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
