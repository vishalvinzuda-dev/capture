export interface ServiceItem {
  id: string;
  title: string;
  category: 'BRANDING' | 'DESIGN' | 'PRINTING' | 'DIGITAL' | 'SOFTWARE' | 'MARKETING';
  tagline: string;
  description: string;
  deliverables: string[];
  iconName: string;
  badge: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  deliverables: string[];
  tags: string[];
  image: string;
  accentColor: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: string;
  metric?: string;
  avatarPlaceholder: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  summary: string;
  description: string;
  details: string[];
  outcome: string;
}

export interface StatItem {
  value: number | string;
  suffix?: string;
  label: string;
  sublabel: string;
  icon: string;
}
