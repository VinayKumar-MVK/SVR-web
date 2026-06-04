import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top info bar */}
      <div className="hidden md:block bg-[#1a1a2e] text-white/70 text-xs py-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          <span>📍 Turkayamjal, Hyderabad, Telangana 501510</span>
          <div className="flex items-center gap-6">
            <span>📞 +91 88866 45122</span>
            <span>✉️ svrpoultryequipments@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? 'shadow-md border-b border-gray-200' : 'border-b border-gray-200'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo + wordmark */}
            <Link to="/" className="flex items-end gap-3 flex-shrink-0 pb-1.5">
              <img
                src="/logo.png"
                alt="SVR Logo"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  // Fallback to previous logo if logo.png doesn't exist
                  e.currentTarget.src = "/lovable-uploads/253837d0-59ba-46d9-8132-54cd4616acf9.png";
                }}
              />
              <div className="hidden sm:block">
                <span className="text-[18px] font-black text-[#1e293b] uppercase leading-none">
                  Poultry Equipments
                </span>
              </div>
            </Link>

            {/* Right side Nav & CTA */}
            <div className="hidden md:flex items-center gap-8">
              {/* Desktop nav */}
              <div className="flex items-center gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative px-4 py-2 text-[14px] font-medium transition-colors duration-150 ${isActive(item.path)
                      ? 'text-[hsl(4,82%,42%)]'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    {item.name}
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[hsl(4,82%,42%)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <Link
                to="/contact"
                id="nav-get-quote-btn"
                className="px-5 py-2.5 bg-[hsl(4,82%,42%)] text-white text-[13px] font-semibold rounded-md hover:bg-[hsl(4,82%,36%)] transition-colors duration-150 shadow-sm"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 -mr-2 text-gray-600 hover:text-gray-900"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="md:hidden border-t border-gray-100 bg-white"
            >
              <div className="px-4 py-3 space-y-0.5">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 text-[14px] font-medium rounded-md transition-colors ${isActive(item.path)
                      ? 'text-[hsl(4,82%,42%)] bg-red-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-3 pb-1">
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-2.5 bg-[hsl(4,82%,42%)] text-white text-[14px] font-semibold rounded-md"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navigation;
