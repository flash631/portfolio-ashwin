import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CFDBackground from './CFDBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const getPageTag = () => {
    switch (location.pathname) {
      case '/': return 'Aerospace Engineer';
      case '/about': return 'About';
      case '/experiences': return 'Experiences';
      case '/projects': return 'Aerospace Engineer';
      case '/publications': return 'Publications';
      case '/contact': return 'Contact';
      default: return 'Portfolio';
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative transition-colors duration-500">
      <CFDBackground />

      {/* Vertical Tag */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-top-left text-xs tracking-[0.18em] uppercase text-slate-400 dark:text-muted/60 pointer-events-none z-20 hidden lg:block transition-colors">
        {getPageTag()}
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
