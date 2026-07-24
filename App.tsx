import { lazy, Suspense, useEffect, useState } from 'react';
import DatumRail from './components/DatumRail';
import PortfolioHeader from './components/PortfolioHeader';
import { ExperienceSection, ProjectIndex, PublicationIndex, SimulationIndex, SkillIndex } from './sections/DetailSections';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import EvidenceBoard from './sections/EvidenceBoard';
import HeroSection from './sections/HeroSection';
import SiteFooter from './sections/SiteFooter';
import { SIMULATIONS } from './simulationData';

type Theme = 'light' | 'night';

const SimulationDetailPage = lazy(() => import('./sections/SimulationDetailPage'));

function getInitialTheme(): Theme {
  const saved = window.localStorage.getItem('portfolio-theme');
  return saved === 'night' ? 'night' : 'light';
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [scrollProgress, setScrollProgress] = useState(0);
  const requestedSimulationId = new URLSearchParams(window.location.search).get('simulation');
  const simulation = requestedSimulationId
    ? SIMULATIONS.find((item) => item.id === requestedSimulationId)
    : undefined;
  const simulationPage = requestedSimulationId !== null;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#ffffff' : '#0b111b');
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useEffect(() => {
    document.title = simulation
      ? `${simulation.title} — Ashwin M R`
      : 'Ashwin M R — Aerospace systems engineer';
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [simulation]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to portfolio content</a>
      <PortfolioHeader
        theme={theme}
        onThemeToggle={() => setTheme((current) => (current === 'light' ? 'night' : 'light'))}
        simulationPage={simulationPage}
      />
      <div className="page-frame">
        <DatumRail progress={scrollProgress} />
        <main id="main-content">
          {simulationPage ? (
            <Suspense fallback={<div className="simulation-loading" role="status">Loading simulation study…</div>}>
              <SimulationDetailPage simulation={simulation} requestedId={requestedSimulationId || ''} />
            </Suspense>
          ) : (
            <>
              <HeroSection />
              <EvidenceBoard />
              <AboutSection />
              <ExperienceSection />
              <PublicationIndex />
              <ProjectIndex />
              <SimulationIndex />
              <SkillIndex />
              <ContactSection />
            </>
          )}
          <SiteFooter />
        </main>
      </div>
    </div>
  );
}
