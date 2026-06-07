import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type MegaMenuType = {
  title: string;
  items: { name: string; path?: string; subItems?: { name: string; path: string }[] }[];
}[][];

const megaMenuData: MegaMenuType = [
  // Column 1
  [
    {
      title: 'Cage Systems',
      items: [
        { name: 'Chicks Cages', path: '/products/sub/1001' },
        { name: 'Layer Cages', path: '/products/sub/1002' },
        { name: 'Grower Cages', path: '/products/sub/1003' },
      ],
    },
    {
      title: 'Cage Accessories',
      items: [
        { name: 'Water Nipples', path: '/products/sub/1004' },
        { name: 'PVC/GI-Feeders', path: '/products/sub/1005' },
        { name: 'Distribution Pipes', path: '/products/sub/1006' },
      ],
    },
    {
      title: 'Weld Mesh',
      items: [
        { name: 'Weld Mesh Panels', path: '/products/sub/1007' },
        { name: 'Chain Link Fencing', path: '/products/sub/1008' },
      ],
    },
  ],
  // Column 2
  [
    {
      title: 'Feed Trolley',
      items: [
        { name: 'Rooter Feed Trolley', path: '/products/sub/2001' },
        { name: 'Garata Feed Trolley', path: '/products/sub/2002' },
      ],
    },
    {
      title: 'Feed Plants',
      items: [
        { name: 'Feed Manufacturing Plants', path: '/products/sub/2003' },
        { name: 'Full Screen Grinder', path: '/products/sub/2004' },
        { name: 'Precision Weighing Bins', path: '/products/sub/2005' },
        { name: 'Feed Mixers', path: '/products/sub/2006' },
      ],
    },
    {
      title: 'Auto Batching',
      items: [
        { name: 'Auto Batching Systems', path: '/products/manufacturing/203' },
      ],
    },
  ],
  // Column 3
  [
    {
      title: 'Feed Storage',
      items: [
        { name: 'Flat Bottom Silos', path: '/products/storage/301' },
        { name: 'Hopper Bottom Silos', path: '/products/storage/302' },
      ],
    },
  ],
  // Column 4
  [
    {
      title: 'Feed Transportation',
      items: [
        { name: 'Tractor Tanker', path: '/products/transportation/401' },
        { name: 'Bulk Feeding Tanker', path: '/products/transportation/402' },
      ],
    },
  ],
];

