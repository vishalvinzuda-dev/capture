import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/content';
import { GlobeWireframe } from '../ui/contact-with-globe';
import { ProjectInquiryWizard } from '../common/ProjectInquiryWizard';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="relative py-24 bg-[#FAFAF9] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-linear-to-b from-amber-500/5 via-amber-500/0 to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight font-display"
          >
            START THE CONVERSATION
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed font-subheading"
          >
            Tell us about your objectives, timeline, or business challenge. We respond promptly with actionable insights and strategic clarity.
          </motion.p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Studio Meta & Interactive Globe */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-xs space-y-6">
              
              {/* Heading */}
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 font-display">
                Capture Creatives Studio
              </h3>

              {/* Horizontal Line */}
              <hr className="border-neutral-200" />

              {/* Mail, Number, Address */}
              <div className="space-y-4">
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-start space-x-3.5 text-xs text-neutral-700 hover:text-neutral-900 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-neutral-400 uppercase">Direct Email</span>
                    <span className="font-semibold text-neutral-900 text-sm group-hover:underline">
                      {COMPANY_INFO.email}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-start space-x-3.5 text-xs text-neutral-700 hover:text-neutral-900 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-neutral-400 uppercase">Direct Phone</span>
                    <span className="font-semibold text-neutral-900 text-sm group-hover:underline">
                      {COMPANY_INFO.phone}
                    </span>
                  </div>
                </a>

                <div className="flex items-start space-x-3.5 text-xs text-neutral-700">
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-neutral-400 uppercase">Location & Studio</span>
                    <span className="font-semibold text-neutral-900 text-sm">{COMPANY_INFO.location}</span>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{COMPANY_INFO.address}</p>
                  </div>
                </div>
              </div>

              {/* Horizontal Line */}
              <hr className="border-neutral-200" />

              {/* Globe in white bg, black lines, no outlines or extra elements anywhere */}
              <div className="relative overflow-hidden h-64 sm:h-72 w-full bg-white flex items-center justify-center">
                <GlobeWireframe
                  className="w-full aspect-square max-w-full absolute inset-0 m-auto"
                  variant="wireframesolid"
                  initialRotation={[-70.8, -22.3]}
                  autoRotate={true}
                  autoRotateSpeed={0.2}
                  enableInteraction={true}
                  strokeWidth={0.8}
                  strokeColor="#000000"
                  sphereOutlineColor="#000000"
                  sphereOutlineWidth={1}
                  scale={1.05}
                  backgroundColor="#FFFFFF"
                  showBottomBlue={true}
                  bottomBlueHeight={0.33}
                  bottomBlueColor="#2563EB"
                  showWhiteOverlay={true}
                  whiteOverlayHeight={0.33}
                />
                {/* White overlay gradient covering from bottom to 1/3 height of globe */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-white via-white/85 to-transparent z-10" />
              </div>

            </div>

            {/* Operating Hours & Availability Status */}
            <div className="p-5 rounded-2xl bg-white border border-neutral-200 text-xs text-neutral-600 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium text-neutral-800">{COMPANY_INFO.availability}</span>
              </div>
              <span className="font-mono text-neutral-400 text-[11px]">Mon — Sat</span>
            </div>
          </div>

          {/* Right Column: Premium Elevated Inquiry Form with Step-by-Step Questionnaire */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-white border border-neutral-200/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] p-7 sm:p-9 lg:p-10 overflow-hidden">
              
              {/* Amber Accent Top Bar */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500/10 via-amber-500/70 to-amber-500/10" />
              
              {/* Ambient decorative glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 w-60 h-60 bg-amber-500/5 rounded-full blur-3xl" />

              {/* Shared Questionnaire Wizard */}
              <ProjectInquiryWizard isModal={false} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
