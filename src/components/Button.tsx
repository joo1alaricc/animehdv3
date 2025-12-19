import React from 'react';

const Button = ({ children, variant = 'yellow', className = '', onClick }: { children: React.ReactNode, variant?: 'yellow' | 'red' | 'blue' | 'black' | 'white', className?: string, onClick?: () => void }) => {
  const variants = {
    yellow: 'bg-[#FFCC00] text-black hover:bg-[#FFD633]',
    red: 'bg-[#FF3B30] text-white hover:bg-[#FF4D42]',
    blue: 'bg-[#007AFF] text-white hover:bg-[#1A87FF]',
    black: 'bg-black text-white hover:bg-[#222]',
    white: 'bg-white text-black hover:bg-gray-100',
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-black oswald uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
