import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  Search,
  Filter,
  Sparkles,
  ExternalLink,
  Tag,
  Calendar,
  Layers,
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageTransition } from '../components/PageTransition';
import { Project } from '../types';

interface ProjectsPageProps {
  projects: Project[];
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Makeup Artist', 'Beauty Salon', 'Nail Artist', 'Bridal Artist', 'Websites', 'Branding'];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.client && project.client.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <PageTransition>
      {/* ========================================================================= */}
      {/* HERO & BREADCRUMBS                                                        */}
      {/* ========================================================================= */}
      <section className="pt-32 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden bg-mesh-luxury border-b border-[#C9A45C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <Breadcrumbs items={[{ label: 'Projects & Portfolio' }]} className="mb-6" />

          <div className="max-w-3xl">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
              <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
                Our Portfolio
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#342C32] tracking-tight leading-tight mb-6">
              Selected Works &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C94F78] to-[#C9A45C]">
                Digital Masterpieces.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#342C32]/80 leading-relaxed font-sans mb-8">
              Explore our curated portfolio of bespoke websites, iconic branding systems, and digital products designed to scale authority and drive conversion.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CONTROLS: CATEGORY TABS & SEARCH                                          */}
      {/* ========================================================================= */}
      <section className="py-8 bg-white border-b border-[#C9A45C]/20 sticky top-[72px] z-20 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-[#C94F78] to-[#C9A45C] text-white shadow-md'
                      : 'bg-[#FFF9F6] text-[#342C32]/75 hover:bg-[#F7DDE3] hover:text-[#C94F78] border border-[#C9A45C]/25'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#342C32]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-full bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] placeholder:text-[#342C32]/40 focus:outline-none focus:border-[#C94F78] focus:ring-1 focus:ring-[#C94F78]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#342C32]/50 hover:text-[#C94F78]"
                >
                  ✕
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PROJECTS GRID                                                             */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FFF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-[#C9A45C]/20 p-8 max-w-md mx-auto">
              <Sparkles className="w-10 h-10 text-[#C9A45C] mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold text-[#342C32] mb-2">No Projects Found</h3>
              <p className="text-xs text-[#342C32]/60 mb-6">
                Try selecting a different category or clearing your search term.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 rounded-full bg-[#342C32] text-white text-xs font-bold uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group rounded-[32px] overflow-hidden bg-white border border-[#C9A45C]/25 shadow-xs hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Header with Hover Scale */}
                      <Link
                        to={`/projects/${project.id}`}
                        className="block relative aspect-[16/10] overflow-hidden bg-[#F7DDE3]/30 cursor-pointer"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#342C32]/80 via-transparent to-transparent opacity-40 group-hover:opacity-75 transition-opacity" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <span className="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#C94F78] backdrop-blur-xs shadow-xs border border-[#C9A45C]/20">
                            {project.category}
                          </span>
                          {project.featured && (
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C9A45C] text-white shadow-xs">
                              Featured
                            </span>
                          )}
                        </div>

                        {project.year && (
                          <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold text-white bg-black/40 backdrop-blur-xs">
                            {project.year}
                          </span>
                        )}
                      </Link>

                      {/* Content Area */}
                      <div className="p-7">
                        {project.client && (
                          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9A45C] block mb-1">
                            {project.client}
                          </span>
                        )}

                        <Link to={`/projects/${project.id}`} className="block group-hover:text-[#C94F78] transition-colors">
                          <h2 className="font-serif text-2xl font-bold text-[#342C32] mb-3 leading-snug">
                            {project.title}
                          </h2>
                        </Link>

                        <p className="text-sm text-[#342C32]/75 line-clamp-3 leading-relaxed mb-6 font-sans">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer Row */}
                    <div className="px-7 pb-7 pt-4 border-t border-[#C9A45C]/15 flex items-center justify-between">
                      <Link
                        to={`/projects/${project.id}`}
                        className="text-xs font-bold uppercase tracking-wider text-[#C94F78] hover:text-[#342C32] transition-colors flex items-center gap-1.5"
                      >
                        <span>View Project Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-[#FFF9F6] text-[#342C32]/70 hover:text-[#5D9FBE] hover:bg-[#DDF3FC] transition-colors"
                          title="Visit Live URL"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* CONVERSION BANNER                                                         */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-t border-[#C9A45C]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-10 h-10 text-[#C9A45C] mx-auto mb-4" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#342C32] mb-4">
            Inspired by What You See?
          </h2>
          <p className="text-base text-[#342C32]/75 max-w-xl mx-auto mb-8 font-sans">
            Let us design and engineer your next digital platform with identical precision and aesthetic finesse.
          </p>
          <Link
            to="/contact"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C94F78] to-[#C9A45C] text-white text-xs font-bold uppercase tracking-widest shadow-xl hover:opacity-95 transition-opacity inline-flex items-center gap-2"
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
};
