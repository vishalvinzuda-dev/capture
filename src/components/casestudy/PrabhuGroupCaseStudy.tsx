import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  FileSpreadsheet,
} from 'lucide-react';
import { PRABHU_CASE_STUDY } from '../../data/content';

interface CaseStudyProps {
  onOpenInquiry: (service?: string) => void;
}

export const PrabhuGroupCaseStudy: React.FC<CaseStudyProps> = ({ onOpenInquiry }) => {

  return (
    <section id="case-study" className="relative py-24 bg-[#FAFAF9] overflow-hidden">
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Badge & Titles */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight font-display">
            FROM PROBLEM <br className="hidden sm:inline" />
            <span className="text-outline-dark">TO PLATFORM.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg font-semibold text-neutral-700 font-display">
            {PRABHU_CASE_STUDY.subtitle}
          </p>

          <p className="mt-4 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl mx-auto font-subheading">
            {PRABHU_CASE_STUDY.overview}
          </p>
        </div>

        {/* The SaaS Interface Showcase Container */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-xl mb-12">
          
          {/* Top Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-8 mb-8 border-b border-neutral-200">
            {PRABHU_CASE_STUDY.results.map((res, i) => (
              <div key={i} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <div
                  className="text-2xl sm:text-3xl font-bold text-[#D97706] tracking-tight"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
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

          {/* Operational Transformation: Side-by-Side Split with Guiding Arrow */}
          <div className="mb-12">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-neutral-900 font-display">
                Operational Transformation Architecture
              </h3>
              <p className="text-xs text-neutral-500 font-subheading">
                Compare the friction of disconnected legacy workflows directly against the engineered custom ERP solution.
              </p>
            </div>

            {/* 2-Side Grid with Arrow Illustrator */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Side: Legacy State (Before) */}
              <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white border border-neutral-800 flex flex-col justify-between relative shadow-sm">
                <div>
                  <div className="flex items-center space-x-2 text-rose-400 mb-4">
                    <FileSpreadsheet className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                      Legacy State · The Challenge
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 font-display">
                    Disconnected Legacy Workflow
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed font-subheading">
                    {PRABHU_CASE_STUDY.challenge}
                  </p>
                  <div className="space-y-2.5">
                    {PRABHU_CASE_STUDY.beforePoints.map((pt, i) => (
                      <div key={i} className="flex items-start p-3 rounded-xl bg-neutral-800/80 border border-neutral-700 text-xs text-neutral-300">
                        <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-[10px] mr-3 mt-0.5 shrink-0">
                          ✕
                        </span>
                        <span className="leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] font-mono text-rose-400/80">
                  STATUS: Friction, latency & operational bottlenecks.
                </div>
              </div>

              {/* Center Floating Guiding Arrow Indicator (Desktop absolute overlay & mobile indicator) */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white border-2 border-neutral-900 shadow-xl flex items-center justify-center transition-transform hover:scale-110">
                  <svg
                    className="w-7 h-7 text-neutral-900"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <polyline points="13 5 20 12 13 19" />
                  </svg>
                </div>
              </div>

              {/* Mobile Transition Divider Arrow */}
              <div className="flex lg:hidden justify-center items-center py-1">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-neutral-900 shadow-md flex items-center justify-center rotate-90 sm:rotate-90">
                  <svg
                    className="w-5 h-5 text-neutral-900"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <polyline points="13 5 20 12 13 19" />
                  </svg>
                </div>
              </div>

              {/* Right Side: Engineered ERP (After) */}
              <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/40 text-white border-2 border-[#F9BA1D]/50 flex flex-col justify-between relative shadow-xl">
                <div>
                  <div className="flex items-center space-x-2 text-[#F9BA1D] mb-4">
                    <Zap className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                      Engineered ERP · The Solution
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 font-display">
                    Tailored Central Architecture
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-200 mb-6 leading-relaxed font-subheading">
                    {PRABHU_CASE_STUDY.solution}
                  </p>
                  <div className="space-y-2.5">
                    {PRABHU_CASE_STUDY.afterPoints.map((pt, i) => (
                      <div key={i} className="flex items-start p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white">
                        <CheckCircle2 className="w-4 h-4 text-[#F9BA1D] mr-3 mt-0.5 shrink-0" />
                        <span className="font-medium leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-[#F9BA1D] font-semibold">
                  STATUS: Real-time accuracy, streamlined sync & scalability.
                </div>
              </div>

            </div>
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
                  className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/90 hover:border-amber-300 hover:bg-amber-50/30 transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-[#B45309] flex items-center justify-center font-bold text-xs mb-2">
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
            <div className="inline-flex items-center space-x-2 text-[#F9BA1D] text-xs font-mono mb-1">
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
            className="w-full sm:w-auto px-6 py-3.5 bg-[#F9BA1D] hover:bg-[#eab308] text-neutral-900 rounded-xl text-xs font-bold tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md shrink-0"
          >
            <span>LET'S BUILD YOUR SOLUTION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
