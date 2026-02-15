
export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  year: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface Machine {
  id: number;
  title: string;
  category: string;
  manufacturer: string;
  available: boolean;
  image: string;
  players: number;
  tags: string[];
  videoUrl?: string;
  price?: number;
  description?: string;
  revenue?: string; // e.g. "€3.200 / Monat"
  // Technical Specs for Detail Page
  dimensions?: string; // e.g. "120 x 80 x 200 cm"
  weight?: string; // e.g. "150 kg"
  power?: string; // e.g. "250W"
  condition?: 'Neu' | 'Refurbished' | 'Gebraucht';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface UserProfile {
  name: string;
  email: string;
  company?: string;
  isAdmin?: boolean;
}

export enum NavigationItem {
  WORK = 'work',
  TEAM = 'team',
  ABOUT = 'about',
  CONTACT = 'contact'
}

// CMS Content Types
export interface HeroContent {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  bgImage: string;
}

export interface AboutContent {
  titleLine1: string;
  titleLine2: string;
  description: string;
  mainImage: string;
  badgeTitle: string;
  badgeSubtitle: string;
  feature1Title: string;
  feature1Text: string;
  feature2Title: string;
  feature2Text: string;
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  machines: Machine[];
}
