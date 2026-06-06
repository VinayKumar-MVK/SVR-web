import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 600); // Wait for fade out animation
          }, 400); // Brief pause at 100%
          return 100;
        }
        // Ease-out increment logic for a natural loading feel
        const increment = Math.max(0.5, (100 - prev) * 0.1); 
        return prev + increment;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 bg-[#f8fafc] flex flex-col items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center justify-center w-full max-w-sm px-6">
            
            {/* Elegant Logo Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 flex items-center justify-center"
            >
              <img 
                src="/logo.png" 
                alt="SVR Poultry Equipments"
                className="h-16 w-auto object-contain drop-shadow-sm"
                onError={(e) => {
                  e.currentTarget.src = "/lovable-uploads/253837d0-59ba-46d9-8132-54cd4616acf9.png";
                }}
              />
            </motion.div>

            {/* Minimalist Progress Line */}
            <div className="w-full max-w-[220px]">
              <motion.div 
                initial={{ opacity: 0, scaleX: 0.8 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="h-[2px] w-full bg-gray-200 rounded-full overflow-hidden"
              >
                <motion.div 
                  className="h-full bg-[hsl(190,65%,35%)] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex justify-between items-center mt-4"
              >
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em]">
                  Loading
                </span>
                <span className="text-[10px] font-bold text-gray-400 tabular-nums">
                  {Math.round(progress)}%
                </span>
              </motion.div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
