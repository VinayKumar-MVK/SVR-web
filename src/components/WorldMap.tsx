import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import worldMapImage from '@/assets/world-map.png';
import mode2 from "/lovable-uploads/Mode2.jpg"
const WorldMap = () => {
  const countries = [
    { name: 'Ghana', x: '46%', y: '52%', delay: 0.2 },
    { name: 'Tanzania', x: '58%', y: '66%', delay: 0.4 },
    { name: 'Angola', x: '52%', y: '72%', delay: 0.6 },
    { name: 'Nigeria', x: '48%', y: '48%', delay: 0.8 },
    { name: 'Zambia', x: '56%', y: '72%', delay: 1.0 },
    { name: 'Malawi', x: '58%', y: '74%', delay: 1.2 },
    { name: 'Uganda', x: '58%', y: '54%', delay: 1.4 },
    { name: 'Oman', x: '66%', y: '44%', delay: 1.6 }
  ];

  return (
    <div className="relative w-full h-full bg-white rounded-r-3xl overflow-hidden">
      <video width="1500" height="980" autoPlay loop muted className="object-cover w-full h-full">
  <source src="https://cvukkqrjfrzvnytpcfjj.supabase.co/storage/v1/object/public/videos/TEYgaCsOt6HxVRPNskE7%20(1)%20(1).mp4" type="video/mp4" />
</video>


    </div>
  );
};

export default WorldMap;
