import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

const Home: React.FC = () => {
  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Text Content */}
        <Reveal>
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-300 font-semibold tracking-wide">
              Heyy <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
            </div>

            <div className="space-y-2">
              <p className="text-xl text-slate-500 dark:text-slate-300">I'm</p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">
                Ashwin M R
              </h1>
            </div>

            <div className="text-lg text-slate-600 dark:text-slate-200 max-w-xl leading-relaxed">
              <strong className="text-slate-900 dark:text-white">Master of Engineering</strong> in <strong className="text-slate-900 dark:text-white">Aerospace Systems Engineering</strong>.
              <span className="block mt-2 opacity-90 text-slate-600 dark:text-slate-300">from <strong className="text-slate-900 dark:text-white">University of Illinois Urbana-Champaign</strong></span>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <a
                href="images/aswinmr_resume_job.pdf"
                download
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/60 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold hover:bg-white/80 dark:hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 3.5H9.5A2 2 0 0 0 7.5 5.5v13a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9.2z" /><path d="M14 3.5V9.2h5.5" /><path d="M12 11.5v4.5" /><path d="m9.8 14.2 2.2 2.2 2.2-2.2" />
                </svg>
                Download Resume
              </a>

              <Link
                to="/projects"
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/60 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold hover:bg-white/80 dark:hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <svg className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3.5" y="3.5" width="7" height="7" rx="1" /><rect x="13.5" y="3.5" width="7" height="7" rx="1" /><rect x="3.5" y="13.5" width="7" height="7" rx="1" /><rect x="13.5" y="13.5" width="7" height="7" rx="1" />
                </svg>
                View Projects
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Avatar */}
        <Reveal delay={200} className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[460px] aspect-square rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/30 dark:bg-gradient-to-b dark:from-white/5 dark:to-transparent backdrop-blur-sm p-3 shadow-2xl overflow-hidden group transition-colors">
            <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden z-10 border border-slate-200 dark:border-white/10 shadow-inner">
              <img
                src="images/profile.jpg"
                alt="Portrait of Ashwin M R"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Home;