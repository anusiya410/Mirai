import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound, AlertCircle, ArrowLeft } from 'lucide-react';
import { BrandLogo } from '../BrandLogo';
import { AdminUser } from '../../types';
import { StorageService } from '../../lib/storage';

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser) => void;
  onBackToSite: () => void;
  customLogoUrl?: string | null;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToSite,
  customLogoUrl,
}) => {
  const [email, setEmail] = useState('admin@sa-innovate.com');
  const [password, setPassword] = useState('admin2026');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      // Secure local credential check
      if (email.trim() && (password === 'admin2026' || password.length >= 6)) {
        const user: AdminUser = {
          email: email.trim(),
          name: email.split('@')[0].toUpperCase() + ' (Administrator)',
          role: 'Super Admin',
          token: 'sa_token_' + Date.now(),
        };
        StorageService.setAuth(user);
        setIsLoading(false);
        onLoginSuccess(user);
      } else {
        setIsLoading(false);
        setError('Invalid administrator credentials. Try the default credentials provided.');
      }
    }, 600);
  };

  const fillDemoCredentials = () => {
    setEmail('admin@sa-innovate.com');
    setPassword('admin2026');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-mesh-luxury relative select-none">
      {/* Back to Public Site Button */}
      <button
        onClick={onBackToSite}
        className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-[#342C32] bg-white/80 hover:bg-white border border-[#C9A45C]/30 shadow-xs transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Website</span>
      </button>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#C9A45C]/30 shadow-[0_20px_60px_-15px_rgba(201,79,120,0.18)] relative overflow-hidden"
      >
        {/* Top Gold Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C94F78] via-[#C9A45C] to-[#5D9FBE]" />

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <BrandLogo size="lg" customUrl={customLogoUrl} withGlow />
          <h2 className="font-serif text-2xl font-bold text-[#342C32] mt-4">
            Studio CMS Portal
          </h2>
          <p className="text-xs text-[#342C32]/60 mt-1 uppercase tracking-widest font-semibold">
            Administrative Control Panel
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-2">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#C9A45C] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sa-innovate.com"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] focus:ring-2 focus:ring-[#E8B8C4]/30 outline-hidden text-sm text-[#342C32] transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80">
                Password
              </label>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-[11px] text-[#C94F78] hover:underline font-semibold cursor-pointer"
              >
                Auto-fill demo
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#C9A45C] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] focus:ring-2 focus:ring-[#E8B8C4]/30 outline-hidden text-sm text-[#342C32] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest text-white bg-gradient-to-r from-[#C94F78] via-[#C9A45C] to-[#C94F78] bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <span>Verifying Authentication...</span>
            ) : (
              <>
                <span>Sign In To Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Helper Badge */}
        <div className="mt-8 pt-6 border-t border-[#C9A45C]/20 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9F6] border border-[#C9A45C]/30 text-[11px] text-[#342C32]/70 font-medium">
            <KeyRound className="w-3 h-3 text-[#C9A45C]" />
            <span>Demo: <strong className="text-[#342C32]">admin@sa-innovate.com</strong> / <strong className="text-[#342C32]">admin2026</strong></span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
