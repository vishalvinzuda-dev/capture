import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server,
  ArrowRight,
  Database,
  CheckCircle2,
  Sliders,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  FileSpreadsheet,
  Activity
} from 'lucide-react';
import { PRABHU_CASE_STUDY } from '../../data/content';

interface CaseStudyProps {
  onOpenInquiry: (service?: string) => void;
}

export const PrabhuGroupCaseStudy: React.FC<CaseStudyProps> = ({ onOpenInquiry }) => {
  const [viewState, setViewState] = useState<'BEFORE' | 'AFTER'>('AFTER');
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="case-study" className="relative py-24 bg-[#FAFAF9] overflow-hidden">
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Badge & Titles */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Featured Enterprise Case Study · SaaS Level Solution</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight font-display">
            {PRABHU_CASE_STUDY.title}
          </h2>

          <p className="mt-2 text-base sm:text-lg font-semibold text-neutral-700 font-display">
            {PRABHU_CASE_STUDY.subtitle}
          </p>

          <p className="mt-4 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            {PRABHU_CASE_STUDY.overview}
          </p>
        </div>

        {/* The SaaS Interface Showcase Container */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-xl mb-12">
          
          {/* Top Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-8 mb-8 border-b border-neutral-200">
            {PRABHU_CASE_STUDY.results.map((res, i) => (
              <div key={i} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-display">
                  {res.metric}
                </div>
                <div className="text-xs font-bold text-neutral-900 mt-1 font-display">
                  {res.label}
                </div>
                <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                  {res.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Before vs After Visualizer */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 font-display">
                  Operational Transformation Visualizer
                </h3>
                <p className="text-xs text-neutral-500">
                  Toggle to compare legacy friction with the custom deployed ERP platform.
                </p>
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center p-1 bg-neutral-100 rounded-xl border border-neutral-200 self-start sm:self-auto">
                <button
                  onClick={() => setViewState('BEFORE')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    viewState === 'BEFORE'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Legacy State (Before)
                </button>
                <button
                  onClick={() => setViewState('AFTER')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    viewState === 'AFTER'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Engineered ERP (After)
                </button>
              </div>
            </div>

            {/* Before / After Panel Box */}
            <AnimatePresence mode="wait">
              {viewState === 'BEFORE' ? (
                <motion.div
                  key="before"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white border border-neutral-800"
                >
                  <div className="flex items-center space-x-2 text-rose-400 mb-4">
                    <FileSpreadsheet className="w-5 h-5" />
                    <span className="text-xs font-mono uppercase tracking-wider">
                      The Challenge · Disconnected Legacy Workflow
                    </span>
                  </div>
                  <p className="text-sm text-neutral-300 mb-6">
                    {PRABHU_CASE_STUDY.challenge}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PRABHU_CASE_STUDY.beforePoints.map((pt, i) => (
                      <div key={i} className="flex items-center p-3 rounded-xl bg-neutral-800/80 border border-neutral-700 text-xs text-neutral-300">
                        <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-[10px] mr-3 shrink-0">
                          ✕
                        </span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="after"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-900 via-neutral-900 to-indigo-950 text-white border border-blue-500/30 shadow-lg"
                >
                  <div className="flex items-center space-x-2 text-blue-300 mb-4">
                    <Zap className="w-5 h-5" />
                    <span className="text-xs font-mono uppercase tracking-wider">
                      The Solution · Tailored Central Platform
                    </span>
                  </div>
                  <p className="text-sm text-neutral-200 mb-6">
                    {PRABHU_CASE_STUDY.solution}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PRABHU_CASE_STUDY.afterPoints.map((pt, i) => (
                      <div key={i} className="flex items-center p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs text-white">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 mr-3 shrink-0" />
                        <span className="font-medium">{pt}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive ERP System Architecture Modules */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Core Deployed Platform Modules:
              </h4>
              <span className="text-[11px] font-mono text-neutral-400">Custom Built Architecture</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PRABHU_CASE_STUDY.modules.map((mod, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/90 hover:border-blue-300 hover:bg-blue-50/30 transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs mb-2">
                    0{i + 1}
                  </div>
                  <h5 className="text-xs font-bold text-neutral-900 font-display mb-1">{mod.name}</h5>
                  <p className="text-[11px] text-neutral-600 leading-snug">{mod.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Case Study Contextual Conversion CTA */}
        <div className="p-8 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center space-x-2 text-blue-400 text-xs font-mono mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored For Your Operations</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Want to solve a similar business or operational challenge?
            </h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-xl">
              We design custom software platforms and ERPs that adapt to your exact workflow instead of forcing you to adapt to rigid off-the-shelf software.
            </p>
          </div>

          <button
            onClick={() => onOpenInquiry('Custom Software & ERP')}
            className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md shrink-0"
          >
            <span>LET'S BUILD YOUR SOLUTION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
