import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUp, Instagram, Linkedin, MessageSquare, Mail, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SiteSettings } from '../types';

interface FooterProps {
  settings: SiteSettings;
  isAdminLoggedIn: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  isAdminLoggedIn,
}) => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Why Choose Us', path: '/why-us' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const servicesList = [
    { name: 'Website Development', path: '/services' },
    { name: 'UI/UX Design', path: '/services' },
    { name: 'Branding & Identity', path: '/services' },
    { name: 'Digital Solutions', path: '/services' },
    { name: 'Creative Design', path: '/services' },
    { name: 'Custom Solutions', path: '/services' },
  ];

  return (
    <footer className="bg-[#342C32] text-[#FFF9F6] pt-16 pb-12 relative overflow-hidden border-t-2 border-[#C9A45C]/30">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#C94F78]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[#5D9FBE]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Artistic Flair Metrics Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-14 mb-14 border-b border-[#C9A45C]/20">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-10 sm:gap-16">
            <div className="flex flex-col text-center sm:text-left">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#E8B8C4] leading-none mb-1">
                {settings.stats.ideas || '50+'}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-white/50 font-sans">
                Creative Ideas
              </span>
            </div>

            <div className="flex flex-col text-center sm:text-left">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#A9DDF2] leading-none mb-1">
                {settings.stats.projects || '6+'}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-white/50 font-sans">
                Curated Projects
              </span>
            </div>

            <div className="flex flex-col text-center sm:text-left">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#C9A45C] leading-none mb-1">
                {settings.stats.commitment || '100%'}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-white/50 font-sans">
                Impact Driven
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex flex-col text-center sm:text-right">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-white/40">
                Currently available for
              </span>
              <span className="text-xs font-bold text-[#E8D3A3] font-sans">
                New Collaborations — 2026
              </span>
            </div>
            <div className="w-11 h-11 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-xs">
              <div className="w-2.5 h-2.5 bg-[#C94F78] rounded-full animate-pulse shadow-[0_0_8px_#C94F78]" />
            </div>
          </div>
        </div>

        {/* Middle Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-[#C9A45C]/20">
          
          {/* Col 1: Brand Info & Official Logo */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <BrandLogo size="lg" customUrl={settings.customLogoUrl} withGlow />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-white tracking-tight leading-tight">
                  Mirai Studio
                </span>
                <span className="text-[10px] tracking-[0.28em] font-bold text-[#C9A45C] uppercase">
                  IDEAS • INNOVATION • IMPACT
                </span>
              </div>
            </div>

            <p className="text-sm text-white/70 leading-relaxed max-w-sm mb-6 font-sans">
              A boutique digital agency fusing bespoke artistic craftsmanship with modern engineering architecture. Creating digital solutions that define brand legacy.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {settings.whatsappNumber && (
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Contact"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#C94F78] border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              )}

              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#C94F78] border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}

              {settings.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#5D9FBE] border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}

              <a
                href={`mailto:${settings.contactEmail}`}
                aria-label="Email Enquiry"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#C9A45C] border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-base font-bold text-[#E8D3A3] mb-5 tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-xs uppercase tracking-wider text-white/70 hover:text-[#C94F78] transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A45C] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="lg:col-span-4">
            <h4 className="font-serif text-base font-bold text-[#E8D3A3] mb-5 tracking-wide">
              Services Portfolio
            </h4>
            <ul className="space-y-2.5">
              {servicesList.map((svc) => (
                <li key={svc.name}>
                  <Link
                    to={svc.path}
                    className="text-xs uppercase tracking-wider text-white/70 hover:text-[#5D9FBE] transition-colors flex items-center justify-between group"
                  >
                    <span>{svc.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#5D9FBE] transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-white/10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#C94F78] hover:text-[#E8B8C4] uppercase tracking-wider"
              >
                <span>Request Custom Scope</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Admin Portal, Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-white/50 font-sans">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Mirai Studio. All Rights Reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[#E8B8C4]">
              Crafted with <Heart className="w-3 h-3 text-[#C94F78] fill-[#C94F78]" /> in Artistic Flair
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Direct Admin Route Link */}
            <Link
              to={isAdminLoggedIn ? '/admin' : '/admin/login'}
              className="text-white/60 hover:text-[#E8D3A3] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>{isAdminLoggedIn ? 'Admin Dashboard' : 'Admin Login'}</span>
            </Link>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <ArrowUp className="w-3.5 h-3.5 text-[#C9A45C]" />
              </div>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
