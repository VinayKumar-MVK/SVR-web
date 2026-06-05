
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  const phoneNumber = "918886645122"; // +91 8886645122
  const message = "Hello! I'm interested in your poultry equipment services.";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <MessageCircle className="w-6 h-6" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 px-3 py-2 bg-gray-800 text-white text-base rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Chat with us on WhatsApp
        <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
      </div>
    </motion.button>
  );
};

export default WhatsAppButton;
