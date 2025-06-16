// import React, { useContext } from "react";
// import { AppContext } from "../../contexts/AppContext";
// import { Language } from "../../types";
// import { CONTACT_DETAILS } from "../../constants";
// import Section from "../common/Section";
// import GlassCard from "../common/GlassCard";
// import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";

// // Simple WhatsApp icon
// const WhatsAppIcon = () => (
//   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//     <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.33 3.43 16.79L2 22L7.33 20.61C8.75 21.33 10.35 21.72 12.04 21.72C17.5 21.72 21.95 17.27 21.95 11.81C21.95 6.35 17.5 2 12.04 2M12.04 20.06C10.56 20.06 9.15 19.69 7.96 19L7.54 18.77L4.4 19.65L5.32 16.63L5.07 16.19C4.36 14.93 4 13.48 4 11.91C4 7.37 7.64 3.73 12.04 3.73C16.44 3.73 20.08 7.37 20.08 11.81C20.08 16.25 16.44 19.96 12.04 20.06M17.48 14.53C17.23 14.21 16.76 13.99 16.43 13.88C16.1 13.77 15.19 13.31 14.97 13.23C14.75 13.15 14.59 13.11 14.44 13.34C14.28 13.57 13.89 14.01 13.76 14.16C13.62 14.32 13.49 14.36 13.24 14.25C13 14.14 12.23 13.87 11.29 13.01C10.56 12.35 10.07 11.59 9.94 11.36C9.82 11.13 9.93 11 10.05 10.88C10.16 10.77 10.3 10.59 10.43 10.45C10.55 10.31 10.6 10.21 10.73 10.04C10.85 9.87 10.79 9.73 10.72 9.62C10.65 9.51 10.15 8.28 9.94 7.79C9.72 7.3 9.51 7.35 9.35 7.34C9.2 7.33 9.04 7.33 8.88 7.33C8.73 7.33 8.48 7.39 8.28 7.62C8.08 7.85 7.6 8.26 7.6 9.07C7.6 9.88 8.29 10.64 8.42 10.8C8.54 10.96 10.16 13.41 12.63 14.43C13.22 14.67 13.64 14.83 13.96 14.94C14.48 15.12 14.91 15.08 15.22 15C15.56 14.91 16.43 14.39 16.63 13.96C16.83 13.53 16.83 13.18 16.77 13.08C16.71 12.98 16.59 12.91 16.34 12.8C16.09 12.69 15.81 12.73 15.65 12.91L15.25 13.34C15.07 13.54 14.88 13.64 14.65 13.53C14.42 13.42 13.91 13.13 13.81 13.03M17.48 14.53" />
//   </svg>
// );

// const ContactSection: React.FC = () => {
//   const { language } = useContext(AppContext);

