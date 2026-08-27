import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ExternalLink, Sparkles, Eye } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Websites', 'Branding', 'UI/UX', 'Creative'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 sm:py-32 relative overflow-hidden bg-white">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-[#F7DDE3]/35 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[400px] h-[400px] rounded-full bg-[#DDF3FC]/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
              <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
                Portfolio Showcase
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#342C32] tracking-tight">
              Selected Works
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-[#FFF9F6] border border-[#C9A45C]/30 self-start md:self-auto shadow-2xs">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-[#342C32]/70 hover:text-[#C94F78]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C] shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45 }}
                className="group relative rounded-[32px] overflow-hidden bg-[#FFF9F6] border border-[#C9A45C]/25 shadow-xs hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Visual Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7DDE3]/30">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#342C32]/90 via-[#342C32]/30 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/90 backdrop-blur-md text-[#C94F78] shadow-xs border border-[#C9A45C]/30">
                      {project.category}
                    </span>
                  </div>

                  {/* Quick Action Button on Image */}
                  <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#342C32] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-md">
                    <Eye className="w-4 h-4 text-[#C9A45C]" />
                  </div>

                  {/* Gold Accent Line that appears on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C94F78] via-[#C9A45C] to-[#A9DDF2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>

                {/* Project Info Block */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#342C32]/60 mb-2">
                      <span className="font-medium">{project.client || 'Client Confidential'}</span>
                      <span className="font-serif font-bold text-[#C9A45C]">{project.year || '2026'}</span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#342C32] group-hover:text-[#C94F78] transition-colors mb-2">
                      {project.title}
                    </h3>

                    <p className="text-sm text-[#342C32]/75 line-clamp-2 leading-relaxed mb-6 font-sans">
                      {project.description}
                    </p>
                  </div>

                  {/* View Project Action */}
                  <div className="pt-4 border-t border-[#C9A45C]/15 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#C9A45C] group-hover:text-[#C94F78] transition-colors">
                    <span>View Project Details</span>
                    <div className="w-8 h-8 rounded-full bg-[#FFF9F6] group-hover:bg-[#C94F78] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shadow-2xs">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#342C32]/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden border border-[#C9A45C]/40 shadow-2xl relative"
          >
            {/* Modal Image Header */}
            <div className="relative aspect-video w-full bg-[#342C32]">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-[#342C32] hover:text-[#C94F78] flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C9A45C] text-white">
                  {selectedProject.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-2">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-2 gap-4 pb-6 mb-6 border-b border-[#C9A45C]/20 text-xs">
                <div>
                  <span className="text-[#342C32]/60 uppercase tracking-wider block">Client</span>
                  <span className="font-bold text-[#342C32] text-sm">{selectedProject.client || 'Mirai Flagship'}</span>
                </div>
                <div>
                  <span className="text-[#342C32]/60 uppercase tracking-wider block">Year</span>
                  <span className="font-bold text-[#342C32] text-sm">{selectedProject.year || '2026'}</span>
                </div>
              </div>

              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A45C] mb-2">
                Project Overview
              </h4>
              <p className="text-sm sm:text-base text-[#342C32]/80 leading-relaxed mb-8">
                {selectedProject.description}
              </p>

              <div className="flex items-center gap-4">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3.5 text-center rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C94F78] to-[#C9A45C] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>Launch Live Preview</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3.5 rounded-full text-xs font-semibold text-[#342C32]/70 hover:text-[#342C32] border border-[#C9A45C]/30 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
