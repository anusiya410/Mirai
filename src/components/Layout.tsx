import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SiteSettings, TeamMember } from '../types';

interface LayoutProps {
  settings: SiteSettings;
  teamMembers: TeamMember[];
  isAdminLoggedIn: boolean;
  onReplayIntro?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  settings,
  teamMembers,
  isAdminLoggedIn,
  onReplayIntro,
}) => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FFF9F6] text-[#342C32] selection:bg-[#F7DDE3] selection:text-[#C94F78]">
      <Navbar
        customLogoUrl={settings.customLogoUrl}
        isAdminLoggedIn={isAdminLoggedIn}
        onReplayIntro={onReplayIntro}
      />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer
        settings={settings}
        teamMembers={teamMembers}
        isAdminLoggedIn={isAdminLoggedIn}
      />
    </div>
  );
};
