import React from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Workflow,
  Sparkles,
  RefreshCw,
  GitMerge,
} from 'lucide-react';
import Timeline, { JourneyItem } from '../ui/timeline';
import { WORKFLOW_PIPELINE } from '../../data/content';

const PIPELINE_TIMELINE_ITEMS: JourneyItem[] = [
  {
    id: 'stage-01',
    year: 'STAGE 01',
    month: 'IDEA',
    content: 'Discovery, operational audit & strategic framing for clear market positioning.',
  },
  {
    id: 'stage-02',
    year: 'STAGE 02',
    month: 'BRANDING',
    content: 'Visual identity systems, typography rules & comprehensive brand guidelines.',
  },
  {
    id: 'stage-03',
    year: 'STAGE 03',
    month: 'DESIGN',
    content: 'High-impact digital collaterals, marketing decks & editorial publications.',
  },
  {
    id: 'stage-04',
    year: 'STAGE 04',
    month: 'PRINT',
    content: 'Precision tactile production, premium foil stamping & quality paper stocks.',
  },
  {
    id: 'stage-05',
    year: 'STAGE 05',
    month: 'MARKETING',
    content: 'Targeted multi-channel ad campaigns, product shoots & brand amplification.',
  },
  {
    id: 'stage-06',
    year: 'STAGE 06',
    month: 'WEBSITE',
    content: 'High-performance responsive web platforms with sub-second page loads.',
  },
  {
    id: 'stage-07',
    year: 'STAGE 07',
    month: 'SOFTWARE',
    content: 'Tailored ERP systems, role-based portals & automated business workflows.',
  },
  {
    id: 'stage-08',
    year: 'STAGE 08',
    month: 'GROWTH',
    content: 'Compounding commercial impact, continuous analytics & long-term support.',
  },
];

export const SignatureDifference: React.FC = () => {
  return (
    <section id="difference" className="relative py-24 bg-white border-y border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-semibold mb-4">
            <Workflow className="w-3.5 h-3.5 text-blue-600" />
            <span>The Unified Advantage</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-tight font-display">
            One partner.<br />
            <span className="text-outline-dark">Endless possibilities.</span>
          </h2>
          
          <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
            Most businesses exhaust valuable executive bandwidth coordinating between 5 isolated vendors. Capture Creatives eliminates multi-vendor friction by uniting branding, production, and custom software under one roof.
          </p>
        </div>

        {/* Comparison: The Fragmented Nightmare vs Capture Creatives Ecosystem */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          
          {/* Traditional Way */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-2 text-rose-600 mb-4">
                <AlertCircle className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">The Fragmented Approach</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 font-display mb-3">
                5+ Disconnected Agencies & Freelancers
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                Freelance Designer → Commercial Printer → Marketing Agency → Web Freelancer → Software Agency.
              </p>

              <div className="space-y-3">
                {[
                  'Inconsistent branding and misaligned color codes between print & web',
                  'Friction passing assets back-and-forth across uncoordinated vendors',
                  'Blame game when print files or website code fail in production',
                  'Wasted management hours acting as a full-time coordinator'
                ].map((point, i) => (
                  <div key={i} className="flex items-start text-xs text-neutral-600">
                    <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-[10px] mr-2.5 mt-0.5 shrink-0">
                      ✕
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200 text-[11px] font-mono text-neutral-400">
              RESULT: Operational delays, fragmented quality & inflated costs.
            </div>
          </motion.div>

          {/* Capture Creatives Unified Way */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 border-2 border-blue-600/30 relative flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="flex items-center space-x-2 text-blue-700 mb-4">
                <CheckCircle className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">The Capture Creatives Standard</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 font-display mb-3">
                Integrated Single-Point Architecture
              </h3>
              <p className="text-xs text-neutral-700 leading-relaxed mb-6">
                One dedicated team handling your visual identity, tactile printing, digital web experiences, and custom ERP systems.
              </p>

              <div className="space-y-3">
                {[
                  '100% brand consistency from physical visiting cards to cloud software',
                  'Zero asset loss — vector files and codebases live in one unified system',
                  'Direct accountability from initial design sketch to physical print & deployment',
                  'Executive peace of mind with a single project partner and direct updates'
                ].map((point, i) => (
                  <div key={i} className="flex items-start text-xs text-neutral-800 font-medium">
                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px] mr-2.5 mt-0.5 shrink-0">
                      ✓
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-200/60 text-[11px] font-mono text-blue-700 font-semibold">
              RESULT: Accelerated execution, immaculate quality & maximum ROI.
            </div>
          </motion.div>
        </div>

        {/* 8-Stage Progression Engine Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center space-x-2 text-blue-600 text-xs font-mono uppercase tracking-wider mb-2">
            <GitMerge className="w-4 h-4" />
            <span>The 8-Stage Progression Engine</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold font-display text-neutral-900">
            From Raw Idea to Compounding Business Growth
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2">
            Scroll down through the horizontal journey to inspect how each phase compounds the next.
          </p>
        </div>

      </div>

      {/* GSAP ScrollTrigger Pinned 8-Stage Timeline */}
      <div className="w-full relative mt-4 border-t border-neutral-200">
        <Timeline
          title="8-Stage Progression"
          periodLabel="Stage 01 — Stage 08 · Unified Engine"
          textColor="#18181b"
          mutedTextColor="#52525b"
          activeColor="#2563eb"
          backgroundColor="#fafaf9"
          imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
          imageAlt="Capture Creatives 8-Stage Progression Workflow"
          items={PIPELINE_TIMELINE_ITEMS}
          scrollDuration={1.2}
        />
      </div>
    </section>
  );
};

