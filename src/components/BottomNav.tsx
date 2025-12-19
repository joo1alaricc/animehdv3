import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { 
      name: 'Home', 
      path: '/', 
      icon: (
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
        </svg>
      )
    },
    { 
      name: 'Ongoing', 
      path: '/ongoing', 
      icon: (
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
      )
    },
    { 
      name: 'Complete', 
      path: '/complete', 
      icon: (
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 12 4.7 4.5 9.3-9"/>
        </svg>
      )
    },
    { 
      name: 'Genre', 
      path: '/genre', 
      icon: (
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.58 8.44L11.5 4.36L7.42 8.44l4.08 4.08l4.08-4.08zM11.5 4.36l-4.08 4.08l4.08 4.08l4.08-4.08l-4.08-4.08zM19.66 12.52l-4.08-4.08l-4.08 4.08l4.08 4.08l4.08-4.08zM11.5 12.52l-4.08-4.08l-4.08 4.08l4.08 4.08l4.08-4.08zM7.42 16.6l-4.08-4.08l4.08 4.08l4.08-4.08L7.42 16.6z"/>
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.5 12.52v8M7.42 16.6h8"/>
        </svg>
      )
    },
    { 
      name: 'Schedule', 
      path: '/schedule', 
      icon: (
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
        </svg>
      )
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 z-[100] w-full h-16 bg-white border-t-8 border-black shadow-[0_-4px_0_0_rgba(0,0,0,1)]">
      <div className="grid h-full grid-cols-5 mx-auto font-black oswald">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`inline-flex flex-col items-center justify-center px-5 transition-all ${
              isActive(item.path)
                ? 'bg-[#FF3B30] text-white'
                : 'text-black hover:bg-[#FFCC00]'
            }`}
          >
            <div className={`mb-1 transition-transform ${isActive(item.path) ? 'scale-110' : ''}`}>
              {item.icon}
            </div>
            <span className="text-[10px] uppercase tracking-tighter">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