//   return (
//     <Section
//       id="contact"
//       title={language === Language.EN ? "Get In Touch" : "ബന്ധപ്പെടുക"}
//       subtitle={
//         language === Language.EN
//           ? "We are here to assist you. Reach out for inquiries or booking help."
//           : "നിങ്ങളെ സഹായിക്കാൻ ഞങ്ങൾ ഇവിടെയുണ്ട്. അന്വേഷണങ്ങൾക്കോ ​​ബുക്കിംഗ് സഹായത്തിനോ ബന്ധപ്പെടുക."
//       }
//       bgColor="bg-white dark:bg-gray-900"
//     >
//       <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
//         <GlassCard className="p-6 md:p-8 space-y-6">
//           <div>
//             <h3 className="text-2xl font-semibold mb-3 text-orange-600 dark:text-orange-400 font-playfair">
//               {language === Language.EN
//                 ? "Contact Information"
//                 : "ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ"}
//             </h3>
//             <div className="space-y-3 text-gray-700 dark:text-gray-300">
//               <div className="flex items-center space-x-3">
//                 <MapPinIcon className="h-6 w-6 text-orange-500" />
//                 <span>{CONTACT_DETAILS.ADDRESS}</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <PhoneIcon className="h-6 w-6 text-orange-500" />
//                 <a
//                   href={`tel:${CONTACT_DETAILS.PHONE}`}
//                   className="hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
//                 >
//                   {CONTACT_DETAILS.PHONE} (
//                   {language === Language.EN
//                     ? "Brahmashri Vasudevan Namboothiri, Vethiraman Illam – Temple Chief Priest"
//                     : "ബ്രഹ്മശ്രീ  വാസുദേവൻ നമ്പൂതിരി, വെതിരമന ഇല്ലം - ക്ഷേത്രം മേൽശാന്തി "}
//                   )
//                 </a>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <PhoneIcon className="h-6 w-6 text-orange-500" />
//                 <a
//                   href={`mailto:${CONTACT_DETAILS.EMAIL}`}
//                   className="hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
//                 >
//                   {CONTACT_DETAILS.EMAIL}{" "}
//                   {language === Language.EN
//                     ? "Ananthu Payikkattusseril – Pooja Pattu Kurup"
//                     : "അനന്തു പായിക്കാട്ടുശ്ശേരിൽ - പൂജപ്പാട്ട് കുറുപ്പ്."}
//                 </a>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <WhatsAppIcon />
//                 <a
//                   href={`https://wa.me/${CONTACT_DETAILS.WHATSAPP.replace(
//                     /\D/g,
//                     ""
//                   )}?text=${encodeURIComponent(
//                     language === Language.EN
//                       ? "Hello, I have an inquiry about pooja booking."
//                       : "നമസ്കാരം, എനിക്ക് പൂജ ബുക്കിംഗിനെക്കുറിച്ച് ഒരു അന്വേഷണം ഉണ്ട്."
//                   )}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-green-500 dark:hover:text-green-400 transition-colors"
//                 >
//                   {CONTACT_DETAILS.WHATSAPP} (
//                   {language === Language.EN
//                     ? "Chat on WhatsApp"
//                     : "വാട്ട്‌സ്ആപ്പിൽ ചാറ്റ് ചെയ്യുക"}
//                   )
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div>
//             <h3 className="text-2xl font-semibold mb-3 text-orange-600 dark:text-orange-400 font-playfair">
//               {language === Language.EN ? "Temple Timings" : "ക്ഷേത്ര സമയം"}
//             </h3>
//             <p className="text-gray-700 dark:text-gray-300">
//               {language === Language.EN
//                 ? "Morning: 5:00 AM - 11:00 PM"
//                 : "രാവിലെ: 5:00 AM - 11:00 PM"}
//               <br />
//               {language === Language.EN
//                 ? "Evening: 5:00 PM - 8:00 PM"
//                 : "വൈകുന്നേരം: 5:00 PM - 8:00 PM"}
//             </p>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//               (
//               {language === Language.EN
//                 ? "Timings may vary on festival days."
//                 : "ഉത്സവ ദിവസങ്ങളിൽ സമയക്രമത്തിൽ മാറ്റങ്ങൾ ഉണ്ടാകാം."}
//               )
//             </p>
//           </div>
//         </GlassCard>

//         <div className="rounded-xl shadow-2xl overflow-hidden aspect-video">
//           <iframe
//             src={CONTACT_DETAILS.MAP_EMBED_URL}
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen={true}
//             loading="lazy"
//             title="Temple Location"
//             className="rounded-xl"
//           ></iframe>
//         </div>
//       </div>
//     </Section>
//   );
// };

// export default ContactSection;
import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Language } from "../../types";
import { CONTACT_DETAILS } from "../../constants";
import Section from "../common/Section";
import GlassCard from "../common/GlassCard";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";

// WhatsApp Icon
const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.33 3.43 16.79L2 22L7.33 20.61C8.75 21.33 10.35 21.72 12.04 21.72C17.5 21.72 21.95 17.27 21.95 11.81C21.95 6.35 17.5 2 12.04 2Z" />
    <path d="M17.48 14.53C17.23 14.21 16.76 13.99 16.43 13.88C16.1 13.77 15.19 13.31 14.97 13.23C14.75 13.15 14.59 13.11 14.44 13.34C14.28 13.57 13.89 14.01 13.76 14.16C13.62 14.32 13.49 14.36 13.24 14.25C13 14.14 12.23 13.87 11.29 13.01C10.56 12.35 10.07 11.59 9.94 11.36C9.82 11.13 9.93 11 10.05 10.88C10.16 10.77 10.3 10.59 10.43 10.45C10.55 10.31 10.6 10.21 10.73 10.04C10.85 9.87 10.79 9.73 10.72 9.62C10.65 9.51 10.15 8.28 9.94 7.79C9.72 7.3 9.51 7.35 9.35 7.34C9.2 7.33 9.04 7.33 8.88 7.33C8.73 7.33 8.48 7.39 8.28 7.62C8.08 7.85 7.6 8.26 7.6 9.07C7.6 9.88 8.29 10.64 8.42 10.8C8.54 10.96 10.16 13.41 12.63 14.43C13.22 14.67 13.64 14.83 13.96 14.94C14.48 15.12 14.91 15.08 15.22 15C15.56 14.91 16.43 14.39 16.63 13.96C16.83 13.53 16.83 13.18 16.77 13.08C16.71 12.98 16.59 12.91 16.34 12.8C16.09 12.69 15.81 12.73 15.65 12.91L15.25 13.34C15.07 13.54 14.88 13.64 14.65 13.53C14.42 13.42 13.91 13.13 13.81 13.03Z" />
  </svg>
);

// Facebook Icon
const FacebookIcon = () => (
  <svg
    className="w-5 h-5 text-blue-600"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M22.675 0h-21.35C.592 0 0 .593 0 1.326v21.348C0 23.407.592 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.408c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
  </svg>
);

