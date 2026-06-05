import { motion, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle, Phone, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import TextCarousel from '@/components/TextCarousel';
import SVRTimelineInnovation from '@/components/SVRTimelineInnovation';
import YouTubeShowcase from '@/components/YouTubeShowcase';
import WorldMap from '@/components/WorldMap';
import { useEffect, useRef, useState } from 'react';

//  Count-up hook 
function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const totalFrames = Math.round((duration / 1000) * 60);
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.min(Math.round(eased * target), target));
      if (frame >= totalFrames) clearInterval(timer);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

//  Stat item 
const Stat = ({ value, suffix, label, active, delay }: {
  value: number; suffix: string; label: string; active: boolean; delay: number;
}) => {
  const count = useCountUp(value, 1800, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center py-8 px-6 border-r border-gray-200 last:border-r-0"
    >
      <span className="text-4xl font-black text-[hsl(4,82%,42%)] tabular-nums">
        {count}{suffix}
      </span>
      <span className="text-base uppercase tracking-[0.15em] text-gray-500 mt-2 font-medium">{label}</span>
    </motion.div>
  );
};

//  Section label 
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base font-bold uppercase tracking-[0.2em] text-[hsl(4,82%,42%)] mb-3">
    {children}
  </p>
);

//  Component 
const Home = () => {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  const statsRef  = useRef<HTMLDivElement>(null);
  const marketRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<HTMLDivElement>(null);

  const statsInView  = useInView(statsRef,  { once: true, margin: '-80px' });
  const marketInView = useInView(marketRef, { once: true, margin: '-80px' });
  const clientInView = useInView(clientRef, { once: true, margin: '-80px' });

  const stats = [
    { value: 500,  suffix: '+', label: 'Clients Served',    delay: 0 },
    { value: 40,   suffix: '+', label: 'Years of Legacy',   delay: 0.08 },
    { value: 20,   suffix: '+', label: 'Countries Reached', delay: 0.16 },
    { value: 1000, suffix: '+', label: 'Units Delivered',   delay: 0.24 },
  ];

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

  const marketPoints = [
    'Exporting to Middle East, Africa & South Asia',
    'Serving 500+ farms across Pan-India',
    'ISO-certified precision manufacturing',
    'End-to-end installation & after-sales support',
  ];

  return (
    <div className="min-h-screen">

      {/* 
          HERO
       */}
      <section className="relative h-[88vh] min-h-[560px] flex items-end overflow-hidden">
        {/* Video */}
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source
              src="https://cvukkqrjfrzvnytpcfjj.supabase.co/storage/v1/object/public/videos//SVR%20vid.mp4"
              type="video/mp4"
            />
          </video>
          {/* Multi-layer overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[2px] bg-[hsl(4,82%,42%)]" />
              <span className="text-white/80 text-base font-semibold uppercase tracking-[0.2em]">
                Since 1984 · Hyderabad, India
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.08] mb-6 tracking-tight">
              Engineering the<br />
              <span className="text-[hsl(38,92%,60%)]">Future of Poultry</span>
            </h1>

            <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-9 max-w-lg">
              India's most trusted poultry equipment manufacturer — Delivering Cage systems, Automated
              feeding and Feed plants to farms across 20+ countries.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                id="hero-products-btn"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(4,82%,42%)] hover:bg-[hsl(4,82%,36%)] text-white font-semibold text-base rounded-md transition-colors duration-150 shadow-lg"
              >
                Browse Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                id="hero-contact-btn"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white font-semibold text-base rounded-md transition-colors duration-150"
              >
                <Phone className="w-4 h-4" />
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-7 right-8 z-10 text-white/40 flex flex-col items-center gap-1"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* 
          TICKER
       */}
      <TextCarousel />

      {/* 
          STATS STRIP
       */}
      <section ref={statsRef} className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            {stats.map((s) => (
              <Stat key={s.label} {...s} active={statsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* 
          ABOUT STRIP
       */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SectionLabel>Who We Are</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">
                40 Years of Poultry<br />
                Engineering Excellence
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                Established in 1984 as Sri Venkata Ramana Engineering Works, SVR has grown
                into India's leading manufacturer of fully automated poultry equipment —
                from cage systems and feeders to complete feed milling plants up to
                200 tons/day capacity.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                With 150+ team members, a CAD-equipped design office, and a fully
                equipped fabrication shop, we serve clients across India and export
                to Africa, the Middle East, and beyond.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[hsl(4,82%,42%)] font-semibold text-base hover:gap-3 transition-all duration-200"
              >
                Learn Our Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="grid grid-cols-1 gap-5"
            >
              {[
                { title: 'Automated Feed Systems',   desc: 'Auger-based & pan feeding systems for broilers, layers and breeders.' },
                { title: 'Cage & Housing Solutions', desc: 'California, Comfort+, and Automax vertical farming cage systems.' },
                { title: 'Feed Storage & Transport', desc: 'Flat-bottom & hopper-bottom silos, bulk tankers for seamless logistics.' },
                { title: 'Complete Feed Plants',     desc: 'Turn-key feed milling plants up to 200 TPD with auto batching.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 p-5 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-5 h-5 text-[hsl(4,82%,42%)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg mb-1">{item.title}</p>
                    <p className="text-gray-500 text-base leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 
          MARKET PRESENCE
       */}
      <section ref={marketRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Video map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={marketInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7 }}
              className="rounded-xl overflow-hidden border border-gray-200 shadow-md aspect-[4/3] lg:aspect-auto lg:h-[400px]"
            >
              <WorldMap />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={marketInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <SectionLabel>Global Reach</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">
                Our Market Presence
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                SVR Poultry Equipments has built a strong international footprint,
                delivering cutting-edge solutions to farms across multiple continents
                with a relentless focus on quality and reliability.
              </p>
              <ul className="space-y-3">
                {marketPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-gray-700">
                    <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[hsl(4,82%,42%)]" />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(4,82%,42%)] hover:bg-[hsl(4,82%,36%)] text-white font-semibold text-base rounded-md transition-colors duration-150"
                >
                  Partner With Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 
          TIMELINE
       */}
      <section className="bg-gray-50 py-4">
        <SVRTimelineInnovation />
      </section>

      {/* 
          YOUTUBE VIDEOS
       */}
      <YouTubeShowcase />

      {/* 
          CLIENTS
       */}
      <section ref={clientRef} className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={clientInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <SectionLabel>Trusted By</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900">Our Clients</h2>
          </motion.div>

          <div className="relative overflow-hidden">
            {/* Fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

            <motion.div
              className="flex gap-8 items-center"
              animate={{ x: [0, -140 * partners.length] }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            >
              {[...partners, ...partners].map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="flex-shrink-0 w-32 h-14 flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-300"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 
          CTA BANNER
       */}
      <section className="py-20 bg-[#1a1a2e]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[hsl(38,92%,60%)] text-base font-bold uppercase tracking-[0.2em] mb-4">
              Ready to Get Started?
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-5 leading-tight">
              Let's Build Your Modern Poultry Farm
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-9 leading-relaxed">
              Talk to our engineering team today. We'll help you select the right
              equipment, plan your setup, and ensure smooth installation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                id="cta-contact-btn"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[hsl(4,82%,42%)] hover:bg-[hsl(4,82%,36%)] text-white font-semibold text-base rounded-md transition-colors"
              >
                <Phone className="w-4 h-4" />
                Contact Our Team
              </Link>
              <Link
                to="/products"
                id="cta-products-btn"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 hover:border-white/40 text-white font-semibold text-base rounded-md transition-colors"
              >
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
