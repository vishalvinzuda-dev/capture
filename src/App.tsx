import React, { useState, useEffect } from 'react';
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
import { ProcessSection } from './components/process/ProcessSection';
import { DramaticCTA } from './components/cta/DramaticCTA';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/common/Footer';
import { ProjectInquiryModal } from './components/common/ProjectInquiryModal';
import { MeelyPage } from './meely/MeelyPage';
import { ProjectsPage } from './pages/ProjectsPage';

export const App: React.FC = () => {
  const [isMeelyRoute, setIsMeelyRoute] = useState(false);
  const [isProjectsRoute, setIsProjectsRoute] = useState(false);
  const [splashFinished, setSplashFinished] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const isMeely =
        path === '/projects/meely' ||
        path.startsWith('/projects/meely/') ||
        hash === '#/projects/meely' ||
        hash === '#projects/meely' ||
        path === '/meely' ||
        hash === '#/meely';
      setIsMeelyRoute(isMeely);
      const isProjects =
        !isMeely &&
        (path === '/projects' ||
          path.startsWith('/projects/') ||
          hash === '#/projects' ||
          hash === '#projects');
      setIsProjectsRoute(isProjects);
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const handleSplashComplete = React.useCallback(() => {
    setSplashFinished(true);
  }, []);

  const handleOpenInquiry = (service?: string) => {
    setPreselectedService(service);
    setInquiryModalOpen(true);
  };



  if (isMeelyRoute) {
    return <MeelyPage />;
  }

  // If on /projects route, render dedicated category-wise Projects page
  if (isProjectsRoute) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] text-[#18181B] font-sans antialiased selection:bg-neutral-900 selection:text-white relative">
        <Navbar
          onOpenInquiry={handleOpenInquiry}
          currentRoute="projects"
          onNavigate={(route) => {
            if (route === 'home') {
              window.location.hash = '';
              setIsProjectsRoute(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (route === 'about') {
              window.location.hash = '';
              setIsProjectsRoute(false);
              setTimeout(() => {
                document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }}
        />
        <ProjectsPage
          onOpenInquiry={handleOpenInquiry}
          onNavigateHome={() => {
            window.location.hash = '';
            setIsProjectsRoute(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <Footer />
        <ProjectInquiryModal
          isOpen={inquiryModalOpen}
          onClose={() => setInquiryModalOpen(false)}
          preselectedService={preselectedService}
        />
      </div>
    );
  }

  // Standard Main Site route (/)
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#18181B] font-sans antialiased selection:bg-neutral-900 selection:text-white relative">
      
      {/* Entrance Splash Screen */}
      {!splashFinished && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {/* Main Experience */}
      <div className={`transition-opacity duration-700 ${splashFinished ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Navigation */}
        <Navbar
          onOpenInquiry={handleOpenInquiry}
          currentRoute="home"
          onNavigate={(route) => {
            if (route === 'projects') {
              window.location.hash = '#/projects';
              setIsProjectsRoute(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (route === 'about') {
              document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />

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

        {/* 5-Step Process */}
        <ProcessSection />

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
