import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Loader2, PlayCircle } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const YOUTUBE_CHANNEL_ID = "UC42nnbx7g_eU8lgWz-cLvlw";
const RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`)}`;

interface VideoData {
  id: string;
  title: string;
}

const YouTubeShowcase = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<VideoData | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(RSS_URL);
        const data = await response.json();
        if (data && data.items) {
          // Extract video IDs from the guid (format: yt:video:ID)
          const fetchedVideos = data.items
            .map((item: any) => {
              const parts = item.guid.split(':');
              return parts.length === 3 ? { id: parts[2], title: item.title } : null;
            })
            .filter(Boolean)
            .slice(0, 10); // Fetch more videos
          
          setVideos(fetchedVideos);
          if (fetchedVideos.length > 0) {
            setActiveVideo(fetchedVideos[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch YouTube videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Set default active video if fetch failed but we have fallbacks
  useEffect(() => {
    if (!loading && !activeVideo) {
      setActiveVideo({ id: "lluEsxOtMiE", title: "SVR Poultry Equipments Showcase" });
    }
  }, [loading, activeVideo]);

  if (loading || !activeVideo) {
    return (
      <section className="py-20 bg-white border-t border-gray-100 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-[hsl(190,65%,35%)]" />
      </section>
    );
  }

  // Fallbacks just in case the fetch fails or channel has fewer videos
  const subVideos = videos.length > 1 ? videos : [
    { id: "lluEsxOtMiE", title: "SVR Poultry Equipments Showcase" },
    { id: "cJpVSjM4pdA", title: "Installation Process" },
    { id: "xLJsJfGaYWI", title: "Manufacturing Facility" },
    { id: "qyGVCqsq6YU", title: "Customer Review" },
    { id: "LXSWvxs65cM", title: "Product Features" },
  ];

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Youtube className="w-5 h-5 text-red-600" />
            <p className="text-base font-bold uppercase tracking-[0.2em] text-[hsl(190,65%,35%)]">
              Latest from our Channel
            </p>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">@svrpoultryequipments</h2>
        </motion.div>

        {/* Video Section Wrapper */}
        <div className="flex flex-col gap-10 max-w-5xl mx-auto px-12 sm:px-16">
          
          {/* Main Large Video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-gray-100 border border-gray-200 relative group"
          >
            <iframe
              className="w-full h-full absolute inset-0"
              src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>

          {/* Sub Videos Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full relative"
            >
              <CarouselContent className="-ml-4">
                {subVideos.map((video, index) => {
                  const isActive = activeVideo.id === video.id;
                  return (
                    <CarouselItem key={`${video.id}-${index}`} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <div 
                        className={`flex flex-col gap-3 group cursor-pointer transition-all duration-300 ${isActive ? '' : 'hover:-translate-y-1'}`}
                        onClick={() => setActiveVideo(video)}
                      >
                        <div className={`w-full aspect-video rounded-xl overflow-hidden shadow-md bg-gray-100 relative transition-shadow duration-300 ${isActive ? 'border-2 border-[hsl(190,65%,35%)]' : 'border border-gray-200 hover:shadow-lg'}`}>
                          {/* Overlay for state and interaction */}
                          <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center transition-colors ${isActive ? 'bg-black/70' : 'bg-black/10 group-hover:bg-black/30'}`}>
                            {isActive ? (
                              <>
                                <PlayCircle className="w-8 h-8 text-[hsl(190,65%,35%)] mb-1" />
                                <span className="text-white text-base font-bold tracking-widest uppercase">Playing</span>
                              </>
                            ) : (
                              <PlayCircle className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </div>
                          
                          <img 
                            src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                            alt={video.title}
                            className="w-full h-full object-cover absolute inset-0 z-0"
                          />
                        </div>
                        <h3 className={`font-semibold text-base line-clamp-2 transition-colors ${isActive ? 'text-[hsl(190,65%,35%)]' : 'text-gray-800 group-hover:text-[hsl(190,65%,35%)]'}`}>
                          {video.title}
                        </h3>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              {/* Circular, larger arrows */}
              <CarouselPrevious className="w-12 h-12 rounded-full -left-12 sm:-left-16 border-gray-300 shadow-md [&>svg]:w-6 [&>svg]:h-6" />
              <CarouselNext className="w-12 h-12 rounded-full -right-12 sm:-right-16 border-gray-300 shadow-md [&>svg]:w-6 [&>svg]:h-6" />
            </Carousel>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default YouTubeShowcase;

