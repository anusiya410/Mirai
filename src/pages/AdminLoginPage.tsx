import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { PageTransition } from '../components/PageTransition';
import { AdminUser, SiteSettings } from '../types';
import { StorageService } from '../lib/storage';

interface AdminLoginPageProps {
  settings: SiteSettings;
  onLoginSuccess: (user: AdminUser) => void;
  isAdminLoggedIn: boolean;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  settings,
  onLoginSuccess,
  isAdminLoggedIn,
}) => {
  const [email, setEmail] = useState('admin@sa.studio');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // If already logged in, redirect straight to admin dashboard
  React.useEffect(() => {
    if (isAdminLoggedIn) {
      navigate('/admin', { replace: true });
    }
  }, [isAdminLoggedIn, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      // Standard demo credential verification
      if (email.trim().toLowerCase() === 'admin@sa.studio' && password === 'admin123') {
        const user: AdminUser = {
          email: 'admin@sa.studio',
          name: 'Chief Creative Officer',
          role: 'Super Administrator',
          token: `sa-jwt-${Date.now()}`,
        };
        StorageService.setAuth(user);
        onLoginSuccess(user);
        navigate('/admin', { replace: true });
      } else {
        setError('Invalid credentials. Use admin@sa.studio / admin123');
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FFF9F6] flex flex-col justify-center items-center px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F7DDE3]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#DDF3FC]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full relative z-10">
          
          {/* Back to public website button */}
          <div className="mb-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#342C32]/70 hover:text-[#C94F78] transition-colors py-1.5 px-3 rounded-full hover:bg-white/80"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>

          <div className="bg-white rounded-[36px] p-8 sm:p-10 border border-[#C9A45C]/30 shadow-2xl">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-8">
              <BrandLogo size="md" customUrl={settings.customLogoUrl} withGlow className="mb-4" />
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-[#C9A45C]" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#C9A45C]">
                  Authorized Access Only
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#342C32]">
                Admin Control Center
              </h1>
              <p className="text-xs text-[#342C32]/60 mt-1">
                Sign in to manage projects, services, pricing, enquiries, and content.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#342C32] block mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#342C32]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@sa.studio"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] focus:outline-none focus:border-[#C94F78] focus:ring-1 focus:ring-[#C94F78]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#342C32] block mb-1.5">
                  Master Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#342C32]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] focus:outline-none focus:border-[#C94F78] focus:ring-1 focus:ring-[#C94F78]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C] text-white text-xs font-bold uppercase tracking-widest shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Enter Control Center</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Helper */}
            <div className="mt-8 pt-6 border-t border-[#C9A45C]/20 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#342C32]/60 font-medium mb-2">
                <KeyRound className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Preconfigured Credentials:</span>
              </div>
              <p className="text-xs font-mono text-[#342C32] bg-[#FFF9F6] py-1.5 px-3 rounded-xl border border-[#C9A45C]/20 inline-block">
                admin@sa.studio / admin123
              </p>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};
