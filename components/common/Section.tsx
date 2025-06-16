
import React, { ReactNode, useEffect, useRef, useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext'; // Import AppContext
import { Language } from '../../types'; // Ensure Language type is imported if not already

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  title?: string;
  titleMl?: string;
  subtitle?: string;
  subtitleMl?: string;
  useParallax?: boolean; // For background parallax effect
  bgImage?: string; // Background image for parallax
  bgColor?: string; // e.g. 'bg-white dark:bg-gray-800'
  textColor?: string; // e.g. 'text-gray-800 dark:text-gray-100'
}

const Section: React.FC<SectionProps> = ({ 
  id, 
  children, 
  className = '', 
  title, 
  titleMl,
  subtitle,
  subtitleMl,
  // useParallax = false, // Parallax is complex to implement well with just Tailwind for arbitrary elements
  // bgImage,
  bgColor = 'bg-transparent',
  textColor = ''
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useContext(AppContext); // Use AppContext correctly

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Optional: stop observing once visible
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const currentTitle = language === Language.ML && titleMl ? titleMl : title;
  const currentSubtitle = language === Language.ML && subtitleMl ? subtitleMl : subtitle;

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className={`py-12 md:py-20 ${bgColor} ${textColor} ${className} transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {(currentTitle || currentSubtitle) && (
          <div className="text-center mb-10 md:mb-16">
            {currentTitle && (
              <h2 className={`text-3xl md:text-4xl font-bold font-playfair mb-2 
                ${textColor || 'text-orange-600 dark:text-orange-400'}`}>
                {currentTitle}
              </h2>
            )}
            {currentSubtitle && (
              <p className={`text-md md:text-lg mt-2 max-w-2xl mx-auto ${textColor || 'text-gray-600 dark:text-gray-400'}`}>
                {currentSubtitle}
              </p>
            )}
             <div className={`mt-4 w-24 h-1 mx-auto ${textColor ? 'bg-current opacity-50' : 'bg-orange-500 dark:bg-orange-400'}`}></div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
