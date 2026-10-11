import React, { useState, useEffect, Suspense } from 'react';
import { SplashScreen } from './components/common/SplashScreen';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { QuickStats } from './components/stats/QuickStats';
import { ServicesSection } from './components/services/ServicesSection';
import { SignatureDifference } from './components/difference/SignatureDifference';
import { PrabhuGroupCaseStudy } from './components/casestudy/PrabhuGroupCaseStudy';
import { SelectedWork } from './components/portfolio/SelectedWork';
import { TestimonialsSection } from './components/testimonials/TestimonialsSection';
import { WhyChooseUs } from './components/why/WhyChooseUs';
import { SocialImpact } from './components/impact/SocialImpact';
import { AchievementsSection } from './components/achievements/AchievementsSection';
import { ProcessSection } from './components/process/ProcessSection';
import { ProjectEstimator } from './components/calculator/ProjectEstimator';
import { DramaticCTA } from './components/cta/DramaticCTA';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/common/Footer';
import { ProjectInquiryModal } from './components/common/ProjectInquiryModal';
import { MeelyPage } from './meely/MeelyPage';

const TimelineDemo = React.lazy(() => import('./demo'));

export const App: React.FC = () => {
  const [isDemoRoute, setIsDemoRoute] = useState(false);
  const [isMeelyRoute, setIsMeelyRoute] = useState(false);
  const [splashFinished, setSplashFinished] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const isDemo = path === '/demo' || path.startsWith('/demo/') || hash === '#/demo' || hash === '#demo';
      setIsDemoRoute(isDemo);
      const isMeely = path === '/meely' || path.startsWith('/meely/') || hash === '#/meely' || hash === '#meely';
      setIsMeelyRoute(isMeely);
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const handleOpenInquiry = (service?: string) => {
    setPreselectedService(service);
    setInquiryModalOpen(true);
  };

  // If on /demo route, render the isolated Timeline & 3D Machine UI experiments
  if (isDemoRoute) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center font-mono text-xs text-neutral-500">
            Loading UI Lab Experiments...
          </div>
        }
      >
        <TimelineDemo />
      </Suspense>
    );
  }

  if (isMeelyRoute) {
    return <MeelyPage />;
  }

  // Standard Main Site route (/)
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#18181B] font-sans antialiased selection:bg-neutral-900 selection:text-white relative">
      
      {/* Entrance Splash Screen */}
      {!splashFinished && (
        <SplashScreen onComplete={() => setSplashFinished(true)} />
      )}

      {/* Main Experience */}
      <div className={`transition-opacity duration-700 ${splashFinished ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Navigation */}
        <Navbar onOpenInquiry={handleOpenInquiry} />

        {/* Hero Section */}
        <HeroSection onOpenInquiry={handleOpenInquiry} />

        {/* Trust Stats */}
        <QuickStats />

        {/* What We Do Services */}
        <ServicesSection onOpenInquiry={handleOpenInquiry} />

        {/* Signature Difference */}
        <SignatureDifference />

        {/* Featured Case Study: Prabhu Group */}
        <PrabhuGroupCaseStudy onOpenInquiry={handleOpenInquiry} />

        {/* Selected Work Portfolio */}
        <SelectedWork onOpenInquiry={handleOpenInquiry} />

        {/* Client Testimonials */}
        <TestimonialsSection />

        {/* Why Businesses Choose CC */}
        <WhyChooseUs />

        {/* Social Impact */}
        <SocialImpact />

        {/* Achievements Timeline */}
        <AchievementsSection />

        {/* 5-Step Process */}
        <ProcessSection />

        {/* Interactive Scope & Cost Estimator */}
        <ProjectEstimator onOpenInquiry={handleOpenInquiry} />

        {/* Dramatic CTA */}
        <DramaticCTA onOpenInquiry={handleOpenInquiry} />

        {/* Contact Form Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />

        {/* Interactive Project Inquiry Modal */}
        <ProjectInquiryModal
          isOpen={inquiryModalOpen}
          onClose={() => setInquiryModalOpen(false)}
          preselectedService={preselectedService}
        />
      </div>
    </div>
  );
};

export default App;
