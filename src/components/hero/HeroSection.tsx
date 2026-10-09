import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Layers, ShieldCheck, Code, Printer, Palette } from 'lucide-react';
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
      
      {/* Soft Ambient Light Gradient Orbs (Light Mode Sophisticated) */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-blue-100/40 via-indigo-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-gradient-to-bl from-sky-100/30 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            {/* Minimal Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 shadow-2xs"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              <span className="text-[11px] font-semibold tracking-wide text-neutral-800">
                {COMPANY_INFO.heroTagline}
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">EST. 2025</span>
            </motion.div>

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
              className="text-base sm:text-lg font-medium text-neutral-800 leading-snug max-w-xl"
            >
              {COMPANY_INFO.subheadline}
            </motion.p>

            {/* Short Narrative Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm text-neutral-600 leading-relaxed max-w-lg"
            >
              {COMPANY_INFO.description}
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

            {/* Pillar Badges Ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="pt-4 flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-500"
            >
              <span className="text-[11px] uppercase tracking-wider text-neutral-400">Core Pillars:</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-700 text-[11px]">
                <Palette className="w-3 h-3 mr-1 text-blue-600" /> Branding & Design
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-700 text-[11px]">
                <Printer className="w-3 h-3 mr-1 text-indigo-600" /> Print Production
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-700 text-[11px]">
                <Code className="w-3 h-3 mr-1 text-sky-600" /> Custom Software & Web
              </span>
            </motion.div>
          </div>

          {/* Right Column: 3D Canvas + Floating Architectural Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Interactive Three.js Wireframe Canvas */}
            <div className="w-full relative z-10 flex items-center justify-center">
              <Hero3DCanvas />
            </div>

            {/* Floating Glassmorphic Mini Metric Badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute -top-4 right-2 sm:right-4 z-20 glass-card px-4 py-2.5 rounded-xl flex items-center space-x-3 shadow-md border-neutral-200/80 animate-float-gentle"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase text-neutral-400">Integrated Partner</p>
                <p className="text-xs font-bold text-neutral-900 font-display">Brand to Business</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="absolute -bottom-4 left-2 sm:left-4 z-20 glass-card px-4 py-2.5 rounded-xl flex items-center space-x-3 shadow-md border-neutral-200/80"
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase text-neutral-400">Enterprise Solutions</p>
                <p className="text-xs font-bold text-neutral-900 font-display">ERP & Custom Tech</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
