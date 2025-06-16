
import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string; // e.g., 'aspect-video', 'aspect-square', 'aspect-[4/3]'
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ src, alt, className = '', aspectRatio = 'aspect-video' }) => {
  return (
    <div className={`overflow-hidden rounded-lg shadow-md ${aspectRatio} ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy" // Basic browser-level lazy loading
      />
    </div>
  );
};

export default ResponsiveImage;
