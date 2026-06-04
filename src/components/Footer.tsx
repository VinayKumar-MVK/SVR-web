import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const quickLinks  = [
    { label: 'Home',       path: '/' },
    { label: 'About Us',   path: '/about' },
    { label: 'Products',   path: '/products' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const productLinks = [
    { label: 'Cage Systems',       path: '/products#cages' },
    { label: 'Feed Manufacturing', path: '/products#feedmanufacturing' },
    { label: 'Feed Storage',       path: '/products#feedstorage' },
    { label: 'Feed Transportation',path: '/products#feedtransportation' },
  ];

  const socials = [
    { icon: Instagram, href: 'https://instagram.com/svrpoultryequipments',                                              label: 'Instagram' },
    { icon: Linkedin,  href: 'https://www.linkedin.com/company/s-v-r-poultry-equipments/',                              label: 'LinkedIn' },
    { icon: Youtube,   href: 'https://youtube.com/@svrpoultryengineeringworks4116?si=CtTUdGuAeQ8Q_7_m',                  label: 'YouTube' },
  ];

  return (
    <footer className="bg-[#1a1a2e] text-white">
      {/* Red top accent */}
      <div className="h-[3px] bg-[hsl(4,82%,42%)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5 w-fit">
              <img
                src="/footer_logo.png"
                alt="SVR Poultry Equipments"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/svr_icon.png";
                }}
              />
              <div className="flex flex-col">
                <span className="font-black text-[18px] text-white leading-[1.1] tracking-wide">SVR Poultry</span>
                <span className="font-black text-[18px] text-white leading-[1.1] tracking-wide">Equipments</span>
              </div>
            </Link>
            <p className="text-white/50 text-[13px] leading-relaxed mb-6">
              India's most trusted poultry equipment manufacturer since 1984.
              Serving 500+ clients across India and 20+ countries worldwide.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-md bg-white/8 hover:bg-[hsl(4,82%,42%)] flex items-center justify-center text-white/50 hover:text-white transition-all duration-150"
                  style={{ background: 'rgba(255,255,255,0.07)' }}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40 mb-5">Quick Links</p>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.path}
                    className="text-white/55 hover:text-white text-[13px] transition-colors duration-150"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40 mb-5">Products</p>
            <ul className="space-y-3">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.path}
                    className="text-white/55 hover:text-white text-[13px] transition-colors duration-150"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40 mb-5">Contact</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[hsl(4,82%,55%)] flex-shrink-0 mt-0.5" />
                <p className="text-white/55 text-[13px] leading-relaxed">
                  Turkayamjal Municipality<br />
                  Hyderabad, Telangana 501510<br />
                  India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[hsl(4,82%,55%)] flex-shrink-0" />
                <a href="tel:+918886645122" className="text-white/55 hover:text-white text-[13px] transition-colors">
                  +91 88866 45122
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[hsl(4,82%,55%)] flex-shrink-0" />
                <a href="mailto:svrpoultryequipments@gmail.com" className="text-white/55 hover:text-white text-[13px] break-all transition-colors">
                  svrpoultryequipments@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-white/30 text-[12px]">© 2025 SVR Poultry Equipments. All rights reserved.</p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service'].map((t) => (
              <Link key={t} to="#" className="text-white/30 hover:text-white/60 text-[12px] transition-colors">
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
