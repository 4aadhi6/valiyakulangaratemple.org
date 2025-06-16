
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex flex-col items-center justify-center z-[100] text-white">
      {/* Simple SVG Om symbol animation */}
      <svg
        className="w-24 h-24 mb-6 animate-pulse"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        {/* Simplified Om Symbol */}
        <path d="M50 10 C 27.9 10 10 27.9 10 50 C 10 72.1 27.9 90 50 90 C 60 90 70 80 70 70 C 70 60 60 50 50 50 C 40 50 30 60 30 70 Q 30 90 50 90 M 50 10 Q 70 10 70 30 C 70 40 75 45 85 45 C 90 45 90 40 90 35 C 90 20 70 0 50 0 C 30 0 10 20 10 35 C 10 40 10 45 15 45 C 25 45 30 40 30 30 Q 30 10 50 10 Z" />
        <circle cx="80" cy="20" r="10" />
      </svg>
      <h1 className="text-3xl font-playfair font-bold mb-2">Valiyakulangara Devi Temple</h1>
      <p className="text-lg">Loading divine experience...</p>
      <div className="mt-8 w-1/2 max-w-xs h-2 bg-white/30 rounded-full overflow-hidden">
        <div className="h-full bg-white animate-loading-bar rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
