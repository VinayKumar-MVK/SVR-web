import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Settings, Users, Zap, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Define image arrays for each product
  const productImages = {
    '1': [
      '/lovable-uploads/819b4d78-1fce-4557-90af-e1526d3a60e2.png',
      '/lovable-uploads/8a104838-fb90-4d21-b4f7-be5da2ec9e2d.png',
      '/lovable-uploads/847e4da2-2bf0-4da2-b119-699bac1373f1.png'
    ],
    '2': [
      '/lovable-uploads/8afb721d-0c4b-4523-aa58-c2997a491b54.png',
      '/lovable-uploads/b43eae74-224b-4b97-9c97-fee060bfbce1.png',
      '/lovable-uploads/8ae29c95-16e1-4c4b-995b-1e6ee604111d.png'
    ],
    '3': [
      '/lovable-uploads/8da81a5b-ee76-447b-bcda-9e3ae3c66350.png',
      '/lovable-uploads/e6c1c0a4-2f52-437f-84d7-2104e8b0cc91.png',
      '/lovable-uploads/f2c1441c-8630-47f7-a4cc-284e064d2ee3.png'
    ],
    '4': [
      '/lovable-uploads/d7703451-5a3e-42ab-8566-1c44f16fdeca.png',
      '/lovable-uploads/37b19977-d765-4669-b6bc-c7d59a28d39f.png'
    ],
    '5': [
      '/lovable-uploads/4cd6c42b-8fd9-4a6d-bb0a-b2db84876889.png',
      '/lovable-uploads/a9bfc5e5-a28d-4c66-b56e-3fa04b8dfb50.png',
      '/lovable-uploads/201fd9a0-96d4-4739-8e9b-0258a6ce4dc8.png'
    ],
    '6': [
      '/lovable-uploads/71326db0-42f7-42d8-9c50-165c3f17b739.png',
      '/lovable-uploads/25a37988-34e6-44c5-9198-3c3926fe49b0.png',
      'https://pradosilos.com/wp-content/uploads/2021/06/fondo-conico-silo.jpg'
    ],
    '7': [
      '/lovable-uploads/77413970-4bb0-40b6-943d-ec5d851a92aa.png',
      '/lovable-uploads/e1fab63a-52b7-4282-86b5-75c0b4a79b15.png',
      'https://www.barbedwire.net/images/welded-mesh-panel.jpg'
    ]
  };

  // Auto-slide effect for images
  useEffect(() => {
    const images = productImages[id as keyof typeof productImages];
    if (images && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [id]);

  // Product data (in a real app, this would come from an API or database)
  const products = {
    '1': {
      title: 'Feed Processing',
      image: '/lovable-uploads/819b4d78-1fce-4557-90af-e1526d3a60e2.png',
      description: 'Advanced feed mill equipment for optimal poultry nutrition processing. State-of-the-art technology ensures precise feed formulation and processing for maximum efficiency.',
      features: [
        'Automated processing',
        'Quality control systems',
        'High efficiency operation',
        'Precise mixing capabilities',
        'Temperature monitoring',
        'Batch tracking system'
      ],
      usage: [
        'Suitable for all poultry types',
        'Capacity: 1-10 tons per hour',
        'Automated feed formulation',
        'Reduces processing time by 60%',
        'Improves feed quality consistency',
        'Minimizes ingredient waste'
      ],
      applications: [
        'Commercial feed mills',
        'Large poultry farms',
        'Feed manufacturing plants',
        'Agricultural cooperatives',
        'Research facilities',
        'Custom feed production'
      ],
      specifications: {
        'Capacity': '1-10 tons/hour',
        'Power Consumption': '15-25 kW',
        'Material': 'Stainless steel',
        'Warranty': '5 years',
        'Installation': 'Complete setup included'
      }
    },
    '2': {
      title: 'Cage Systems',
      image: '/lovable-uploads/8afb721d-0c4b-4523-aa58-c2997a491b54.png',
      description: 'Modern, comfortable housing solutions for different poultry types. Designed with bird welfare and operational efficiency in mind.',
      features: [
        'Modular design',
        'Easy access for maintenance',
        'Durability tested',
        'Optimal space utilization',
        'Ventilation integration',
        'Easy cleaning system'
      ],
      usage: [
        'Houses 50-200 birds per tier',
        'Multi-tier configuration',
        'Easy bird management',
        'Reduces labor requirements',
        'Improves hygiene standards',
        'Maximizes space efficiency'
      ],
      applications: [
        'Layer hen operations',
        'Broiler production',
        'Breeder farms',
        'Commercial operations',
        'Small to medium farms',
        'Indoor farming systems'
      ],
      specifications: {
        'Capacity': '50-200 birds/tier',
        'Material': 'Galvanized wire',
        'Dimensions': 'Customizable',
        'Warranty': '10 years',
        'Installation': 'Technical support included'
      }
    },
    '3': {
      title: 'Feed Storage',
      image: '/lovable-uploads/8da81a5b-ee76-447b-bcda-9e3ae3c66350.png',
      description: 'Industrial feed storage and mixing systems for large-scale operations. Advanced preservation and distribution technology.',
      features: [
        'Temperature control',
        'Moisture management',
        'Easy loading system',
        'Automated mixing',
        'Quality preservation',
        'Contamination prevention'
      ],
      usage: [
        'Stores 10-500 tons capacity',
        'Maintains feed quality',
        'Automated dispensing',
        'Reduces storage losses',
        'Temperature monitoring',
        'Prevents pest infestation'
      ],
      applications: [
        'Large poultry farms',
        'Feed distribution centers',
        'Agricultural cooperatives',
        'Commercial operations',
        'Multi-farm facilities',
        'Industrial operations'
      ],
      specifications: {
        'Capacity': '10-500 tons',
        'Material': 'Galvanized steel',
        'Control': 'Automated systems',
        'Warranty': '7 years',
        'Monitoring': 'IoT-enabled'
      }
    },
    '4': {
      title: 'Feed Transportation',
      image: '/lovable-uploads/d7703451-5a3e-42ab-8566-1c44f16fdeca.png',
      description: 'Mobile feed delivery systems for efficient farm operations. Advanced transportation solutions for feed distribution.',
      features: [
        'Large capacity storage',
        'Precision delivery',
        'Easy operation',
        'GPS tracking',
        'Load monitoring',
        'Weather protection'
      ],
      usage: [
        'Delivers 5-20 tons per trip',
        'Automated unloading',
        'Route optimization',
        'Reduces delivery time',
        'Prevents feed spillage',
        'Real-time tracking'
      ],
      applications: [
        'Multi-farm operations',
        'Feed distribution services',
        'Large commercial farms',
        'Regional feed supply',
        'Contract farming',
        'Agricultural logistics'
      ],
      specifications: {
        'Capacity': '5-20 tons',
        'Engine': 'Diesel powered',
        'Control': 'Digital systems',
        'Warranty': '3 years',
        'Tracking': 'GPS enabled'
      }
    },
    '5': {
      title: 'Flat Bottom Silos',
      image: '/lovable-uploads/4cd6c42b-8fd9-4a6d-bb0a-b2db84876889.png',
      description: 'Large capacity storage solutions for bulk feed materials with flat bottom design. Ideal for long-term storage and easy maintenance.',
      features: [
        'Large storage capacity',
        'Weather resistant construction',
        'Easy maintenance access',
        'Pest prevention systems',
        'Quality preservation',
        'Efficient loading/unloading'
      ],
      usage: [
        'Stores 50-1000 tons capacity',
        'Long-term feed storage',
        'Weather protection',
        'Reduces storage losses',
        'Easy access for maintenance',
        'Prevents contamination'
      ],
      applications: [
        'Large commercial farms',
        'Feed manufacturing units',
        'Agricultural cooperatives',
        'Grain storage facilities',
        'Industrial operations',
        'Export facilities'
      ],
      specifications: {
        'Capacity': '50-1000 tons',
        'Material': 'Galvanized steel',
        'Design': 'Flat bottom',
        'Warranty': '15 years',
        'Maintenance': 'Easy access design'
      }
    },
    '6': {
      title: 'Hopper Bottom Silos',
      image: '/lovable-uploads/e1d9b3e3-ce19-42eb-bef7-b6cb814a916a.png',
      description: 'Efficient feed storage with hopper bottom design for easy discharge. Perfect for automated feeding systems with gravity flow.',
      features: [
        'Gravity discharge system',
        'Cone bottom design',
        'Complete feed flow',
        'No residual material',
        'Automated operation',
        'Easy integration'
      ],
      usage: [
        'Automated feed discharge',
        'No material wastage',
        'Continuous operation',
        'Reduces labor costs',
        'Improves efficiency',
        'Consistent feed flow'
      ],
      applications: [
        'Automated feeding systems',
        'Poultry processing plants',
        'Commercial farms',
        'Feed distribution centers',
        'Integrated operations',
        'Modern farming facilities'
      ],
      specifications: {
        'Capacity': '20-500 tons',
        'Discharge': 'Gravity flow',
        'Material': 'Stainless steel',
        'Warranty': '12 years',
        'Automation': 'Full integration'
      }
    },
    '7': {
      title: 'Weld Mesh',
      image: 'https://storage.googleapis.com/kms-au.appspot.com/sites/bluedog-fences/assets/7d96697e-0136-44c7-bd93-e400abc264dd/Bluedog%20GuardForce%C2%AE%20358%20welded%20mesh%20high%20security%20fencing.JPG',
      description: 'High-quality welded mesh panels for poultry housing and security fencing. Durable construction for long-lasting protection.',
      features: [
        'Corrosion resistant coating',
        'Strong welded construction',
        'Multiple size options',
        'Easy installation',
        'Weather resistance',
        'Custom configurations'
      ],
      usage: [
        'Poultry enclosures',
        'Security fencing',
        'Cage construction',
        'Partition systems',
        'Protective barriers',
        'Ventilation panels'
      ],
      applications: [
        'Poultry housing',
        'Farm security',
        'Cage systems',
        'Boundary fencing',
        'Industrial facilities',
        'Agricultural operations'
      ],
      specifications: {
        'Wire Gauge': '2-6mm',
        'Mesh Size': '25x25mm to 100x100mm',
        'Material': 'Galvanized steel',
        'Warranty': '8 years',
        'Coating': 'Hot-dip galvanized'
      }
    },
    '8': {
      title: 'Tractor Tanker',
      image: '/lovable-uploads/5d104031-b293-4f56-a4db-550853a91376.png',
      description: 'Mobile feed cleaning and processing unit for on-site feed quality enhancement. Portable solution for feed preparation.',
      features: [
        'Mobile operation capability',
        'Feed cleaning systems',
        'Quality enhancement',
        'Dust removal',
        'Grading systems',
        'Compact design'
      ],
      usage: [
        'On-site feed cleaning',
        'Quality improvement',
        'Dust removal',
        'Mobile processing',
        'Field operations',
        'Remote locations'
      ],
      applications: [
        'Farm feed preparation',
        'Mobile services',
        'Remote operations',
        'Quality control',
        'Field processing',
        'Custom cleaning'
      ],
      specifications: {
        'Capacity': '2-5 tons/hour',
        'Power': 'Tractor PTO driven',
        'Mobility': 'Trailer mounted',
        'Warranty': '3 years',
        'Operation': 'Mobile unit'
      }
    },
    '9': {
      title: 'Bulk Feeding Tanker',
      image: '/lovable-uploads/b38e8ccd-bb1b-40f2-bc05-12579bc3472f.png',
      description: 'Industrial bulk feeding system with automated delivery for large-scale operations. High-capacity feed distribution solution.',
      features: [
        'Bulk delivery capacity',
        'Automated systems',
        'Industrial capacity',
        'Pneumatic discharge',
        'Load monitoring',
        'Safety systems'
      ],
      usage: [
        'Large-scale feed delivery',
        'Automated operations',
        'Bulk handling',
        'Reduced labor costs',
        'Efficient distribution',
        'High-volume operations'
      ],
      applications: [
        'Industrial poultry farms',
        'Large commercial operations',
        'Feed distribution',
        'Bulk handling facilities',
        'Automated systems',
        'High-capacity operations'
      ],
      specifications: {
        'Capacity': '15-30 tons',
        'Discharge': 'Pneumatic system',
        'Control': 'Automated operation',
        'Warranty': '5 years',
        'Operation': 'Industrial grade'
      }
    },
    '203': {
      title: 'Auto Batching Systems',
      image: '/lovable-uploads/819b4d78-1fce-4557-90af-e1526d3a60e2.png',
      description: 'Advanced automated batching systems for optimal poultry nutrition processing. Precision engineering for consistent feed quality and efficiency.',
      features: [
        'Automated ingredient handling',
        'Precision weighing systems',
        'Recipe management',
        'Quality control monitoring',
        'Data logging capabilities',
        'Remote operation control'
      ],
      usage: [
        'Automated feed production',
        'Consistent batch quality',
        'Reduced labor requirements',
        'Improved accuracy',
        'Production monitoring',
        'Inventory management'
      ],
      applications: [
        'Commercial feed mills',
        'Large poultry operations',
        'Feed manufacturing plants',
        'Industrial processing',
        'Quality-controlled production',
        'Automated facilities'
      ],
      specifications: {
        'Capacity': '5-50 tons/batch',
        'Accuracy': '±0.1%',
        'Control': 'PLC-based system',
        'Warranty': '3 years',
        'Integration': 'Complete automation'
      }
    },
    '401': {
      title: 'Tractor Tanker',
      image: '/lovable-uploads/5d104031-b293-4f56-a4db-550853a91376.png',
      description: 'Mobile feed cleaning and processing unit for on-site feed quality enhancement. Portable solution for feed preparation and quality control.',
      features: [
        'Mobile operation capability',
        'Feed cleaning systems',
        'Quality enhancement technology',
        'Dust removal systems',
        'Grading mechanisms',
        'Compact efficient design'
      ],
      usage: [
        'On-site feed cleaning',
        'Quality improvement processing',
        'Dust and debris removal',
        'Mobile processing operations',
        'Field-based operations',
        'Remote location services'
      ],
      applications: [
        'Farm feed preparation',
        'Mobile processing services',
        'Remote operation sites',
        'Quality control applications',
        'Field processing needs',
        'Custom cleaning services'
      ],
      specifications: {
        'Capacity': '2-5 tons/hour',
        'Power': 'Tractor PTO driven',
        'Mobility': 'Trailer mounted',
        'Warranty': '3 years',
        'Operation': 'Mobile processing unit'
      }
    },
    '402': {
      title: 'Bulk Feeding Tanker',
      image: '/lovable-uploads/b38e8ccd-bb1b-40f2-bc05-12579bc3472f.png',
      description: 'Industrial bulk feeding system with automated delivery for large-scale operations. High-capacity feed distribution solution with advanced automation.',
      features: [
        'Bulk delivery capacity',
        'Automated distribution systems',
        'Industrial grade capacity',
        'Pneumatic discharge system',
        'Load monitoring technology',
        'Advanced safety systems'
      ],
      usage: [
        'Large-scale feed delivery',
        'Automated feeding operations',
        'Bulk material handling',
        'Reduced operational costs',
        'Efficient distribution networks',
        'High-volume operations'
      ],
      applications: [
        'Industrial poultry farms',
        'Large commercial operations',
        'Feed distribution networks',
        'Bulk handling facilities',
        'Automated feeding systems',
        'High-capacity operations'
      ],
      specifications: {
        'Capacity': '15-30 tons',
        'Discharge': 'Pneumatic system',
        'Control': 'Automated operation',
        'Warranty': '5 years',
        'Operation': 'Industrial grade'
      }
    }
  };

  const product = products[id as keyof typeof products];

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
            className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm hover:bg-white border-primary/20 hover:border-primary/40 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Premium Equipment
              </Badge>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {product.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>
              <Link to="/contact">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Contact Us for Pricing
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Card className="rounded-3xl overflow-hidden shadow-2xl bg-white">
                <CardContent className="p-0">
                  <div className="relative h-96 overflow-hidden">
                    {(() => {
                      const images = productImages[id as keyof typeof productImages];
                      if (images && images.length > 1) {
                        return (
                          <>
                            <div className="relative w-full h-full">
                              <motion.img 
                                key={currentImageIndex}
                                src={images[currentImageIndex]} 
                                alt={`${product.title} - Image ${currentImageIndex + 1}`}
                                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                            {/* Image indicators */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                              {images.map((_, index) => (
                                <div
                                  key={index}
                                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                    index === currentImageIndex 
                                      ? 'bg-primary scale-125' 
                                      : 'bg-gray-300 hover:bg-gray-400'
                                  }`}
                                  onClick={() => setCurrentImageIndex(index)}
                                />
                              ))}
                            </div>
                          </>
                        );
                      }
                      return (
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-full object-cover rounded-3xl"
                        />
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video and Product Description Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-3xl overflow-hidden shadow-2xl bg-white">
  <CardContent className="p-0">
    <div className="bg-gray-100 flex items-center justify-center" style={{ height: '400px' }}>
      <video 
        src="https://cvukkqrjfrzvnytpcfjj.supabase.co/storage/v1/object/public/videos/SVR%20vid%20(1).mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  </CardContent>
</Card>
            </motion.div>
{/*Product Description headings section start*/}
            {/* Product Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Product Overview
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                  Advanced {product.title} Solutions
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {product.description}
                </p>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Key Highlights:</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {product.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link to="/contact">
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Get Quote
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Key Features</h2>
            <p className="text-xl text-gray-600">
              Discover what makes this equipment exceptional
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-xl">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <p className="text-gray-700 leading-relaxed">{feature}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage, Applications, and Specifications */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Usage */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white shadow-xl border-0 rounded-2xl">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mb-6 flex items-center justify-center">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Usage & Benefits</h3>
                  <div className="space-y-3">
                    {product.usage.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Applications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white shadow-xl border-0 rounded-2xl">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mb-6 flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Applications</h3>
                  <div className="space-y-3">
                    {product.applications.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white shadow-xl border-0 rounded-2xl">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mb-6 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h3>
                  <div className="space-y-4">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div key={index} className="border-b border-gray-100 pb-3">
                        <div className="flex justify-between items-start">
                          <span className="font-medium text-gray-900 text-sm">{key}</span>
                          <span className="text-gray-700 text-sm text-right ml-4">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Interested in This Product?</h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Get in touch with our experts for detailed specifications, pricing, and installation support.
            </p>
            <Link to="/contact">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 px-12 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Contact Us Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
