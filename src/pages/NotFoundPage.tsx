import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Home, ArrowLeft } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { BrandLogo } from '../components/BrandLogo';

export const NotFoundPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-[80vh] flex items-center justify-center pt-28 pb-16 px-4 bg-[#FFF9F6]">
        <div className="max-w-md w-full text-center p-8 sm:p-12 rounded-[36px] bg-white border border-[#C9A45C]/30 shadow-2xl">
          <BrandLogo size="md" className="mx-auto mb-6" withGlow />
          
          <span className="font-serif text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#C94F78] to-[#C9A45C] block mb-2">
            404
          </span>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#342C32] mb-3">
            Page Not Located
          </h1>

          <p className="text-xs sm:text-sm text-[#342C32]/70 leading-relaxed mb-8">
            The page or route you are attempting to visit does not exist or has been relocated to another section of the studio.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="w-full py-3.5 rounded-full bg-[#342C32] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C9A45C] transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>

            <Link
              to="/projects"
              className="w-full py-3 rounded-full border border-[#C9A45C]/40 text-[#342C32] text-xs font-semibold uppercase tracking-wider hover:bg-[#FFF9F6] transition-colors"
            >
              Explore Portfolio
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
