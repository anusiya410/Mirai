import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  customLogoUrl?: string | null;
  isAdminLoggedIn: boolean;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  customLogoUrl,
  isAdminLoggedIn,
  onReplayIntro,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Why Us', path: '/why-us' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      navigate('/admin');
    } else {
      navigate('/admin/login');
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-md py-3 shadow-[0_4px_25px_rgba(201,79,120,0.08)] border-b border-[#C9A45C]/25'
            : 'bg-white/40 backdrop-blur-sm py-4 border-b border-[#C9A45C]/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Exact Brand Logo + Title -> Link to Home with Subtle Float */}
          <Link
            to="/"
            className="flex items-center gap-3.5 group cursor-pointer"
            title="Mirai — Ideas • Innovation • Impact"
          >
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <BrandLogo size="md" customUrl={customLogoUrl} withGlow={isScrolled} />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight text-[#342C32] group-hover:text-[#C94F78] transition-colors leading-tight">
                Mirai
              </span>
              <span className="text-[9px] tracking-[0.25em] font-bold text-[#C9A45C] uppercase">
                IDEAS • INNOVATION • IMPACT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={`text-[13px] uppercase tracking-widest font-medium transition-all relative py-1.5 group ${
                    isActive
                      ? 'text-[#C94F78] font-bold drop-shadow-[0_0_12px_rgba(201,79,120,0.3)]'
                      : 'text-[#342C32]/80 hover:text-[#C94F78]'
                  }`}
                >
                  <span>{link.name}</span>
                  {/* Underline on Hover & Active Indicator */}
                  {isActive ? (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C] rounded-full shadow-[0_0_8px_rgba(201,164,92,0.6)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C9A45C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden lg:flex items-center gap-3.5">
            {/* Replay intro animation trigger */}
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                title="Replay Brand Intro"
                className="p-2 rounded-full text-[#342C32]/60 hover:text-[#C9A45C] hover:bg-[#F7DDE3]/40 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            )}

            {/* Admin Portal Shortcut */}
            <button
              onClick={handleAdminClick}
              title={isAdminLoggedIn ? 'Admin Dashboard (/admin)' : 'Admin Login (/admin/login)'}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                location.pathname.startsWith('/admin')
                  ? 'text-[#C94F78] bg-[#F7DDE3] border border-[#C94F78]/40 shadow-xs'
                  : 'text-[#342C32]/60 hover:text-[#C94F78] hover:bg-[#F7DDE3]/40'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            {/* CTA Button: Let's Work Together with Magnetic Hover & Arrow Glide */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="group px-6 py-3 bg-[#342C32] text-white text-[11px] uppercase tracking-[0.15em] font-semibold rounded-full hover:bg-gradient-to-r hover:from-[#C94F78] hover:to-[#C9A45C] transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-[0_8px_20px_rgba(201,164,92,0.35)] flex items-center gap-2 cursor-pointer"
              >
                <span>LET'S WORK TOGETHER</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleAdminClick}
              title="Admin"
              className="p-2 text-[#342C32]/70 hover:text-[#C94F78] cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 text-[#342C32] hover:text-[#C94F78] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Animated Full-screen Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#FFF9F6]/98 backdrop-blur-xl pt-24 px-6 pb-10 flex flex-col justify-between md:hidden"
          >
            <div className="flex flex-col items-center gap-6 text-center">
              <BrandLogo size="lg" customUrl={customLogoUrl} withGlow />
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent my-1" />

              <nav className="flex flex-col gap-3 w-full">
                {navLinks.map((link, idx) => {
                  const isActive =
                    link.path === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(link.path);

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * idx }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block text-lg font-serif py-2.5 rounded-2xl transition-all ${
                          isActive
                            ? 'text-[#C94F78] font-bold bg-[#F7DDE3]/60 border border-[#C94F78]/20'
                            : 'text-[#342C32] hover:text-[#C94F78] hover:bg-white/60'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-[#C9A45C]/20">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C94F78] to-[#C9A45C] shadow-lg flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleAdminClick();
                }}
                className="w-full py-2.5 rounded-full text-xs font-medium text-[#342C32]/70 hover:text-[#342C32] border border-[#C9A45C]/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#C9A45C]" />
                <span>{isAdminLoggedIn ? 'Open Admin Dashboard' : 'Admin Login'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
