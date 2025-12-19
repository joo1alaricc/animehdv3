import React from 'react';
import { Link } from 'react-router-dom';
import Badge from './Badge';
import { Anime } from '../types';

const AnimeCard = ({ anime, key }: { anime: Anime, key?: React.Key }) => {
  // Generate a deterministic rotation based on title length to keep it consistent but "random" looking
  const rotation = anime.title.length % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1';
  const badgeRotation = anime.title.length % 2 === 0 ? '-rotate-2' : 'rotate-2';

  return (
    <Link 
      to={`/detail/${anime.id}`}
      className={`group relative block border-4 border-black bg-white cursor-pointer shadow-[8px_8px_0px_0px_rgba(255,204,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(220,20,20,1)] hover:-translate-y-1 hover:translate-x-1 transition-all duration-200 h-full flex flex-col ${rotation}`}
    >
      <div className="aspect-[2/3] overflow-hidden relative border-b-4 border-black">
        <img 
          src={anime.thumbnail} 
          alt={anime.title} 
          className="w-full h-full object-cover grayscale-0 group-hover:scale-110 group-hover:grayscale transition-transform duration-300 ease-out" 
        />
        <div className={`absolute top-2 -left-2 flex flex-col gap-2 ${badgeRotation} z-10`}>
          <Badge color="yellow" className="shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">{anime.episode || anime.year}</Badge>
          <Badge color="red" className="translate-x-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">{anime.status}</Badge>
        </div>
        <div className="absolute bottom-4 -right-2 transform rotate-3 z-10">
          <Badge color="blue" className="shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2">★ {anime.rating.toFixed(1)}</Badge>
        </div>
        {/* Decorative noise overlay or element */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay"></div>
      </div>
      
      <div className="p-4 bg-white text-black flex-1 flex flex-col justify-between relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-black transform -translate-y-2 group-hover:translate-y-0 transition-transform"></div>
        
        <h3 className="font-black oswald text-xl line-clamp-2 uppercase leading-[0.9] mb-3 group-hover:text-[#FF3B30] transition-colors italic">
          {anime.title}
        </h3>
        
        <div className="flex flex-wrap gap-1 mt-auto">
           {anime.genre.slice(0, 2).map((g, i) => (
             <span key={i} className="text-[10px] font-bold border-2 border-black px-1 uppercase bg-gray-100 group-hover:bg-[#FFCC00] transition-colors">
               {g}
             </span>
           ))}
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
