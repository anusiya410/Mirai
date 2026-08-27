import React from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  Layers,
  MessageSquareQuote,
  Inbox,
  Sliders,
  ShieldAlert,
  Tag,
  Globe,
  LogOut,
  X,
  Users,
} from 'lucide-react';
import { BrandLogo } from '../BrandLogo';

export type AdminTab =
  | 'dashboard'
  | 'pipeline'
  | 'projects'
  | 'services'
  | 'pricing'
  | 'team'
  | 'testimonials'
  | 'contacts'
  | 'settings'
  | 'logo';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onViewSite: () => void;
  onLogout: () => void;
  unreadCount: number;
  customLogoUrl?: string | null;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  onViewSite,
  onLogout,
  unreadCount,
  customLogoUrl,
  mobileOpen = false,
  onCloseMobile,
}) => {
  const menuItems = [
    { id: 'dashboard' as AdminTab, name: 'Overview', icon: LayoutDashboard },
    { id: 'pipeline' as AdminTab, name: 'Lead Pipeline', icon: FolderKanban },
    { id: 'projects' as AdminTab, name: 'Projects', icon: FolderKanban },
    { id: 'services' as AdminTab, name: 'Services', icon: Layers },
    { id: 'pricing' as AdminTab, name: 'Pricing & Retainers', icon: Tag },
    { id: 'team' as AdminTab, name: 'Team', icon: Users },
    { id: 'testimonials' as AdminTab, name: 'Testimonials', icon: MessageSquareQuote },
    {
      id: 'contacts' as AdminTab,
      name: 'Enquiries',
      icon: Inbox,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { id: 'settings' as AdminTab, name: 'Site Content', icon: Sliders },
    { id: 'logo' as AdminTab, name: 'Official Logo (Locked)', icon: ShieldAlert },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r border-[#C9A45C]/25 flex flex-col justify-between transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Top Brand Header */}
          <div className="p-6 border-b border-[#C9A45C]/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BrandLogo size="sm" customUrl={customLogoUrl} />
              <div>
                <span className="font-serif text-lg font-bold text-[#342C32] block leading-tight">
                  Mirai Studio
                </span>
                <span className="text-[10px] text-[#C9A45C] font-semibold uppercase tracking-widest">
                  Control Center
                </span>
              </div>
            </div>

            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="p-1.5 text-[#342C32]/60 hover:text-[#C94F78] md:hidden cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F7DDE3] to-[#FFF9F6] text-[#C94F78] border border-[#C94F78]/30 shadow-2xs'
                      : 'text-[#342C32]/70 hover:bg-[#FFF9F6] hover:text-[#342C32]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-[#C94F78]' : 'text-[#C9A45C]'
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C94F78] text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#C9A45C]/20 space-y-2">
          <button
            onClick={onViewSite}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#342C32]/80 hover:bg-[#DDF3FC] hover:text-[#5D9FBE] transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#5D9FBE]" />
            <span>View Public Site</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-600/80 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
