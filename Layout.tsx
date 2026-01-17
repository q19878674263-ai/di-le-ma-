
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onHome?: () => void;
  onBack?: () => void;
}

const DecorativePanel: React.FC<{ side: 'left' | 'right' }> = ({ side }) => (
  <div className={`hidden lg:flex flex-col items-center justify-center w-64 h-full p-8 opacity-40 select-none`}>
    <div className="border-2 border-dashed border-[#F5E8C7] w-full h-full rounded-3xl flex flex-col items-center justify-around p-4 text-[#F5E8C7]">
      <div className="text-4xl font-palace writing-vertical">{side === 'left' ? '非请勿进' : '格杀勿论'}</div>
      <div className="w-12 h-12 bg-[#A72B2B] rounded-full flex items-center justify-center">
        <span className="text-xl">🐎</span>
      </div>
      <div className="text-sm font-quirky tracking-widest text-center">
        {side === 'left' ? '职场宫斗 适者生存' : '策马奔腾 宣泄不公'}
      </div>
    </div>
  </div>
);

export const Layout: React.FC<LayoutProps> = ({ children, onHome, onBack }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center relative overflow-hidden bg-[#1A2F1A]">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center py-4 px-6">
        {/* Left: Back (翻牌) */}
        <button 
          onClick={onBack}
          className="w-10 h-16 bg-[#A72B2B] text-[#F5E8C7] rounded-md shadow-md border-2 border-[#1A2F1A] flex flex-col items-center justify-center space-y-1 transform hover:scale-105 active:scale-95 transition-all z-50"
        >
          <span className="text-[10px] font-bold leading-none">翻</span>
          <span className="text-[10px] font-bold leading-none">牌</span>
        </button>

        {/* Center: Title */}
        <div className="flex items-center space-x-4 bg-[#F5E8C7] text-[#1A2F1A] px-6 py-2 rounded-full shadow-lg border-2 border-[#A72B2B] transform -translate-y-1">
          <span className="font-palace text-xl font-bold tracking-widest">嫡了马</span>
        </div>

        {/* Right: Home (回宫) */}
        <button 
          onClick={onHome}
          className="w-10 h-16 bg-[#F5E8C7] text-[#A72B2B] rounded-md shadow-md border-2 border-[#1A2F1A] flex flex-col items-center justify-center space-y-1 transform hover:scale-105 active:scale-95 transition-all z-50"
        >
          <span className="text-[10px] font-bold leading-none">回</span>
          <span className="text-[10px] font-bold leading-none">宫</span>
        </button>
      </header>

      <main className="flex-1 w-full max-w-7xl flex items-center justify-center relative mt-24 pb-20">
        <DecorativePanel side="left" />
        
        <div className="flex-1 max-w-[640px] w-[90%] mx-auto relative h-full">
          {children}
        </div>

        <DecorativePanel side="right" />
      </main>
    </div>
  );
};
