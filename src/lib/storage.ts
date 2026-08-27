import { Project, Service, Testimonial, ContactEnquiry, SiteSettings, AdminUser, PricingTier, TeamMember, PipelineLead } from '../types';

const STORAGE_KEYS = {
  PROJECTS: 'mirai_brand_projects_v2',
  SERVICES: 'mirai_brand_services_v2',
  TESTIMONIALS: 'mirai_brand_testimonials_v2',
  CONTACTS: 'mirai_brand_contacts_v2',
  SETTINGS: 'mirai_brand_settings_v2',
  VISITS: 'mirai_brand_visits_v2',
  AUTH: 'mirai_brand_admin_auth_v2',
  PRICING: 'mirai_brand_pricing_v2',
  TEAM: 'mirai_brand_team_v1',
  PIPELINE: 'mirai_lead_pipeline_v1',
};

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'LuxeVibe Digital Flagship',
    category: 'Websites',
    description: 'Modern luxury e-commerce experience with interactive 3D product previews and bespoke checkout flow.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    client: 'LuxeVibe International',
    year: '2026',
    link: 'https://example.com/luxevibe',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Aura Maison Visual Identity',
    category: 'Branding',
    description: 'Complete brand architecture, typography guidelines, packaging design and gold-etched collateral.',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
    client: 'Aura Maison Paris',
    year: '2026',
    link: 'https://example.com/aura',
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Nova Fintech Mobile Platform',
    category: 'UI/UX',
    description: 'Next-generation banking and wealth management mobile app crafted for intuitive digital clarity.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    client: 'Nova Capital Group',
    year: '2025',
    link: 'https://example.com/nova',
    featured: true,
  },
  {
    id: 'proj-4',
    title: 'Ethereal Haute Parfumerie',
    category: 'Websites',
    description: 'Bespoke fragrance discovery web portal with subtle fluid micro-interactions and personalized scent finder.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    client: 'Ethereal Parfums',
    year: '2025',
    link: 'https://example.com/ethereal',
    featured: false,
  },
  {
    id: 'proj-5',
    title: 'Solstice Health & Wellness Portal',
    category: 'UI/UX',
    description: 'Comprehensive patient portal and holistic wellness dashboard with real-time biometric telemetry.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    client: 'Solstice Medical Care',
    year: '2026',
    link: 'https://example.com/solstice',
    featured: false,
  },
  {
    id: 'proj-6',
    title: 'Velvet Studio Motion & Campaign',
    category: 'Creative',
    description: 'High-impact 3D animation, interactive digital storytelling campaign, and creative promotional assets.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    client: 'Velvet Creative Studio',
    year: '2026',
    link: 'https://example.com/velvet',
    featured: true,
  },
];

