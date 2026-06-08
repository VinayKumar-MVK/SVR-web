import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Youtube } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ProductPopup from '@/components/ProductPopup';

interface SubProduct {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  subProducts?: SubProduct[];
  features?: string[];
  isDirect?: boolean;
  category: string;
}

//  Shared Page Banner 
const PageBanner = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <section className="bg-[#0B1B21] py-14">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
      <div className="flex items-center gap-2 text-white/40 text-base mb-4">
        <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-white/70">{title}</span>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-black text-white mb-3"
      >
        {title}
      </motion.h1>
      <p className="text-white/50 text-lg max-w-xl">{subtitle}</p>
    </div>
  </section>
);

//  Section heading 
const CategoryHeading = ({ id, label, count }: { id: string; label: string; count: number }) => (
  <div id={id} className="scroll-mt-24 flex items-end justify-between mb-8 pb-4 border-b border-gray-200">
    <div>
      <p className="text-base font-bold uppercase tracking-[0.2em] text-[hsl(190,65%,35%)] mb-1">
        Product Category
      </p>
      <h2 className="text-2xl font-bold text-gray-900">{label}</h2>
    </div>
    <span className="text-base font-medium text-gray-400 border border-gray-200 rounded-full px-3 py-1">
      {count} Products
    </span>
  </div>
);

