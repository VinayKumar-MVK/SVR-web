import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Loader2 } from 'lucide-react';

const YOUTUBE_CHANNEL_ID = "UC42nnbx7g_eU8lgWz-cLvlw";
const RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`)}`;

const YouTubeShowcase = () => {
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(RSS_URL);
        const data = await response.json();
        if (data && data.items) {
          // Extract video IDs from the guid (format: yt:video:ID)
          const fetchedIds = data.items
            .map((item: any) => {
              const parts = item.guid.split(':');
              return parts.length === 3 ? parts[2] : null;
            })
            .filter(Boolean)
            .slice(0, 5); // We need 1 main + 4 sub = 5 videos
          
          setVideos(fetchedIds);
        }
      } catch (error) {
        console.error("Failed to fetch YouTube videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white border-t border-gray-100 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-[hsl(4,82%,42%)]" />
      </section>
    );
  }

  // Fallbacks just in case the fetch fails or channel has fewer than 5 videos
  const mainVideoId = videos.length > 0 ? videos[0] : "lluEsxOtMiE"; // Using latest from log as fallback
  const subVideoIds = videos.length > 1 ? videos.slice(1, 5) : [
    "cJpVSjM4pdA",
    "xLJsJfGaYWI",
    "qyGVCqsq6YU",
    "LXSWvxs65cM",

   


  ];

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
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
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(4,82%,42%)]">
              Latest from our Channel
            </p>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">@svrpoultryequipments</h2>
        </motion.div>

        {/* Video Grid */}
        <div className="flex flex-col gap-6">
          
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
              src={`https://www.youtube.com/embed/${mainVideoId}?autoplay=0&rel=0`}
              title="SVR Poultry Equipments Main Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>

          {/* 4 Sub Videos Underneath */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {subVideoIds.map((id, index) => (
              <div
                key={`${id}-${index}`}
                className="w-full aspect-video rounded-xl overflow-hidden shadow-md bg-gray-100 border border-gray-200 relative hover:shadow-lg transition-shadow duration-300"
              >
                <iframe
                  className="w-full h-full absolute inset-0"
                  src={`https://www.youtube.com/embed/${id}?autoplay=0&rel=0`}
                  title={`SVR Poultry Equipments Video ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default YouTubeShowcase;
