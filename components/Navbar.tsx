import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  // Close menu on ESC key press (accessibility)
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: 'M3 9.5 12 3l9 6.5v9a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 18.5v-9Z M9 21V12h6v9' },
    { path: '/about', label: 'About', icon: 'M12 7.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M4 20.5a8 8 0 0 1 16 0' },
    { path: '/experiences', label: 'Experiences', icon: 'M3.5 7.5h17v12h-17z M8 7.5V5.5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' },
    { path: '/skills', label: 'Skills', icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z' },
    { path: '/publications', label: 'Publications', icon: 'M6 3.5h9.5a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H6z M6 16.5h9.5' },
    { path: '/projects', label: 'Projects', icon: 'M3.5 8.5h17v9a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z M7 8.5V6.5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2' },
    { path: '/contact', label: 'Contact', icon: 'M4 5.5h16v13H4z m0 1.5 8 6 8-6' },
  ];

  return (
    <header className="relative z-40 w-full">
      {/* Header Background Layer - Reduced opacity for more 'air' */}
      <div className="absolute inset-0 bg-white/70 dark:bg-[#050810]/40 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5 z-0 pointer-events-none transition-colors duration-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between relative z-10">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group relative z-[70]">
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_2px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_12px_4px_rgba(6,182,212,0.6)] transition-shadow duration-300"></span>
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-600 dark:text-white group-hover:text-slate-900 dark:group-hover:text-primary transition-colors">Aerospace Engineer</span>
        </Link>

        <div className="flex items-center gap-4 z-[70]">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-white/50 dark:hover:bg-white/10 text-slate-600 dark:text-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent hover:border-slate-200 dark:hover:border-white/10"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            )}
          </button>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent hover:border-slate-200 dark:hover:border-white/10"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between pointer-events-none">
              <span className={`w-full h-0.5 bg-slate-800 dark:bg-white rounded-full transition-all duration-300 origin-center ${isOpen ? 'translate-y-[9px] rotate-45' : ''}`}></span>
              <span className={`w-full h-0.5 bg-slate-800 dark:bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`}></span>
              <span className={`w-full h-0.5 bg-slate-800 dark:bg-white rounded-full transition-all duration-300 origin-center ${isOpen ? '-translate-y-[9px] -rotate-45' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Overlay Menu - Liquid Glass Theme */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[60] flex items-center justify-center transition-all duration-500 ${isOpen ? 'opacity-100 visible bg-slate-200/20 dark:bg-black/40 backdrop-blur-sm' : 'opacity-0 invisible pointer-events-none backdrop-blur-none'}`}
        aria-hidden={!isOpen}
        onClick={(e) => { if (e.target === e.currentTarget) toggleMenu(); }}
      >
        <nav
          className={`
            w-[360px] max-w-[90vw] p-3 
            bg-white/60 dark:bg-[#0f172a]/60 
            backdrop-blur-3xl 
            border border-white/40 dark:border-white/10 
            rounded-[2rem] 
            shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]
            ring-1 ring-white/20 dark:ring-white/5
            transform transition-all duration-500 
            ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
          `}
        >
          <ul className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`
                      flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden
                      ${isActive
                        ? 'bg-gradient-to-r from-white/80 to-white/60 dark:from-white/15 dark:to-white/5 shadow-lg dark:shadow-none text-primary dark:text-white backdrop-blur-md'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-white/5 hover:scale-[1.02] hover:text-slate-900 dark:hover:text-white'
                      }
                    `}
                  >
                    {/* Glass Highlight for Active State */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-50 pointer-events-none" />
                    )}

                    <span className={`
                      p-2 rounded-xl transition-colors duration-300
                      ${isActive ? 'bg-primary/10 dark:bg-white/10' : 'bg-transparent group-hover:bg-white/30 dark:group-hover:bg-white/5'}
                    `}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className={`w-5 h-5 transition-all duration-300 ${isActive ? 'stroke-primary dark:stroke-white drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'group-hover:stroke-primary dark:group-hover:stroke-white'}`}
                      >
                        {link.icon.split(' M').map((d, i) => (
                          <path key={i} d={i > 0 ? 'M' + d : d} />
                        ))}
                      </svg>
                    </span>

                    <span className="text-[15px] font-semibold tracking-wide">{link.label}</span>

                    {/* Subtle Arrow on Hover */}
                    <svg className={`w-4 h-4 ml-auto transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0 text-primary dark:text-white' : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;