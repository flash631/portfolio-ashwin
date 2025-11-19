import React, { useState } from 'react';
import Reveal from '../components/Reveal';

const Contact: React.FC = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Opening your email app...');
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    const subject = encodeURIComponent('Portfolio contact from ' + (name || 'Visitor'));
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    
    window.location.href = `mailto:aswinmr0060@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
      <Reveal>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight transition-colors">Contact</h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mb-12 transition-colors">I'd love to hear from you. Fill out the form or use the details on the right.</p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-16">
        
        {/* Form */}
        <Reveal delay={100} className="h-full">
          <form onSubmit={handleSubmit} className="bg-white/60 dark:bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl h-full flex flex-col gap-6 transition-colors">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">Send a message</h3>
            
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wide">Name</label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                placeholder="Your full name" 
                required 
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wide">Email</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="you@example.com" 
                required 
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            <div className="space-y-2 flex-grow">
              <label htmlFor="message" className="text-sm font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wide">Message</label>
              <textarea 
                id="message" 
                name="message" 
                placeholder="What would you like to discuss?" 
                required 
                rows={5}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-y min-h-[160px]"
              ></textarea>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <button 
                type="submit" 
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-primary/10 border border-primary/30 text-primary font-bold hover:bg-primary/20 hover:scale-[1.02] transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <path d="m3.5 5.5 17 6.5-17 6.5 4.5-6.5z"/><path d="M7.5 12h7"/>
                </svg>
                Send Message
              </button>
              {status && <span className="text-sm text-slate-500 dark:text-slate-300 animate-pulse">{status}</span>}
            </div>
          </form>
        </Reveal>

        {/* Info & Socials */}
        <Reveal delay={200} className="h-full">
          <aside className="bg-white/60 dark:bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl h-full flex flex-col transition-colors">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 transition-colors">Get in touch</h3>
            
            <div className="space-y-4 text-slate-600 dark:text-slate-300 mb-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1">Email</div>
                <a href="mailto:aswinmr0060@gmail.com" className="text-lg text-slate-900 dark:text-white hover:text-primary transition-colors">aswinmr0060@gmail.com</a>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1">Address</div>
                <div className="text-lg text-slate-900 dark:text-white">Urbana, Illinois, US</div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-4">Social & Research</div>
              <div className="flex flex-wrap gap-3">
                <SocialLink href="https://www.linkedin.com/in/ashwin-m-r-9a07841b6/" label="LinkedIn">
                  <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"/><path d="M3.5 9.5h3v11h-3zM10 9.5h3v1.9a3 3 0 0 1 5.3 2v7.1h-3v-6.3a1.7 1.7 0 0 0-3.4 0v6.3h-3z"/>
                </SocialLink>
                
                <SocialLink href="https://github.com/flash631" label="GitHub">
                  <path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.47.09.64-.2.64-.45v-1.7C7.7 19.3 7 17.6 7 17.6c-.42-1.06-1.02-1.34-1.02-1.34-.83-.56.06-.55.06-.55.92.07 1.41.95 1.41.95.82 1.4 2.15 1 2.67.77.08-.6.32-1 .58-1.23-2.66-.3-5.47-1.33-5.47-5.9 0-1.3.47-2.36 1.24-3.19-.12-.3-.54-1.51.12-3.14 0 0 1.01-.32 3.3 1.22a11.5 11.5 0 0 1 6 0c2.28-1.54 3.29-1.22 3.29-1.22.66 1.63.24 2.84.12 3.14a4.5 4.5 0 0 1 1.24 3.19c0 4.59-2.8 5.6-5.47 5.9.33.28.62.83.62 1.67v2.47c0 .25.17.55.64.45A9.5 9.5 0 0 0 12 2.5Z"/>
                </SocialLink>

                <SocialLink href="https://x.com/AswinMR15" label="X (Twitter)">
                  <path d="M3.5 3.5 20.5 20.5M20.5 3.5 3.5 20.5"/>
                </SocialLink>

                <SocialLink href="https://www.researchgate.net/profile/Aswin-M-R" label="ResearchGate">
                  <circle cx="9" cy="8.5" r="3.5"/><path d="M12.5 14.5c2.5 0 4 1.5 4 4v1.5M4 20.5h8.5"/>
                </SocialLink>

                <SocialLink href="https://www.instagram.com/ashwin.mkv/" label="Instagram">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>
                </SocialLink>

                <SocialLink href="https://scholar.google.com/citations?user=rgYx6gwAAAAJ&hl=en" label="Google Scholar">
                   <path d="M12 3.5 3.5 10 12 16.5 20.5 10 12 3.5zM6 13.5V20h12v-6.5"/>
                </SocialLink>
                
                <SocialLink href="https://orcid.org/0000-0001-6214-7129" label="ORCID">
                  <circle cx="12" cy="12" r="8.5"/><path d="M9.5 8v8M12.5 8h2.5a2.5 2.5 0 1 1 0 5H12.5zM15 13v3"/>
                </SocialLink>
              </div>
            </div>
          </aside>
        </Reveal>
      </div>
    </div>
  );
};

const SocialLink: React.FC<{ href: string; label: string; children: React.ReactNode }> = ({ href, label, children }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label={label}
    title={label}
    className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 hover:-translate-y-1 hover:border-slate-300 dark:hover:border-white/30 transition-all duration-300 text-slate-600 dark:text-white"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      {children}
    </svg>
  </a>
);

export default Contact;