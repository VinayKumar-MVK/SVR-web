import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


interface SubProduct {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface ProductPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subProducts: SubProduct[];
}

const ProductPopup = ({ isOpen, onClose, title, subProducts }: ProductPopupProps) => {
  const navigate = useNavigate();

  const handleRouter = (product) => {
    navigate(`/products/sub/${product?.id}`, { state: { product } } ); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          />
          
          {/* Popup Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 xl:inset-16 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                title="Close"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className={`grid gap-6 ${subProducts.length === 4 ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4' : subProducts.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
                {subProducts.map((product, index) => (
                  console.log(product),
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: index * 0.15,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                      damping: 12
                    }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden">
                      <motion.img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{product.title}</h3>
                      <p className="text-gray-600 mb-4 text-base leading-relaxed">{product.description}</p>
                        <Button className="w-full bg-primary hover:bg-primary/90 rounded-full group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105"
                          onClick={()=>handleRouter(product)}
                        >
                          View Details
                          <motion.div
                            className="ml-2"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            →
                          </motion.div>
                        </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductPopup;
