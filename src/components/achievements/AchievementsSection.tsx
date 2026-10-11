import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Medal, Users, Sparkles, Activity } from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '../../data/content';

export const AchievementsSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-white border-y border-neutral-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight font-display">
            TRACK RECORD & ACHIEVEMENTS
          </h2>

          <p className="mt-4 text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
            The same competitive stamina, tactical focus, and commitment that drives national sports gold medals and student club leadership is applied to every client solution.
          </p>
        </div>

        {/* Timeline Horizontal Layout */}
        <div className="relative">
          {/* Central Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {ACHIEVEMENTS_DATA.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-[#FAFAF9] border border-neutral-200 rounded-2xl p-7 shadow-xs hover:shadow-lg hover:border-neutral-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-800 font-semibold">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-neutral-400 font-semibold">
                      {item.year}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center mb-4 font-bold">
                    {idx === 0 ? <Medal className="w-5 h-5" /> : idx === 1 ? <Users className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 font-display mb-1">
                    {item.title}
                  </h3>

                  <p className="text-xs font-semibold text-neutral-700 mb-3">
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200/60 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>{item.tag}</span>
                  <span className="text-neutral-900 font-bold">Verified</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
