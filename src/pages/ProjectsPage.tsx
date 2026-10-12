import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
  X,
  CheckCircle2,
  FolderKanban,
} from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/content';
import { PortfolioItem } from '../types';

interface ProjectsPageProps {
  onOpenInquiry: (service?: string) => void;
  onNavigateHome?: () => void;
}

const CATEGORIES = [
  'Software & ERP',
  'Branding & Identity',
  'Printing & Packaging',
  'Website & UI/UX',
  'Marketing & Shoots',
];

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onOpenInquiry,
  onNavigateHome,
}) => {
  const [activeProject, setActiveProject] = useState<PortfolioItem | null>(null);

  // Group projects by category
  const categorizedProjects = CATEGORIES.map((category) => {
    const keyword = category.split(' ')[0];
    const items = PORTFOLIO_PROJECTS.filter((p) => p.category.includes(keyword));
    return {
      category,
      items,
    };
  }).filter((group) => group.items.length > 0);

  return (
    <div className="min-h-screen bg-[#FAFAF9] pt-28 pb-24 text-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neutral-200/60 border border-neutral-300/60 text-xs font-mono uppercase tracking-wider text-neutral-700 mb-4">
            <FolderKanban className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Archive & Capabilities</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.08] font-display">
            ALL PROJECTS.<br />
            <span className="text-outline-dark">SECTION BY SECTION.</span>
          </h1>
          
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-subheading max-w-2xl">
            Explore our end-to-end work grouped by discipline — from enterprise software architecture to tactile brand identity systems.
          </p>

          {/* Quick Category Anchors */}
          <div className="mt-8 flex flex-wrap gap-2">
            {categorizedProjects.map(({ category }) => (
              <a
                key={category}
                href={`#cat-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-neutral-200 text-xs font-mono text-neutral-700 hover:text-neutral-950 hover:border-neutral-400 hover:shadow-xs transition-all"
              >
                # {category}
              </a>
            ))}
          </div>
        </div>

        {/* Category-Wise Project Sections */}
        <div className="space-y-24">
          {categorizedProjects.map(({ category, items }) => {
            const anchorId = `cat-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
            return (
              <section
                key={category}
                id={anchorId}
                className="pt-6 border-t border-neutral-200/90 scroll-mt-28"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#D97706] font-bold">
                      Discipline Area
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-display mt-1">
                      {category}
                    </h2>
                  </div>
                  <div className="text-xs font-mono text-neutral-500 bg-neutral-100 px-3 py-1 rounded-md border border-neutral-200 self-start sm:self-auto">
                    {items.length} {items.length === 1 ? 'Production Case' : 'Production Cases'}
                  </div>
                </div>

                {/* Projects Grid for this Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((project, idx) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      onClick={() => setActiveProject(project)}
                      className="group cursor-pointer rounded-2xl bg-white border border-neutral-200/90 overflow-hidden hover:shadow-xl hover:border-neutral-400 transition-all duration-300 flex flex-col"
                    >
                      {/* Image Container with Zoom */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <span className="text-xs font-semibold text-white flex items-center space-x-1.5">
                            <span>View Project Brief</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[10px] font-mono text-neutral-900 border border-neutral-200 shadow-2xs">
                          {project.year}
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#D97706] font-semibold">
                            {project.category}
                          </span>
                          <h3 className="text-lg font-bold text-neutral-900 font-display mt-1 group-hover:text-[#D97706] transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed font-subheading">
                            {project.tagline}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="pt-4 mt-4 border-t border-neutral-100 flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-[10px] text-neutral-600 font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Section Contextual CTA - Similar Project */}
        <div className="mt-20 p-8 rounded-2xl bg-white border border-neutral-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-neutral-900 font-display">
              Want something similar built for your company?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-subheading">
              Every project is custom architected around your brand voice, operational bottlenecks, and commercial targets.
            </p>
          </div>
          <button
            onClick={() => onOpenInquiry()}
            className="w-full sm:w-auto px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold tracking-wider flex items-center justify-center space-x-2 transition-all shadow-xs shrink-0"
          >
            <span>START A SIMILAR PROJECT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom CTA Block on Projects Page */}
        <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display">
              HAVE A CUSTOM BRIEF IN MIND?
            </h3>
            <p className="text-sm text-neutral-400 font-subheading leading-relaxed">
              We engineer custom software, corporate design systems, and turnkey print production from a single dedicated studio.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onOpenInquiry()}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#F9BA1D] hover:bg-[#e6a815] text-neutral-900 font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                START A PROJECT
              </button>
              {onNavigateHome && (
                <button
                  onClick={onNavigateHome}
                  className="w-full sm:w-auto px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Return to Home
                </button>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-neutral-200 flex flex-col"
            >
              {/* Modal Header Media */}
              <div className="relative aspect-video w-full bg-neutral-100">
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

                <p className="text-xs text-neutral-600 leading-relaxed font-subheading">
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

                  <div className="flex items-center space-x-2">
                    {activeProject.externalUrl && (
                      <a
                        href={activeProject.externalUrl}
                        className="px-4 py-2.5 bg-[#D97706] hover:bg-[#b45309] text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-xs transition-all"
                      >
                        <span>Launch 3D Experience</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
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
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
