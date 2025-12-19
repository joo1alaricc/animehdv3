import React from 'react';

const Loader = ({ message = "SYNCING WITH SERVERS..." }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center py-20 space-y-4">
    <div className="w-16 h-16 border-8 border-black border-t-[#FFCC00] rounded-full animate-spin shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
    <h2 className="text-3xl font-black oswald animate-pulse italic">{message}</h2>
  </div>
);

export default Loader;
