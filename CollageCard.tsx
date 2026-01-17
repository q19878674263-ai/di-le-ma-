
import React from 'react';

interface CollageCardProps {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
}

export const CollageCard: React.FC<CollageCardProps> = ({ children, className = '', rotation = 0 }) => {
  return (
    <div 
      className={`relative bg-[#F5E8C7] rounded-3xl p-6 shadow-2xl overflow-hidden border-4 border-double border-[#A72B2B]/20 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Decorative Stickers/Collage Elements */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#A72B2B] opacity-20 rounded-full blur-xl" />
      <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#E6A23C] opacity-10 rounded-full blur-2xl" />
      
      {/* Torn Edge Effect - Simulated with SVG or clip path if needed, but simple masking for now */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>

      {/* Tape Texture */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/20 backdrop-blur-sm transform rotate-2 z-20 border border-white/10" />
    </div>
  );
};
