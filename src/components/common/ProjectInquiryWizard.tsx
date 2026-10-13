import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Building2,
  Check,
  ArrowRight,
  ArrowLeft,
  Mail,
  Phone,
  Sparkles,
  Layers,
  Globe,
  TrendingUp,
  Code2,
  Clock,
  CheckCircle,
  Copy,
  ExternalLink,
  Zap,
  Calendar,
  Compass,
  Briefcase
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_INFO } from '../../data/content';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

export interface ProjectInquiryWizardProps {
  preselectedService?: string;
  isModal?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  className?: string;
}

export type ClientType = 'personal' | 'company';

export type ProjectCategoryKey = 'Branding' | 'Graphics' | 'Website' | 'Marketing' | 'Custom Software';

interface ProjectTypeOption {
  key: ProjectCategoryKey;
  label: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PROJECT_TYPE_OPTIONS: ProjectTypeOption[] = [
  {
    key: 'Branding',
    label: 'Branding',
    subtitle: 'Logo design, brand identity & web',
    icon: Sparkles
  },
  {
    key: 'Graphics',
    label: 'Graphics',
    subtitle: 'Catalog, packaging & visiting card',
    icon: Layers
  },
  {
    key: 'Website',
    label: 'Website',
    subtitle: 'Portfolio, landing & mobile-first',
    icon: Globe
  },
  {
    key: 'Marketing',
    label: 'Marketing',
    subtitle: 'Growth campaigns, ads & SEO',
    icon: TrendingUp
  },
  {
    key: 'Custom Software',
    label: 'Custom Software',
    subtitle: 'Personal i-ERP, inventory & brand web',
    icon: Code2
  }
];

export const PROJECT_DELIVERABLES: Record<ProjectCategoryKey, string[]> = {
  'Branding': [
    'Logo design',
    'Brand identity',
    'Branding with web (landing page)'
  ],
  'Graphics': [
    'Catalog',
    'Product design',
    'Visiting card'
  ],
  'Website': [
    'Portfolio',
    'Landing page',
    'Mobile First website'
  ],
  'Custom Software': [
    'Personal i-ERP',
    'Inventory / stock management',
    'Website for brand'
  ],
  'Marketing': [
    'Social media growth',
    'Performance ads & campaigns',
    'Content & SEO strategy'
  ]
};

const PERSONAL_PROFESSIONS = [
  'Creator / Influencer',
  'Freelancer / Consultant',
  'Doctor / Healthcare',
  'Founder / Entrepreneur',
  'Artist / Designer',
  'Student / Early Career',
  'Other'
];

const BUSINESS_ROLES = [
  'Owner / Founder',
  'Marketing Lead',
  'Co-Founder / Director',
  'Product / Ops Lead',
  'Other'
];

const BUSINESS_TYPES = [
  'E-commerce & Retail',
  'Tech & Software / SaaS',
  'Manufacturing & Export',
  'Real Estate & Architecture',
  'Healthcare & Wellness',
  'Food & Hospitality',
  'Other'
];

export const URGENCY_OPTIONS = [
  {
    id: 'very_urgent',
    title: 'Very Urgent',
    duration: '1-2 weeks',
    tagline: 'High priority accelerated delivery sprint',
    icon: Zap,
    color: 'text-amber-600 bg-amber-500/10 border-amber-500/30'
  },
  {
    id: 'not_urgent',
    title: 'Not Urgent',
    duration: '3-4 weeks',
    tagline: 'Standard collaborative rollout & refinement',
    icon: Clock,
    color: 'text-neutral-700 bg-neutral-100 border-neutral-300'
  },
  {
    id: 'regular',
    title: 'Regular',
    duration: '1-2 months',
    tagline: 'Full phased development & multi-stage testing',
    icon: Calendar,
    color: 'text-neutral-700 bg-neutral-100 border-neutral-300'
  }
];

const STEPS = [
  { id: 1, label: 'Entity', title: 'Who is this project for?', subtitle: 'Select personal or company' },
  { id: 2, label: 'Details', title: 'Your Details', subtitle: 'Contact and background profile' },
  { id: 3, label: 'Services', title: 'Type of Project', subtitle: 'Select one or more capabilities' },
  { id: 4, label: 'Scope', title: 'Details About Project', subtitle: 'Pick your exact deliverables' },
  { id: 5, label: 'Timeline', title: 'Scope & Urgency', subtitle: 'Target turnaround & additional notes' },
  { id: 6, label: 'WhatsApp', title: 'Continue with WhatsApp', subtitle: 'Review specifications & launch message' }
];

// Official WhatsApp icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.414z"/>
  </svg>
);

