import { motion } from 'framer-motion';

const items = [
  '40+ Years of Engineering Excellence',
  'Serving 500+ Clients Pan-India',
  'Exporting to 20+ Countries',
  'ISO-Certified Manufacturing Processes',
  'Complete Turnkey Poultry Solutions',
  'End-to-End Installation & Support',
];

const TextCarousel = () => {
  const doubled = [...items, ...items];

  return (
    <div className="bg-[hsl(190,65%,35%)] py-2.5 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-0 text-white text-[12px] font-semibold uppercase tracking-[0.12em] px-10 flex-shrink-0"
          >
            {item}
            <span className="ml-10 w-1 h-1 rounded-full bg-white/40 inline-block" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default TextCarousel;
