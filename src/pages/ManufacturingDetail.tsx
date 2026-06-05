import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle, Cog, Shield, Clock, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

const ManufacturingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation();

  const passedProduct = location.state?.product;  

  console.log('Passed product from navigation:', passedProduct);
  // Manufacturing product data
  const manufacturingProducts = {
    '203': {
      title: 'Auto Batching Systems',
      description: 'Auto batching system can give the best results in production for its accuracy in feed formula. Batching is suitable for 50,000 and above birds. Batching bin available in 2, 4, 5, 6, 7, 8, 10 bins.',
      images: [
        '/lovable-uploads/abs1.jpg',
        '/lovable-uploads/abs2.jpg',
        '/lovable-uploads/abs3.jpg'
      ],
      videoUrl: 'https://www.youtube.com/embed/XEUWLSMzFRw',
      keyFeatures: [
        'Automated ingredient batching and mixing',
        'Precise formula management system',
        'Multi-ingredient processing capability',
        'Quality control and monitoring',
        'User-friendly control interface',
        'Flexible capacity configurations'
      ],
      advantages: [
        'Improves feed quality consistency by 95%',
        'Reduces manual labor costs by 70%',
        'Minimizes ingredient waste significantly',
        'Ensures accurate formula reproduction',
        'Increases production efficiency',
        'Provides comprehensive process monitoring'
      ]
    }
  };

  const product = manufacturingProducts[id as keyof typeof manufacturingProducts];
  const handleNavigateToContact = () => {
    console.log("Navigating to contact page with product:", product);
    
    if (!product) {
      console.error("No product found for navigation");
      navigate('/contact');
      return;
    }

    const productData = {
      id: id,
      title: product.title,
      category: 'Feed Plant',
      fromProductPage: true,
      image: product.images?.[0] || '',
      description: product.description,
      features: product.keyFeatures || []
    };

    navigate('/contact', { 
      state: { 
        product: productData,
        selectedProduct: product.title,
        selectedCategory: 'Feed Plant',
        fromProductPage: true
      },
      replace: false
    });
  };
   useEffect(() => {
    window.scrollTo({top:0, behavior:'smooth'});
  }, []);
  // Auto-slide effect for images
  useEffect(() => {
    if (product && product.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [product]);
  const handleGoToContactUsPage = () => {
    console.log("navigating to contact us page with product:", product);
    navigate('/contact', { 
      state: { 
        product: product}
      } 
    );}

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      {/* Back Button */}
      <div className="pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            onClick={() => navigate('/products')}
            variant="outline"
            className="mb-4 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Button>
        </div>
      </div>

      {/* Hero Section with Two Column Layout */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Title and Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  Manufacturing Solution
                </Badge>
                <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {product.title}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed text-justify">
                  {product.description}
                </p>
              </div>
            </motion.div>

            {/* Right Column - Image Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Card className="rounded-3xl overflow-hidden shadow-2xl bg-white">
                <CardContent className="p-0">
                  <div className="relative h-96 overflow-hidden">
                    <motion.img 
                      key={currentImageIndex}
                      src={product.images[currentImageIndex]} 
                      alt={`${product.title} - Image ${currentImageIndex + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7 }}
                    />
                    
                    {/* Image indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                      {product.images.map((_, index) => (
                        <motion.div
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                            index === currentImageIndex 
                              ? 'bg-primary scale-125 shadow-lg' 
                              : 'bg-white/60 hover:bg-white/80'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">See It In Action</h2>
            <p className="text-xl text-gray-600">Watch how our {product.title.toLowerCase()} revolutionize feed manufacturing</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gray-100"
          >
            <iframe 
              src={product.videoUrl}
              title={`${product.title} Demo Video`}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

      {/* Key Features & Advantages */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mr-4">
                  <Cog className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Key Features</h3>
              </div>
              <Card className="bg-white shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {product.keyFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-3 group"
                      >
                        <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors text-justify">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Advantages */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Advantages</h3>
              </div>
              <Card className="bg-white shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {product.advantages.map((advantage, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-3 group"
                      >
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        </div>
                        <span className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors text-justify">
                          {advantage}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-6">
              <Clock className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Automate Your Manufacturing?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Get in touch with our experts to discuss your specific requirements and receive a customized solution.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                onClick={handleNavigateToContact}
                className="bg-primary hover:bg-primary/90 px-12 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transform transition-all duration-300"
              >
                Contact Us
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ManufacturingDetail;
