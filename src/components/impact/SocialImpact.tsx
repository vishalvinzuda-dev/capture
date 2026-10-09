import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Users, ShieldAlert, Sparkles, Award, Globe, Leaf } from 'lucide-react';
import { SOCIAL_IMPACT_DATA } from '../../data/content';

export const SocialImpact: React.FC = () => {
  return (
    <section id="impact" className="relative py-24 bg-[#FAFAF9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold mb-4">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Community & Social Responsibility</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight font-display">
            {SOCIAL_IMPACT_DATA.title}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl">
            {SOCIAL_IMPACT_DATA.yiInvolvement} We believe enterprise capability should continuously empower civic health, emergency preparedness, and youth education.
          </p>
        </div>

        {/* 10% Profit Pledge Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-8 sm:p-10 rounded-3xl bg-neutral-900 text-white border border-neutral-800 relative overflow-hidden shadow-xl"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neutral-800 text-blue-400 text-xs font-mono mb-4 border border-neutral-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Foundational Commitment</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display leading-snug">
                10% of Studio Profits Personally Contributed Towards Social & Community Initiatives
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Directly supporting emergency healthcare education, university first-responder workshops, and grassroots community improvement drives.
              </p>
            </div>

            <div className="shrink-0 p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700 text-center w-full lg:w-auto">
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-400 font-display">
                10%
              </div>
              <div className="text-xs font-bold text-white uppercase tracking-wider mt-1 font-display">
                Profit Pledge
              </div>
              <p className="text-[10px] text-neutral-400 mt-1 font-mono">For Social Initiatives</p>
            </div>
          </div>
        </motion.div>

        {/* 3 Impact Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SOCIAL_IMPACT_DATA.initiatives.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-display text-blue-600">
                    {item.stat}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Initiative
                  </span>
                </div>

                <h4 className="text-base font-bold text-neutral-900 font-display mb-2">
                  {item.title}
                </h4>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center text-[11px] font-mono text-neutral-400">
                <span>Young Indians (Yi) Partnered</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