const DEFAULT_SERVICES: Service[] = [
  {
    id: 'serv-1',
    number: '01',
    title: 'Website Development',
    description: 'Modern, responsive and conversion-focused websites engineered with high-performance architectures.',
    iconName: 'Globe',
    features: ['High-Performance Architecture', 'Responsive Mobile-First', 'Custom Interactions & Motion', 'SEO & Analytics Ready'],
  },
  {
    id: 'serv-2',
    number: '02',
    title: 'UI/UX Design',
    description: 'Beautiful interfaces designed around real user experiences, intuitive flows, and design systems.',
    iconName: 'Layout',
    features: ['User Journey Mapping', 'Wireframing & Prototyping', 'Design System Architecture', 'Micro-Interaction Design'],
  },
  {
    id: 'serv-3',
    number: '03',
    title: 'Branding & Identity',
    description: 'Memorable visual identities that represent your brand with distinction and emotional resonance.',
    iconName: 'Sparkles',
    features: ['Logo & Monogram Design', 'Brand Typography & Palette', 'Brand Guidelines & Books', 'Packaging & Print Collateral'],
  },
  {
    id: 'serv-4',
    number: '04',
    title: 'Digital Solutions',
    description: 'Smart digital experiences built for modern businesses, custom platforms and cloud integrations.',
    iconName: 'Cpu',
    features: ['Custom Web Applications', 'API & Cloud Integrations', 'Content Management Portals', 'Automations & Workflows'],
  },
  {
    id: 'serv-5',
    number: '05',
    title: 'Creative Design',
    description: 'Creative visuals, campaigns, 3D motion assets, and digital experiences that captivate attention.',
    iconName: 'Palette',
    features: ['Motion Graphics & 3D', 'Digital Campaign Assets', 'Social & Marketing Visuals', 'Editorial Layouts'],
  },
  {
    id: 'serv-6',
    number: '06',
    title: 'Custom Solutions',
    description: 'Tailored solutions based on each client\'s unique needs, scalable frameworks, and bespoke technological craft.',
    iconName: 'Layers',
    features: ['Technical Consulting', 'Scalable Microservices', 'Performance Optimization', 'Dedicated Ongoing Support'],
  },
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Elena Rostova',
    role: 'Founder & Creative Director',
    company: 'Maison Luxe Paris',
    quote: 'Mirai delivered an extraordinary digital presence that elevated our brand prestige and doubled our consultation conversions within 60 days. Pure craftsmanship.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'test-2',
    clientName: 'Marcus Chen',
    role: 'VP of Product',
    company: 'Nova Capital Technologies',
    quote: 'The attention to detail, motion design, and engineering precision was beyond our expectations. They truly transformed our concept into impactful reality.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'test-3',
    clientName: 'Sophia Al-Mansoor',
    role: 'Managing Partner',
    company: 'Kestrel Ventures',
    quote: 'Working with Mirai was seamless. Their balance of feminine aesthetic elegance and robust technical execution is unmatched in the modern digital agency landscape.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'test-4',
    clientName: 'Amara Okafor',
    role: 'CEO & Co-Founder',
    company: 'Solstice Collective',
    quote: 'From our very first discovery call to launch day, the Mirai team treated our project with boundless dedication. Our clients consistently praise the new website.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
  },
];

const DEFAULT_PRICING: PricingTier[] = [
  {
    id: 'price-basic',
    name: 'Basic',
    tagline: 'Essential Web Presence for Small Businesses',
    price: '₹3,500 – ₹5,000',
    priceOneTime: '₹3,500 – ₹5,000',
    period: 'one-time',
    turnaround: '5–7 Working Days',
    description: 'A clean, high-performance responsive website engineered to establish your online presence and capture direct customer inquiries.',
    features: [
      'Home Page',
      'About Us',
      'Services Showcase',
      'Gallery Section',
      'Contact Form',
      'WhatsApp Integration',
      '100% Responsive Design',
    ],
    ctaText: 'View Details',
    ctaDestination: '/pricing',
    isActive: true,
    displayOrder: 1,
  },
  {
    id: 'price-professional',
    name: 'Professional',
    tagline: 'Most Popular for Growing Studios & Businesses',
    price: '₹6,000 – ₹8,000',
    priceOneTime: '₹6,000 – ₹8,000',
    period: 'one-time',
    featured: true,
    isPopular: true,
    badge: 'Most Popular',
    turnaround: '7–10 Working Days',
    description: 'Comprehensive conversion-focused business website equipped with lead bookings, customer reviews, and before/after showcases.',
    features: [
      'All Basic Features Included',
      'Booking / Enquiry System',
      'Client Testimonials & Reviews',
      'Before / After Gallery',
      'Mobile & Tablet Optimized',
      'Modern Luxury UI/UX Design',
      'Enhanced Customization',
    ],
    ctaText: 'View Details',
    ctaDestination: '/pricing',
    isActive: true,
    displayOrder: 2,
  },
  {
    id: 'price-premium',
    name: 'Premium',
    tagline: 'Complete Dynamic Platform with Domain Included',
    price: '₹7,800',
    originalPrice: '₹12,000',
    priceOneTime: '₹7,800',
    period: 'launch-offer',
    badge: 'Launch Offer',
    isLaunchOffer: true,
    turnaround: '7–10 Working Days',
    description: 'Full-featured dynamic web application with real-time cloud database, executive admin dashboard, and 1 year domain included.',
    breakdown: [
      { item: 'Website Development', amount: '₹7,000' },
      { item: 'Domain (1 Year Included)', amount: '₹800' },
    ],
    features: [
      'All Professional Features Included',
      'Cloud Database Integration',
      'Executive Admin Panel',
      'Booking Management System',
      'Dynamic Content Management',
      '1 Year Domain Included',
    ],
    ctaText: 'Choose Premium',
    ctaDestination: '/contact',
    isActive: true,
    displayOrder: 3,
  },
];

