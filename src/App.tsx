/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';

// Components & Layout
import { ScrollToTop } from './components/ScrollToTop';
import { Layout } from './components/Layout';
import { LogoIntro } from './components/LogoIntro';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { WhyUsPage } from './pages/WhyUsPage';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Data & Storage
import { StorageService } from './lib/storage';
import { Project, Service, Testimonial, ContactEnquiry, SiteSettings, AdminUser, PricingTier, TeamMember } from './types';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Dynamic Studio CMS Data
  const [settings, setSettings] = useState<SiteSettings>(StorageService.getSettings());
  const [projects, setProjects] = useState<Project[]>(StorageService.getProjects());
  const [services, setServices] = useState<Service[]>(StorageService.getServices());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(StorageService.getTestimonials());
  const [pricing, setPricing] = useState<PricingTier[]>(StorageService.getPricing());
  const [contacts, setContacts] = useState<ContactEnquiry[]>(StorageService.getContacts());
  const [adminUser, setAdminUser] = useState<AdminUser | null>(StorageService.getAuth());
  const [visits, setVisits] = useState(StorageService.getVisits());
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(StorageService.getTeamMembers());

  // Prefilled contact fields
  const [prefilledType, setPrefilledType] = useState<string>('Website Development');

  useEffect(() => {
    // Record unique visit
    const updatedVisits = StorageService.recordVisit();
    setVisits(updatedVisits);

    // Listen for storage events across tabs/components
    const handleStorageUpdate = () => {
      setSettings(StorageService.getSettings());
      setProjects(StorageService.getProjects());
      setServices(StorageService.getServices());
      setTestimonials(StorageService.getTestimonials());
      setPricing(StorageService.getPricing());
      setContacts(StorageService.getContacts());
      setAdminUser(StorageService.getAuth());
      setTeamMembers(StorageService.getTeamMembers());
    };

    window.addEventListener('mirai_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('mirai_storage_update', handleStorageUpdate);
  }, []);

  // Handlers for Admin changes
  const handleSaveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    StorageService.saveProjects(newProjects);
  };

  const handleSaveServices = (newServices: Service[]) => {
    setServices(newServices);
    StorageService.saveServices(newServices);
  };

  const handleSaveTestimonials = (newTestimonials: Testimonial[]) => {
    setTestimonials(newTestimonials);
    StorageService.saveTestimonials(newTestimonials);
  };

  const handleSavePricing = (newPricing: PricingTier[]) => {
    setPricing(newPricing);
    StorageService.savePricing(newPricing);
  };

  const handleSaveContacts = (newContacts: ContactEnquiry[]) => {
    setContacts(newContacts);
    StorageService.saveContacts(newContacts);
  };

  const handleSaveSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    StorageService.saveSettings(newSettings);
  };

  const handleSaveTeamMembers = (newTeamMembers: TeamMember[]) => {
    setTeamMembers(newTeamMembers);
    StorageService.saveTeamMembers(newTeamMembers);
  };

  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    StorageService.setAuth(user);
  };

  const handleLogout = () => {
    setAdminUser(null);
    StorageService.clearAuth();
  };

  const handleEnquirySubmitted = (newEnquiry: ContactEnquiry) => {
    const updated = [newEnquiry, ...contacts];
    setContacts(updated);
    StorageService.saveContacts(updated);
  };

  const handleSelectPricingTier = (tierName: string) => {
    setPrefilledType(tierName);
  };

  const handleSelectServiceForContact = (serviceTitle: string) => {
    setPrefilledType(serviceTitle);
  };

  return (
    <BrowserRouter>
      {/* Scroll restoration on route change */}
      <ScrollToTop />

      {/* Signature Initial Brand Logo Opening Animation */}
      <AnimatePresence>
        {showIntro && (
          <LogoIntro
            onComplete={() => setShowIntro(false)}
            customLogoUrl={settings.customLogoUrl}
          />
        )}
      </AnimatePresence>

      <Routes>
        {/* ========================================================================= */}
        {/* PUBLIC MULTI-PAGE WEBSITE ROUTES (Wrapped in Layout with Navbar & Footer) */}
        {/* ========================================================================= */}
        <Route
          element={
            <Layout
              settings={settings}
              teamMembers={teamMembers}
              isAdminLoggedIn={!!adminUser}
              onReplayIntro={() => setShowIntro(true)}
            />
          }
        >
          {/* Home Route: / */}
          <Route
            path="/"
            element={
              <HomePage
                settings={settings}
                services={services}
                projects={projects}
                testimonials={testimonials}
                pricing={pricing}
                teamMembers={teamMembers}
              />
            }
          />

          {/* About Us Route: /about */}
          <Route
            path="/about"
            element={<AboutPage settings={settings} teamMembers={teamMembers} />}
          />

          {/* Services Catalogue Route: /services */}
          <Route
            path="/services"
            element={
              <ServicesPage
                services={services}
                onSelectServiceForContact={handleSelectServiceForContact}
              />
            }
          />

          {/* Projects / Portfolio Route: /projects */}
          <Route
            path="/projects"
            element={<ProjectsPage projects={projects} />}
          />

          {/* Dynamic Project Detail Route: /projects/:id */}
          <Route
            path="/projects/:id"
            element={<ProjectDetailPage projects={projects} />}
          />

          {/* Why Choose Us Route: /why-us */}
          <Route
            path="/why-us"
            element={<WhyUsPage testimonials={testimonials} />}
          />

          {/* Pricing & Retainers Route: /pricing */}
          <Route
            path="/pricing"
            element={
              <PricingPage
                pricingTiers={pricing}
                onSelectTier={handleSelectPricingTier}
              />
            }
          />

          {/* Contact Us Route: /contact */}
          <Route
            path="/contact"
            element={
              <ContactPage
                settings={settings}
                teamMembers={teamMembers}
                onEnquirySubmitted={handleEnquirySubmitted}
                prefilledType={prefilledType}
              />
            }
          />

          {/* 404 Not Found Catch-all Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* ========================================================================= */}
        {/* DEDICATED ADMIN ROUTES (Isolated from Public Layout)                      */}
        {/* ========================================================================= */}
        {/* Admin Login: /admin/login */}
        <Route
          path="/admin/login"
          element={
            <AdminLoginPage
              settings={settings}
              onLoginSuccess={handleLoginSuccess}
              isAdminLoggedIn={!!adminUser}
            />
          }
        />

        {/* Admin Dashboard: /admin & /admin/* */}
        <Route
          path="/admin/*"
          element={
            <AdminDashboardPage
              adminUser={adminUser}
              projects={projects}
              services={services}
              testimonials={testimonials}
              pricing={pricing}
              contacts={contacts}
              settings={settings}
              teamMembers={teamMembers}
              visits={visits}
              onSaveProjects={handleSaveProjects}
              onSaveServices={handleSaveServices}
              onSaveTestimonials={handleSaveTestimonials}
              onSavePricing={handleSavePricing}
              onSaveContacts={handleSaveContacts}
              onSaveSettings={handleSaveSettings}
              onSaveTeamMembers={handleSaveTeamMembers}
              onLogout={handleLogout}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <AdminDashboardPage
              adminUser={adminUser}
              projects={projects}
              services={services}
              testimonials={testimonials}
              pricing={pricing}
              contacts={contacts}
              settings={settings}
              teamMembers={teamMembers}
              visits={visits}
              onSaveProjects={handleSaveProjects}
              onSaveServices={handleSaveServices}
              onSaveTestimonials={handleSaveTestimonials}
              onSavePricing={handleSavePricing}
              onSaveContacts={handleSaveContacts}
              onSaveSettings={handleSaveSettings}
              onSaveTeamMembers={handleSaveTeamMembers}
              onLogout={handleLogout}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
