import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const date = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
      const time = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setTimeString(`${date} · ${time}`);
    };
    
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 mt-auto z-10 relative bg-white/80 dark:bg-[#050810]/80 backdrop-blur-sm transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-slate-500 dark:text-muted text-sm gap-2 transition-colors">
        <div>
          © <strong className="text-slate-900 dark:text-white">2025</strong> Ashwin MR
        </div>
        <div aria-live="polite" className="font-mono opacity-80">
          {timeString || '—'}
        </div>
      </div>
    </footer>
  );
};

export default Footer;