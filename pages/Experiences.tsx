import React from 'react';
import Reveal from '../components/Reveal';
import { EXPERIENCES } from '../constants';

const Experiences: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
      <Reveal>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight transition-colors">Experiences</h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mb-12 transition-colors">Selected, hands-on work where I built, tested, and learned by doing.</p>
      </Reveal>

      <div className="space-y-12">
        {EXPERIENCES.map((xp, idx) => (
          <div key={idx} className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            
            {/* Card Content */}
            <Reveal delay={100} className="h-full">
              <article className="h-full bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-lg dark:shadow-2xl transition-colors">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4xKSIvPjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 pointer-events-none"></div>
                
                <header className="relative z-10 mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 transition-colors">{xp.role}</h2>
                  <div className="text-primary dark:text-cyan-400 font-semibold">{xp.company} · {xp.type}</div>
                </header>

                <div className="relative z-10 flex flex-wrap gap-3 mb-6">
                  <Badge icon="duration">{xp.duration}</Badge>
                  <Badge icon="calendar">{xp.dates}</Badge>
                  <Badge icon="location">{xp.location}</Badge>
                  <Badge icon="check" variant="success">{xp.mode}</Badge>
                </div>

                <ul className="relative z-10 space-y-3 text-slate-600 dark:text-slate-200 list-disc pl-4 marker:text-primary transition-colors">
                  {xp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">
                      <span dangerouslySetInnerHTML={{ __html: bullet.replace(/CO2/g, 'CO<sub>2</sub>').replace(/cm2/g, 'cm²') }} />
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            {/* Image */}
            {xp.image && (
              <Reveal delay={200} className="h-full">
                <figure className="h-full min-h-[300px] rounded-3xl border border-slate-200 dark:border-white/10 overflow-hidden relative group shadow-md">
                  <img 
                    src={xp.image} 
                    alt={xp.imageCaption || xp.role} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {xp.imageCaption && (
                    <figcaption className="absolute left-4 bottom-4 bg-white/90 dark:bg-black/60 backdrop-blur-md border border-slate-200 dark:border-white/10 px-4 py-2 rounded-full text-xs font-bold text-slate-900 dark:text-white shadow-sm">
                      {xp.imageCaption}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Badge: React.FC<{ children: React.ReactNode; icon: string; variant?: 'default' | 'success' }> = ({ children, icon, variant = 'default' }) => {
  const icons: Record<string, React.ReactNode> = {
    duration: <><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5l3 2.5"/></>,
    calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3.5V6M16 3.5V6M3.5 9h17"/></>,
    location: <><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.8"/></>,
    check: <path d="m20 6-11 11-5-5"/>
  };

  const colors = variant === 'success' 
    ? 'border-green-500/30 text-green-600 dark:text-green-300 bg-green-100/50 dark:bg-green-500/10' 
    : 'border-slate-200 dark:border-white/20 text-slate-700 dark:text-white bg-white/50 dark:bg-white/10';

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${colors}`}>
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {icons[icon]}
      </svg>
      {children}
    </span>
  );
};

export default Experiences;