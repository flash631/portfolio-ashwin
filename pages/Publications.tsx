import React from 'react';
import Reveal from '../components/Reveal';
import { JOURNAL_PAPERS, CONFERENCE_PAPERS, PATENTS } from '../constants';

const Publications: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 lg:py-20">
      <Reveal>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-12 tracking-tight transition-colors">Publications</h1>
      </Reveal>

      <div className="space-y-16">
        <Section title="Journal Paper">
          <ul className="grid gap-6">
            {JOURNAL_PAPERS.map((pub, idx) => <PubCard key={idx} pub={pub} />)}
          </ul>
        </Section>

        <Section title="Conference Papers">
          <ul className="grid gap-6">
            {CONFERENCE_PAPERS.map((pub, idx) => <PubCard key={idx} pub={pub} />)}
          </ul>
        </Section>

        <Section title="Patents">
          <ul className="grid gap-6">
            {PATENTS.map((pub, idx) => <PubCard key={idx} pub={pub} isPatent />)}
          </ul>
        </Section>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-6">
    <Reveal>
      <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-300 flex items-center gap-4 transition-colors">
        {title}
        <span className="flex-1 h-px bg-slate-200 dark:bg-white/20"></span>
      </h2>
    </Reveal>
    {children}
  </div>
);

const PubCard: React.FC<{ pub: any; isPatent?: boolean }> = ({ pub, isPatent }) => (
  <Reveal>
    <li className={`bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-white/10 hover:border-primary/30 transition-all duration-300 shadow-sm dark:shadow-none ${isPatent ? 'flex gap-6 items-center' : ''}`}>

      {isPatent && pub.image && (
        <div className="flex-shrink-0 w-14 h-18 rounded-lg overflow-hidden border border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-black/40">
          <img src={pub.image} alt="Patent Doc" className="w-full h-full object-cover opacity-80" />
        </div>
      )}

      <div className="space-y-2">
        <div className="font-bold text-slate-900 dark:text-white text-lg leading-snug transition-colors">
          {pub.title}
        </div>

        {!isPatent && (
          <div className="text-slate-600 dark:text-slate-300 text-sm transition-colors">
            <strong className="text-slate-800 dark:text-white">Authors:</strong> {pub.authors}
          </div>
        )}

        {pub.venue && (
          <div className="text-sm text-primary/90 italic">
            {pub.venue}
          </div>
        )}

        {pub.link && (
          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm text-slate-900 dark:text-white hover:text-primary underline decoration-slate-300 dark:decoration-white/30 hover:decoration-primary underline-offset-4 transition-all">
            View Publication
          </a>
        )}
      </div>
    </li>
  </Reveal>
);

export default Publications;