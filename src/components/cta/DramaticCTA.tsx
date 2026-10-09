import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Sparkles, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../../data/content';

interface DramaticCTAProps {
  onOpenInquiry: (service?: string) => void;
}

export const DramaticCTA: React.FC<DramaticCTAProps> = ({ onOpenInquiry }) => {
  return (
    <section className="relative py-24 bg-white border-y border-neutral-200/80 overflow-hidden">
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 bg-dot-subtle opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-100/40 via-indigo-50/30 to-sky-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-semibold mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Launch Your Next Breakthrough</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-tight font-display"
        >
          HAVE AN IDEA?<br />
          <span className="text-blue-600">LET'S MAKE IT REAL.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed"
        >
          Whether you need a brand identity, website, campaign, printing solution or custom business software — let's build something that actually moves your business forward.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => onOpenInquiry()}
            className="w-full sm:w-auto px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold tracking-wider flex items-center justify-center space-x-2.5 shadow-lg hover:shadow-xl transition-all"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Capture%20Creatives!%20I%20would%20like%20to%20talk%20about%20a%20new%20project.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 rounded-xl text-xs font-bold tracking-wider flex items-center justify-center space-x-2 transition-all shadow-xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>TALK TO US ON WHATSAPP</span>
          </a>
        </motion.div>

        {/* Micro Guarantee Note */}
        <p className="mt-6 text-[11px] font-mono text-neutral-400">
          Direct founder consultation · Response within 24 hours · NDA upon request
        </p>

      </div>
    </section>
  );
};
