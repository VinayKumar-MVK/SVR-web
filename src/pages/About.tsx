import { motion, useInView } from 'framer-motion';
import { Award, Users, Package, Headphones, Building, Target, Heart, Lightbulb, Sprout, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base font-bold uppercase tracking-[0.2em] text-[hsl(4,82%,42%)] mb-3">
    {children}
  </p>
);

const PageBanner = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <section className="bg-[#1a1a2e] py-14">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
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

const About = () => {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  const statsRef  = useRef<HTMLDivElement>(null);
  const statsVisible = useInView(statsRef, { once: true, margin: '-60px' });

  const stats = [
    { icon: Award,      value: '40+',  label: 'Years of Experience' },
    { icon: Users,      value: '500+', label: 'Happy Clients' },
    { icon: Package,    value: '50+',  label: 'Product Lines' },
    { icon: Headphones, value: '24/7', label: 'Support Available' },
  ];

  const values = [
    { icon: Award,     title: 'Quality First',    description: 'We never compromise on the quality of our products and services.' },
    { icon: Lightbulb, title: 'Innovation',        description: 'Constantly evolving with the latest technology and farming practices.' },
    { icon: Heart,     title: 'Customer Focus',    description: 'Your success is our success — customers are at the heart of everything.' },
    { icon: Sprout,    title: 'Sustainability',    description: 'Committed to environmentally responsible farming solutions.' },
  ];

  const pillars = [
    { icon: Building, title: 'Who We Are',    content: 'SVR Poultry Equipments is a leading manufacturer and supplier of high-quality poultry equipment, serving farmers across India and internationally with innovative solutions that enhance productivity and profitability.' },
    { icon: Target,   title: 'Our Mission',   content: 'To revolutionize poultry farming through cutting-edge technology and sustainable practices, making modern farming accessible and profitable for farmers of all scales.' },
    { icon: Award,    title: 'Why Choose SVR', content: 'With 40+ years of experience, quality products, competitive pricing, and excellent customer service, we\'re your ideal partner for all poultry equipment needs and ongoing support.' },
  ];

  const equipment = [
    { title: 'Laser Machine',                  description: 'High-precision fiber laser cutting with advanced control systems for superior cutting quality.',           image: '/lovable-uploads/lasermachine.jpg' },
    { title: 'Bending Machine',                description: 'Professional hydraulic press brake with precision tooling for accurate bending and forming.',              image: '/lovable-uploads/2.jpg' },
    { title: 'CNC Lathe Machine',              description: 'Computer-controlled lathe delivering exceptional precision in turning and machining operations.',           image: '/lovable-uploads/3.webp' },
    { title: 'Laser Machine HSG',              description: 'Advanced laser cutting with high-speed processing capabilities for industrial-scale applications.',         image: '/lovable-uploads/4.png' },
    { title: 'Bending Machine AccurPress',     description: 'Heavy-duty press brake designed for high-volume production with consistent accuracy.',                     image: '/lovable-uploads/5.jpg' },
    { title: 'Automatic Weldmesh Machine',     description: 'Fully automated welding system producing high-quality mesh products with exceptional consistency.',         image: '/lovable-uploads/6.jpg' },
    { title: 'TCM-220-WITH-TUBE-AUTOLOADING Machine',     description: 'Fully automatic wire cutting and stripping system designed for high-volume cable processing, offering precision, speed, and reduced manual handling thanks to its tube autoloading feature.',         image: '/lovable-uploads/TCM-220-WITH-TUBE-AUTOLOADING.22.png' },
  ];

  const team = [
    { name: 'Mr. D. Venkateshwar Reddy'},
    { name: 'Mr. D. Jagadeshwar Reddy'},
    { name: 'Mr. A. Srinivas Reddy'},
  ];

  const team2 = [
    { name: 'Mr. D. Maheshwarao Reddy'},
    { name: 'Mr. D. Aditya Reddy'},
  ];

  return (
    <div className="min-h-screen">

      {/*  Page Banner  */}
      <PageBanner
        title="About Us"
        subtitle="Your trusted partner in modern poultry farming solutions since 1984."
      />

      {/*  Company Story  */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SectionLabel>Our Story</SectionLabel>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Four Decades of Poultry<br />Engineering Innovation
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                Sri Venkata Ramana Engineering Works was established in the early '80s.
                In the early 2000's, SVR Poultry Equipment Manufacturing was set up
                separately in Hyderabad with a fully pledged manufacturing facility
                and a modern CAD-equipped design office.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                Our machine and fabrication shop, along with a complete team of
                engineers, technocrats, and professionals, is capable of designing,
                manufacturing, and commissioning fully automated feed milling plants
                up to 200 tons per day capacity.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                With 150+ direct and indirect employees, we have extensive product range
                aligned with the latest technology — from Auto Feeding Machines and Auger
                Systems to Feed Storage Bins, Silos, Auto Batching and complete Feed Plants.
                We serve clients all over India and export to Angola, Ghana, Oman, and beyond.
              </p>
            </motion.div>

            {/* Pillars */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-5"
            >
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-5 p-6 border border-gray-100 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-red-50 flex items-center justify-center">
                    <p.icon className="w-5 h-5 text-[hsl(4,82%,42%)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">{p.title}</h3>
                    <p className="text-gray-500 text-base leading-relaxed">{p.content}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/*  Stats Row  */}
      <section ref={statsRef} className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-6 h-6 text-[hsl(4,82%,42%)]" />
                </div>
                <p className="text-3xl font-black text-gray-900 mb-1">{s.value}</p>
                <p className="text-base uppercase tracking-[0.12em] text-gray-500 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*  Premium Equipment  */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <SectionLabel>Our Facility</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Premium Manufacturing Equipment</h2>
            <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
              State-of-the-art machinery and fabrication solutions engineered for excellence and precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((eq, i) => (
              <motion.div
                key={eq.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-lg overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-250"
              >
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={eq.image}
                    alt={eq.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{eq.title}</h3>
                  <p className="text-gray-500 text-base leading-relaxed">{eq.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*  Core Values  */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>What Drives Us</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-7 rounded-lg border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-md bg-red-50 flex items-center justify-center mb-5">
                  <v.icon className="w-5 h-5 text-[hsl(4,82%,42%)]" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">{v.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*  Leadership  */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>Leadership</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Founders</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="text-center p-8 border border-gray-100 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 text-base mb-1">{member.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

 {/*  Leadership  */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>Leadership</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Next Generation</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {team2.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="text-center p-8 border border-gray-100 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 text-base mb-1">{member.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/*  CTA  */}
      <section className="py-20 bg-[#1a1a2e]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[hsl(38,92%,60%)] text-base font-bold uppercase tracking-[0.2em] mb-4">Work With Us</p>
          <h2 className="text-3xl font-black text-white mb-5">Ready to Modernize Your Farm?</h2>
          <p className="text-white/60 text-lg max-w-lg mx-auto mb-9">
            Contact our team for a free consultation and equipment recommendation tailored to your farm's needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[hsl(4,82%,42%)] hover:bg-[hsl(4,82%,36%)] text-white font-semibold text-base rounded-md transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 hover:border-white/40 text-white font-semibold text-base rounded-md transition-colors"
            >
              View Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