const DEFAULT_SETTINGS: SiteSettings = {
  heroHeading: 'Ideas That Inspire.\nInnovation That Creates.\nImpact That Matters.',
  heroSubheading: 'We transform creative ideas into meaningful digital experiences that help brands grow, connect and stand out.',
  heroCtaPrimary: 'Explore Our Work',
  heroCtaSecondary: "Let's Create Together",
  aboutTitle: 'Where Ideas Become Impact',
  aboutStory: 'At Mirai, we believe exceptional digital experiences should be as emotionally evocative as they are technologically flawless. We merge creative artistry with strategic innovation, turning visionary concepts into impactful digital products that help modern brands command attention and thrive.',
  aboutSubtext: 'Our multidisciplinary studio bridges luxury aesthetics, smart engineering, and deliberate strategy.',
  contactEmail: 'hello@mirai-studio.com',
  contactPhone: '+1 (800) 555-0199',
  contactAddress: '750 Madison Avenue, Suite 1400, New York, NY',
  whatsappNumber: '+18005550199',
  instagramUrl: 'https://instagram.com',
  linkedinUrl: 'https://linkedin.com',
  customLogoUrl: null,
  stats: {
    ideas: '50+',
    projects: '6+',
    commitment: '100%',
    support: '24/7',
  },
};

const DEFAULT_CONTACTS: ContactEnquiry[] = [
  {
    id: 'enq-1',
    name: 'Victoria Vance',
    email: 'victoria@vancestudio.com',
    phone: '+1 (212) 555-4821',
    projectType: 'Website Development',
    message: 'We are launching a new luxury jewelry line and require a bespoke digital storefront with seamless animations.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'New',
  },
  {
    id: 'enq-2',
    name: 'Julian Sterling',
    email: 'julian@sterlingmedia.co',
    phone: '+1 (415) 555-7933',
    projectType: 'UI/UX Design',
    message: 'Looking to redesign our SaaS creative workflow platform for enterprise teams.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'Contacted',
  },
  {
    id: 'enq-3',
    name: 'Chloe Monet',
    email: 'c.monet@monetcreative.org',
    phone: '+44 20 7946 0912',
    projectType: 'Branding & Identity',
    message: 'We need a full brand overhaul, typography suite, and digital guidelines.',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    status: 'Completed',
  },
];

/**
 * Default team members — all personal contact fields are intentionally blank.
 * The business owner must fill these in via /admin/team.
 * DO NOT add invented names, phones, emails, or social links here.
 */
