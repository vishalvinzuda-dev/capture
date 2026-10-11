import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, MessageSquare, Sparkles, Send, Building2, User, Mail, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_INFO } from '../../data/content';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const SERVICE_OPTIONS = [
  'Branding & Identity',
  'Graphic Design & Collaterals',
  'Printing Solutions',
  'Website Development & UI/UX',
  'Custom Software & ERP',
  'Digital Marketing & Shoots',
  'Full Business Solution (All-in-One)'
];

const BUDGET_OPTIONS = [
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,50,000',
  '₹1,50,000 – ₹5,00,000',
  '₹5,00,000+'
];

const TIMELINE_OPTIONS = [
  'Immediate (1-2 Weeks)',
  'Standard (3-4 Weeks)',
  'Strategic (1-3 Months)',
  'Flexible'
];

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedService
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    preselectedService ? [preselectedService] : ['Branding & Identity']
  );
  const [budget, setBudget] = useState(BUDGET_OPTIONS[1]);
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[1]);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    details: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleService = (svc: string) => {
    if (selectedServices.includes(svc)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== svc));
      }
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 700);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hi Capture Creatives! I would like to discuss a project.\n\n*Name:* ${formData.name || 'Interested Client'}\n*Company:* ${formData.company || 'Not Specified'}\n*Services:* ${selectedServices.join(', ')}\n*Budget:* ${budget}\n*Timeline:* ${timeline}\n*Details:* ${formData.details || 'Let us connect!'}`;
    const url = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({ name: '', company: '', email: '', phone: '', details: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetForm}
            className="fixed inset-0 bg-neutral-900/50 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden z-10 my-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-neutral-50/70">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#F9BA1D] text-neutral-900 flex items-center justify-center font-bold text-sm shadow-2xs">
                  CC
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 font-display">Start Your Project</h3>
                  <p className="text-xs text-neutral-500">Capture Creatives · Response within 24 business hours</p>
                </div>
              </div>
              <button
                onClick={resetForm}
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/60 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Select Services */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                      1. What do you need solved? (Select all that apply)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SERVICE_OPTIONS.map((svc) => {
                        const isSelected = selectedServices.includes(svc);
                        return (
                          <button
                            type="button"
                            key={svc}
                            onClick={() => toggleService(svc)}
                            className={`flex items-center justify-between p-3 rounded-xl text-left text-xs font-medium border transition-all ${
                              isSelected
                                ? 'bg-amber-50/80 border-[#F9BA1D] text-neutral-900 shadow-xs ring-1 ring-[#F9BA1D]/30'
                                : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300'
                            }`}
                          >
                            <span>{svc}</span>
                            {isSelected ? (
                              <Check className="w-4 h-4 text-[#D97706] shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-neutral-300 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                        2. Approximate Budget
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#F9BA1D]/40 focus:border-[#F9BA1D]"
                      >
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                        3. Target Launch Timeline
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#F9BA1D]/40 focus:border-[#F9BA1D]"
                      >
                        {TIMELINE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Step 3: Contact Info */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                      4. Your Contact Details
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="Your Name *"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#F9BA1D]/40 focus:border-[#F9BA1D]"
                        />
                      </div>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          placeholder="Company / Brand Name"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#F9BA1D]/40 focus:border-[#F9BA1D]"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          required
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#F9BA1D]/40 focus:border-[#F9BA1D]"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          required
                          placeholder="Phone / WhatsApp *"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#F9BA1D]/40 focus:border-[#F9BA1D]"
                        />
                      </div>
                    </div>
                    <div>
                      <textarea
                        rows={3}
                        placeholder="Tell us about the project, business challenge, or specific deliverables..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#F9BA1D]/40 focus:border-[#F9BA1D] resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:flex-1 py-3 px-6 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center space-x-2 transition-colors shadow-md disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Processing Brief...</span>
                      ) : (
                        <>
                          <span>SEND PROJECT REQUEST</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="w-full sm:w-auto py-3 px-5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Direct</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-amber-50 text-[#D97706] rounded-2xl flex items-center justify-center mx-auto border border-amber-200">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 font-display">
                    Project Request Received
                  </h4>
                  <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-neutral-900">{formData.name}</span>. We've logged your request for{' '}
                    <span className="font-semibold text-neutral-900">{selectedServices.join(', ')}</span>. Our team will review your specifications and contact you shortly.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="w-full sm:w-auto py-2.5 px-6 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 shadow-sm transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open Instant WhatsApp Chat</span>
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full sm:w-auto py-2.5 px-5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-semibold transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
