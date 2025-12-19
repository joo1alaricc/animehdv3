import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Badge from '../components/Badge';

interface Mirror {
  nama: string;
  content: string;
}

interface MirrorGroup {
  m360p?: Mirror[];
  m480p?: Mirror[];
  m720p?: Mirror[];
}

interface Download {
  nama: string;
  href: string;
}

interface DownloadGroup {
  d360pmp4?: Download[];
  d480pmp4?: Download[];
  d720pmp4?: Download[];
  d1080pmp4?: Download[];
  d480pmkv?: Download[];
  d720pmkv?: Download[];
  d1080pmkv?: Download[];
}

interface EpisodeData {
  title: string;
  iframe: string;
  mirrors: MirrorGroup;
  downloads: DownloadGroup;
}

const WatchPage = () => {
  const { slug, episodeSlug } = useParams<{ slug: string, episodeSlug: string }>();
  const navigate = useNavigate();
  const [episodeData, setEpisodeData] = useState<EpisodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [changingMirror, setChangingMirror] = useState(false);
  const [currentIframe, setCurrentIframe] = useState<string>('');

  useEffect(() => {
    const fetchEpisode = async () => {
      if (!episodeSlug) return;
      setLoading(true);
      try {
        const res = await fetch(`https://backend.ryzumi.vip/anime/episode/${episodeSlug}`);
        const json = await res.json();
        
        if (json.judul) {
          const mapped: EpisodeData = {
            title: json.judul,
            iframe: json.iframe,
            mirrors: json.mirror,
            downloads: json.download
          };
          setEpisodeData(mapped);
          setCurrentIframe(json.iframe);
        } else {
          console.error("Invalid episode data");
        }
      } catch (err) {
        console.error('Episode Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, [episodeSlug]);

  const handleMirrorChange = async (mirror: Mirror) => {
    setChangingMirror(true);
    try {
      // 1. Get Nonce
      const nonceRes = await fetch('https://backend.ryzumi.vip/anime/nonce');
      const nonce = await nonceRes.text();
      // Remove quotes if present
      const cleanNonce = nonce.replace(/"/g, '');

      // 2. Get Iframe HTML
      const iframeRes = await fetch(`https://backend.ryzumi.vip/anime/getIframe?content=${mirror.content}&nonce=${cleanNonce}`);
      const iframeHtml = await iframeRes.text();
      
      // 3. Extract src from HTML using regex
      const match = iframeHtml.match(/src="([^"]+)"/);
      if (match && match[1]) {
        // Unescape HTML entities if any (like &amp;)
        const cleanSrc = match[1].replace(/&amp;/g, '&');
        setCurrentIframe(cleanSrc);
      } else {
        console.error('No iframe source found in response');
      }
    } catch (e) {
      console.error('Mirror fetching failed', e);
    } finally {
      setChangingMirror(false);
    }
  };

  if (loading || !episodeData) return <Loader message="DECODING STREAM SIGNAL..." />;

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <Button variant="black" className="mb-2" onClick={() => navigate(`/detail/${slug}`)}>← Back to Intel</Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Player Area */}
        <div className="lg:col-span-9 space-y-6">
          <div className="aspect-video bg-black border-8 border-black shadow-[12px_12px_0px_0px_rgba(255,204,0,1)] relative overflow-hidden z-10 group">
            {changingMirror && (
              <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-[#FFCC00] text-black font-black oswald px-6 py-2 border-4 border-black animate-pulse">
                  FETCHING SECURE STREAM...
                </div>
              </div>
            )}
            <iframe 
              src={currentIframe} 
              className="w-full h-full relative z-10" 
              allowFullScreen 
              title={episodeData.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>

          <div className="bg-white border-8 border-black p-6 md:p-8 text-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col gap-6">
              <h1 className="text-2xl md:text-4xl font-black oswald uppercase leading-tight italic border-b-8 border-black pb-4">{episodeData.title}</h1>
              
              <div className="space-y-4">
                <h3 className="font-black oswald text-xl uppercase italic">Mirror Servers</h3>
                <div className="space-y-4">
                  {Object.entries(episodeData.mirrors).map(([res, mirrors]) => {
                    const mList = mirrors as Mirror[];
                    return mList && mList.length > 0 && (
                      <div key={res} className="flex flex-wrap gap-2 items-center bg-gray-100 p-2 border-2 border-black">
                        <span className="font-black oswald text-xs uppercase bg-black text-white px-2 py-1">{res.replace('m', '')}</span>
                        {mList.map((m, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleMirrorChange(m)}
                            className="px-3 py-1 font-bold text-[10px] uppercase border-2 border-black bg-white hover:bg-[#FFCC00] transition-all"
                          >
                            {m.nama}
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-blue-500 p-6 border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
             <h3 className="font-black oswald text-white text-2xl mb-4 italic uppercase">DOWNLOADS</h3>
             <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent">
               {Object.entries(episodeData.downloads).map(([key, links]) => {
                 const dList = links as Download[];
                 return dList && dList.length > 0 && (
                   <div key={key} className="space-y-2">
                     <p className="font-black oswald text-white text-sm uppercase bg-black px-2 py-1 inline-block">{key.replace('d', '')}</p>
                     <div className="grid grid-cols-1 gap-1">
                        {dList.map((dl, idx) => (
                          <a 
                            key={idx} 
                            href={dl.href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block bg-white text-black text-[10px] font-bold p-2 border-2 border-black hover:bg-[#FFCC00] truncate"
                          >
                            {dl.nama}
                          </a>
                        ))}
                     </div>
                   </div>
                 );
               })}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