const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-founder',
    name: '',
    role: 'Founder',
    bio: '',
    photoUrl: '',
    mobile: '',
    email: '',
    linkedinUrl: '',
    instagramUrl: '',
    displayOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'team-cofounder',
    name: '',
    role: 'Co-Founder',
    bio: '',
    photoUrl: '',
    mobile: '',
    email: '',
    linkedinUrl: '',
    instagramUrl: '',
    displayOrder: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const StorageService = {
  getProjects(): Project[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    this.saveProjects(DEFAULT_PROJECTS);
    return DEFAULT_PROJECTS;
  },

  saveProjects(projects: Project[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
      window.dispatchEvent(new Event('mirai_storage_update'));
    } catch (e) {
      console.error('Error saving projects', e);
    }
  },

  getServices(): Service[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    this.saveServices(DEFAULT_SERVICES);
    return DEFAULT_SERVICES;
  },

  saveServices(services: Service[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
      window.dispatchEvent(new Event('mirai_storage_update'));
    } catch (e) {
      console.error('Error saving services', e);
    }
  },

  getTestimonials(): Testimonial[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    this.saveTestimonials(DEFAULT_TESTIMONIALS);
    return DEFAULT_TESTIMONIALS;
  },

  saveTestimonials(testimonials: Testimonial[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
      window.dispatchEvent(new Event('mirai_storage_update'));
    } catch (e) {
      console.error('Error saving testimonials', e);
    }
  },

  getContacts(): ContactEnquiry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    this.saveContacts(DEFAULT_CONTACTS);
    return DEFAULT_CONTACTS;
  },

  saveContacts(contacts: ContactEnquiry[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
      window.dispatchEvent(new Event('mirai_storage_update'));
    } catch (e) {
      console.error('Error saving contacts', e);
    }
  },

  addContact(enquiry: Omit<ContactEnquiry, 'id' | 'createdAt' | 'status'>): ContactEnquiry {
    const contacts = this.getContacts();
    const newEnquiry: ContactEnquiry = {
      ...enquiry,
      id: 'enq-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    this.saveContacts([newEnquiry, ...contacts]);
    return newEnquiry;
  },

  getSettings(): SiteSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (data) {
        const parsed: SiteSettings = JSON.parse(data);
        if (parsed.stats?.projects === '25+') {
          parsed.stats.projects = '6+';
          this.saveSettings(parsed);
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    this.saveSettings(DEFAULT_SETTINGS);
    return DEFAULT_SETTINGS;
  },

  saveSettings(settings: SiteSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      window.dispatchEvent(new Event('mirai_storage_update'));
    } catch (e) {
      console.error('Error saving settings', e);
    }
  },

  getPricing(): PricingTier[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRICING);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    this.savePricing(DEFAULT_PRICING);
    return DEFAULT_PRICING;
  },

  savePricing(pricing: PricingTier[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(pricing));
      window.dispatchEvent(new Event('mirai_storage_update'));
    } catch (e) {
      console.error('Error saving pricing', e);
    }
  },

  getVisits(): number {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VISITS);
      if (data) return parseInt(data, 10);
    } catch {
      // fallback
    }
    const initialVisits = 1428;
    localStorage.setItem(STORAGE_KEYS.VISITS, initialVisits.toString());
    return initialVisits;
  },

  recordVisit(): number {
    try {
      const current = this.getVisits();
      const next = current + 1;
      localStorage.setItem(STORAGE_KEYS.VISITS, next.toString());
      return next;
    } catch {
      return 1428;
    }
  },

  getAuth(): AdminUser | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return null;
  },

  setAuth(user: AdminUser | null): void {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.AUTH);
      }
      window.dispatchEvent(new Event('mirai_storage_update'));
    } catch (e) {
      console.error('Error updating auth state', e);
    }
  },

  clearAuth(): void {
    this.setAuth(null);
  },

  // ─── Team Members ───────────────────────────────────────────────────────────

  getTeamMembers(): TeamMember[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TEAM);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    this.saveTeamMembers(DEFAULT_TEAM_MEMBERS);
    return DEFAULT_TEAM_MEMBERS;
  },

  saveTeamMembers(members: TeamMember[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(members));
      window.dispatchEvent(new Event('mirai_storage_update'));
    } catch (e) {
      console.error('Error saving team members', e);
    }
  },

  addTeamMember(member: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>): TeamMember {
    const members = this.getTeamMembers();
    const newMember: TeamMember = {
      ...member,
      id: 'team-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.saveTeamMembers([...members, newMember]);
    return newMember;
  },

  updateTeamMember(id: string, updates: Partial<TeamMember>): void {
    const members = this.getTeamMembers();
    const updated = members.map((m) =>
      m.id === id ? { ...m, ...updates, updatedAt: new Date().toISOString() } : m
    );
    this.saveTeamMembers(updated);
  },

  deleteTeamMember(id: string): void {
    const members = this.getTeamMembers();
    this.saveTeamMembers(members.filter((m) => m.id !== id));
  },

  // ─── Lead Pipeline Workflow ──────────────────────────────────────────────────

  getPipelineLeads(): PipelineLead[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PIPELINE);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    const defaultLeads: PipelineLead[] = [
      {
        id: 'lead-1',
        clientName: 'Rajesh Kumar',
        businessName: 'Royal Silk Sarees',
        phone: '+91 98450 12345',
        email: 'rajesh@royalsilks.in',
        stage: 'Lead',
        dealValue: '₹7,800',
        packageType: 'Premium',
        requirementNotes: 'Traditional silk boutique needing a luxury e-catalog & WhatsApp order system.',
        nextAction: 'Cold call scheduled for today at 4:00 PM',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
      {
        id: 'lead-2',
        clientName: 'Dr. Ananya Sen',
        businessName: 'Aura Skin & Dental Clinic',
        phone: '+91 99320 67890',
        email: 'dr.ananya@auraclinic.com',
        stage: 'Requirement Collected',
        dealValue: '₹7,800',
        packageType: 'Premium',
        requirementNotes: 'Doctor booking portal with before/after gallery and patient testimonials.',
        nextAction: 'Create free preview demo by tomorrow morning',
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      },
      {
        id: 'lead-3',
        clientName: 'Vikram Mehta',
        businessName: 'Nova Cafe & Roastery',
        phone: '+91 98110 54321',
        email: 'vikram@novacafe.in',
        stage: 'Demo Created',
        demoUrl: 'https://preview.novacafe.mirai-demo.com',
        dealValue: '₹6,000',
        packageType: 'Professional',
        requirementNotes: 'Modern artisanal cafe menu with Instagram gallery and table reservation.',
        nextAction: 'Demo link sent via WhatsApp; awaiting approval call',
        createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      },
      {
        id: 'lead-4',
        clientName: 'Sneha Patel',
        businessName: 'Verve Architectural Studio',
        phone: '+91 98200 98765',
        email: 'sneha@vervearch.com',
        stage: 'Development',
        demoUrl: 'https://preview.vervearch.mirai-demo.com',
        dealValue: '₹7,800',
        packageType: 'Premium',
        requirementNotes: 'Minimal luxury architecture portfolio with 3D project modals & enquiry form.',
        nextAction: 'Integrating admin dashboard and cloud database',
        createdAt: new Date(Date.now() - 3600000 * 120).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 'lead-5',
        clientName: 'Karthik Raman',
        businessName: 'Zenith Logistics & Cargo',
        phone: '+91 97890 11223',
        email: 'karthik@zenithcargo.in',
        stage: 'Delivered',
        demoUrl: 'https://zenithcargo.in',
        dealValue: '₹7,800',
        packageType: 'Premium',
        requirementNotes: 'Complete corporate fleet website with quote calculator & live tracking request.',
        nextAction: 'Handover complete; scheduled for 30-day care check-in',
        createdAt: new Date(Date.now() - 3600000 * 240).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
    ];
    this.savePipelineLeads(defaultLeads);
    return defaultLeads;
  },

  savePipelineLeads(leads: PipelineLead[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PIPELINE, JSON.stringify(leads));
      window.dispatchEvent(new Event('mirai_storage_update'));
    } catch (e) {
      console.error('Error saving pipeline leads', e);
    }
  },

  addPipelineLead(lead: Omit<PipelineLead, 'id' | 'createdAt' | 'updatedAt'>): PipelineLead {
    const leads = this.getPipelineLeads();
    const newLead: PipelineLead = {
      ...lead,
      id: 'lead-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.savePipelineLeads([newLead, ...leads]);
    return newLead;
  },

  updatePipelineLead(id: string, updates: Partial<PipelineLead>): void {
    const leads = this.getPipelineLeads();
    const updated = leads.map((l) =>
      l.id === id ? { ...l, ...updates, updatedAt: new Date().toISOString() } : l
    );
    this.savePipelineLeads(updated);
  },

  deletePipelineLead(id: string): void {
    const leads = this.getPipelineLeads();
    this.savePipelineLeads(leads.filter((l) => l.id !== id));
  },
};
