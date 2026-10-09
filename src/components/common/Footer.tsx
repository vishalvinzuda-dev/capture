import React from 'react';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';
import { COMPANY_INFO } from '../../data/content';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-neutral-200/90 pt-16 pb-12 text-neutral-600 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-neutral-100">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                CC
              </div>
              <span className="text-lg font-bold text-neutral-900 font-display tracking-tight">
                Capture Creatives
              </span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-800">
              {COMPANY_INFO.tagline}
            </p>

            <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
              End-to-end creative design, corporate printing, high-performance websites and bespoke business software platforms founded in 2025.
            </p>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              Capabilities
            </p>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#services" className="text-neutral-600 hover:text-neutral-950 transition-colors">Brand Identity & Strategy</a></li>
              <li><a href="#services" className="text-neutral-600 hover:text-neutral-950 transition-colors">Graphic Design & Collaterals</a></li>
              <li><a href="#services" className="text-neutral-600 hover:text-neutral-950 transition-colors">Corporate Printing Solutions</a></li>
              <li><a href="#services" className="text-neutral-600 hover:text-neutral-950 transition-colors">Web Development & UI/UX</a></li>
              <li><a href="#case-study" className="text-neutral-600 hover:text-neutral-950 transition-colors">Custom Software & ERP</a></li>
              <li><a href="#services" className="text-neutral-600 hover:text-neutral-950 transition-colors">Digital Marketing & Campaigns</a></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              Studio & Philosophy
            </p>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#difference" className="text-neutral-600 hover:text-neutral-950 transition-colors">The Unified Advantage</a></li>
              <li><a href="#case-study" className="text-neutral-600 hover:text-neutral-950 transition-colors">Prabhu Group Case Study</a></li>
              <li><a href="#why-us" className="text-neutral-600 hover:text-neutral-950 transition-colors">Why Businesses Choose CC</a></li>
              <li><a href="#impact" className="text-neutral-600 hover:text-neutral-950 transition-colors">Community & 10% Pledge</a></li>
              <li><a href="#contact" className="text-neutral-600 hover:text-neutral-950 transition-colors">Start Project Inquiry</a></li>
            </ul>
          </div>
        </div>

        {/* Giant Editorial Brand Banner */}
        <div className="py-12 border-b border-neutral-100 flex items-center justify-center">
          <h2 className="text-7xl sm:text-9xl md:text-[11rem] font-extrabold tracking-tighter text-neutral-900 font-display select-none leading-none">
            capture<span className="text-sky-500">.</span>
          </h2>
        </div>

        {/* Bottom Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} Capture Creatives. All rights reserved.
          </div>

          <div className="flex items-center space-x-6 text-[11px] font-mono">
            <span>Rajkot · Gujarat · India</span>
            <span>Est. 2025</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors flex items-center space-x-1.5"
            aria-label="Scroll to top"
          >
            <span className="text-[11px] font-medium">Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
