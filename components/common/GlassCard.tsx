
import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`bg-white/30 dark:bg-gray-700/30 backdrop-blur-lg border border-white/20 dark:border-gray-600/20 rounded-xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
