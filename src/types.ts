export interface Project {
  id: string;
  title: string;
  category: 'Websites' | 'Branding' | 'UI/UX' | 'Creative';
  description: string;
  image: string;
  client?: string;
  year?: string;
  link?: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
  features?: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Completed';
}

export interface SiteSettings {
  heroHeading: string;
  heroSubheading: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  aboutTitle: string;
  aboutStory: string;
  aboutSubtext: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  whatsappNumber: string;
  instagramUrl: string;
  linkedinUrl: string;
  customLogoUrl: string | null;
  stats: {
    ideas: string;
    projects: string;
    commitment: string;
    support: string;
  };
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  originalPrice?: string;
  priceOneTime?: string;
  priceMonthly?: string;
  period?: string;
  featured?: boolean;
  isPopular?: boolean;
  isLaunchOffer?: boolean;
  isActive?: boolean;
  badge?: string;
  turnaround: string;
  description: string;
  features: string[];
  breakdown?: { item: string; amount: string }[];
  deliverables?: string[];
  ctaText: string;
  ctaDestination?: string;
  displayOrder?: number;
}

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  token?: string;
}

/**
 * TeamMember represents a Founder or Co-Founder profile.
 * All contact fields are intentionally blank by default — the business owner
 * must populate them through /admin/team. Nothing is ever invented or guessed.
 */
export interface TeamMember {
  id: string;
  name: string;
  role: 'Founder' | 'Co-Founder';
  bio: string;
  photoUrl: string;
  mobile: string;
  email: string;
  linkedinUrl: string;
  instagramUrl: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PipelineStage =
  | 'Lead'
  | 'Contacted'
  | 'Requirement Collected'
  | 'Demo Created'
  | 'Demo Approved'
  | 'Development'
  | 'Testing'
  | 'Delivered';

export interface PipelineLead {
  id: string;
  clientName: string;
  businessName: string;
  phone: string;
  email: string;
  stage: PipelineStage;
  demoUrl?: string;
  requirementNotes?: string;
  dealValue?: string;
  packageType?: 'Basic' | 'Professional' | 'Premium' | 'Custom';
  nextAction?: string;
  createdAt: string;
  updatedAt: string;
}
