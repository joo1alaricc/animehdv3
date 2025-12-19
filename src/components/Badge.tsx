import React from 'react';

const Badge = ({ children, color = 'yellow', className = '', key }: { children: React.ReactNode, color?: string, className?: string, key?: React.Key }) => {
  const colors: Record<string, string> = {
    yellow: 'bg-[#FFCC00] text-black',
    red: 'bg-[#FF3B30] text-white',
    blue: 'bg-[#007AFF] text-white',
    green: 'bg-[#4CD964] text-black',
    black: 'bg-black text-white',
  };
  return (
    <span className={`px-2 py-0.5 text-xs font-bold border-2 border-black uppercase oswald ${colors[color] || colors.yellow} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
