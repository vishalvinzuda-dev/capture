import { ServiceItem, PortfolioItem, TestimonialItem, ProcessStep, StatItem } from '../types';

export const COMPANY_INFO = {
  name: 'Capture Creatives',
  founded: '2025',
  tagline: 'Design. Build. Brand. Grow.',
  heroTagline: 'One Creative Partner. From Brand to Business.',
  headline: 'WE TURN IDEAS INTO EXPERIENCES.',
  subheadline: 'Branding. Design. Digital. Software. Everything your business needs to move forward.',
  description: 'Capture Creatives combines creative design, branding, printing, marketing, websites and custom software to build complete business solutions under one roof.',
  email: 'hello@capturecreatives.in',
  phone: '+91 94290 84444',
  whatsapp: '919429084444',
  location: 'Rajkot, Gujarat, India',
  address: 'Creative Tech Studio, Rajkot, Gujarat, India 360005',
  availability: 'Accepting select new projects for 2025/2026',
};

export const QUICK_STATS: StatItem[] = [
  {
    value: 2025,
    suffix: '',
    label: 'Founded',
    sublabel: 'Born to bridge design & technology',
    icon: 'Sparkles',
  },
  {
    value: 25,
    suffix: '+',
    label: 'Projects Completed',
    sublabel: 'Delivered across digital, print & software',
    icon: 'FolderCheck',
  },
  {
    value: 400,
    suffix: '+',
    label: 'Students Reached',
    sublabel: 'Through community CPR & first responder initiatives',
    icon: 'Users',
  },
  {
    value: '2×',
    suffix: '',
    label: 'National Gold Medal',
    sublabel: 'Badminton achievement with discipline & focus',
    icon: 'Trophy',
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'branding',
    title: 'Branding',
    category: 'BRANDING',
    tagline: 'Distinctive identities built for timeless authority.',
    description: 'We shape distinctive, memorable brands from scratch or revitalize existing businesses with strategic positioning, iconic visual systems, and clear brand guidelines.',
    deliverables: [
      'Logo Design & System',
      'Complete Brand Identity',
      'Brand Style Guidelines',
      'Corporate Identity Systems',
      'Brand Strategy & Tone of Voice',
      'Stationery & Collateral Suite'
    ],
    iconName: 'Compass',
    badge: 'Strategic & Visual'
  },
  {
    id: 'design',
    title: 'Graphic Design',
    category: 'DESIGN',
    tagline: 'High-impact design that converts attention into trust.',
    description: 'From tactile marketing materials to scroll-stopping digital creatives, our design work balances clean aesthetic refinement with sharp commercial objectives.',
    deliverables: [
      'Social Media Creatives & Ads',
      'Brochures & Company Profiles',
      'Product Catalogues',
      'Packaging & Label Design',
      'Marketing & Pitch Decks',
      'Event & Exhibition Assets'
    ],
    iconName: 'Palette',
    badge: 'Editorial & Commercial'
  },
  {
    id: 'printing',
    title: 'Printing Solutions',
    category: 'PRINTING',
    tagline: 'Mastery over paper, texture, finishes and production.',
    description: 'We bridge digital design with physical excellence. We manage paper stocks, foiling, embossing, and high-precision production so you never deal with print errors.',
    deliverables: [
      'Premium Visiting Cards',
      'Corporate Brochures & Folders',
      'High-Impact Flyers & Leaflets',
      'Large Format Banners & Standees',
      'Bespoke Event & Wedding Invitations',
      'Complete Corporate Printing Suites'
    ],
    iconName: 'Printer',
    badge: 'Precision Production'
  },
  {
    id: 'digital',
    title: 'Website & Digital',
    category: 'DIGITAL',
    tagline: 'Ultra-fast, responsive and cinematic digital experiences.',
    description: 'We design and engineer bespoke websites, high-conversion landing pages, and interactive web applications that elevate your brand and drive measurable conversions.',
    deliverables: [
      'Custom Website Design & Development',
      'UI/UX Design Systems',
      'High-Conversion Landing Pages',
      'E-Commerce Storefronts',
      'Interactive Web Experiences',
      'Mobile-First Responsive Architecture'
    ],
    iconName: 'Globe',
    badge: 'Modern Web Stack'
  },
  {
    id: 'software',
    title: 'Custom Software & ERP',
    category: 'SOFTWARE',
    tagline: 'Tailored business platforms that automate complex workflows.',
    description: 'Instead of generic off-the-shelf software that does not fit your operational reality, we engineer tailored ERPs, inventory portals, and internal management platforms.',
    deliverables: [
      'Custom ERP Platforms',
      'Inventory & Stock Systems',
      'Business Operations Portals',
      'Automated Workflow Engines',
      'Data Analytics & Custom Dashboards',
      'API Integrations & Cloud Infrastructure'
    ],
    iconName: 'CodeXml',
    badge: 'Enterprise Architecture'
  },
  {
    id: 'marketing',
    title: 'Marketing & Shoots',
    category: 'MARKETING',
    tagline: 'Targeted campaigns and visuals that amplify market share.',
    description: 'Holistic growth campaigns pairing strategic paid and organic distribution with high-production product photography, personal branding, and compelling storytelling.',
    deliverables: [
      'Multi-Channel Growth Campaigns',
      'Social Media Marketing & Management',
      'Brand Promotion & Activation',
      'High-Resolution Product Shoots',
      'Executive Personal Branding',
      'Content Strategy & Media Production'
    ],
    iconName: 'Megaphone',
    badge: 'Growth & Visuals'
  }
];

