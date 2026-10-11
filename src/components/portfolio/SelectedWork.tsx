import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
  Sparkles,
  Filter,
  X,
  CheckCircle2,
  CreditCard,
  Sliders,
  Info,
} from 'lucide-react';
import Riffle from '../ui/hairline-riffle';
import { PORTFOLIO_PROJECTS } from '../../data/content';
import { PortfolioItem } from '../../types';

interface PortfolioSectionProps {
  onOpenInquiry: (service?: string) => void;
}

const CATEGORIES = [
  'All Work',
  'Software & ERP',
  'Branding & Identity',
  'Printing & Packaging',
  'Website & UI/UX',
  'Marketing & Shoots',
];

export const SelectedWork: React.FC<PortfolioSectionProps> = ({
  onOpenInquiry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All Work');
  const [activeProject, setActiveProject] = useState<PortfolioItem | null>(null);
  const [previewProject, setPreviewProject] = useState<PortfolioItem | null>(null);
  const [riffleStatusText, setRiffleStatusText] = useState<string>(
    'Tray at rest. Hover or use arrow keys to pull cards.'
  );

  const filteredProjects =
    selectedCategory === 'All Work'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) =>
          p.category.includes(selectedCategory.split(' ')[0])
        );

  return (
    <section
      id="work"
      className="relative py-24 bg-white border-y border-neutral-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-neutral-200 pb-8 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight font-display">
              SELECTED WORK
            </h2>
            <p className="mt-2 text-sm text-neutral-600 max-w-xl leading-relaxed font-subheading">
              Tactile brand artifacts, high-conversion digital web architectures, and mission-critical ERP platforms built for commercial impact.
            </p>
          </div>

          <a
            href="#/projects"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#/projects';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="self-start md:self-end px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold tracking-wider flex items-center space-x-2 shadow-xs transition-all shrink-0"
          >
            <span>VIEW ALL PROJECTS BY CATEGORY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Hairline Riffle Interactive Tray Showcase (0.30 Intensity) */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side: Riffle Tray */}
            <div>
              <div className="w-full max-w-sm mx-auto py-2">
                <Riffle
                  intensity={0.30}
                  theme="light"
                  aria-label="A tray of eight cards with 0.30 ripple intensity. Hover or use the arrow keys to pull a card."
                  className="w-full transition-transform duration-300 cursor-pointer"
                  onRead={(text) => {
                    setRiffleStatusText(text);
                    const match = text.match(/\d+/);
                    if (match) {
                      const cardNum = parseInt(match[0], 10);
                      const projectIndex = (cardNum - 1) % PORTFOLIO_PROJECTS.length;
                      setPreviewProject(PORTFOLIO_PROJECTS[projectIndex]);
                    }
                  }}
                  onClick={() => {
                    const match = riffleStatusText.match(/\d+/);
                    if (match) {
                      const cardNum = parseInt(match[0], 10);
                      const projectIndex = (cardNum - 1) % PORTFOLIO_PROJECTS.length;
                      setActiveProject(PORTFOLIO_PROJECTS[projectIndex]);
                    }
                  }}
                />
              </div>

              <div className="mt-4 p-3 rounded-xl bg-white border border-neutral-200 flex items-center justify-between text-xs max-w-sm mx-auto shadow-2xs">
                <div className="flex items-center space-x-2 truncate">
                  <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-neutral-500 font-medium">Status:</span>
                  <span className="font-mono font-semibold text-neutral-800 truncate">
                    {(() => {
                      const match = riffleStatusText.match(/\d+/);
                      if (match) {
                        const cardNum = parseInt(match[0], 10);
                        const projectIndex = (cardNum - 1) % PORTFOLIO_PROJECTS.length;
                        return `Hovering: ${PORTFOLIO_PROJECTS[projectIndex].title}`;
                      }
                      return riffleStatusText;
                    })()}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Hovered Project Preview */}
            <div className="h-full flex items-center justify-center">
              {!previewProject ? (
                <div className="w-full h-full min-h-[420px] rounded-2xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center text-neutral-400 bg-neutral-50/50">
                  <CreditCard className="w-8 h-8 mb-3 opacity-50" />
                  <p className="text-sm font-medium">Hover over a card in the tray</p>
                  <p className="text-xs opacity-75 mt-1">to preview the project details</p>
                </div>
              ) : (
                <motion.div
                  key={previewProject.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-md group cursor-pointer"
                  onClick={() => setActiveProject(previewProject)}
                >
                  <div className="relative aspect-video w-full bg-neutral-100 overflow-hidden">
                    <img
                      src={previewProject.image}
                      alt={previewProject.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-xs font-semibold text-white flex items-center space-x-1.5">
                        <span>View Full Project</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D97706] font-semibold">
                      {previewProject.category}
                    </span>
                    <h3 className="text-xl font-bold text-neutral-900 font-display mt-1">
                      {previewProject.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
                      {previewProject.tagline}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col"
            >
              {/* Image Preview Header */}
              <div className="relative aspect-[16/8] w-full bg-neutral-900 overflow-hidden">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center shadow-md hover:bg-white"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-4 px-3 py-1 rounded-md bg-neutral-900/80 backdrop-blur-md text-white text-[11px] font-mono">
                  Client: {activeProject.client} · {activeProject.year}
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#D97706] font-bold">
                    {activeProject.category}
                  </span>
                  <h3 className="text-2xl font-bold text-neutral-900 font-display mt-1">
                    {activeProject.title}
                  </h3>
                  <p className="text-xs font-semibold text-neutral-700 mt-1">
                    {activeProject.tagline}
                  </p>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {activeProject.description}
                </p>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2.5">
                    Core Deliverables & Scope:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeProject.deliverables.map((d) => (
                      <div key={d} className="flex items-center p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] mr-2 shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveProject(null)}
                    className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const title = activeProject.category;
                      setActiveProject(null);
                      onOpenInquiry(title);
                    }}
                    className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center space-x-2"
                  >
                    <span>Request Proposal Like This</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
