import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, LayoutTemplate, Hammer, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PROCESS_STEPS } from '../../data/content';

const stepIcons = [Search, PenTool, LayoutTemplate, Hammer, Rocket];

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="relative py-24 bg-[#FAFAF9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight font-display">
            HOW WE WORK
          </h2>

          <p className="mt-4 text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed font-subheading">
            A disciplined, transparent 5-stage execution framework that eliminates ambiguity, enforces strict milestones, and guarantees output excellence.
          </p>
        </div>

        {/* 5-Step Interactive Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx] || Rocket;
            const isSelected = activeStep === idx;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#F9BA1D] shadow-lg scale-102 ring-2 ring-[#F9BA1D]/20'
                    : 'bg-white/80 border-neutral-200 hover:border-neutral-300 hover:bg-white shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      STEP {step.step}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-[#F9BA1D] text-neutral-900 font-bold' : 'bg-neutral-100 text-neutral-700'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 font-display mb-1.5">
                    {step.title}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-snug">
                    {step.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 text-[10px] font-mono text-[#D97706] font-semibold flex items-center justify-between">
                  <span>{isSelected ? 'Active Focus' : 'Click to inspect'}</span>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#F9BA1D]" />}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Deep Stage Focus Box */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200 shadow-md"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded bg-amber-50 text-[#B45309] font-mono text-xs font-bold border border-amber-200">
                  PHASE {PROCESS_STEPS[activeStep].step}
                </span>
                <span className="text-xs text-neutral-400 font-mono">Stage Execution Details</span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 font-display">
                {PROCESS_STEPS[activeStep].title}: {PROCESS_STEPS[activeStep].summary}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {PROCESS_STEPS[activeStep].description}
              </p>
            </div>

            <div className="w-full lg:w-auto p-6 rounded-2xl bg-neutral-50 border border-neutral-200 shrink-0 min-w-[280px]">
              <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">Stage Milestone Output:</p>
              <div className="text-xs font-bold text-neutral-900 font-display mb-4">
                {PROCESS_STEPS[activeStep].outcome}
              </div>
              <div className="space-y-1.5">
                {PROCESS_STEPS[activeStep].details.map((d) => (
                  <div key={d} className="flex items-center text-xs text-neutral-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] mr-2 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
