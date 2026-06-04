import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  era: string;
  description: string;
}

const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent | null>(null);

  const timelineEvents: TimelineEvent[] = [
    {
      year: "1984",
      title: "Engineering Foundations",
      era: "ERA 1: FOUNDATIONS",
      description: "Established as Sri Venkata Ramana Engineering Works, focusing on general engineering solutions."
    },
    {
      year: "1990",
      title: "Poultry Entry",
      era: "ERA 1: FOUNDATIONS",
      description: "Entered the poultry equipment industry, manufacturing small-scale feeders and drinkers."
    },
    {
      year: "1995",
      title: "Manufacturing Expansion",
      era: "ERA 1: FOUNDATIONS",
      description: "Expanded manufacturing capabilities to include manual and semi-automated feeding systems."
    },
    {
      year: "2000",
      title: "SVR Transformation",
      era: "ERA 2: THE AUTOMATION REVOLUTION",
      description: "Officially transitioned into SVR Poultry Equipment Manufacturing, specializing in poultry automation."
    },
    {
      year: "2005",
      title: "Full Automation",
      era: "ERA 2: THE AUTOMATION REVOLUTION",
      description: "Launched fully automated feeding and watering systems for poultry farms."
    },
    {
      year: "2010",
      title: "Auger Systems",
      era: "ERA 2: THE AUTOMATION REVOLUTION",
      description: "Developed auger-based automatic feeding systems, enhancing efficiency for poultry farmers."
    },
    {
      year: "2011",
      title: "Official Incorporation",
      era: "ERA 3: SCALING NEW HORIZONS",
      description: "SVR Poultry Equipments officially incorporated on January 24th."
    },
    {
      year: "2016",
      title: "National Presence",
      era: "ERA 3: SCALING NEW HORIZONS",
      description: "Achieved milestone of serving clients across India, solidifying market presence."
    },
    {
      year: "2017",
      title: "Global Expansion",
      era: "ERA 3: SCALING NEW HORIZONS",
      description: "Began exporting equipment to international markets, including Angola and Ghana."
    },
    {
      year: "2021",
      title: "MSME Recognition",
      era: "ERA 4: GLOBAL LEADERSHIP & THE FUTURE",
      description: "Recognized as a Micro Enterprise under MSME classification."
    },
    {
      year: "2024",
      title: "Continued Growth",
      era: "ERA 4: GLOBAL LEADERSHIP & THE FUTURE",
      description: "Further expansion into new global markets, strengthening exports and New Fabrication unit setup."
    },
    {
      year: "2025",
      title: "Future Innovation",
      era: "ERA 4: GLOBAL LEADERSHIP & THE FUTURE",
      description: "Expected: Launch of next-generation poultry automation systems and smart farm integration."
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">The SVR Journey of Innovation</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Over Four Decades of Engineering Excellence in Poultry Automation
          </p>
          <motion.div
            className="mx-auto mt-8 h-1 w-32 bg-gradient-to-r from-primary to-primary/50 rounded-full origin-left"
            initial={{ scaleX: 0, opacity: 0.5 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            viewport={{ once: false, amount: 0.2 }}
          />
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative overflow-x-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="min-w-max px-8">
            {/* Timeline Line */}
            <motion.div
              className="relative h-0.5 bg-gradient-to-r from-green-600 via-blue-500 to-purple-600 rounded-full mb-16"
              style={{ width: `${timelineEvents.length * 200}px` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewport={{ once: false, amount: 0.3 }}
            />

            {/* Timeline Events */}
            <div className="absolute top-0 left-8 right-8 flex justify-between" style={{ width: `${timelineEvents.length * 200}px` }}>
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: false, amount: 0.3 }}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className="w-6 h-6 bg-white border-4 border-primary rounded-full cursor-pointer shadow-lg z-10"
                    style={{ marginTop: '-12px' }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onHoverStart={() => setHoveredEvent(event)}
                    onHoverEnd={() => setHoveredEvent(null)}
                    onClick={() => setSelectedEvent(event)}
                  />

                  {/* Year Label (Below) */}
                  <div className="absolute top-6 text-center">
                    <span className="text-sm font-bold text-gray-800">{event.year}</span>
                  </div>

                  {/* Click Popup - Positioned above the dot */}
                  <AnimatePresence>
                    {selectedEvent === event && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                        className="absolute -top-80 left-1/2 transform -translate-x-1/2 z-30"
                      >
                        <div className="bg-gradient-to-br from-green-700 to-sky-400 text-white p-6 rounded-2xl shadow-2xl w-64 h-64 flex flex-col">
                          <div className="relative flex-1 text-center">
                            <button
                              onClick={() => setSelectedEvent(null)}
                              className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200"
                              title="Close"
                              aria-label="Close"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <span className="inline-block bg-white/20 text-sm font-medium px-3 py-1 rounded-full mb-3">
                              {event.era}
                            </span>
                            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                            <p className="text-lg mb-3 font-semibold">{event.year}</p>
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex-1">
                              <p className="text-sm leading-relaxed">{event.description}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