//  Product Card 
const ProductCard = ({
  product,
  onClick,
  index,
}: {
  product: Product;
  onClick: () => void;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: index * 0.08 }}
    onClick={onClick}
    className="group cursor-pointer rounded-lg overflow-hidden border border-gray-100 bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200"
  >
    {/* Image */}
    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
        loading="lazy"
      />
    </div>

    {/* Content */}
    <div className="p-5">
      <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-[hsl(190,65%,35%)] transition-colors">
        {product.title}
      </h3>
      <p className="text-gray-500 text-base leading-relaxed mb-4 line-clamp-2">
        {product.description}
      </p>

      {/* Features (if any) */}
      {product.features && (
        <ul className="mb-4 space-y-1">
          {product.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-[12px] text-gray-500">
              <span className="w-1 h-1 rounded-full bg-[hsl(190,65%,35%)] flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-1.5 text-[hsl(190,65%,35%)] text-base font-semibold group-hover:gap-2.5 transition-all duration-150">
        View Details
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </div>
  </motion.div>
);

//  Main Component 
const Products = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const partners = [
    { name: 'Urja Foods',     image: '/lovable-uploads/Urja.webp' },
    { name: 'SNEHA',          image: '/lovable-uploads/Sneha.webp' },
    { name: 'Jayshree Group', image: '/lovable-uploads/JG.webp' },
    { name: "Venky's",        image: '/lovable-uploads/Venkys.webp' },
    { name: 'Noveltech',      image: '/lovable-uploads/Noveltech.webp' },
    { name: 'MARS',           image: '/lovable-uploads/Mars.webp' },
    { name: 'Suppa Chicken',  image: '/lovable-uploads/lagos.webp' },
    { name: 'Tata Coffee',    image: '/lovable-uploads/tata.webp' },
    { name: 'Ovo Farm Fresh', image: '/lovable-uploads/OVO1.png' },
    { name: 'Shalimar',       image: '/lovable-uploads/shalimar.png' },
    { name: 'Kaliga',         image: '/lovable-uploads/f6879439-f410-4ca7-b03b-957c2997c0e0.webp' },
    { name: 'Vk Food',        image: '/lovable-uploads/WhatsApp_Image_2025-10-27_at_14.54.00_b0ff1e12-removebg-preview.webp' },
  ];

  const productCategories: { [key: string]: Product[] } = {
    cages: [
      {
        id: 101, title: 'Cage Systems', category: 'cages',
        description: 'Modern, comfortable housing solutions for different poultry types with advanced design.',
        image: '/lovable-uploads/cage1.png',
        subProducts: [
          { id: 1001, title: 'Chicks',  description: 'Specially designed cage systems for young chicks with optimal spacing and comfort.', image: '/lovable-uploads/chick.jpeg' },
          { id: 1002, title: 'Layer',   description: 'Professional layer cages designed for maximum egg production and bird welfare.',       image: '/lovable-uploads/layer.jpeg' },
          { id: 1003, title: 'Grower',  description: 'Robust grower cages that provide ample space for developing birds.',                    image: '/lovable-uploads/grower.jpeg' },
        ],
      },
      {
        id: 102, title: 'Cage Accessories', category: 'cages',
        description: 'Essential accessories and components to enhance your cage system\'s performance.',
        image: '/lovable-uploads/ca1.jpg',
        subProducts: [
          { id: 1004, title: 'Water Nipples', description: 'High-quality water nipples ensuring clean and efficient water supply for birds.', image: '/lovable-uploads/wn.jpeg' },
          { id: 1005, title: 'PVC/GI Feeders', description: 'Durable PVC components and feeders for reliable cage system operation.',        image: '/lovable-uploads/pvc.jpg' },
          { id: 1006, title: 'Pipes',          description: 'Professional-grade pipes for water and feed distribution systems.',              image: '/lovable-uploads/pipe.jpg' },
        ],
      },
      {
        id: 103, title: 'Weld Mesh', category: 'cages',
        description: 'High-quality welded mesh panels for poultry housing and security applications.',
        image: '/lovable-uploads/weldm.jpg',
        subProducts: [
          { id: 1007, title: 'Weld Mesh',  description: 'Strong welded mesh panels with corrosion resistance and multiple size options.', image: '/lovable-uploads/weldm.jpg' },
          { id: 1008, title: 'Chain Link', description: 'Durable chain link fencing solutions for secure poultry enclosures.',            image: '/lovable-uploads/wm2.jpeg' },
        ],
      },
    ],
    feedManufacturing: [
      {
        id: 201, title: 'Feed Trolley', category: 'feedManufacturing',
        description: 'Mobile feed delivery systems for efficient and convenient farm operations.',
        image: '/lovable-uploads/ft.jpeg',
        subProducts: [
          { id: 2001, title: 'Rooter Feed', description: 'Specialized rooter feed trolley systems for precise feed distribution.',    image: '/lovable-uploads/ft2.jpeg' },
          { id: 2002, title: 'Garata Feed', description: 'Advanced Garata feed trolley with enhanced mobility and capacity.',         image: '/lovable-uploads/ft3.jpeg' },
        ],
      },
      {
        id: 202, title: 'Feed Plants', category: 'feedManufacturing',
        description: 'Complete feed manufacturing plants for large-scale production operations.',
        image: '/lovable-uploads/fdp.jpg',
        subProducts: [
          { id: 2003, title: 'Feed Plants',         description: 'Comprehensive feed manufacturing plants with automated systems.',              image: '/lovable-uploads/fdp.jpg' },
          { id: 2004, title: 'Full Screen Grinder', description: 'High-efficiency full screen grinder for optimal feed processing.',             image: '/lovable-uploads/fg.jpg' },
          { id: 2005, title: 'Weighing Bins',       description: 'Precision weighing bins for accurate feed measurement and batching.',          image: '/lovable-uploads/wb.png' },
          { id: 2006, title: 'Mixers',              description: 'Industrial mixers ensuring uniform feed composition and quality.',             image: '/lovable-uploads/mixer.png' },
        ],
      },
      {
        id: 203, title: 'Auto Batching Systems', category: 'feedManufacturing', isDirect: true,
        description: 'Advanced automated batching systems for optimal poultry nutrition processing.',
        image: '/lovable-uploads/abt1.png',
      },
    ],
    feedStorage: [
      { id: 301, title: 'Flat Bottom Silos',  category: 'feedStorage', isDirect: true, description: 'Large capacity storage solutions for bulk feed materials with flat bottom design.', image: '/lovable-uploads/fbs.jpg', features: ['Large storage capacity', 'Weather resistant', 'Easy maintenance'] },
      { id: 302, title: 'Hopper Bottom Silos', category: 'feedStorage', isDirect: true, description: 'Efficient feed storage with hopper bottom design for easy discharge.',              image: '/lovable-uploads/hbs.png', features: ['Gravity discharge', 'Cone bottom design', 'Complete feed flow'] },
    ],
    feedTransportation: [
      { id: 401, title: 'Tractor Tanker',     category: 'feedTransportation', isDirect: true, description: 'Mobile feed cleaning and processing unit for on-site feed quality enhancement.', image: '/lovable-uploads/tt.jpeg',  features: ['Mobile operation', 'Feed cleaning', 'Quality enhancement'] },
      { id: 402, title: 'Bulk Feeding Tanker', category: 'feedTransportation', isDirect: true, description: 'Industrial bulk feeding system with automated delivery for large-scale operations.', image: '/lovable-uploads/bft.jpeg', features: ['Bulk delivery', 'Automated systems', 'Industrial capacity'] },
    ],
  };

  const handleProductClick = (product: Product) => {
    if (product.isDirect) {
      if (product.category === 'feedStorage')         navigate(`/products/storage/${product.id}`,        { state: { product } });
      else if (product.category === 'feedTransportation') navigate(`/products/transportation/${product.id}`,{ state: { product } });
      else if (product.category === 'feedManufacturing' && product.id === 203) navigate(`/products/manufacturing/${product.id}`, { state: { product } });
      else navigate(`/products/${product.category}/${product.id}`, { state: { product } });
    } else {
      setActivePopup(product.title);
    }
  };

  const getSubProducts = (title: string): SubProduct[] => {
    const all = [...productCategories.cages, ...productCategories.feedManufacturing];
    return all.find(p => p.title === title)?.subProducts || [];
  };

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.substring(1));
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 120;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash]);

  const tabs = [
    { id: 'cages',             label: 'Cage Systems' },
    { id: 'feedmanufacturing', label: 'Feed Manufacturing' },
    { id: 'feedstorage',       label: 'Feed Storage' },
    { id: 'feedtransportation',label: 'Feed Transportation' },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/*  Page Banner  */}
      <PageBanner
        title="Our Products"
        subtitle="Comprehensive poultry equipment for every stage of modern farm operations."
      />

      {/*  Project Showcase  */}
      <section className="py-14 bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="rounded-xl overflow-hidden border border-gray-200 bg-white grid grid-cols-1 lg:grid-cols-2 shadow-sm">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 lg:p-14 flex flex-col justify-center"
            >
              <p className="text-base font-bold uppercase tracking-[0.2em] text-[hsl(190,65%,35%)] mb-3">
                Featured Project
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                50 Acre Poultry Farm<br />
                <span className="text-[hsl(190,65%,35%)]">at Chinthpally</span>
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                A landmark project � entirely designed, supplied, and installed by
                SVR Poultry Equipments. A testament to our full turnkey capability.
              </p>
              <div className="flex items-center gap-3 py-3 px-4 bg-[#1F8093]/10 rounded-lg w-fit">
                <span className="text-[hsl(190,65%,35%)] font-bold text-lg">50</span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-900">Acres</p>
                  <p className="text-[11px] text-gray-500">Entirely executed by SVR</p>
                </div>
              </div>
            </motion.div>
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="aspect-video lg:aspect-auto overflow-hidden"
            >
              <img
                src="/lovable-uploads/ff822bca-19e0-449e-bd03-9eed1ecfb013.png"
                alt="50 Acre Poultry Farm at Chinthpally"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>


    
     <section className="py-14 bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="rounded-xl overflow-hidden border border-gray-200 bg-white grid grid-cols-1 lg:grid-cols-2 shadow-sm">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 lg:p-14 flex flex-col justify-center"
            >
              <p className="text-base font-bold uppercase tracking-[0.2em] text-[hsl(190,65%,35%)] mb-3">
                Featured Project
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                50 Acre Poultry Farm<br />
                <span className="text-[hsl(190,65%,35%)]">at Chinthpally</span>
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                A landmark project � entirely designed, supplied, and installed by
                SVR Poultry Equipments. A testament to our full turnkey capability.
              </p>
              <div className="flex items-center gap-3 py-3 px-4 bg-[#1F8093]/10 rounded-lg w-fit">
                <span className="text-[hsl(190,65%,35%)] font-bold text-lg">50</span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-900">Acres</p>
                  <p className="text-[11px] text-gray-500">Entirely executed by SVR</p>
                </div>
              </div>
            </motion.div>
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="aspect-video lg:aspect-auto overflow-hidden"
            >
              <img
                src="lovable-uploads\land scape .png"
                alt="50 Acre Poultry Farm at Chinthpally"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>


      {/*  Quick-nav tabs  */}
      <section className="sticky top-[72px] z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  const el = document.getElementById(tab.id);
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.pageYOffset - 160;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className="flex-shrink-0 px-5 py-4 text-xl font-bold text-center text-gray-900 hover:text-gray-900 hover:bg-gray-50 border-b-2 border-transparent hover:border-[hsl(190,65%,35%)] transition-all duration-150"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/*  Product Categories  */}
      <section className="py-14">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 space-y-20">

          {/* Cages */}
          <div>
            <CategoryHeading id="cages" label="Cage Systems" count={productCategories.cages.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productCategories.cages.map((p, i) => (
                <ProductCard key={p.id} product={p} onClick={() => handleProductClick(p)} index={i} />
              ))}
            </div>
          </div>

          {/* Feed Manufacturing */}
          <div>
            <CategoryHeading id="feedmanufacturing" label="Feed Manufacturing" count={productCategories.feedManufacturing.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {productCategories.feedManufacturing.map((p, i) => (
                <ProductCard key={p.id} product={p} onClick={() => handleProductClick(p)} index={i} />
              ))}
            </div>
          </div>

          {/* Feed Storage */}
          <div>
            <CategoryHeading id="feedstorage" label="Feed Storage" count={productCategories.feedStorage.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {productCategories.feedStorage.map((p, i) => (
                <ProductCard key={p.id} product={p} onClick={() => handleProductClick(p)} index={i} />
              ))}
            </div>
          </div>

          {/* Feed Transportation */}
          <div>
            <CategoryHeading id="feedtransportation" label="Feed Transportation" count={productCategories.feedTransportation.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {productCategories.feedTransportation.map((p, i) => (
                <ProductCard key={p.id} product={p} onClick={() => handleProductClick(p)} index={i} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/*  Clients strip  */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <p className="text-center text-base font-bold uppercase tracking-[0.2em] text-gray-400 mb-10">
            Trusted by Industry Leaders
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
            <motion.div
              className="flex gap-10 items-center"
              animate={{ x: [0, -140 * partners.length] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {[...partners, ...partners].map((p, i) => (
                <div key={`${p.name}-${i}`} className="flex-shrink-0 w-28 h-12 opacity-80 hover:opacity-100 transition-all duration-300">
                  <img src={p.image} alt={p.name} className="h-full w-full object-contain" loading="lazy" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/*  Popups  */}
      {['Cage Systems', 'Cage Accessories', 'Weld Mesh', 'Feed Trolley', 'Feed Plants'].map((title) => (
        <ProductPopup
          key={title}
          isOpen={activePopup === title}
          onClose={() => setActivePopup(null)}
          title={title}
          subProducts={getSubProducts(title)}
        />
      ))}
    </div>
  );
};

export default Products;
