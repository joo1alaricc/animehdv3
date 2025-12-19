import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Anime } from '../types';
import Loader from '../components/Loader';
import AnimeCard from '../components/AnimeCard';
import Button from '../components/Button';

const GenreDetailPage = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const navigate = useNavigate();

  const cleanTitle = (title?: string) => title ? title.split(' Subtitle Indonesia')[0].trim() : 'Unknown Title';
  const cleanSlug = (slug?: string) => slug ? slug.split('-episode-')[0] : 'unknown';

  const mapApiData = (data: any[]): Anime[] => {
    if (!Array.isArray(data)) return [];
    return data.map((item: any) => ({
      id: item.animeId || cleanSlug(item.href?.split('/').pop()),
      title: item.title,
      thumbnail: item.poster || '',
      banner: item.poster || '',
      episode: item.episodes ? `EP ${item.episodes}` : 'ONA',
      status: item.season?.includes('Fall') || item.season?.includes('Summer') || item.season?.includes('Spring') || item.season?.includes('Winter') ? 'ONGOING' : 'COMPLETED',
      year: item.season ? parseInt(item.season.split(' ').pop() || '2025') : 2025,
      rating: (item.score && !isNaN(parseFloat(item.score))) ? parseFloat(item.score) : 0,
      genre: item.genreList?.map((g: any) => g.title) || [],
      synopsis: item.synopsis?.paragraphs?.[0] || 'No synopsis available.',
      likes: `${Math.floor(Math.random() * 50) + 1}K`
    }));
  };

  useEffect(() => {
    const fetchGenreDetail = async () => {
      if (!genreId) return;
      try {
        setLoading(true);
        const res = await fetch(`https://www.sankavollerei.com/anime/genre/${genreId}?page=${page}`);
        const json = await res.json();
        
        if (json.status === 'success' && json.data) {
          setAnimeList(mapApiData(json.data.animeList));
          setHasNextPage(json.data.pagination?.hasNextPage || false);
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreDetail();
    window.scrollTo(0, 0);
  }, [genreId, page]);

  if (loading) return <Loader message="FILTERING DATABASE..." />;

  const genreName = genreId?.replace(/-/g, ' ').toUpperCase();

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-12 pb-20">
      <div className="flex items-center gap-4">
        <Button variant="black" onClick={() => navigate('/genre')}>← Back to Genres</Button>
      </div>

      <header className="bg-[#007AFF] border-8 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform rotate-1 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 font-black text-8xl -translate-y-4 select-none uppercase">{genreId}</div>
        <h1 className="text-4xl md:text-7xl font-black oswald text-white italic relative z-10">GENRE: {genreName}</h1>
        <p className="text-lg md:text-2xl font-bold oswald text-black bg-[#FFCC00] px-2 py-1 inline-block mt-4 relative z-10 uppercase">Browsing Category</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
        {animeList.map(anime => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 py-10">
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`px-8 py-3 font-black oswald border-4 border-black shadow-[4px_4px_0px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all ${page === 1 ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-white hover:bg-[#FFCC00] text-black'}`}
        >
          PREV
        </button>
        <div className="bg-black text-white px-6 py-3 border-4 border-black font-black oswald text-xl flex items-center justify-center min-w-[80px]">
          {page}
        </div>
        <button 
          onClick={() => setPage(p => p + 1)}
          disabled={!hasNextPage}
          className={`px-8 py-3 font-black oswald border-4 border-black shadow-[4px_4px_0px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all ${!hasNextPage ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-[#FF3B30] text-white hover:bg-red-600'}`}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default GenreDetailPage;
