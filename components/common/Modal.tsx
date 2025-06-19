
// import React, { ReactNode, useEffect } from 'react';
// import { XMarkIcon } from '@heroicons/react/24/outline';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title?: string;
//   children: ReactNode;
//   size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         onClose();
//       }
//     };
//     if (isOpen) {
//       document.addEventListener('keydown', handleEscape);
//       document.body.style.overflow = 'hidden'; // Prevent background scrolling
//     }
//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//       document.body.style.overflow = 'auto';
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) {
//     return null;
//   }

//   const sizeClasses = {
//     sm: 'max-w-sm',
//     md: 'max-w-md',
//     lg: 'max-w-lg',
//     xl: 'max-w-xl',
//     full: 'max-w-full h-full rounded-none',
//   };

//   return (
//     <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity duration-300" onClick={onClose}>
//       <div 
//         className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden w-full ${sizeClasses[size]} transform transition-all duration-300 scale-95 opacity-0 animate-modal-appear`}
//         onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
//       >
//         <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
//           {title && <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h3>}
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
//             aria-label="Close modal"
//           >
//             <XMarkIcon className="h-6 w-6" />
//           </button>
//         </div>
//         <div className={`p-6 ${size === 'full' ? 'h-[calc(100%-120px)] overflow-y-auto' : 'max-h-[80vh] overflow-y-auto'}`}>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
import React, { ReactNode, useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

      // 👇 Auto-scroll modal into view
      setTimeout(() => {
        modalRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full h-full rounded-none",
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className={`
          relative
          w-full
          ${sizeClasses[size]}
          bg-white dark:bg-gray-800
          rounded-lg
          shadow-xl
          max-h-[95vh]
          overflow-y-auto
          transform transition-all duration-300 scale-95 opacity-0 animate-modal-appear
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {title && (
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;