const navItems = [
  { 
    name: 'Home', 
    path: '/', 
    hasDropdown: false, 
  },
  { 
    name: 'About', 
    path: '/about', 
    hasDropdown: false, 
  },
  { 
    name: 'Products', 
    path: '/products', 
    hasDropdown: true, 
    dropdownType: 'mega' 
  },
  { 
    name: 'Contact', 
    path: '/contact', 
    hasDropdown: false, 
  },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path || (path === '/products' && location.pathname.startsWith('/products'));

  let dropdownTimeout: NodeJS.Timeout;

  const handleMouseEnter = (name: string) => {
    clearTimeout(dropdownTimeout);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <>
      {/* Top info bar */}
      <div className="hidden md:block bg-[#0B1B21] text-white/70 text-base py-2">
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
            <div className="hidden md:flex items-center gap-8 h-full">
              {/* Desktop nav */}
              <div className="flex items-center gap-2 h-full">
                {navItems.map((item) => (
                  <div
                    key={item.name}
                    className={`${item.dropdownType === 'mega' ? '' : 'relative '}flex items-center h-full`}
                    onMouseEnter={item.hasDropdown ? () => handleMouseEnter(item.name) : undefined}
                    onMouseLeave={item.hasDropdown ? handleMouseLeave : undefined}
                  >
                    <Link
                      to={item.path}
                      className={`relative px-4 py-2 text-base font-medium transition-colors duration-150 flex items-center gap-1 ${isActive(item.path)
                        ? 'text-[hsl(190,65%,35%)]'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      {item.name}
                      {item.hasDropdown && (
                        <ChevronDown className="w-4 h-4 ml-0.5" />
                      )}
                      {isActive(item.path) && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[hsl(190,65%,35%)]"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                    </Link>

                    {/* Mega Menu Dropdown */}
                    {item.dropdownType === 'mega' && activeDropdown === item.name && (
                      <div className="absolute top-[72px] left-1/2 -translate-x-1/2 w-max pt-2 z-50">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="bg-white border border-gray-100 shadow-xl rounded-xl overflow-x-auto flex gap-6 lg:gap-8 p-6 lg:p-8 max-w-[95vw] custom-scrollbar"
                          style={{ width: 'max-content', minWidth: 'min(1000px, 95vw)' }}
                        >
                          {megaMenuData.map((column, colIdx) => (
                            <div key={colIdx} className="flex-1 flex flex-col gap-8">
                              {column.map((section, secIdx) => (
                                <div key={secIdx} className="flex flex-col relative">
                                  {secIdx > 0 && (
                                    <div className="absolute -top-4 left-0 w-full h-[1px] bg-gray-100" />
                                  )}
                                  <h3 className="text-[hsl(190,65%,35%)] font-semibold mb-3 text-base">
                                    {section.title}
                                  </h3>
                                  <ul className="space-y-1">
                                    {section.items.map((listItem, itemIdx) => (
                                      <li key={itemIdx} className="text-sm">
                                        {listItem.path ? (
                                          <Link
                                            to={listItem.path}
                                            className="text-gray-600 hover:text-[hsl(190,65%,35%)] hover:bg-[#1F8093]/10 rounded-md px-2 py-1.5 -ml-2 transition-colors flex items-start"
                                          >
                                            <span className="mr-2 text-gray-400 mt-[2px] text-[10px]">○</span>
                                            <span className="flex-1">{listItem.name}</span>
                                          </Link>
                                        ) : (
                                          <div className="text-gray-600 px-2 py-1.5 -ml-2 flex items-start">
                                            <span className="mr-2 text-gray-400 mt-[2px] text-[10px]">○</span>
                                            <span className="flex-1">{listItem.name}</span>
                                          </div>
                                        )}

                                        {listItem.subItems && (
                                          <ul className="ml-4 mt-1 space-y-1 mb-2">
                                            {listItem.subItems.map((subItem, subIdx) => (
                                              <li key={subIdx}>
                                                <Link
                                                  to={subItem.path || '#'}
                                                  className="text-gray-500 hover:text-[hsl(190,65%,35%)] hover:bg-[#1F8093]/10 rounded-md px-2 py-1.5 -ml-2 transition-colors flex items-start text-sm"
                                                >
                                                  <span className="mr-2 text-gray-400 mt-[2px] text-[10px]">○</span>
                                                  <span className="flex-1">{subItem.name}</span>
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          ))}
                        </motion.div>
                      </div>
                    )}


                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                to="/contact"
                id="nav-get-quote-btn"
                className="px-5 py-2.5 bg-[hsl(190,65%,35%)] text-white text-base font-semibold rounded-md hover:bg-[hsl(190,65%,30%)] transition-colors duration-150 shadow-sm"
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
              className="md:hidden border-t border-gray-100 bg-white shadow-lg absolute w-full left-0"
            >
              <div className="px-4 py-3 space-y-0.5 max-h-[80vh] overflow-y-auto">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.path}
                      onClick={() => !item.hasDropdown && setIsOpen(false)}
                      className={`block px-3 py-2.5 text-base font-medium rounded-md transition-colors ${isActive(item.path)
                        ? 'text-[hsl(190,65%,35%)] bg-[#1F8093]/10'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        {item.name}
                        {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                      </div>
                    </Link>
                    {item.dropdownType === 'mega' && (
                      <div className="pl-6 pr-3 py-2 space-y-4 bg-gray-50 rounded-md mt-1 mb-2">
                        {megaMenuData.map((column, colIdx) => (
                          <div key={colIdx} className="space-y-4">
                            {column.map((section, secIdx) => (
                              <div key={secIdx}>
                                <h4 className="text-[hsl(190,65%,35%)] font-semibold text-sm mb-2">{section.title}</h4>
                                <ul className="space-y-2">
                                  {section.items.map((listItem, itemIdx) => (
                                    <li key={itemIdx} className="text-sm">
                                      {listItem.path ? (
                                        <Link
                                          to={listItem.path}
                                          onClick={() => setIsOpen(false)}
                                          className="text-gray-600 hover:text-[hsl(190,65%,35%)] block py-1"
                                        >
                                          • {listItem.name}
                                        </Link>
                                      ) : (
                                        <span className="text-gray-800 font-medium py-1 block">
                                          • {listItem.name}
                                        </span>
                                      )}
                                      {listItem.subItems && (
                                        <ul className="pl-4 mt-2 space-y-2 border-l border-gray-200 ml-1">
                                          {listItem.subItems.map((subItem, subIdx) => (
                                            <li key={subIdx}>
                                              <Link
                                                to={subItem.path || '#'}
                                                onClick={() => setIsOpen(false)}
                                                className="text-gray-500 hover:text-[hsl(190,65%,35%)] block py-1 text-sm"
                                              >
                                                - {subItem.name}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-3 pb-1 mt-4 border-t border-gray-100">
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-[hsl(190,65%,35%)] text-white text-base font-semibold rounded-md shadow-sm"
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
