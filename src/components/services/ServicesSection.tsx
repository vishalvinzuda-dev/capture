import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Palette,
  Printer,
  Globe,
  CodeXml,
  Megaphone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Plus
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/content';
import { ServiceItem } from '../../types';

interface ServicesSectionProps {
  onOpenInquiry: (service?: string) => void;
}

const iconComponents: Record<string, React.ElementType> = {
  Compass,
  Palette,
  Printer,
  Globe,
  CodeXml,
  Megaphone,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenInquiry }) => {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="relative py-24 bg-[#FAFAF9] overflow-hidden">
      {/* Background Subtle Lines */}
      <div className="absolute inset-0 bg-dot-subtle opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-neutral-200/80 pb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight font-display">
              WE DON'T JUST CREATE.<br />
              <span className="text-outline-dark">WE SOLVE.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-neutral-600 max-w-sm font-subheading">
            End-to-end creative and technology capabilities engineered to take your business from initial identity to scalable enterprise platform.
          </p>
        </div>

        {/* 6 Core Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, idx) => {
            const Icon = iconComponents[service.iconName] || Sparkles;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative bg-white border border-neutral-200/90 rounded-2xl p-7 shadow-xs hover:shadow-xl hover:border-neutral-400/80 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Row: Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-neutral-900 font-display mb-2 group-hover:text-[#D97706] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-neutral-700 mb-3">
                    {service.tagline}
                  </p>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables Bullet List */}
                  <div className="space-y-2 pt-2 border-t border-neutral-100">
                    <p className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider">Key Capabilities:</p>
                    <ul className="space-y-1.5">
                      {service.deliverables.slice(0, 4).map((item) => (
                        <li key={item} className="flex items-center text-xs text-neutral-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] mr-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                      {service.deliverables.length > 4 && (
                        <li className="text-[11px] text-neutral-400 pl-5">
                          + {service.deliverables.length - 4} additional specializations
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveService(service)}
                    className="text-xs font-semibold text-neutral-900 hover:text-[#D97706] flex items-center space-x-1 transition-colors"
                  >
                    <span>View Specifications</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenInquiry(service.title)}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-900 hover:text-white rounded-lg text-xs font-medium text-neutral-700 transition-colors"
                  >
                    Inquire
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section Contextual CTA Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl bg-white border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-900 font-display">
                Need one of these services or a combined bundle?
              </p>
              <p className="text-xs text-neutral-500">
                We handle design, print, web and software simultaneously under a single project manager.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenInquiry()}
            className="w-full sm:w-auto px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold tracking-wider flex items-center justify-center space-x-2 transition-all shrink-0"
          >
            <span>GET A TAILORED QUOTE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>

      {/* Deep Dive Specification Modal */}
      <AnimatePresence>
        {activeService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveService(null)}
              className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white border border-neutral-200 rounded-2xl shadow-2xl p-6 sm:p-8 z-10"
            >
              <div className="flex items-start justify-between border-b border-neutral-100 pb-5 mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-md bg-amber-50 text-[#B45309] border border-amber-200 font-medium">
                    {activeService.category}
                  </span>
                  <h3 className="text-2xl font-bold text-neutral-900 font-display mt-2">
                    {activeService.title}
                  </h3>
                  <p className="text-xs font-medium text-neutral-600 mt-1">
                    {activeService.tagline}
                  </p>
                </div>
                <button
                  onClick={() => setActiveService(null)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
                >
                  <Plus className="w-5 h-5 rotate-45" />
                </button>
              </div>

              <div className="space-y-4 text-xs text-neutral-600 leading-relaxed">
                <p>{activeService.description}</p>
                
                <div className="pt-3">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">
                    Included Capabilities & Deliverables:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeService.deliverables.map((item) => (
                      <div key={item} className="flex items-center p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
                        <CheckCircle2 className="w-4 h-4 text-[#D97706] mr-2 shrink-0" />
                        <span className="font-medium text-neutral-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-neutral-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveService(null)}
                  className="px-4 py-2.5 text-neutral-600 hover:text-neutral-900 text-xs font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = activeService.title;
                    setActiveService(null);
                    onOpenInquiry(title);
                  }}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center space-x-2"
                >
                  <span>Inquire for {activeService.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
