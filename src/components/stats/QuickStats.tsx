import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, FolderCheck, Users, Trophy } from 'lucide-react';
import { QUICK_STATS } from '../../data/content';

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  FolderCheck,
  Users,
  Trophy,
};

const CounterTicker: React.FC<{ value: number | string; suffix?: string }> = ({ value, suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState<number | string>(
    typeof value === 'number' ? 0 : value
  );
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView || typeof value !== 'number') {
      if (typeof value === 'string') setDisplayValue(value);
      return;
    }

    let start = 0;
    const end = value;
    const duration = 1600; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const easeOut = 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(start + (end - start) * easeOut);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display">
      {displayValue}
      {suffix}
    </span>
  );
};

export const QuickStats: React.FC = () => {
  return (
    <section className="relative py-12 bg-white border-y border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-neutral-100">
          {QUICK_STATS.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || Sparkles;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`flex flex-col ${idx !== 0 ? 'pt-6 sm:pt-0 sm:pl-8' : ''}`}
              >
                <div className="flex items-center space-x-2 mb-2 text-neutral-400">
                  <Icon className="w-4 h-4 text-blue-600" />
                  <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-500">
                    {stat.label}
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                  <CounterTicker value={stat.value} suffix={stat.suffix} />
                </div>

                <p className="mt-1.5 text-xs text-neutral-500 leading-normal">
                  {stat.sublabel}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
