// // src/components/common/CollapsibleText.tsx
// import React, { useState } from "react";

// interface CollapsibleTextProps {
//   text: string;
//   charLimit?: number;
//   readMoreText: string;
//   readLessText: string;
// }

// const CollapsibleText: React.FC<CollapsibleTextProps> = ({
//   text,
//   charLimit = 400, // Default character limit
//   readMoreText,
//   readLessText,
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   // This regex splits by one or more newlines, preventing empty paragraphs
//   const paragraphs = text.split(/\n+/).filter((p) => p.trim() !== "");

//   const toggleIsExpanded = () => {
//     setIsExpanded(!isExpanded);
//   };

//   // If the text is short, just display it without a "Read More" button
//   if (text.length <= charLimit) {
//     return (
//       <div>
//         {paragraphs.map((paragraph, index) => (
//           <p key={index} className="mb-4">
//             {paragraph}
//           </p>
//         ))}
//       </div>
//     );
//   }

//   const displayedText = isExpanded
//     ? text
//     : `${text.substring(0, charLimit)}...`;
//   const displayedParagraphs = displayedText
//     .split(/\n+/)
//     .filter((p) => p.trim() !== "");

//   return (
//     <div>
//       {displayedParagraphs.map((paragraph, index) => (
//         <p key={index} className="mb-4">
//           {paragraph}
//         </p>
//       ))}
//       <button
//         onClick={toggleIsExpanded}
//         className="mt-2 font-semibold text-orange-600 dark:text-orange-400 hover:underline focus:outline-none"
//       >
//         {isExpanded ? readLessText : readMoreText}
//       </button>
//     </div>
//   );
// };

// export default CollapsibleText;
import React, { useState } from "react";

interface CollapsibleTextProps {
  text: string;
  charLimit?: number;
  maxExpandedHeight?: string; // e.g., '400px' or '30rem'
  readMoreText: string;
  readLessText: string;
  // This prop helps the fade-out gradient match the card's background
  gradientColor: string;
}

const CollapsibleText: React.FC<CollapsibleTextProps> = ({
  text,
  charLimit = 400,
  maxExpandedHeight = "30rem", // A generous default max-height
  readMoreText,
  readLessText,
  gradientColor, // e.g., 'from-orange-50' or 'dark:from-slate-800'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const needsTruncation = text.length > charLimit;

  // If the text is short, just display it simply.
  if (!needsTruncation) {
    const paragraphs = text.split(/\n+/).filter((p) => p.trim() !== "");
    return (
      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    );
  }

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const paragraphs = text.split(/\n+/).filter((p) => p.trim() !== "");

  // Estimated height for the collapsed view (e.g., 10rem or 160px)
  const collapsedHeight = "10rem";

  return (
    <div>
      <div
        className="relative transition-all duration-700 ease-in-out overflow-hidden"
        style={{
          maxHeight: isExpanded ? maxExpandedHeight : collapsedHeight,
        }}
      >
        <div
          // When expanded, enable scrolling and add padding to prevent scrollbar from overlapping text
          className={`space-y-4 ${isExpanded ? "overflow-y-auto pr-3" : ""}`}
          // The inner div needs a height matching its container for scrolling to work correctly
          style={{ maxHeight: isExpanded ? maxExpandedHeight : "none" }}
        >
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Fade-out overlay, only shown when collapsed to hint at more content */}
        {!isExpanded && (
          <div
            className={`absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t ${gradientColor} to-transparent`}
            aria-hidden="true"
          />
        )}
      </div>

      <button
        onClick={toggleIsExpanded}
        className="mt-4 font-semibold text-orange-600 dark:text-orange-400 hover:underline focus:outline-none"
      >
        {isExpanded ? readLessText : readMoreText}
      </button>
    </div>
  );
};

export default CollapsibleText;
