import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { PageTransition } from '../components/PageTransition';
import { Project, Service, Testimonial, ContactEnquiry, SiteSettings, AdminUser, PricingTier, TeamMember } from '../types';

interface AdminDashboardPageProps {
  adminUser: AdminUser | null;
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  pricing: PricingTier[];
  contacts: ContactEnquiry[];
  settings: SiteSettings;
  teamMembers: TeamMember[];
  visits: number;
  onSaveProjects: (projects: Project[]) => void;
  onSaveServices: (services: Service[]) => void;
  onSaveTestimonials: (testimonials: Testimonial[]) => void;
  onSavePricing: (pricing: PricingTier[]) => void;
  onSaveContacts: (contacts: ContactEnquiry[]) => void;
  onSaveSettings: (settings: SiteSettings) => void;
  onSaveTeamMembers: (members: TeamMember[]) => void;
  onLogout: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  adminUser,
  projects,
  services,
  testimonials,
  pricing,
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
}) => {
  const navigate = useNavigate();

  // If not authenticated, redirect to /admin/login immediately
  useEffect(() => {
    if (!adminUser) {
      navigate('/admin/login', { replace: true });
    }
  }, [adminUser, navigate]);

  if (!adminUser) {
    return null;
  }

  const handleLogout = () => {
    onLogout();
    navigate('/admin/login', { replace: true });
  };

  const handleViewSite = () => {
    navigate('/');
  };

  return (
    <PageTransition>
      <AdminDashboard
        adminUser={adminUser}
        projects={projects}
        services={services}
        testimonials={testimonials}
        pricing={pricing}
        contacts={contacts}
        settings={settings}
        teamMembers={teamMembers}
        visits={visits}
        onSaveProjects={onSaveProjects}
        onSaveServices={onSaveServices}
        onSaveTestimonials={onSaveTestimonials}
        onSavePricing={onSavePricing}
        onSaveContacts={onSaveContacts}
        onSaveSettings={onSaveSettings}
        onSaveTeamMembers={onSaveTeamMembers}
        onLogout={handleLogout}
        onViewSite={handleViewSite}
      />
    </PageTransition>
  );
};
