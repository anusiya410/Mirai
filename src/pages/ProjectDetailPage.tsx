import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle,
  Building,
  Globe,
  Share2,
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageTransition } from '../components/PageTransition';
import { Project } from '../types';

interface ProjectDetailPageProps {
  projects: Project[];
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projects }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-[70vh] flex flex-col items-center justify-center pt-32 px-4 text-center">
          <Sparkles className="w-12 h-12 text-[#C9A45C] mb-4" />
          <h1 className="font-serif text-3xl font-bold text-[#342C32] mb-3">Project Not Found</h1>
          <p className="text-sm text-[#342C32]/70 max-w-md mb-8">
            The project case study you requested could not be located or has been archived.
          </p>
          <Link
            to="/projects"
            className="px-7 py-3.5 rounded-full bg-[#342C32] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C94F78] transition-colors"
          >
            Return to Portfolio
          </Link>
        </div>
      </PageTransition>
    );
  }

  // Navigation to previous / next project
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1];
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : projects[0];

  return (
    <PageTransition>
      {/* ========================================================================= */}
      {/* HEADER & BREADCRUMBS                                                      */}
      {/* ========================================================================= */}
      <section className="pt-32 pb-12 sm:pt-36 sm:pb-16 bg-mesh-luxury border-b border-[#C9A45C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <Breadcrumbs
              items={[
                { label: 'Projects', path: '/projects' },
                { label: project.title },
              ]}
            />

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#342C32]/70 hover:text-[#C94F78] transition-colors self-start sm:self-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>
          </div>

          {/* Title & Metadata Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white text-[#C94F78] border border-[#C9A45C]/30 shadow-2xs">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C9A45C] text-white">
                    Featured Showcase
                  </span>
                )}
                {project.year && (
                  <span className="text-xs font-semibold text-[#342C32]/60 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C9A45C]" />
                    {project.year}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#342C32] tracking-tight leading-tight mb-4">
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-[#342C32]/80 leading-relaxed max-w-2xl font-sans">
                {project.description}
              </p>
            </div>

            {/* Quick Metadata Box */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              {project.client && (
                <div className="p-4 rounded-2xl bg-white/90 border border-[#C9A45C]/25 flex items-center gap-3">
                  <Building className="w-5 h-5 text-[#5D9FBE]" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#342C32]/50 block">Client</span>
                    <span className="text-xs font-bold text-[#342C32]">{project.client}</span>
                  </div>
                </div>
              )}

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#342C32] text-white flex items-center justify-between hover:bg-[#C9A45C] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-[#E8D3A3]" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-white/60 block">Live Deployment</span>
                      <span className="text-xs font-bold text-white">Visit Live Experience</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* HIGH-RES PROJECT SHOWCASE IMAGE                                           */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[36px] overflow-hidden border border-[#C9A45C]/30 shadow-2xl bg-[#FFF9F6]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto max-h-[650px] object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PROJECT NARRATIVE & SPECIFICATIONS                                        */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FFF9F6] border-t border-[#C9A45C]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            <div className="md:col-span-2 space-y-10">
              {/* Challenge */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C94F78] mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>The Strategic Challenge</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#342C32] mb-4">
                  Elevating Brand Distinction in a Crowded Landscape
                </h2>
                <p className="text-sm sm:text-base text-[#342C32]/80 leading-relaxed font-sans">
                  The client required a bespoke solution that abandoned template patterns in favor of a signature aesthetic, sub-second latency, and intuitive conversion architecture.
                </p>
              </div>

              {/* Solution */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5D9FBE] mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>The Architectural Solution</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#342C32] mb-4">
                  Crafting a High-Performance Digital Identity
                </h2>
                <p className="text-sm sm:text-base text-[#342C32]/80 leading-relaxed font-sans mb-4">
                  Mirai Studio engineered a tailored platform blending editorial typography, micro-interactions, responsive fluid grids, and cloud-ready backend workflows.
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5 text-sm text-[#342C32]/85">
                    <CheckCircle className="w-4 h-4 text-[#C94F78]" />
                    <span>Custom TypeScript application with responsive animation physics</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-[#342C32]/85">
                    <CheckCircle className="w-4 h-4 text-[#5D9FBE]" />
                    <span>Tailored brand guidelines and high-resolution visual asset library</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-[#342C32]/85">
                    <CheckCircle className="w-4 h-4 text-[#C9A45C]" />
                    <span>Zero-compromise accessibility, SEO indexing, and sub-second load times</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Details Box */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-[#C9A45C]/30 shadow-xs">
                <h3 className="font-serif text-lg font-bold text-[#342C32] mb-4 pb-3 border-b border-[#C9A45C]/20">
                  Project Inclusions
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[#342C32]/50 block uppercase font-bold">Category</span>
                    <span className="font-bold text-[#C94F78]">{project.category}</span>
                  </div>
                  <div>
                    <span className="text-[#342C32]/50 block uppercase font-bold">Deliverables</span>
                    <span className="font-semibold text-[#342C32]">UI/UX Architecture, Frontend Engineering, Asset Production</span>
                  </div>
                  <div>
                    <span className="text-[#342C32]/50 block uppercase font-bold">Tech Stack</span>
                    <span className="font-semibold text-[#342C32]">React 18, TypeScript, Tailwind CSS, Motion</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#342C32] to-[#211B20] text-white text-center">
                <h4 className="font-serif text-lg font-bold mb-2">Want Similar Results?</h4>
                <p className="text-xs text-white/70 mb-5">
                  Let us build your next signature digital product.
                </p>
                <Link
                  to="/contact"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#C94F78] to-[#C9A45C] text-white text-xs font-bold uppercase tracking-wider block shadow-md hover:opacity-95 transition-opacity"
                >
                  Start Your Project
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PREVIOUS / NEXT PROJECT SWITCHER                                          */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white border-t border-[#C9A45C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Prev Project */}
            <Link
              to={`/projects/${prevProject.id}`}
              className="p-6 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/20 hover:border-[#C94F78] transition-all flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#C94F78] group-hover:-translate-x-1 transition-transform shrink-0 shadow-2xs">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-bold text-[#C9A45C] block">Previous Project</span>
                <span className="font-serif text-base font-bold text-[#342C32] truncate block group-hover:text-[#C94F78] transition-colors">
                  {prevProject.title}
                </span>
              </div>
            </Link>

            {/* Next Project */}
            <Link
              to={`/projects/${nextProject.id}`}
              className="p-6 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/20 hover:border-[#C94F78] transition-all flex items-center justify-between gap-4 group text-right"
            >
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-bold text-[#C9A45C] block">Next Project</span>
                <span className="font-serif text-base font-bold text-[#342C32] truncate block group-hover:text-[#C94F78] transition-colors">
                  {nextProject.title}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#C94F78] group-hover:translate-x-1 transition-transform shrink-0 shadow-2xs">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

          </div>
        </div>
      </section>
    </PageTransition>
  );
};
