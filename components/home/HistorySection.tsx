// import React, { useContext } from "react";
// import { AppContext } from "../../contexts/AppContext";
// import { Language } from "../../types";
// import Section from "../common/Section";
// import GlassCard from "../common/GlassCard";
// import CollapsibleText from "../common/CollapsibleText"; // <-- Import the new component

// const HistorySection: React.FC = () => {
//   const { templeData, language } = useContext(AppContext);

//   const history =
//     language === Language.ML
//       ? templeData.info.historyMalayalam
//       : templeData.info.history;
//   const specialties =
//     language === Language.ML
//       ? templeData.info.specialtiesMalayalam
//       : templeData.info.specialties;

//   return (
//     <Section
//       id="history"
//       title={language === Language.EN ? "Temple History" : "ക്ഷേത്ര ചരിത്രം"}
//       subtitle={
//         language === Language.EN
//           ? "Legacy of Faith and Tradition"
//           : "വിശ്വാസത്തിന്റെയും പാരമ്പര്യത്തിന്റെയും പൈതൃകം"
//       }
//       bgColor="bg-orange-50 dark:bg-slate-800"
//     >
//       <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
//         {" "}
//         {/* Use items-start */}
//         {/* Text content column */}
//         <div className="space-y-6 text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
//           <GlassCard className="p-6 md:p-8">
//             <h3 className="text-2xl font-semibold mb-4 text-orange-600 dark:text-orange-400 font-playfair">
//               {language === Language.EN
//                 ? "Our Rich Heritage"
//                 : "നമ്മുടെ സമ്പന്നമായ പൈതൃകം"}
//             </h3>
//             {/* USE THE NEW COMPONENT HERE */}
//             <CollapsibleText
//               text={history}
//               charLimit={500} // Adjust this number to what looks best
//               readMoreText={
//                 language === Language.EN ? "Read More" : "കൂടുതൽ വായിക്കുക"
//               }
//               readLessText={
//                 language === Language.EN ? "Read Less" : "ചുരുക്കുക"
//               }
//             />
//           </GlassCard>

//           <GlassCard className="p-6 md:p-8">
//             <h3 className="text-2xl font-semibold mb-4 text-orange-600 dark:text-orange-400 font-playfair">
//               {language === Language.EN ? "Unique Specialties" : "സവിശേഷതകൾ"}
//             </h3>
//             {/* USE THE NEW COMPONENT HERE TOO */}
//             <CollapsibleText
//               text={specialties}
//               charLimit={350} // Can use a different limit for this section
//               readMoreText={
//                 language === Language.EN ? "Read More" : "കൂടുതൽ വായിക്കുക"
//               }
//               readLessText={
//                 language === Language.EN ? "Read Less" : "ചുരുക്കുക"
//               }
//             />
//           </GlassCard>
//         </div>
//         {/* Image column */}
//         <div className="relative order-first md:order-last group">
//           <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
//           <img
//             src="https://res.cloudinary.com/dfkw8x3yf/image/upload/v1749897890/img_1_1749897581028_mvhjm2.jpg"
//             alt={
//               language === Language.EN
//                 ? "Ancient Temple Structure"
//                 : "പുരാതന ക്ഷേത്രഘടന"
//             }
//             className="relative rounded-lg shadow-2xl object-cover w-full h-auto max-h-[700px] aspect-[3/4]"
//           />
//         </div>
//       </div>
//     </Section>
//   );
// };

// export default HistorySection;
import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Language } from "../../types";
import Section from "../common/Section";
import GlassCard from "../common/GlassCard";
import CollapsibleText from "../common/CollapsibleText";

const HistorySection: React.FC = () => {
  const { templeData, language } = useContext(AppContext);

  const history =
    language === Language.ML
      ? templeData.info.historyMalayalam
      : templeData.info.history;
  const specialties =
    language === Language.ML
      ? templeData.info.specialtiesMalayalam
      : templeData.info.specialties;

  // Define the gradient color for the fade-out effect
  const cardGradientColor = "from-orange-50 dark:from-slate-800";

  return (
    <Section
      id="history"
      title={language === Language.EN ? "Temple History" : "ക്ഷേത്ര ചരിത്രം"}
      subtitle={
        language === Language.EN
          ? "Legacy of Faith and Tradition"
          : "വിശ്വാസത്തിന്റെയും പാരമ്പര്യത്തിന്റെയും പൈതൃകം"
      }
      bgColor="bg-orange-50 dark:bg-slate-800"
    >
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Text content column */}
        <div className="space-y-8 text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          <GlassCard className="p-6 md:p-8">
            <h3 className="text-2xl font-semibold mb-4 text-orange-600 dark:text-orange-400 font-playfair">
              {language === Language.EN
                ? "Our Rich Heritage"
                : "നമ്മുടെ സമ്പന്നമായ പൈതൃകം"}
            </h3>
            <CollapsibleText
              text={history}
              charLimit={450}
              maxExpandedHeight="35rem" // Set a max scroll height for history
              readMoreText={
                language === Language.EN ? "Read More" : "കൂടുതൽ വായിക്കുക"
              }
              readLessText={
                language === Language.EN ? "Read Less" : "ചുരുക്കുക"
              }
              gradientColor={cardGradientColor}
            />
          </GlassCard>

          <GlassCard className="p-6 md:p-8">
            <h3 className="text-2xl font-semibold mb-4 text-orange-600 dark:text-orange-400 font-playfair">
              {language === Language.EN ? "Unique Specialties" : "സവിശേഷതകൾ"}
            </h3>
            <CollapsibleText
              text={specialties}
              charLimit={300}
              maxExpandedHeight="25rem" // Specialties might be shorter, so a smaller max height
              readMoreText={
                language === Language.EN ? "Read More" : "കൂടുതൽ വായിക്കുക"
              }
              readLessText={
                language === Language.EN ? "Read Less" : "ചുരുക്കുക"
              }
              gradientColor={cardGradientColor}
            />
          </GlassCard>
        </div>
        {/* Image column */}
        <div className="relative order-first md:order-last group">
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <img
            src="https://res.cloudinary.com/dfkw8x3yf/image/upload/v1749972981/snzm8ux5ha1rtg5ygm7m.jpg"
            alt={
              language === Language.EN
                ? "Ancient Temple Structure"
                : "പുരാതന ക്ഷേത്രഘടന"
            }
            className="relative rounded-lg shadow-2xl object-cover w-full h-auto max-h-[700px] aspect-[3/4]"
          />
        </div>
      </div>
    </Section>
  );
};

export default HistorySection;