export const WORKFLOW_PIPELINE = [
  { step: '01', name: 'IDEA', desc: 'Discovery & Strategic Framing', color: 'from-blue-500/20 to-blue-500/5' },
  { step: '02', name: 'BRANDING', desc: 'Visual Identity & Design Language', color: 'from-indigo-500/20 to-indigo-500/5' },
  { step: '03', name: 'DESIGN', desc: 'Tactile & Digital Collaterals', color: 'from-violet-500/20 to-violet-500/5' },
  { step: '04', name: 'PRINT', desc: 'Precision Production & Finish', color: 'from-sky-500/20 to-sky-500/5' },
  { step: '05', name: 'MARKETING', desc: 'Launch Campaigns & Shoots', color: 'from-cyan-500/20 to-cyan-500/5' },
  { step: '06', name: 'WEBSITE', desc: 'High-Impact Digital Hub', color: 'from-emerald-500/20 to-emerald-500/5' },
  { step: '07', name: 'SOFTWARE', desc: 'Tailored ERP & Automation', color: 'from-amber-500/20 to-amber-500/5' },
  { step: '08', name: 'BUSINESS GROWTH', desc: 'Compounding Scalable Impact', color: 'from-blue-600/30 to-indigo-600/10' },
];

export const PRABHU_CASE_STUDY = {
  title: 'FROM PROBLEM TO PLATFORM',
  subtitle: 'Prabhu Group — Custom Business Management Solution',
  client: 'Prabhu Group',
  year: '2025',
  type: 'Custom ERP & Business Automation',
  overview: 'Prabhu Group was grappling with fragmented operational logs, scattered communication, and manual tracking across disparate spreadsheets. Capture Creatives designed and deployed a centralized, custom-built ERP platform tailored strictly around their real-world day-to-day workflow.',
  challenge: 'Information was distributed across multiple disconnected tools and paper records, making real-time tracking, inventory reconciliation, and timely business decisions inefficient and prone to human error.',
  solution: 'A unified, modern cloud platform with role-based access, instant inventory logs, task assignment workflows, automated status notifications, and executive analytical dashboards.',
  results: [
    { metric: '100%', label: 'Centralized Records', desc: 'All operational branches feeding into a single source of truth.' },
    { metric: '< 3s', label: 'Real-time Updates', desc: 'Instant status sync across teams and field personnel.' },
    { metric: '0', label: 'Data Redundancies', desc: 'Eliminated duplicate manual entries and spreadsheet mismatches.' },
    { metric: '100%', label: 'Custom Tailored', desc: 'Built strictly around actual business processes, not generic constraints.' }
  ],
  beforePoints: [
    'Scattered information across unlinked files',
    'Manual tracking causing delays and log errors',
    'Disconnected processes between team departments',
    'Zero centralized executive oversight'
  ],
  afterPoints: [
    'Single source of truth with real-time sync',
    'Automated task workflows and instant notifications',
    'Structured management with role-based controls',
    'Scalable, secure digital cloud infrastructure'
  ],
  modules: [
    { name: 'Unified Operations Hub', desc: 'Central command for day-to-day transaction logs and task schedules.' },
    { name: 'Live Inventory & Order Matrix', desc: 'Automated tracking of stock flow with proactive threshold alerts.' },
    { name: 'Role-Based Team Portals', desc: 'Granular permissions ensuring clean data access for every department.' },
    { name: 'Executive Insights Suite', desc: 'High-level real-time KPI graphs, cost breakdowns and exportable reports.' }
  ]
};

