import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

//  Timeline data 
const events = [
  { year: 1984, title: 'Founded', subtitle: 'Sri Venkata Ramana Engineering Works', description: 'Started as a general engineering firm in Hyderabad, building the foundational expertise that would define four decades of excellence.', phase: 'Origins' },
  { year: 1990, title: 'First Steps in Poultry', subtitle: 'Entering the Industry', description: 'Manufactured our first poultry-specific equipment — small-scale feeders and drinkers — marking a decisive pivot into agri-equipment.', phase: 'Origins' },
  { year: 1995, title: 'Manufacturing Scale-Up', subtitle: 'Expanded Capabilities', description: 'Introduced semi-automated feeding systems and significantly expanded fabrication capacity to meet growing demand.', phase: 'Origins' },
  { year: 2000, title: 'SVR Poultry Emerged', subtitle: 'New Identity, New Focus', description: 'Incorporated as SVR Poultry Equipment Manufacturing — a dedicated brand focused entirely on poultry automation solutions.', phase: 'Growth' },
  { year: 2005, title: 'Full Automation', subtitle: 'Industry Transformation', description: 'Launched fully automated feeding and watering systems that transformed how poultry farms across India operate.', phase: 'Growth' },
  { year: 2010, title: 'Auger Systems', subtitle: 'Innovation in Feed Tech', description: 'Pioneered auger-based feeding systems for broiler and layer farms, setting new efficiency benchmarks for the industry.', phase: 'Growth' },
  { year: 2015, title: 'Official Incorporation', subtitle: 'January 24th', description: 'SVR Poultry Equipments officially incorporated, establishing a formal corporate structure to support rapid expansion.', phase: 'Leadership' },
  { year: 2020, title: 'Full Product Portfolio', subtitle: 'End-to-End Solutions', description: 'Completed our product ecosystem: Auto Feeders, Auger Systems, Bulk Feeders, Silos, and complete Feed Mill Plants.', phase: 'Leadership' },
  { year: 2025, title: 'Pan-India & Global', subtitle: '500+ Clients, 20+ Countries', description: 'Serving 500+ clients across India and exporting to Africa, the Middle East, and South Asia — a true global manufacturer.', phase: 'Leadership' },
];

const phaseColors: Record<string, string> = {
  Origins:    'hsl(4,82%,42%)',
  Growth:     'hsl(218,60%,52%)',
  Leadership: 'hsl(38,85%,50%)',
};

//  Event column 
const EventColumn = ({
  event,
  index,
  isCardActive,
  onCardClick,
}: {
  event: typeof events[0];
  index: number;
  isCardActive: boolean;
  onCardClick: (i: number) => void;
}) => {
  const color = phaseColors[event.phase];

  return (
    <div 
      className="flex flex-col items-center w-[340px] shrink-0 relative snap-center cursor-pointer group px-4 pb-8 pt-2"
      onClick={() => onCardClick(index)}
    >
      {/* Dot aligned on the line */}
      <div className="h-12 flex items-center justify-center z-10 mb-6 w-full relative">
        {/* Outer white circle to cut the line */}
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 z-10 transition-transform duration-300"
             style={{ transform: isCardActive ? 'scale(1.1)' : 'scale(1)' }}>
          {/* Inner dot */}
          <div 
            className="w-3.5 h-3.5 rounded-full transition-colors duration-300"
            style={{ backgroundColor: isCardActive ? color : '#d1d5db' }}
          />
        </div>
      </div>

      {/* Card below the dot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <div
          className={`p-6 rounded-2xl bg-white transition-all duration-300 ${
            isCardActive
              ? 'shadow-xl shadow-gray-200/50 border border-gray-200 scale-[1.02]'
              : 'shadow-sm border border-gray-100 opacity-80 hover:opacity-100 hover:shadow-md'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <p
              className="text-4xl font-black tabular-nums leading-none transition-colors duration-300"
              style={{ color: isCardActive ? color : '#9ca3af' }}
            >
              {event.year}
            </p>
            <span
              className="text-[9px] font-extrabold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full transition-colors duration-300"
              style={{ 
                background: isCardActive ? `${color}18` : '#f3f4f6',
                color: isCardActive ? color : '#9ca3af'
              }}
            >
              {event.phase}
            </span>
          </div>

          <h3 className="text-[17px] font-bold text-gray-900 mb-1.5 leading-snug">
            {event.title}
          </h3>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
            {event.subtitle}
          </p>

          <p className="text-base text-gray-500 leading-relaxed">
            {event.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

//  Main component 
const SVRTimelineInnovation = () => {
  const [activeCard, setActiveCard] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);

  // Auto-advance timeline
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % events.length);
    }, 2000); // Changes every 4 seconds
    return () => clearInterval(timer);
  }, []);

  // Scroll to active card when it changes
  useEffect(() => {
    if (innerContainerRef.current && scrollContainerRef.current) {
      // +1 to account for the absolute line div being the first child
      const activeChild = innerContainerRef.current.children[activeCard + 1] as HTMLElement;
      if (activeChild) {
        // Because the scroll container has exact padding of calc(50% - 170px),
        // scrolling exactly to the child's offsetLeft perfectly centers it on screen.
        scrollContainerRef.current.scrollTo({ 
          left: activeChild.offsetLeft, 
          behavior: 'smooth' 
        });
      }
    }
  }, [activeCard]);

  const handleCardClick = (i: number) => {
    setActiveCard(i);
  };

  return (
    <section className="py-10 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-base font-bold uppercase tracking-[0.22em] text-[hsl(4,82%,42%)] mb-3">
            Our Journey
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">
            Four Decades of<br className="hidden sm:block" /> Engineering Excellence
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            From a small engineering workshop in 1984 to a global poultry equipment manufacturer — this is our story.
          </p>
        </motion.div>

        {/* ── Horizontal Timeline ── */}
        <div className="relative w-full mt-10">
          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto snap-x snap-mandatory pb-12 pt-4 px-[calc(50%-170px)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* Inner Container to hold full width so line stretches properly */}
            <div ref={innerContainerRef} className="flex items-start relative w-max min-w-full">
              {/* Continuous Background Line - positioned exactly in middle of the 48px (h-12) dots */}
              {/* pt-2 on EventColumn is 8px. Half of h-12 is 24px. Total top = 32px */}
              <div className="absolute left-[-100vw] right-[-100vw] top-[32px] h-[2px] bg-gray-200 z-0" />
              
              {events.map((event, i) => (
                <EventColumn
                  key={event.year}
                  event={event}
                  index={i}
                  isCardActive={activeCard === i}
                  onCardClick={handleCardClick}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center text-[10px] text-gray-400 uppercase tracking-widest sm:hidden -mt-4 mb-4">
            Swipe to explore
          </div>
        </div>

        {/* ── Bottom milestone strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 rounded-xl overflow-hidden border border-gray-200 max-w-4xl mx-auto"
        >
          {[
            { label: 'Year Founded',     value: '1984' },
            { label: 'Years of Legacy',  value: '40+'  },
            { label: 'Major Milestones', value: String(events.length) },
          ].map((item) => (
            <div key={item.label} className="bg-white py-7 text-center">
              <p className="text-2xl font-black text-[hsl(4,82%,42%)]">{item.value}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mt-1">{item.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default SVRTimelineInnovation;
