import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#342C32]/60 ${className}`}
    >
      <Link
        to="/"
        className="flex items-center gap-1.5 hover:text-[#C94F78] transition-colors py-1"
        title="Return to Home"
      >
        <Home className="w-3.5 h-3.5 text-[#C9A45C]" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-[#C9A45C]/60 shrink-0" />
            {isLast || !item.path ? (
              <span className="font-bold text-[#C94F78] truncate max-w-[200px] sm:max-w-xs">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-[#C94F78] transition-colors truncate max-w-[150px] sm:max-w-none py-1"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
