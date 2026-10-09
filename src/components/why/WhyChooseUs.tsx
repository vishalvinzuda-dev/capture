import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Layers,
  Sparkles,
  Workflow,
  Zap,
  CheckCircle2,
  Compass,
  Orbit,
} from 'lucide-react';
import RadialOrbitalTimeline, {
  TimelineItem,
} from '../ui/radial-orbital-timeline';
import { WHY_CHOOSE_US } from '../../data/content';

const WHY_US_ORBITAL_DATA: TimelineItem[] = [
  {
    id: 1,
    title: '01. One-Stop Solution',
    date: 'Integrated',
    content:
      'Creative, printing, and technology services under one roof. No more coordinating between 5 disconnected freelancers and agencies.',
    category: 'Integration',
    icon: Layers,
    relatedIds: [2, 3],
    status: 'completed',
    energy: 100,
  },
  {
    id: 2,
    title: '02. Custom Architecture',
    date: 'Bespoke',
    content:
      'Every solution is architected around your specific business reality, operational workflows, and commercial targets.',
    category: 'Strategy',
    icon: Sparkles,
    relatedIds: [1, 4],
    status: 'completed',
    energy: 95,
  },
  {
    id: 3,
    title: '03. Creative + Tech',
    date: 'Engineered',
    content:
      'Design thinking seamlessly combined with high-grade software engineering, modern web stacks, and production expertise.',
    category: 'Engineering',
    icon: Workflow,
    relatedIds: [1, 5],
    status: 'completed',
    energy: 92,
  },
  {
    id: 4,
    title: '04. Business-First',
    date: 'ROI Driven',
    content:
      'We focus on solving actual operational bottlenecks and generating measurable ROI, not just making aesthetic surfaces.',
    category: 'Commercial',
    icon: Zap,
    relatedIds: [2, 6],
    status: 'completed',
    energy: 88,
  },
  {
    id: 5,
    title: '05. Full Execution',
    date: 'Turnkey',
    content:
      'From initial napkin sketches and paper stock selection to cloud server deployment and long-term evolutionary support.',
    category: 'Production',
    icon: CheckCircle2,
    relatedIds: [3, 6],
    status: 'completed',
    energy: 85,
  },
  {
    id: 6,
    title: '06. Strategic Partner',
    date: 'Compounding',
    content:
      'We build lasting strategic relationships as your dedicated in-house creative and technological growth arm.',
    category: 'Growth',
    icon: Compass,
    relatedIds: [4, 5],
    status: 'completed',
    energy: 98,
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="relative py-24 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-semibold mb-4">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>The Strategic Rationale</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-tight font-display">
            Less chasing.<br />
            <span className="text-neutral-400">More clarity.</span>
          </h2>

          <p className="mt-4 text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
            We are built from the ground up for founders, business owners, and corporate leaders who demand commercial precision, design excellence, and zero technical friction.
          </p>
        </div>

        {/* 3D Radial Orbital Timeline — Light Mode Interactive System */}
        <div className="mb-16">
          <div className="mb-4 flex items-center justify-between text-xs text-neutral-500 font-mono px-2">
            <div className="flex items-center space-x-2">
              <Orbit className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '14s' }} />
              <span className="font-semibold text-neutral-700">Interactive 6-Pillar Radial Orbit</span>
            </div>
            <span className="hidden sm:inline-block text-neutral-400">
              Click any node to inspect connected capabilities
            </span>
          </div>

          <div className="rounded-3xl overflow-hidden border border-neutral-200 shadow-lg shadow-neutral-200/40 bg-[#FAFAF9]">
            <RadialOrbitalTimeline
              timelineData={WHY_US_ORBITAL_DATA}
              theme="light"
            />
          </div>
        </div>

        {/* 6 Editorial Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-8 rounded-2xl bg-[#FAFAF9] border border-neutral-200/80 hover:border-neutral-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="text-2xl font-black font-mono text-neutral-300 group-hover:text-blue-600 transition-colors">
                  {item.number}
                </span>

                <h3 className="text-lg font-bold text-neutral-900 font-display mt-4 mb-3 tracking-wide">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-200/60 flex items-center text-[11px] font-mono text-neutral-400">
                <span>Capture Creatives Standard</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

