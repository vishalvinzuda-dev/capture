import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { COMPANY_INFO } from '../../data/content';

interface HeroSectionProps {
  onOpenInquiry: (service?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenInquiry }) => {
  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#FAFAF9]">
      {/* Background Architectural Grid & Subtle Radial Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      
      {/* Soft Ambient Light Gradient Orbs (Sophisticated Amber/Gold Glow) */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-amber-200/35 via-amber-100/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-gradient-to-bl from-amber-300/20 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Full-Bleed 3D Object Background Layer - Freed from grid bounds with zero edge clipping */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-end overflow-hidden">
        <div className="w-full lg:w-[62vw] xl:w-[58vw] h-full flex items-center justify-center lg:translate-x-12 xl:translate-x-16">
          <Hero3DCanvas />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-neutral-900 leading-[1.06] font-display">
                We turn ideas <br className="hidden sm:inline" />
                into <span className="text-outline-dark">experiences.</span>
              </h1>
            </motion.div>

            {/* Supporting Headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-neutral-800 leading-relaxed max-w-xl"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
            >
              {COMPANY_INFO.subheadline}
            </motion.p>

            {/* Dual CTAs & Trust Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
            >
              <button
                onClick={() => onOpenInquiry()}
                className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold tracking-wider flex items-center justify-center space-x-2.5 shadow-md hover:shadow-lg transition-all"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToWork}
                className="px-6 py-3.5 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 rounded-xl text-xs font-semibold tracking-wider flex items-center justify-center space-x-2 transition-all shadow-2xs hover:border-neutral-300"
              >
                <span>EXPLORE OUR WORK</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Grid Space Preserved */}
          <div className="lg:col-span-5 hidden lg:block pointer-events-none" aria-hidden="true">
            <div className="w-full min-h-[500px] lg:min-h-[640px]" />
          </div>

        </div>
      </div>
    </section>
  );
};
