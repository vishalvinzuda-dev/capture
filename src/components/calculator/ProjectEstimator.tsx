import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, Check, Sparkles, Sliders } from 'lucide-react';

interface ProjectEstimatorProps {
  onOpenInquiry: (service?: string) => void;
}

interface ScopeOption {
  id: string;
  name: string;
  category: string;
  basePrice: number;
}

const SCOPE_ITEMS: ScopeOption[] = [
  { id: 'brand-system', name: 'Brand Identity & Logo System', category: 'Branding', basePrice: 25000 },
  { id: 'print-collaterals', name: 'Corporate Print Suite (Cards, Folders, Decks)', category: 'Print', basePrice: 15000 },
  { id: 'custom-website', name: 'Bespoke Responsive Website', category: 'Digital', basePrice: 40000 },
  { id: 'custom-erp', name: 'Custom ERP / Business Management Platform', category: 'Software', basePrice: 90000 },
  { id: 'marketing-shoot', name: 'Growth Campaign & Product Shoot', category: 'Marketing', basePrice: 30000 },
  { id: 'ui-ux-system', name: 'Full UI/UX Design & Interactive Prototype', category: 'Design', basePrice: 35000 },
];

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({ onOpenInquiry }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['brand-system', 'custom-website']);
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'express'>('standard');

  const toggleItem = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((i) => i !== id));
      }
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const calculateTotal = () => {
    const rawTotal = selectedIds.reduce((sum, id) => {
      const item = SCOPE_ITEMS.find((s) => s.id === id);
      return sum + (item ? item.basePrice : 0);
    }, 0);

    const multiplier = timelineSpeed === 'express' ? 1.2 : 1.0;
    return Math.round(rawTotal * multiplier);
  };

  const estimatedTotal = calculateTotal();

  return (
    <section className="relative py-20 bg-white border-y border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
            ESTIMATE YOUR SOLUTION SCOPE
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-neutral-600 font-subheading">
            Select modules to view ballpark investment ranges and scope combinations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Module Selector Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SCOPE_ITEMS.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between ${
                    isSelected
                      ? 'bg-amber-50/70 border-[#F9BA1D] shadow-xs ring-1 ring-[#F9BA1D]/30'
                      : 'bg-neutral-50/70 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="pr-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold text-neutral-900 font-display mt-0.5">
                      {item.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-[#D97706] mt-1">
                      From ₹{item.basePrice.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'bg-[#F9BA1D] text-neutral-900 font-bold' : 'border border-neutral-300 bg-white'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Calculator Output Panel */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-4 border-b border-neutral-800">
                <span>Selected Capabilities:</span>
                <span className="font-mono text-white font-bold">{selectedIds.length} Modules</span>
              </div>

              {/* Timeline Toggle */}
              <div className="mt-4">
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-2">Delivery Track:</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-800 rounded-xl border border-neutral-700">
                  <button
                    type="button"
                    onClick={() => setTimelineSpeed('standard')}
                    className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                      timelineSpeed === 'standard' ? 'bg-white text-neutral-900 font-bold' : 'text-neutral-400'
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimelineSpeed('express')}
                    className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                      timelineSpeed === 'express' ? 'bg-[#F9BA1D] text-neutral-900 font-bold' : 'text-neutral-400'
                    }`}
                  >
                    Priority Express
                  </button>
                </div>
              </div>

              {/* Estimated Budget Box */}
              <div className="mt-6 pt-6 border-t border-neutral-800">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#F9BA1D]">
                  Estimated Investment Range
                </span>
                <div className="text-3xl font-extrabold text-white font-display mt-1">
                  ₹{estimatedTotal.toLocaleString('en-IN')}{' '}
                  <span className="text-xs font-normal text-neutral-400">est.</span>
                </div>
                <p className="text-[10px] text-neutral-400 mt-1">
                  *Final price customized upon exact requirements and scale.
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenInquiry('Custom Solution Package')}
              className="mt-6 w-full py-3.5 bg-[#F9BA1D] hover:bg-[#eab308] text-neutral-900 rounded-xl text-xs font-bold tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md"
            >
              <span>LOCK IN ESTIMATE & INQUIRE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