export const PORTFOLIO_PROJECTS: PortfolioItem[] = [
  {
    id: 'prabhu-group-erp',
    title: 'Prabhu Group Operations Suite',
    client: 'Prabhu Group',
    category: 'Software & ERP',
    year: '2025',
    tagline: 'Custom business management platform designed around real-world workflows.',
    description: 'An enterprise-grade operational management and ERP platform built to eliminate friction, unify inventory logs, and grant complete real-time visibility.',
    deliverables: ['Custom ERP Platform', 'Role-Based Portals', 'Automated Workflows', 'Executive Analytics'],
    tags: ['Software', 'ERP', 'Enterprise', 'Dashboard'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#2563EB'
  },
  {
    id: 'lumina-brand-identity',
    title: 'Lumina Horizon Identity',
    client: 'Lumina Tech Labs',
    category: 'Branding & Identity',
    year: '2025',
    tagline: 'Minimalist corporate identity system with architectural typography.',
    description: 'A comprehensive brand identity framework comprising custom vector logomarks, typography guidelines, stationery suites, and digital design system.',
    deliverables: ['Brand Guidelines', 'Logo System', 'Stationery Suite', 'Corporate Collateral'],
    tags: ['Branding', 'Identity', 'Typography', 'Stationery'],
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#4F46E5'
  },
  {
    id: 'apex-print-collateral',
    title: 'Apex Prime Corporate Print Suite',
    client: 'Apex Industrial',
    category: 'Printing & Packaging',
    year: '2025',
    tagline: 'Tactile luxury printing with bespoke foil stamping and custom die-cuts.',
    description: 'Precision physical production featuring textured cotton stock, metallic foil accents, and high-durability exhibition brochures.',
    deliverables: ['Visiting Cards', 'Foil Stamped Folders', 'Exhibition Standees', 'Product Catalogues'],
    tags: ['Printing', 'Collateral', 'Luxury Paper', 'Exhibition'],
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#0284C7'
  },
  {
    id: 'vanguard-digital-hub',
    title: 'Vanguard Capital Digital Platform',
    client: 'Vanguard Partners',
    category: 'Website & UI/UX',
    year: '2025',
    tagline: 'High-performance interactive web experience with smooth micro-interactions.',
    description: 'A modern, ultra-responsive website engineered with sub-second load times, dynamic case studies showcase, and frictionless lead qualification.',
    deliverables: ['Custom Web Architecture', 'UI/UX Design', 'Performance Tuning', 'CMS Integration'],
    tags: ['Web Development', 'UI/UX', 'Performance', 'React'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#0D9488'
  },
  {
    id: 'aurora-product-campaign',
    title: 'Aurora Studio Product Launch',
    client: 'Aurora Lifestyle',
    category: 'Marketing & Shoots',
    year: '2025',
    tagline: 'Cinematic visual storytelling paired with strategic ad distribution.',
    description: 'End-to-end launch campaign combining editorial studio photography, high-conversion social ad reels, and targeted multi-channel distribution.',
    deliverables: ['Studio Product Shoots', 'Campaign Creatives', 'Paid Social Strategy', 'Influencer Deck'],
    tags: ['Marketing', 'Product Shoots', 'Campaigns', 'Social Media'],
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#EA580C'
  },
  {
    id: 'zenith-inventory-portal',
    title: 'Zenith Logistics Portal',
    client: 'Zenith Global',
    category: 'Custom Software',
    year: '2025',
    tagline: 'Automated warehouse inventory reconciliation and tracking engine.',
    description: 'Cloud-native inventory system featuring barcode scanning support, real-time threshold alerts, and automated multi-location sync.',
    deliverables: ['Warehouse Portal', 'Live Barcode Integration', 'Audit Trail Logs', 'Cloud Backend'],
    tags: ['Software', 'Logistics', 'Automation', 'Cloud'],
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#6366F1'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    quote: 'Capture Creatives understood what we needed and turned the idea into a complete solution. The entire process from design to execution was smooth and professional.',
    author: 'Operational Director',
    role: 'Managing Director',
    company: 'Prabhu Group',
    industry: 'Enterprise Operations & Logistics',
    metric: 'Custom ERP Implementation',
    avatarPlaceholder: 'PG'
  },
  {
    id: 'test-2',
    quote: 'Working with one partner for our brand identity, corporate printing, and digital web experience saved us months of coordination. The precision is unmatched.',
    author: 'Principal Founder',
    role: 'Chief Executive Officer',
    company: 'Lumina Tech Labs',
    industry: 'Technology & Hardware',
    metric: 'Complete Brand & Web Launch',
    avatarPlaceholder: 'LT'
  },
  {
    id: 'test-3',
    quote: 'From visiting cards with delicate foil finishes to our high-scale product launch campaign, Capture Creatives delivered aesthetic perfection on strict deadlines.',
    author: 'Marketing Head',
    role: 'VP of Brand Marketing',
    company: 'Apex Prime Industries',
    industry: 'Manufacturing & Exports',
    metric: 'Full Print & Campaign Suite',
    avatarPlaceholder: 'AP'
  },
  {
    id: 'test-4',
    quote: 'They do not just build pretty mockups — they build platforms that solve actual day-to-day business bottlenecks. Highly recommended for custom business software.',
    author: 'Co-Founder & CTO',
    role: 'Director of Technology',
    company: 'Zenith Global Solutions',
    industry: 'Supply Chain & Infrastructure',
    metric: 'Automated Management Portal',
    avatarPlaceholder: 'ZG'
  }
];

export const WHY_CHOOSE_US = [
  {
    number: '01',
    title: 'ONE-STOP SOLUTION',
    description: 'Creative, printing, and technology services under one roof. No more coordinating between 5 disconnected freelancers and agencies.'
  },
  {
    number: '02',
    title: 'CUSTOM, NOT COOKIE-CUTTER',
    description: 'Every solution is architected around your specific business reality, operational workflows, and commercial targets.'
  },
  {
    number: '03',
    title: 'CREATIVE + TECHNOLOGY',
    description: 'Design thinking seamlessly combined with high-grade software engineering, modern web stacks, and production expertise.'
  },
  {
    number: '04',
    title: 'BUSINESS-FIRST APPROACH',
    description: 'We focus on solving actual operational bottlenecks and generating measurable ROI, not just making aesthetic surfaces.'
  },
  {
    number: '05',
    title: 'END-TO-END EXECUTION',
    description: 'From initial napkin sketches and paper stock selection to cloud server deployment and long-term evolutionary support.'
  },
  {
    number: '06',
    title: 'LONG-TERM PARTNER',
    description: 'We build lasting strategic relationships as your dedicated in-house creative and technological growth arm.'
  }
];

export const SOCIAL_IMPACT_DATA = {
  title: 'CREATIVE WORK. REAL-WORLD IMPACT.',
  subtitle: 'Community, Health & Social Responsibility Initiatives',
  yiInvolvement: 'Active 3-year commitment with Young Indians (Yi) driving impactful grassroots youth initiatives.',
  pledge: '10% of Capture Creatives profits are personally contributed towards social, educational, and community initiatives.',
  initiatives: [
    {
      title: 'CPR & First Responder Training',
      stat: '400+ Students',
      desc: 'Trained over 400 RK University students with certified life-saving first responder and emergency CPR skills.'
    },
    {
      title: 'Medical Awareness & Health Drives',
      stat: 'Multi-City',
      desc: 'Spearheaded preventative health awareness camps and wellness education sessions across student and youth communities.'
    },
    {
      title: 'Civic & Campus Clean-Up Drives',
      stat: 'Active Action',
      desc: 'Organized extensive environmental cleanliness and sustainability campaigns across regional zones.'
    }
  ]
};

export const ACHIEVEMENTS_DATA = [
  {
    category: 'ATHLETICS & EXCELLENCE',
    title: '2× National Badminton Gold Medal',
    subtitle: 'National Level Achievement',
    desc: 'Demonstrated athletic discipline, resilience, and high-performance focus under pressure.',
    tag: 'Sports Leadership',
    year: 'National Level'
  },
  {
    category: 'LEADERSHIP & SERVICE',
    title: 'Young Indians (Yi) — Yuva Chair',
    subtitle: 'Yuva Health Chair & Yuva Co-Chair',
    desc: 'Led youth health chapters, spearheaded state-level youth conferences, and drove community health policy advocacy.',
    tag: 'Community Leadership',
    year: '3+ Years'
  },
  {
    category: 'UNIVERSITY INITIATIVE',
    title: 'RKU Shutter Smashers Club',
    subtitle: 'Founder & Operations Management',
    desc: 'Handled operations, organized inter-college championships, and managed club engagement at RK University.',
    tag: 'Club Management',
    year: 'RK University'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'DISCOVER',
    summary: 'Understand your business, goals and problem.',
    description: 'We conduct in-depth operational audits, stakeholder interviews, and market analysis to uncover core objectives and system requirements.',
    details: ['Business Workflow Audit', 'Target Audience Profiling', 'Technical Requirement Mapping'],
    outcome: 'Clear Project Blueprint & Roadmap'
  },
  {
    step: '02',
    title: 'DEFINE',
    summary: 'Identify the right creative or technology solution.',
    description: 'We formulate the precise architectural strategy, design tokens, and technical stack to solve the problem without unnecessary bloat.',
    details: ['Information Architecture', 'System Architecture Specs', 'Design Direction & Moodboards'],
    outcome: 'Detailed Scope & Milestone Schedule'
  },
  {
    step: '03',
    title: 'CREATE',
    summary: 'Design the experience, identity or product.',
    description: 'Our design studio crafts high-fidelity brand identities, tactile print assets, and interactive UI prototypes with obsessive attention to detail.',
    details: ['High-Fidelity Wireframes', 'Interactive UI Prototypes', 'Production-Ready Brand Assets'],
    outcome: 'Approved Interactive Design Suite'
  },
  {
    step: '04',
    title: 'BUILD',
    summary: 'Develop and execute the final solution.',
    description: 'Engineers build clean, performant code while our print production team coordinates premium finishes, paper stocks, and quality checks.',
    details: ['Clean Code Implementation', 'Database & API Integration', 'Quality Assurance & Testing'],
    outcome: 'Production-Grade Software & Collateral'
  },
  {
    step: '05',
    title: 'DELIVER',
    summary: 'Launch, refine and support the business.',
    description: 'We orchestrate seamless deployment, conduct team training, monitor live analytics, and provide continuous evolutionary upgrades.',
    details: ['Zero-Downtime Deployment', 'Staff Training & Onboarding', 'Ongoing Maintenance & Support'],
    outcome: 'Live Impact & Compounding Growth'
  }
];
