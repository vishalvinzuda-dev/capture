import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  Sparkles,
  Building,
  User,
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_INFO } from '../../data/content';

const SERVICE_OPTIONS = [
  'Branding',
  'Graphic Design',
  'Printing Solutions',
  'Website Development',
  'Custom Software & ERP',
  'Digital Marketing',
  'Product / Personal Shoots',
  'Other / Complete Solution'
];

const BUDGET_RANGES = [
  'Select Budget Range',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,50,000',
  '₹1,50,000 – ₹5,00,000',
  '₹5,00,000+'
];

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Branding',
    budget: '₹50,000 – ₹1,50,000',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    }, 600);
  };

  const handleWhatsApp = () => {
    const msg = `Hi Capture Creatives! I'd like to talk about a project for ${formData.company || formData.name || 'my business'}. Service: ${formData.service}.`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="contact" className="relative py-24 bg-[#FAFAF9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight font-display">
            START THE CONVERSATION
          </h2>

          <p className="mt-4 text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed font-subheading">
            Tell us about your objectives, timeline, or business problem. We respond promptly with actionable insights.
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Studio Meta & Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Headquarters</span>
                <h3 className="text-xl font-bold text-neutral-900 font-display mt-1">
                  Capture Creatives Studio
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  End-to-End Creative & Technology Solutions
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-neutral-100">
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-start space-x-3.5 text-xs text-neutral-700 hover:text-[#D97706] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 group-hover:bg-amber-50 group-hover:text-[#D97706] transition-colors shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-neutral-400 uppercase">Direct Email</span>
                    <span className="font-semibold text-neutral-900 text-sm">{COMPANY_INFO.email}</span>
                  </div>
                </a>

                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-start space-x-3.5 text-xs text-neutral-700 hover:text-[#D97706] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 group-hover:bg-amber-50 group-hover:text-[#D97706] transition-colors shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-neutral-400 uppercase">Direct Phone</span>
                    <span className="font-semibold text-neutral-900 text-sm">{COMPANY_INFO.phone}</span>
                  </div>
                </a>

                <div className="flex items-start space-x-3.5 text-xs text-neutral-700">
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-neutral-400 uppercase">Location & Studio</span>
                    <span className="font-semibold text-neutral-900 text-sm">{COMPANY_INFO.location}</span>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{COMPANY_INFO.address}</p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Quick Box */}
              <div className="pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full py-3 px-4 bg-transparent hover:bg-neutral-900 text-neutral-900 hover:text-white border-2 border-neutral-900 rounded-xl text-xs font-bold tracking-wider flex items-center justify-center space-x-2 transition-all duration-200"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>START INSTANT WHATSAPP CHAT</span>
                </button>
              </div>
            </div>

            {/* Operating Hours & Availability */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 text-xs text-neutral-600 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium text-neutral-800">{COMPANY_INFO.availability}</span>
              </div>
              <span className="font-mono text-neutral-400 text-[11px]">Mon — Sat</span>
            </div>
          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200 shadow-md">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAFAF9] border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#F9BA1D]/40 focus:border-[#F9BA1D] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                        Company / Brand Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Prabhu Group"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAFAF9] border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#F9BA1D]/40 focus:border-[#F9BA1D] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAFAF9] border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#F9BA1D]/40 focus:border-[#F9BA1D] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAFAF9] border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#F9BA1D]/40 focus:border-[#F9BA1D] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                        Service Required *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAFAF9] border border-neutral-200 rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#F9BA1D]/40 focus:border-[#F9BA1D]"
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAFAF9] border border-neutral-200 rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#F9BA1D]/40 focus:border-[#F9BA1D]"
                      >
                        {BUDGET_RANGES.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                      Project Details & Objectives
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Outline your requirements, current pain points, deliverables or expected timeline..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAFAF9] border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#F9BA1D]/40 focus:border-[#F9BA1D] resize-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md disabled:opacity-50"
                  >
                    {loading ? (
                      <span>TRANSMITTING INQUIRY...</span>
                    ) : (
                      <>
                        <span>SEND PROJECT REQUEST</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-amber-50 text-[#D97706] rounded-2xl flex items-center justify-center mx-auto border border-amber-200">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 font-display">
                    Thank You, {formData.name}
                  </h3>
                  <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                    Your project inquiry for <span className="font-semibold text-neutral-900">{formData.service}</span> has been securely transmitted. A partner from Capture Creatives will get in touch with you shortly.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-semibold"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
