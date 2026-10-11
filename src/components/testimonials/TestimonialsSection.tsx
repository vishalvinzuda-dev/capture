import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, Building2, Sparkles } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../../data/content';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="relative py-24 bg-[#FAFAF9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-neutral-200 pb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight font-display">
              TRUSTED BY LEADERS
            </h2>
          </div>

          {/* Nav Buttons */}
          <div className="mt-4 sm:mt-0 flex items-center space-x-2">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-xl bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100 transition-colors shadow-2xs"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-xl bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100 transition-colors shadow-2xs"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {TESTIMONIALS_DATA.map((item, idx) => {
              const isActive = idx === currentIndex || idx === (currentIndex + 1) % TESTIMONIALS_DATA.length;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Stars & Metric Pill */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      {item.metric && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200 font-semibold tracking-wide">
                          {item.metric}
                        </span>
                      )}
                    </div>

                    {/* Quote */}
                    <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-medium mb-6">
                      “{item.quote}”
                    </p>
                  </div>

                  {/* Author Meta */}
                  <div className="pt-6 border-t border-neutral-100 flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white font-bold text-xs flex items-center justify-center font-display">
                      {item.avatarPlaceholder}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 font-display">
                        {item.author}
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        {item.role} · <span className="font-semibold text-neutral-700">{item.company}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          {TESTIMONIALS_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === idx ? 'w-8 bg-neutral-900' : 'w-2 bg-neutral-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