// Instagram Icon
const InstagramIcon = () => (
  <svg
    className="w-5 h-5 text-pink-600"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 1.5A4.26 4.26 0 0 0 3.5 7.75v8.5A4.26 4.26 0 0 0 7.75 20.5h8.5A4.26 4.26 0 0 0 20.5 16.25v-8.5A4.26 4.26 0 0 0 16.25 3.5h-8.5Zm8.375 2a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75ZM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5Zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Z" />
  </svg>
);

const ContactSection: React.FC = () => {
  const { language } = useContext(AppContext);

  return (
    <Section
      id="contact"
      title={language === Language.EN ? "Get In Touch" : "ബന്ധപ്പെടുക"}
      subtitle={
        language === Language.EN
          ? "We are here to assist you. Reach out for inquiries or booking help."
          : "നിങ്ങളെ സഹായിക്കാൻ ഞങ്ങൾ ഇവിടെയുണ്ട്. അന്വേഷണങ്ങൾക്കോ ​​ബുക്കിംഗ് സഹായത്തിനോ ബന്ധപ്പെടുക."
      }
      bgColor="bg-white dark:bg-gray-900"
    >
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <GlassCard className="p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-orange-600 dark:text-orange-400 font-playfair">
              {language === Language.EN
                ? "Contact Information"
                : "ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ"}
            </h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-6 w-6 text-orange-500" />
                <span>{CONTACT_DETAILS.ADDRESS}</span>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-6 w-6 text-orange-500" />
                <a
                  href={`tel:${CONTACT_DETAILS.PHONE}`}
                  className="hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
                >
                  {CONTACT_DETAILS.PHONE} (
                  {language === Language.EN
                    ? "Brahmashri Vasudevan Namboothiri, Vethiraman Illam – Temple Chief Priest"
                    : "ബ്രഹ്മശ്രീ  വാസുദേവൻ നമ്പൂതിരി, വെതിരമന ഇല്ലം - ക്ഷേത്രം മേൽശാന്തി "}
                  )
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-6 w-6 text-orange-500" />
                <a
                  href={`mailto:${CONTACT_DETAILS.EMAIL}`}
                  className="hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
                >
                  {CONTACT_DETAILS.EMAIL}{" "}
                  {language === Language.EN
                    ? "Ananthu Payikkattusseril – Pooja Pattu Kurup"
                    : "അനന്തു പായിക്കാട്ടുശ്ശേരിൽ - പൂജപ്പാട്ട് കുറുപ്പ്."}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <WhatsAppIcon />
                <a
                  href={`https://wa.me/${CONTACT_DETAILS.WHATSAPP.replace(
                    /\D/g,
                    ""
                  )}?text=${encodeURIComponent(
                    language === Language.EN
                      ? "Hello, I have an inquiry about pooja booking."
                      : "നമസ്കാരം, എനിക്ക് പൂജ ബുക്കിംഗിനെക്കുറിച്ച് ഒരു അന്വേഷണം ഉണ്ട്."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-500 dark:hover:text-green-400 transition-colors"
                >
                  {CONTACT_DETAILS.WHATSAPP} (
                  {language === Language.EN
                    ? "Chat on WhatsApp"
                    : "വാട്ട്‌സ്ആപ്പിൽ ചാറ്റ് ചെയ്യുക"}
                  )
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FacebookIcon />
                <a
                  href="https://www.facebook.com/ValiyakulangaraAmma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Facebook (
                  {language === Language.EN ? "Follow us" : "ഫോളോ ചെയ്യുക"})
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <InstagramIcon />
                <a
                  href="https://www.instagram.com/valiyakulangara_amma?igsh=cmNyZDVxZzVvOTZn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  Instagram (
                  {language === Language.EN ? "Follow us" : "ഫോളോ ചെയ്യുക"})
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-orange-600 dark:text-orange-400 font-playfair">
              {language === Language.EN ? "Temple Timings" : "ക്ഷേത്ര സമയം"}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {language === Language.EN
                ? "Morning: 5:00 AM - 11:00 PM"
                : "രാവിലെ: 5:00 AM - 11:00 PM"}
              <br />
              {language === Language.EN
                ? "Evening: 5:00 PM - 8:00 PM"
                : "വൈകുന്നേരം: 5:00 PM - 8:00 PM"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              (
              {language === Language.EN
                ? "Timings may vary on festival days."
                : "ഉത്സവ ദിവസങ്ങളിൽ സമയക്രമത്തിൽ മാറ്റങ്ങൾ ഉണ്ടാകാം."}
              )
            </p>
          </div>
        </GlassCard>

        <div className="rounded-xl shadow-2xl overflow-hidden aspect-video">
          <iframe
            src={CONTACT_DETAILS.MAP_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            title="Temple Location"
            className="rounded-xl"
          ></iframe>
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;
