import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock, ChevronDown, X, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

//  Shared Page Banner 
const PageBanner = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <section className="bg-[#0B1B21] py-14">
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

//  Form field wrapper 
const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div>
    <label className="block text-base font-semibold text-gray-700 mb-1.5">
      {label} {required && <span className="text-[hsl(190,65%,35%)]">*</span>}
    </label>
    {children}
  </div>
);

const inputClass =
  'w-full px-3.5 py-2.5 text-base text-gray-900 bg-white border border-gray-200 rounded-md outline-none transition-all duration-150 focus:border-[hsl(190,65%,35%)] focus:ring-2 focus:ring-[hsl(190,65%,35%)]/10 placeholder:text-gray-400';

//  Main 
const Contact = () => {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting]   = useState(false);
  const [submitted, setSubmitted]         = useState(false);
  const [currentSlide, setCurrentSlide]   = useState(0);
  const [showPopup, setShowPopup]         = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct]   = useState('');
  const [selectedSubProduct, setSelectedSubProduct] = useState('');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: '',
  });

  const productCategories: Record<string, string[]> = {
    'Cage Systems':       ['Chicks Cage Systems', 'Layers', 'Growers'],
    'Cage Accessories':   ['Water Nipples', 'PVC/GI Feeders', 'Pipes'],
    'Weld Mesh':          ['Welded Mesh', 'Chain Link'],
    'Feed Trolley':       ['Rooter Feed', 'Garata Feed'],
    'Feed Plant':         ['Feed Manufacturing Plants', 'Full Screen Grinder', 'Weighing Bins', 'Feed Mixers', 'Auto Batching System'],
    'Feed Storage':       ['Flat Bottom Silos', 'Hopper Bottom Silos'],
    'Feed Transportation':['Tractor Tanker', 'Bulk Feed Tanker'],
  };

  // Pre-fill from navigation state
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!location.state) return;
    const { selectedProduct: sp, product, selectedCategory: sc } = location.state as any;
    if (product) {
      setSelectedCategory(product.category || sc || '');
      setSelectedProduct(product.title || sp || '');
      setSelectedSubProduct(sp || '');
      setFormData(prev => ({ ...prev, message: `I would like to know more about ${product.title || sp}.` }));
    } else if (sp || sc) {
      setSelectedCategory(sc || '');
      setSelectedProduct(sp || '');
      if (sp) setFormData(prev => ({ ...prev, message: `I would like to know more about ${sp}.` }));
    }
    window.history.replaceState({}, document.title);
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_inquiries').insert([{
        created_at: new Date().toISOString(),
        email: formData.email,
        message: formData.message,
        name: formData.name,
        phone: formData.phone,
        product_category: selectedCategory,
        product_name: selectedProduct || selectedSubProduct,
        read_status: false,
      }]);
      if (error) throw error;
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSelectedCategory('');
      setSelectedProduct('');
    } catch (err: any) {
      alert(`Error: ${err.message || 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const locations = [
    { id: 1, title: 'Head Office',    subtitle: 'Hyderabad', address: 'Tukkuguda Plastic Park, Telangana 501359',                                              phone: '+91 8886645122', image: 'https://ik.imagekit.io/xu7akp4g0/WhatsApp%20Image%202025-07-27%20at%2022.57.52_b3255cad.jpg?updatedAt=1753637596413', mapUrl: 'https://www.google.com/maps/place/SVR+Poultry+Equipments+(unit-2)/@17.1633926,78.4618567' },
    { id: 2, title: 'Fabrication 1',  subtitle: 'Hyderabad', address: 'Turkayamjal, Telangana',                                                                phone: '+91 8886645122', image: 'https://ik.imagekit.io/xu7akp4g0/Screenshot%202025-07-27%20224725.png?updatedAt=1753638224876',            mapUrl: 'https://www.google.com/maps/place/Svr+Poultry+Equipments/@17.2808662,78.5893317' },
    { id: 3, title: 'Fabrication 2',  subtitle: 'Hyderabad', address: 'Rachloor, Telangana',                                                                   phone: '+91 8886645123', image: 'https://ik.imagekit.io/xu7akp4g0/Screenshot%202025-07-27%20230857.png?updatedAt=1753638581135',            mapUrl: null },
    { id: 4, title: 'Branch Office 1', subtitle: 'Karimnagar', address: 'Gundapalli Village, Ganneruvaram Mandal, Karimnagar, Telangana',                      phone: '+91 8886645122', image: '/lovable-uploads/bo1.png',                                                                                    mapUrl: null },
    { id: 5, title: 'Branch Office 2', subtitle: 'Karnataka',  address: 'Hanekal cross, Challakere TQ, Chitradurga District, Karnataka',                       phone: '+91 8886645122', image: '/lovable-uploads/bo2.png',                                                                                    mapUrl: null },
    { id: 6, title: 'Branch Office 3', subtitle: 'Andhra Pradesh', address: 'Plot no. 35, Veerapanenigudem, Gannavaram, Krishna District, Andhra Pradesh',    phone: '+91 8886645122', image: '/lovable-uploads/bo3.png',                                                                                    mapUrl: null },
  ];

  const slides = [locations.slice(0, 3), locations.slice(3, 6)];

  const quickContact = [
    { icon: Phone, label: 'Call Us', value: '+91 88866 45122', href: 'tel:+918886645122' },
    { icon: Mail,  label: 'Email Us', value: 'svrpoultryequipments@gmail.com', href: 'mailto:svrpoultryequipments@gmail.com' },
    { icon: Clock, label: 'Business Hours', value: 'Mon – Sat: 9 AM – 6 PM', href: null },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/*  Banner  */}
      <PageBanner
        title="Contact Us"
        subtitle="Get in touch with our team for quotes, support, or general enquiries."
      />

      {/*  Quick contact strip  */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {quickContact.map((item) => (
              <div key={item.label} className="flex items-center gap-4 py-5 px-4">
                <div className="w-9 h-9 rounded-md bg-[#1F8093]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-[hsl(190,65%,35%)]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-base font-medium text-gray-900 hover:text-[hsl(190,65%,35%)] transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-base font-medium text-gray-900">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  Form + Map row  */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* ── Contact Form ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-base font-bold uppercase tracking-[0.2em] text-[hsl(190,65%,35%)] mb-3">Enquiry Form</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Send Us a Message</h2>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center border border-gray-100 rounded-lg bg-gray-50">
                  <CheckCircle2 className="w-12 h-12 text-[hsl(190,65%,35%)] mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-base mb-6">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[hsl(190,65%,35%)] text-base font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full Name" required>
                      <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="John Doe" />
                    </Field>
                    <Field label="Email Address" required>
                      <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="john@example.com" />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Phone Number">
                      <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+91 XXXXX XXXXX" />
                    </Field>
                    <Field label="Product Category" required>
                      <div className="relative">
                        <select
                          id="category"
                          required
                          value={selectedCategory}
                          onChange={(e) => { setSelectedCategory(e.target.value); setSelectedProduct(''); }}
                          className={`${inputClass} appearance-none pr-9`}
                        >
                          <option value="" disabled>Select category</option>
                          {Object.keys(productCategories).map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </Field>
                  </div>

                  {selectedCategory && (
                    <Field label="Select Product" required>
                      <div className="relative">
                        <select
                          id="product"
                          required
                          value={selectedSubProduct || selectedProduct}
                          onChange={(e) => setSelectedProduct(e.target.value)}
                          className={`${inputClass} appearance-none pr-9`}
                        >
                          <option value="" disabled>Select a product</option>
                          {productCategories[selectedCategory]?.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </Field>
                  )}

                  <Field label="Message" required>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                      placeholder="Describe your requirements..."
                    />
                  </Field>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[hsl(190,65%,35%)] hover:bg-[hsl(190,65%,30%)] disabled:opacity-60 text-white font-semibold text-base rounded-md transition-colors duration-150 shadow-sm"
                  >
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </motion.div>

            {/* ── Info panel ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-6"
            >
              <div>
                <p className="text-base font-bold uppercase tracking-[0.2em] text-[hsl(190,65%,35%)] mb-3">Head Office</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Main Location</h2>
              </div>

              {/* Map embed */}
              <div className="rounded-lg overflow-hidden border border-gray-200 aspect-video shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3812.1541677307946!2d78.46004610987043!3d17.16271010917248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbbb003c02e303%3A0xa1faa9ba44030e3f!2sSVR%20Poultry%20Equipments%20(unit-2)!5e0!3m2!1sen!2sin!4v1780564866710!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SVR Poultry Equipments Location"
                />
              </div>

              {/* Contact details */}
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: MapPin, title: 'Address', text: 'Turkayamjal Municipality, Hyderabad, Telangana 501510, India' },
                  { icon: Phone,  title: 'Phone',   text: '+91 88866 45122', href: 'tel:+918886645122' },
                  { icon: Mail,   title: 'Email',   text: 'svrpoultryequipments@gmail.com', href: 'mailto:svrpoultryequipments@gmail.com' },
                  { icon: Clock,  title: 'Hours',   text: 'Monday – Saturday: 9:00 AM – 6:00 PM' },
                ].map((d) => (
                  <div key={d.title} className="flex gap-3.5 p-4 border border-gray-100 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-[#1F8093]/10 flex items-center justify-center mt-0.5">
                      <d.icon className="w-4 h-4 text-[hsl(190,65%,35%)]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400 mb-1">{d.title}</p>
                      {(d as any).href ? (
                        <a href={(d as any).href} className="text-base text-gray-700 hover:text-[hsl(190,65%,35%)] transition-colors font-medium">
                          {d.text}
                        </a>
                      ) : (
                        <p className="text-base text-gray-700 leading-snug">{d.text}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/*  Locations Section  */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-base font-bold uppercase tracking-[0.2em] text-[hsl(190,65%,35%)] mb-2">Our Offices</p>
              <h2 className="text-2xl font-bold text-gray-900">Visit Our Locations</h2>
            </div>
            {/* Prev/Next */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentSlide((p) => Math.max(p - 1, 0))}
                disabled={currentSlide === 0}
                className="w-9 h-9 rounded-md border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentSlide((p) => Math.min(p + 1, slides.length - 1))}
                disabled={currentSlide === slides.length - 1}
                className="w-9 h-9 rounded-md border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-400 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, si) => (
                <div key={si} className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                  {slide.map((loc, i) => (
                    <motion.div
                      key={loc.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.08 }}
                      className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
                    >
                      {/* Image */}
                      <div className="aspect-video overflow-hidden bg-gray-100">
                        <img
                          src={loc.image}
                          alt={loc.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                          loading="lazy"
                        />
                      </div>
                      {/* Content */}
                      <div className="p-5">
                        <div className="mb-3">
                          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[hsl(190,65%,35%)] mb-0.5">{loc.subtitle}</p>
                          <h3 className="font-semibold text-gray-900 text-lg">{loc.title}</h3>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-start gap-2 text-base text-gray-500">
                            <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gray-400" />
                            {loc.address}
                          </div>
                          <div className="flex items-center gap-2 text-base text-gray-500">
                            <Phone className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                            {loc.phone}
                          </div>
                        </div>
                        <button
                          onClick={() => loc.mapUrl ? window.open(loc.mapUrl, '_blank') : setShowPopup(true)}
                          className="inline-flex items-center gap-1.5 text-base font-semibold text-[hsl(190,65%,35%)] hover:gap-2 transition-all duration-150"
                        >
                          {loc.mapUrl ? (
                            <><ExternalLink className="w-3.5 h-3.5" /> View on Map</>
                          ) : (
                            <><MapPin className="w-3.5 h-3.5" /> Get Directions</>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Slide dots */}
          <div className="flex justify-center gap-2 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  currentSlide === i ? 'w-6 bg-[hsl(190,65%,35%)]' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/*  Under Construction Modal  */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-sm w-full text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">🚧</span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Coming Soon</h3>
            <p className="text-gray-500 text-base mb-6 leading-relaxed">
              This location's map is under development. Please call us for directions.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="px-6 py-2.5 bg-[hsl(190,65%,35%)] text-white text-base font-semibold rounded-md hover:bg-[hsl(190,65%,30%)] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
