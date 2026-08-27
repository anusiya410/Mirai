import React, { useState } from 'react';
import { Menu, Bell, Shield, CheckCircle2 } from 'lucide-react';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { DashboardHome } from './DashboardHome';
import { ProjectManager } from './ProjectManager';
import { ServiceManager } from './ServiceManager';
import { TestimonialManager } from './TestimonialManager';
import { ContactManager } from './ContactManager';
import { SettingsManager } from './SettingsManager';
import { LogoManager } from './LogoManager';
import { PricingManager } from './PricingManager';
import { TeamManager } from './TeamManager';
import { PipelineManager } from './PipelineManager';
import { Project, Service, Testimonial, ContactEnquiry, SiteSettings, AdminUser, PricingTier, TeamMember, PipelineLead } from '../../types';
import { StorageService } from '../../lib/storage';

interface AdminDashboardProps {
  adminUser: AdminUser;
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  pricing?: PricingTier[];
  contacts: ContactEnquiry[];
  settings: SiteSettings;
  teamMembers: TeamMember[];
  visits: number;
  onSaveProjects: (projects: Project[]) => void;
  onSaveServices: (services: Service[]) => void;
  onSaveTestimonials: (testimonials: Testimonial[]) => void;
  onSavePricing?: (pricing: PricingTier[]) => void;
  onSaveContacts: (contacts: ContactEnquiry[]) => void;
  onSaveSettings: (settings: SiteSettings) => void;
  onSaveTeamMembers: (members: TeamMember[]) => void;
  onLogout: () => void;
  onViewSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminUser,
  projects,
  services,
  testimonials,
  pricing = [],
  contacts,
  settings,
  teamMembers,
  visits,
  onSaveProjects,
  onSaveServices,
  onSaveTestimonials,
  onSavePricing,
  onSaveContacts,
  onSaveSettings,
  onSaveTeamMembers,
  onLogout,
  onViewSite,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [pipelineLeads, setPipelineLeads] = useState<PipelineLead[]>(() =>
    StorageService.getPipelineLeads()
  );

  const handleSavePipelineLeads = (updated: PipelineLead[]) => {
    setPipelineLeads(updated);
    StorageService.savePipelineLeads(updated);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleStatusChange = (id: string, newStatus: 'New' | 'Contacted' | 'Completed') => {
    const updated = contacts.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
    onSaveContacts(updated);
    showToast(`Enquiry marked as ${newStatus}`);
  };

  const unreadCount = contacts.filter((c) => c.status === 'New').length;

  const tabLabel = (tab: AdminTab): string => {
    switch (tab) {
      case 'dashboard': return 'Operational Overview';
      case 'pipeline': return 'Sales & Client Pipeline Workflow';
      case 'projects': return 'Portfolio Management';
      case 'services': return 'Core Solutions';
      case 'pricing': return 'Pricing & Retainers';
      case 'team': return 'Team Management';
      case 'testimonials': return 'Client Endorsements';
      case 'contacts': return 'Prospect Pipeline';
      case 'settings': return 'Live Content & Copy';
      case 'logo': return 'Official Brand Asset';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6]/60 flex">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
          <div className="px-5 py-3 rounded-2xl bg-[#342C32] text-white shadow-2xl border border-[#C9A45C]/40 flex items-center gap-3 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onViewSite={onViewSite}
        onLogout={onLogout}
        unreadCount={unreadCount}
        customLogoUrl={settings.customLogoUrl}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-[#C9A45C]/20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-[#342C32] md:hidden cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#C9A45C] font-bold">
                SA Studio Executive CMS
              </span>
              <h2 className="font-serif text-lg font-bold text-[#342C32] capitalize">
                {tabLabel(activeTab)}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {unreadCount > 0 && (
              <button
                onClick={() => setActiveTab('contacts')}
                className="relative p-2 rounded-xl bg-[#F7DDE3] text-[#C94F78] hover:bg-[#C94F78] hover:text-white transition-colors cursor-pointer"
                title={`${unreadCount} New Enquiries`}
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C94F78] text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                  {unreadCount}
                </span>
              </button>
            )}

            {/* Admin Profile Pill */}
            <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-[#C9A45C]/25">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C94F78] to-[#C9A45C] flex items-center justify-center text-white shadow-2xs font-bold text-xs">
                <Shield className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#342C32] leading-tight">
                  {adminUser.name}
                </p>
                <p className="text-[10px] text-[#C9A45C] font-semibold tracking-wider uppercase">
                  {adminUser.role}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content View Container */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardHome
              projects={projects}
              services={services}
              testimonials={testimonials}
              contacts={contacts}
              visits={visits}
              onNavigate={(tab) => setActiveTab(tab)}
              onStatusChange={handleStatusChange}
            />
          )}

          {activeTab === 'pipeline' && (
            <PipelineManager
              leads={pipelineLeads}
              onSaveLeads={handleSavePipelineLeads}
              showToast={showToast}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectManager
              projects={projects}
              onSaveProjects={onSaveProjects}
              showToast={showToast}
            />
          )}

          {activeTab === 'services' && (
            <ServiceManager
              services={services}
              onSaveServices={onSaveServices}
              showToast={showToast}
            />
          )}

          {activeTab === 'pricing' && onSavePricing && (
            <PricingManager
              pricing={pricing}
              onSavePricing={onSavePricing}
              showToast={showToast}
            />
          )}

          {activeTab === 'team' && (
            <TeamManager
              teamMembers={teamMembers}
              onSaveTeamMembers={onSaveTeamMembers}
              showToast={showToast}
            />
          )}

          {activeTab === 'testimonials' && (
            <TestimonialManager
              testimonials={testimonials}
              onSaveTestimonials={onSaveTestimonials}
              showToast={showToast}
            />
          )}

          {activeTab === 'contacts' && (
            <ContactManager
              contacts={contacts}
              onSaveContacts={onSaveContacts}
              showToast={showToast}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsManager
              settings={settings}
              onSaveSettings={onSaveSettings}
              showToast={showToast}
            />
          )}

          {activeTab === 'logo' && (
            <LogoManager
              settings={settings}
              onSaveSettings={onSaveSettings}
              showToast={showToast}
            />
          )}
        </main>
      </div>
    </div>
  );
};
