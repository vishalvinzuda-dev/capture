import React from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  ArrowRight,
  Workflow,
  Sparkles,
  RefreshCw,
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
    <section id="difference" className="relative pt-24 bg-white border-y border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-tight font-display">
            One partner.<br />
            <span className="text-outline-dark whitespace-nowrap">Endless possibilities.</span>
          </h2>
          
          <p className="mt-5 text-sm sm:text-base text-neutral-600 leading-relaxed font-subheading max-w-4xl mx-auto">
            Most businesses exhaust valuable executive bandwidth coordinating between 5 isolated vendors. Capture Creatives eliminates multi-vendor friction by uniting branding, production,<br className="hidden sm:inline" /> and custom software under one roof.
          </p>
        </div>

      </div>

      {/* Seamless GSAP ScrollTrigger Pinned 8-Stage Timeline */}
      <div className="w-full relative">
        <Timeline
          title="8-Stage Progression"
          periodLabel="Stage 01 — Stage 08 · Unified Engine"
          textColor="#18181b"
          mutedTextColor="#52525b"
          activeColor="#F9BA1D"
          backgroundColor="#ffffff"
          imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
          imageAlt="Capture Creatives 8-Stage Progression Workflow"
          items={PIPELINE_TIMELINE_ITEMS}
          scrollDuration={1.2}
        />
      </div>
    </section>
  );
};