export const ProjectInquiryWizard: React.FC<ProjectInquiryWizardProps> = ({
  preselectedService,
  isModal = false,
  onClose,
  onSuccess,
  className
}) => {
  const formUid = useId();

  // Helper to map incoming preselected service to category if explicitly provided
  const getInitialCategories = (): ProjectCategoryKey[] => {
    if (!preselectedService) return [];
    const lower = preselectedService.toLowerCase();
    if (lower.includes('brand')) return ['Branding'];
    if (lower.includes('graphic') || lower.includes('print')) return ['Graphics'];
    if (lower.includes('web') || lower.includes('ui/ux')) return ['Website'];
    if (lower.includes('software') || lower.includes('erp')) return ['Custom Software'];
    if (lower.includes('marketing')) return ['Marketing'];
    return [];
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // 1. Client Type: PRESELECTED AS 'personal'
  const [clientType, setClientType] = useState<ClientType>('personal');

  // 2. Details
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    phone: '',
    email: '',
    profession: PERSONAL_PROFESSIONS[0],
    customProfession: ''
  });

  const [businessDetails, setBusinessDetails] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    businessRole: BUSINESS_ROLES[0],
    businessType: BUSINESS_TYPES[0],
    customBusinessType: ''
  });

  // 3. Project Types: NO initial select (starts empty so user chooses freely)
  const [selectedTypes, setSelectedTypes] = useState<ProjectCategoryKey[]>(
    preselectedService ? getInitialCategories() : []
  );

  // 4. Deliverables: NO initial select (starts empty)
  const [selectedDeliverables, setSelectedDeliverables] = useState<string[]>([]);

  // 5. Scope & Urgency: NO initial select (starts empty)
  const [selectedUrgency, setSelectedUrgency] = useState<string>('');
  const [extraDescription, setExtraDescription] = useState<string>('');

  // Status & Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCopied, setIsCopied] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);

  // Toggle Project Type (clean toggle without forcing minimum 1)
  const toggleProjectType = (typeKey: ProjectCategoryKey) => {
    if (selectedTypes.includes(typeKey)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== typeKey));
      // Remove deliverables belonging to this category
      const catDeliverables = PROJECT_DELIVERABLES[typeKey] || [];
      setSelectedDeliverables((prev) => prev.filter((d) => !catDeliverables.includes(d)));
    } else {
      setSelectedTypes([...selectedTypes, typeKey]);
      if (errors.types) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.types;
          return updated;
        });
      }
    }
  };

  // Toggle Deliverable (clean toggle without forcing minimum 1)
  const toggleDeliverable = (item: string) => {
    if (selectedDeliverables.includes(item)) {
      setSelectedDeliverables(selectedDeliverables.filter((d) => d !== item));
    } else {
      setSelectedDeliverables([...selectedDeliverables, item]);
      if (errors.deliverables) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.deliverables;
          return updated;
        });
      }
    }
  };

  // Step Validation
  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!clientType) {
        newErrors.clientType = 'Please select a project type.';
      }
    } else if (stepNumber === 2) {
      if (clientType === 'personal') {
        if (!personalDetails.name.trim()) newErrors.name = 'Please enter your name.';
        if (!personalDetails.phone.trim()) newErrors.phone = 'Please enter your contact number.';
        if (!personalDetails.email.trim() || !personalDetails.email.includes('@')) {
          newErrors.email = 'Please provide a valid email.';
        }
        if (personalDetails.profession === 'Other' && !personalDetails.customProfession.trim()) {
          newErrors.profession = 'Please specify your profession.';
        }
      } else {
        if (!businessDetails.companyName.trim()) newErrors.companyName = 'Please enter your business/company name.';
        if (!businessDetails.contactName.trim()) newErrors.contactName = 'Please enter your contact name.';
        if (!businessDetails.phone.trim()) newErrors.phone = 'Please enter your contact number.';
        if (!businessDetails.email.trim() || !businessDetails.email.includes('@')) {
          newErrors.email = 'Please provide a valid email.';
        }
        if (businessDetails.businessType === 'Other' && !businessDetails.customBusinessType.trim()) {
          newErrors.businessType = 'Please specify your business type.';
        }
      }
    } else if (stepNumber === 3) {
      if (selectedTypes.length === 0) {
        newErrors.types = 'Please select at least one project type.';
      }
    } else if (stepNumber === 4) {
      if (selectedDeliverables.length === 0) {
        newErrors.deliverables = 'Please select at least one deliverable option.';
      }
    } else if (stepNumber === 5) {
      if (!selectedUrgency) {
        newErrors.urgency = 'Please select your target timeline / urgency.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length) {
        setDirection(1);
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Compile WhatsApp Message
  const constructWhatsAppMessage = (): string => {
    const isPersonal = clientType === 'personal';
    const cleanTypes = selectedTypes.join(', ');
    const deliverablesList = selectedDeliverables.map((d) => `  • ${d}`).join('\n');

    let clientSection = '';
    if (isPersonal) {
      const prof =
        personalDetails.profession === 'Other'
          ? personalDetails.customProfession.trim() || 'Other'
          : personalDetails.profession;
      clientSection =
        `👤 *Client Entity:* Personal Project\n` +
        `📛 *Name:* ${personalDetails.name.trim()}\n` +
        `📞 *Contact / WhatsApp:* ${personalDetails.phone.trim()}\n` +
        `✉️ *Email:* ${personalDetails.email.trim()}\n` +
        `💼 *Profession:* ${prof}`;
    } else {
      const bType =
        businessDetails.businessType === 'Other'
          ? businessDetails.customBusinessType.trim() || 'Other'
          : businessDetails.businessType;
      clientSection =
        `🏢 *Client Entity:* Company / Business\n` +
        `🏢 *Company Name:* ${businessDetails.companyName.trim()}\n` +
        `👤 *Contact Person:* ${businessDetails.contactName.trim()}\n` +
        `💼 *Role:* ${businessDetails.businessRole}\n` +
        `🏷️ *Business Type:* ${bType}\n` +
        `📞 *Contact / WhatsApp:* ${businessDetails.phone.trim()}\n` +
        `✉️ *Email:* ${businessDetails.email.trim()}`;
    }

    const message =
      `*PROJECT INQUIRY — CAPTURE CREATIVES*\n\n` +
      `${clientSection}\n\n` +
      `🎯 *Type of Project:* ${cleanTypes}\n\n` +
      `📋 *Project Scope / Deliverables:*\n${deliverablesList}\n\n` +
      `⏱️ *Timeline / Urgency:* ${selectedUrgency}\n` +
      (extraDescription.trim() ? `\n📝 *Additional Notes:*\n"${extraDescription.trim()}"\n` : '') +
      `\n---\n*Sent from capturecreatives.in*`;

    return message;
  };

  // Launch WhatsApp Redirect
  const handleLaunchWhatsApp = () => {
    const message = constructWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const targetNumber = COMPANY_INFO.whatsapp || '918469030892';
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encoded}`;

    // Confetti celebration
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#D97706', '#10B981', '#18181B']
      });
    } catch {
      // Ignore in non-browser environments
    }

    setHasRedirected(true);

    if (onSuccess) {
      onSuccess();
    }

    // Redirect to WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopySpecifications = async () => {
    const message = constructWhatsAppMessage();
    try {
      await navigator.clipboard.writeText(message);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2400);
    } catch {
      // Fallback
    }
  };

  const stepVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 24 : -24,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -24 : 24,
      opacity: 0
    })
  };

  return (
    <div className={cn("w-full flex flex-col justify-between", className)}>
      {/* Top Header & Minimal Progress */}
      <div className="pb-4 border-b border-neutral-100 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950 font-display tracking-tight">
              Start Your Project
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5 font-subheading">
              Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].subtitle}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-[11px] font-semibold">
            <span>{STEPS[currentStep - 1].label}</span>
            <span className="text-neutral-400">·</span>
            <span>{currentStep}/{STEPS.length}</span>
          </div>
        </div>

        {/* Stepper Dots Track */}
        <div className="flex items-center justify-between relative max-w-md mx-auto w-full pt-1 px-1">
          {STEPS.map((step, idx) => {
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;

            return (
              <React.Fragment key={step.id}>
                <button
                  type="button"
                  onClick={() => {
                    if (step.id < currentStep) {
                      setDirection(-1);
                      setCurrentStep(step.id);
                    }
                  }}
                  disabled={step.id > currentStep}
                  aria-label={`Jump to step ${step.id}`}
                  className={cn(
                    "w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-300 relative z-10",
                    isCompleted
                      ? "bg-neutral-950 text-white cursor-pointer hover:bg-neutral-800"
                      : isActive
                      ? "bg-neutral-950 text-white ring-4 ring-neutral-200/90 shadow-xs"
                      : "bg-white text-neutral-400 border border-neutral-200 cursor-default"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 text-amber-400 stroke-[3]" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </button>

                {idx < STEPS.length - 1 && (
                  <div className="flex-1 mx-1 sm:mx-2 h-0.5 bg-neutral-100 relative">
                    <div
                      className="h-full bg-neutral-950 transition-all duration-300"
                      style={{
                        width: currentStep > step.id ? '100%' : '0%'
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Step Dynamic Viewport */}
      <div className="py-4 min-h-[340px] flex flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          
          {/* STEP 1: CLIENT ENTITY (PERSONAL PRESELECTED) */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="space-y-4"
            >
              <div>
                <h4 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
                  Who is this project for?
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5 font-subheading">
                  Select your profile type to tailor our workflow and deliverables.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {/* 1. Personal Project (Preselected) */}
                <button
                  type="button"
                  onClick={() => setClientType('personal')}
                  className={cn(
                    "p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 relative group",
                    clientType === 'personal'
                      ? "bg-neutral-950 text-white border-neutral-950 shadow-md ring-2 ring-neutral-950/20"
                      : "bg-[#FAFAF9] hover:bg-neutral-100/90 text-neutral-800 border-neutral-200/90"
                  )}
                >
                  <div className="flex items-start justify-between w-full">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                        clientType === 'personal'
                          ? "bg-white/10 text-amber-400"
                          : "bg-neutral-200/70 text-neutral-700 group-hover:bg-neutral-200"
                      )}
                    >
                      <User className="w-5 h-5" />
                    </div>
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center",
                        clientType === 'personal'
                          ? "border-amber-400 bg-amber-400 text-neutral-950"
                          : "border-neutral-300 bg-white"
                      )}
                    >
                      {clientType === 'personal' && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="block text-sm sm:text-base font-bold font-display">
                        Personal Project
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-amber-500/20 text-amber-300">
                        Preselected
                      </span>
                    </div>
                    <span
                      className={cn(
                        "block text-xs mt-1 leading-relaxed font-subheading",
                        clientType === 'personal' ? "text-neutral-300" : "text-neutral-500"
                      )}
                    >
                      Personal brand, creator shoot, portfolio, freelancer identity or solo endeavor.
                    </span>
                  </div>
                </button>

                {/* 2. Company / Business */}
                <button
                  type="button"
                  onClick={() => setClientType('company')}
                  className={cn(
                    "p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 relative group",
                    clientType === 'company'
                      ? "bg-neutral-950 text-white border-neutral-950 shadow-md ring-2 ring-neutral-950/20"
                      : "bg-[#FAFAF9] hover:bg-neutral-100/90 text-neutral-800 border-neutral-200/90"
                  )}
                >
                  <div className="flex items-start justify-between w-full">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                        clientType === 'company'
                          ? "bg-white/10 text-amber-400"
                          : "bg-neutral-200/70 text-neutral-700 group-hover:bg-neutral-200"
                      )}
                    >
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center",
                        clientType === 'company'
                          ? "border-amber-400 bg-amber-400 text-neutral-950"
                          : "border-neutral-300 bg-white"
                      )}
                    >
                      {clientType === 'company' && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <div>
                    <span className="block text-sm sm:text-base font-bold font-display">
                      Company / Business
                    </span>
                    <span
                      className={cn(
                        "block text-xs mt-1 leading-relaxed font-subheading",
                        clientType === 'company' ? "text-neutral-300" : "text-neutral-500"
                      )}
                    >
                      Enterprise branding, commercial printing, custom ERP/software or marketing campaigns.
                    </span>
                  </div>
                </button>
              </div>

              {errors.clientType && (
                <p className="text-xs text-rose-500 font-semibold">{errors.clientType}</p>
              )}
            </motion.div>
          )}

          {/* STEP 2: PERSONAL OR BUSINESS DETAILS */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="space-y-4"
            >
              <div>
                <h4 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
                  {clientType === 'personal' ? 'Personal Details' : 'Business & Contact Details'}
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5 font-subheading">
                  {clientType === 'personal'
                    ? 'Help us understand your background to customize your deliverables.'
                    : 'Provide your company overview and point of contact.'}
                </p>
              </div>

              {clientType === 'personal' ? (
                /* PERSONAL DETAILS FORM */
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Name */}
                    <div>
                      <label htmlFor={`${formUid}-personal-name`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1 font-display">
                        <User className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Your Full Name</span>
                        <span className="text-amber-600">*</span>
                      </label>
                      <input
                        id={`${formUid}-personal-name`}
                        type="text"
                        placeholder="e.g. Alex Morgan"
                        value={personalDetails.name}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
                        className={cn(
                          "w-full px-3.5 py-2.5 bg-[#FAFAF9] hover:bg-neutral-50 focus:bg-white border rounded-xl text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 transition-all",
                          errors.name ? "border-rose-400 bg-rose-50/20" : "border-neutral-200/90"
                        )}
                      />
                      {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
                    </div>

                    {/* Contact Number / WhatsApp */}
                    <div>
                      <label htmlFor={`${formUid}-personal-phone`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1 font-display">
                        <Phone className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Contact Number / WhatsApp</span>
                        <span className="text-amber-600">*</span>
                      </label>
                      <input
                        id={`${formUid}-personal-phone`}
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={personalDetails.phone}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
                        className={cn(
                          "w-full px-3.5 py-2.5 bg-[#FAFAF9] hover:bg-neutral-50 focus:bg-white border rounded-xl text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 transition-all",
                          errors.phone ? "border-rose-400 bg-rose-50/20" : "border-neutral-200/90"
                        )}
                      />
                      {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor={`${formUid}-personal-email`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1 font-display">
                      <Mail className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Email Address</span>
                      <span className="text-amber-600">*</span>
                    </label>
                    <input
                      id={`${formUid}-personal-email`}
                      type="email"
                      placeholder="e.g. alex@example.com"
                      value={personalDetails.email}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                      className={cn(
                        "w-full px-3.5 py-2.5 bg-[#FAFAF9] hover:bg-neutral-50 focus:bg-white border rounded-xl text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 transition-all",
                        errors.email ? "border-rose-400 bg-rose-50/20" : "border-neutral-200/90"
                      )}
                    />
                    {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                  </div>

                  {/* Profession Selectable Pills */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2 font-display">
                      <Briefcase className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Your Profession / Role</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {PERSONAL_PROFESSIONS.map((prof) => {
                        const isSelected = personalDetails.profession === prof;
                        return (
                          <button
                            key={prof}
                            type="button"
                            onClick={() => setPersonalDetails({ ...personalDetails, profession: prof })}
                            className={cn(
                              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border",
                              isSelected
                                ? "bg-neutral-900 text-white border-neutral-900 shadow-2xs font-semibold"
                                : "bg-[#FAFAF9] hover:bg-neutral-100 text-neutral-700 border-neutral-200/80"
                            )}
                          >
                            {prof}
                          </button>
                        );
                      })}
                    </div>

                    {personalDetails.profession === 'Other' && (
                      <input
                        type="text"
                        placeholder="Please specify your profession..."
                        value={personalDetails.customProfession}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, customProfession: e.target.value })}
                        className="mt-2 w-full px-3.5 py-2 bg-[#FAFAF9] border border-neutral-200/90 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-500/25"
                      />
                    )}
                  </div>
                </div>
              ) : (
                /* BUSINESS DETAILS FORM */
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Business Name */}
                    <div>
                      <label htmlFor={`${formUid}-business-name`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1 font-display">
                        <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Business / Brand Name</span>
                        <span className="text-amber-600">*</span>
                      </label>
                      <input
                        id={`${formUid}-business-name`}
                        type="text"
                        placeholder="e.g. Prabhu Group / Apex Retail"
                        value={businessDetails.companyName}
                        onChange={(e) => setBusinessDetails({ ...businessDetails, companyName: e.target.value })}
                        className={cn(
                          "w-full px-3.5 py-2.5 bg-[#FAFAF9] hover:bg-neutral-50 focus:bg-white border rounded-xl text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 transition-all",
                          errors.companyName ? "border-rose-400 bg-rose-50/20" : "border-neutral-200/90"
                        )}
                      />
                      {errors.companyName && <p className="text-[11px] text-rose-500 mt-1">{errors.companyName}</p>}
                    </div>

                    {/* Contact Person Name */}
                    <div>
                      <label htmlFor={`${formUid}-business-contact`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1 font-display">
                        <User className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Contact Person Name</span>
                        <span className="text-amber-600">*</span>
                      </label>
                      <input
                        id={`${formUid}-business-contact`}
                        type="text"
                        placeholder="e.g. Ramesh Patel"
                        value={businessDetails.contactName}
                        onChange={(e) => setBusinessDetails({ ...businessDetails, contactName: e.target.value })}
                        className={cn(
                          "w-full px-3.5 py-2.5 bg-[#FAFAF9] hover:bg-neutral-50 focus:bg-white border rounded-xl text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 transition-all",
                          errors.contactName ? "border-rose-400 bg-rose-50/20" : "border-neutral-200/90"
                        )}
                      />
                      {errors.contactName && <p className="text-[11px] text-rose-500 mt-1">{errors.contactName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Contact Number */}
                    <div>
                      <label htmlFor={`${formUid}-business-phone`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1 font-display">
                        <Phone className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Phone / WhatsApp</span>
                        <span className="text-amber-600">*</span>
                      </label>
                      <input
                        id={`${formUid}-business-phone`}
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={businessDetails.phone}
                        onChange={(e) => setBusinessDetails({ ...businessDetails, phone: e.target.value })}
                        className={cn(
                          "w-full px-3.5 py-2.5 bg-[#FAFAF9] hover:bg-neutral-50 focus:bg-white border rounded-xl text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 transition-all",
                          errors.phone ? "border-rose-400 bg-rose-50/20" : "border-neutral-200/90"
                        )}
                      />
                      {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor={`${formUid}-business-email`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1 font-display">
                        <Mail className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Official Email Address</span>
                        <span className="text-amber-600">*</span>
                      </label>
                      <input
                        id={`${formUid}-business-email`}
                        type="email"
                        placeholder="e.g. hello@company.com"
                        value={businessDetails.email}
                        onChange={(e) => setBusinessDetails({ ...businessDetails, email: e.target.value })}
                        className={cn(
                          "w-full px-3.5 py-2.5 bg-[#FAFAF9] hover:bg-neutral-50 focus:bg-white border rounded-xl text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 transition-all",
                          errors.email ? "border-rose-400 bg-rose-50/20" : "border-neutral-200/90"
                        )}
                      />
                      {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Business Role (Owner / Marketing Lead, etc.) */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-display">
                      <User className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Your Role in the Company</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {BUSINESS_ROLES.map((role) => {
                        const isSelected = businessDetails.businessRole === role;
                        return (
                          <button
                            key={role}
                            type="button"
                            onClick={() => setBusinessDetails({ ...businessDetails, businessRole: role })}
                            className={cn(
                              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border",
                              isSelected
                                ? "bg-neutral-900 text-white border-neutral-900 font-semibold"
                                : "bg-[#FAFAF9] hover:bg-neutral-100 text-neutral-700 border-neutral-200/80"
                            )}
                          >
                            {role}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Type of Business / Industry */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-display">
                      <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Type of Business / Industry</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {BUSINESS_TYPES.map((type) => {
                        const isSelected = businessDetails.businessType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setBusinessDetails({ ...businessDetails, businessType: type })}
                            className={cn(
                              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border",
                              isSelected
                                ? "bg-neutral-900 text-white border-neutral-900 font-semibold"
                                : "bg-[#FAFAF9] hover:bg-neutral-100 text-neutral-700 border-neutral-200/80"
                            )}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                    {businessDetails.businessType === 'Other' && (
                      <input
                        type="text"
                        placeholder="Please specify your business type..."
                        value={businessDetails.customBusinessType}
                        onChange={(e) => setBusinessDetails({ ...businessDetails, customBusinessType: e.target.value })}
                        className="mt-2 w-full px-3.5 py-2 bg-[#FAFAF9] border border-neutral-200/90 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-500/25"
                      />
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 3: TYPE OF PROJECT (2:3 GRID CARDS - MOTION HOVER) */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
                    Ask Type of Project
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5 font-subheading">
                    Select one or more project domains you need help with.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-amber-800 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 shrink-0">
                  {selectedTypes.length} selected
                </span>
              </div>

              {/* 2:3 Grid Cards with Framer Motion Hover */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1">
                {PROJECT_TYPE_OPTIONS.map((item) => {
                  const isSelected = selectedTypes.includes(item.key);
                  const Icon = item.icon;

                  return (
                    <motion.button
                      key={item.key}
                      type="button"
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      onClick={() => toggleProjectType(item.key)}
                      className={cn(
                        "p-3.5 sm:p-4 rounded-2xl border text-left flex flex-col justify-between min-h-[110px] sm:min-h-[120px] transition-colors cursor-pointer relative group",
                        isSelected
                          ? "bg-neutral-950 text-white border-neutral-950 shadow-md ring-2 ring-neutral-950/20"
                          : "bg-[#FAFAF9] hover:bg-neutral-100 text-neutral-800 border-neutral-200/90 hover:border-neutral-300"
                      )}
                    >
                      <div className="flex items-start justify-between w-full">
                        <div
                          className={cn(
                            "w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-colors",
                            isSelected
                              ? "bg-white/10 text-amber-400"
                              : "bg-neutral-200/80 text-neutral-700 group-hover:bg-neutral-200"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full border flex items-center justify-center transition-colors",
                            isSelected
                              ? "border-amber-400 bg-amber-400 text-neutral-950"
                              : "border-neutral-300 bg-white"
                          )}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </div>

                      <div className="mt-2">
                        <span className="block text-xs sm:text-sm font-bold font-display">
                          {item.label}
                        </span>
                        <span
                          className={cn(
                            "block text-[11px] mt-0.5 leading-tight font-subheading",
                            isSelected ? "text-neutral-300" : "text-neutral-500"
                          )}
                        >
                          {item.subtitle}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {errors.types && (
                <p className="text-xs text-rose-500 font-semibold">{errors.types}</p>
              )}
            </motion.div>
          )}

          {/* STEP 4: DETAILS ABOUT PROJECT (SCROLLABLE MULTISELECT OPTIONS) */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="space-y-3.5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
                    Details About Project
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5 font-subheading">
                    Scroll and select specific deliverables required for your vision.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-neutral-700 px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 shrink-0">
                  {selectedDeliverables.length} options selected
                </span>
              </div>

              {/* Scrollable Container */}
              <div className="max-h-[310px] overflow-y-auto space-y-4 pr-1.5 scrollbar-thin">
                {selectedTypes.map((catKey) => {
                  const deliverables = PROJECT_DELIVERABLES[catKey] || [];

                  return (
                    <div key={catKey} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-display">
                          {catKey}
                        </span>
                        <div className="flex-1 h-px bg-neutral-200/80" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {deliverables.map((deliv) => {
                          const isSelected = selectedDeliverables.includes(deliv);

                          return (
                            <button
                              key={deliv}
                              type="button"
                              onClick={() => toggleDeliverable(deliv)}
                              className={cn(
                                "p-3 rounded-xl text-xs font-medium text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-2.5 border",
                                isSelected
                                  ? "bg-neutral-950 text-white border-neutral-950 shadow-xs"
                                  : "bg-[#FAFAF9] hover:bg-neutral-100 text-neutral-800 border-neutral-200/90 hover:border-neutral-300"
                              )}
                            >
                              <div className="flex items-center gap-2.5">
                                <span
                                  className={cn(
                                    "w-2 h-2 rounded-full shrink-0 transition-colors",
                                    isSelected ? "bg-amber-400" : "bg-neutral-300"
                                  )}
                                />
                                <span className="font-subheading leading-snug">{deliv}</span>
                              </div>

                              <div
                                className={cn(
                                  "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors",
                                  isSelected
                                    ? "bg-amber-400 border-amber-400 text-neutral-950"
                                    : "border-neutral-300 bg-white"
                                )}
                              >
                                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {errors.deliverables && (
                <p className="text-xs text-rose-500 font-semibold">{errors.deliverables}</p>
              )}
            </motion.div>
          )}

          {/* STEP 5: PROJECT SCOPE / TIMELINE / URGENCY & EXTRA DESCRIPTION */}
          {currentStep === 5 && (
            <motion.div
              key="step-5"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="space-y-4"
            >
              <div>
                <h4 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
                  Project Scope & Timeline
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5 font-subheading">
                  Specify your urgency target and add any special project context.
                </p>
              </div>

              {/* Urgency Selector */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2 font-display">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Timeline / Urgency</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {URGENCY_OPTIONS.map((opt) => {
                    const fullText = `${opt.title} : ${opt.duration}`;
                    const isSelected = selectedUrgency === fullText;
                    const Icon = opt.icon;

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setSelectedUrgency(fullText);
                          if (errors.urgency) {
                            setErrors((prev) => {
                              const updated = { ...prev };
                              delete updated.urgency;
                              return updated;
                            });
                          }
                        }}
                        className={cn(
                          "p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2",
                          isSelected
                            ? "bg-neutral-950 text-white border-neutral-950 shadow-sm ring-2 ring-neutral-950/20"
                            : "bg-[#FAFAF9] hover:bg-neutral-100 text-neutral-800 border-neutral-200/90"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold font-display">{opt.title}</span>
                          <span
                            className={cn(
                              "text-[10px] px-2 py-0.5 rounded-md font-semibold",
                              isSelected ? "bg-amber-400 text-neutral-950" : "bg-neutral-200 text-neutral-700"
                            )}
                          >
                            {opt.duration}
                          </span>
                        </div>
                        <p
                          className={cn(
                            "text-[11px] leading-snug font-subheading",
                            isSelected ? "text-neutral-300" : "text-neutral-500"
                          )}
                        >
                          {opt.tagline}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {errors.urgency && (
                  <p className="text-xs text-rose-500 font-semibold mt-1.5">{errors.urgency}</p>
                )}
              </div>

              {/* Extra Description */}
              <div>
                <label htmlFor={`${formUid}-extra-description`} className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-display">
                  <span>Extra Description / Notes</span>
                  <span className="text-[11px] font-normal normal-case text-neutral-400 font-subheading">
                    Optional
                  </span>
                </label>
                <textarea
                  id={`${formUid}-extra-description`}
                  rows={3}
                  placeholder="Share any special goals, design inspiration, benchmark links, budget brackets, or technical requirements..."
                  value={extraDescription}
                  onChange={(e) => setExtraDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAFAF9] hover:bg-neutral-50 focus:bg-white border border-neutral-200/90 rounded-xl text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 resize-none transition-all leading-relaxed shadow-2xs"
                />
              </div>
            </motion.div>
          )}

          {/* STEP 6: CONTINUE WITH WHATSAPP (SPECIFICATION REVIEW & DIRECT REDIRECT) */}
          {currentStep === 6 && (
            <motion.div
              key="step-6"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="space-y-4"
            >
              <div>
                <h4 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
                  Review & Continue with WhatsApp
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5 font-subheading">
                  All your specifications have been prepared to send directly to our WhatsApp studio line.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#FAFAF9] border border-neutral-200/90 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-neutral-200/70 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-display">
                      Client Entity
                    </span>
                    <span className="font-semibold text-neutral-900 block mt-0.5 capitalize">
                      {clientType === 'personal'
                        ? `Personal · ${personalDetails.name || 'Client'}`
                        : `${businessDetails.companyName || 'Business'} (${businessDetails.contactName})`}
                    </span>
                    <span className="text-[11px] text-neutral-500 block font-subheading">
                      {clientType === 'personal'
                        ? personalDetails.profession === 'Other' ? personalDetails.customProfession : personalDetails.profession
                        : `${businessDetails.businessRole} · ${businessDetails.businessType}`}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-display">
                      Direct Contact
                    </span>
                    <span className="font-medium text-neutral-800 block mt-0.5">
                      {clientType === 'personal' ? personalDetails.phone : businessDetails.phone}
                    </span>
                    <span className="text-[11px] text-neutral-500 block">
                      {clientType === 'personal' ? personalDetails.email : businessDetails.email}
                    </span>
                  </div>
                </div>

                <div className="text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-display">
                      Categories
                    </span>
                    <span className="font-semibold text-neutral-900">
                      {selectedTypes.join(', ')}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-display shrink-0 mt-0.5">
                      Deliverables ({selectedDeliverables.length})
                    </span>
                    <span className="text-[11px] text-neutral-600 text-right leading-relaxed font-subheading">
                      {selectedDeliverables.join(', ')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-display">
                      Urgency
                    </span>
                    <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/80 text-[11px]">
                      {selectedUrgency}
                    </span>
                  </div>

                  {extraDescription.trim() && (
                    <div className="pt-2 border-t border-neutral-200/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-display">
                        Notes
                      </span>
                      <p className="text-[11px] text-neutral-600 italic mt-0.5 font-subheading">
                        "{extraDescription.trim()}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons inside Step 6 */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <Button
                  type="button"
                  onClick={handleLaunchWhatsApp}
                  className="flex-1 py-3 h-auto rounded-xl font-bold text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>{hasRedirected ? 'Re-open WhatsApp' : 'Continue with WhatsApp'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>

                <button
                  type="button"
                  onClick={handleCopySpecifications}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-neutral-400 font-subheading">
                Destination: +{COMPANY_INFO.whatsapp} · Immediate studio partner dispatch
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Navigation Footer (Prev / Next) */}
      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handlePrev}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>
        ) : (
          <div />
        )}

        {currentStep < 6 ? (
          <Button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 h-auto rounded-xl font-bold text-xs uppercase tracking-wider bg-neutral-950 hover:bg-neutral-800 text-white cursor-pointer group shadow-xs transition-all duration-200 active:scale-[0.98] flex items-center gap-2"
          >
            <span>{currentStep === 5 ? 'Review & WhatsApp' : 'Next'}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        ) : (
          isModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Close Window
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProjectInquiryWizard;
