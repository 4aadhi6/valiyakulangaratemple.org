
import React from 'react';

interface MarqueeTextProps {
  items: string[];
  speed?: number; // Duration of one full scroll in seconds
}

const MarqueeText: React.FC<MarqueeTextProps> = ({ items, speed = 20 }) => {
  if (!items || items.length === 0) {
    return null;
  }

  const marqueeContent = items.join(' ••• '); // Separator between items

  return (
    <div className="bg-orange-500 dark:bg-orange-600 text-white py-2 overflow-hidden shadow-md">
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap" style={{ animationDuration: `${items.length * speed / 2}s`}}>
          <span className="mx-4 text-sm font-medium">{marqueeContent}</span>
        </div>
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap" style={{ animationDuration: `${items.length * speed / 2}s`}}>
           <span className="mx-4 text-sm font-medium">{marqueeContent}</span>
        </div>
      </div>
    </div>
  );
};

export default MarqueeText;
