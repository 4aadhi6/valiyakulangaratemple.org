// import React, { useContext, useState } from "react";
// import { AppContext } from "../../contexts/AppContext";
// import { Language, GalleryImage } from "../../types";
// import Section from "../common/Section";
// import ResponsiveImage from "../common/ResponsiveImage";
// import Modal from "../common/Modal";
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/solid";

// const GallerySection: React.FC = () => {
//   const { templeData, language } = useContext(AppContext);
//   const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
//     null
//   );

//   const openModal = (index: number) => setSelectedImageIndex(index);
//   const closeModal = () => setSelectedImageIndex(null);

//   const showNextImage = () => {
//     if (selectedImageIndex === null) return;
//     setSelectedImageIndex(
//       (selectedImageIndex + 1) % templeData.galleryImages.length
//     );
//   };

//   const showPrevImage = () => {
//     if (selectedImageIndex === null) return;
//     setSelectedImageIndex(
//       (selectedImageIndex - 1 + templeData.galleryImages.length) %
//         templeData.galleryImages.length
//     );
//   };

//   const currentImage =
//     selectedImageIndex !== null
//       ? templeData.galleryImages[selectedImageIndex]
//       : null;

//   return (
//     <Section
//       id="gallery"
//       title={language === Language.EN ? "Temple Gallery" : "ക്ഷേത്ര ഗാലറി"}
//       subtitle={
//         language === Language.EN
//           ? "Visual Splendors of Divine Architecture and Celebrations"
//           : "ദിവ്യമായ വാസ്തുവിദ്യയുടെയും ആഘോഷങ്ങളുടെയും ദൃശ്യ വിസ്മയങ്ങൾ"
//       }
//       bgColor="bg-white dark:bg-gray-900"
//     >
//       {templeData.galleryImages.length === 0 ? (
//         <p className="text-center text-gray-600 dark:text-gray-400">
//           {language === Language.EN
//             ? "Gallery images will be updated soon."
//             : "ഗാലറി ചിത്രങ്ങൾ ഉടൻ അപ്‌ഡേറ്റ് ചെയ്യുന്നതാണ്."}
//         </p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {templeData.galleryImages.map((image, index) => (
//             <div
//               key={image.id}
//               className="group relative rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300 aspect-square"
//               onClick={() => openModal(index)}
//             >
//               <img
//                 src={image.url}
//                 alt={
//                   language === Language.EN
//                     ? image.description
//                     : image.descriptionMalayalam
//                 }
//                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 loading="lazy"
//               />
//               <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
//                 <p className="text-white text-center text-sm">
//                   {language === Language.EN
//                     ? image.description
//                     : image.descriptionMalayalam}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {currentImage && (
//         <Modal
//           isOpen={selectedImageIndex !== null}
//           onClose={closeModal}
//           size="xl"
//         >
//           <div className="relative">
//             <img
//               src={currentImage.url}
//               alt={
//                 language === Language.EN
//                   ? currentImage.description
//                   : currentImage.descriptionMalayalam
//               }
//               className="w-full max-h-[70vh] object-contain rounded-lg"
//             />
//             <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
//               {language === Language.EN
//                 ? currentImage.description
//                 : currentImage.descriptionMalayalam}
//             </p>

//             <button
//               onClick={showPrevImage}
//               className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 p-2 rounded-full shadow-md transition-colors"
//               aria-label="Previous image"
//             >
//               <ChevronLeftIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
//             </button>
//             <button
//               onClick={showNextImage}
//               className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 p-2 rounded-full shadow-md transition-colors"
//               aria-label="Next image"
//             >
//               <ChevronRightIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
//             </button>
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-2 bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 p-2 rounded-full shadow-md transition-colors"
//               aria-label="Close"
//             >
//               <XMarkIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
//             </button>
//           </div>
//         </Modal>
//       )}
//     </Section>
//   );
// };

// export default GallerySection;
import React, { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Language } from "../../types";
import Section from "../common/Section";
import Modal from "../common/Modal";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const GallerySection: React.FC = () => {
  const { templeData, language } = useContext(AppContext);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const openModal = (index: number) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);

  const showNextImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(
      (selectedImageIndex + 1) % templeData.galleryImages.length
    );
  };

  const showPrevImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(
      (selectedImageIndex - 1 + templeData.galleryImages.length) %
        templeData.galleryImages.length
    );
  };

  const currentImage =
    selectedImageIndex !== null
      ? templeData.galleryImages[selectedImageIndex]
      : null;

  return (
    <Section
      id="gallery"
      title={language === Language.EN ? "Temple Gallery" : "ക്ഷേത്ര ഗാലരി"}
      subtitle={
        language === Language.EN
          ? "Visual Splendors of Divine Architecture and Celebrations"
          : "ദിവ്യമായ വാസ്തുവിദ്യയയും ആഘോഷങ്ങളുടെയും ദൃശ്യ വിസ്മയങ്ങള്"
      }
      bgColor="bg-white dark:bg-gray-900"
    >
      {templeData.galleryImages.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          {language === Language.EN
            ? "Gallery images will be updated soon."
            : "ഗാലരി ചിത്രങ്ങള് ഉടൻ അപ്ഡേട് ചെയ്യുന്നതാണ്"}
        </p>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {templeData.galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="break-inside-avoid relative cursor-pointer transition-transform duration-300 transform hover:scale-[1.02] hover:rotate-[0.5deg]"
              onClick={() => openModal(index)}
            >
              <img
                src={image.url}
                alt={
                  language === Language.EN
                    ? image.description
                    : image.descriptionMalayalam
                }
                className="w-full h-auto rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 rounded-xl">
                <p className="text-white text-center text-sm">
                  {language === Language.EN
                    ? image.description
                    : image.descriptionMalayalam}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {currentImage && (
        <Modal
          isOpen={selectedImageIndex !== null}
          onClose={closeModal}
          size="xl"
        >
          <div className="relative">
            <img
              src={currentImage.url}
              alt={
                language === Language.EN
                  ? currentImage.description
                  : currentImage.descriptionMalayalam
              }
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
              {language === Language.EN
                ? currentImage.description
                : currentImage.descriptionMalayalam}
            </p>

            <button
              onClick={showPrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white dark:bg-gray-800/70 dark:hover:bg-gray-800 p-2 rounded-full shadow-md"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            </button>

            <button
              onClick={showNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white dark:bg-gray-800/70 dark:hover:bg-gray-800 p-2 rounded-full shadow-md"
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            </button>

            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-white/70 hover:bg-white dark:bg-gray-800/70 dark:hover:bg-gray-800 p-2 rounded-full shadow-md"
              aria-label="Close"
            >
              <XMarkIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            </button>
          </div>
        </Modal>
      )}
    </Section>
  );
};

export default GallerySection;
