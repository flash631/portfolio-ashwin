import React from 'react';
import Reveal from '../components/Reveal';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">Projects</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full mt-4"></div>
        </Reveal>
        <Reveal delay={100}>
          <span className="text-slate-500 dark:text-slate-300 uppercase tracking-widest text-sm font-bold transition-colors">Curated selection of academic + personal builds</span>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, idx) => (
          <Reveal key={idx} delay={idx * 100}>
            <article className="h-full bg-white/60 dark:bg-white/5 p-5 rounded-3xl flex flex-col gap-4 group hover:-translate-y-2 hover:bg-white/80 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-2xl transition-all duration-500">
              
              {/* Header */}
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug transition-colors">{project.title}</h3>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-white/20 px-2 py-1 rounded-lg whitespace-nowrap transition-colors">
                  {project.year}
                </span>
              </div>

              {/* Thumbnails Grid */}
              <div 
                className="grid grid-cols-3 gap-2" 
                role="group" 
                aria-label={`Thumbnails for ${project.title}`}
              >
                {project.images.map((img, imgIdx) => (
                  <div 
                    key={imgIdx} 
                    className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/20 relative focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                    tabIndex={0}
                    role="img"
                    aria-label={`View project image ${imgIdx + 1}`}
                  >
                     {/* Glow effect behind image */}
                     <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                    <img 
                      src={img} 
                      alt={`${project.title} preview ${imgIdx + 1}`} 
                      loading="lazy"
                      className="w-full h-full object-cover relative z-10 transform group-hover:scale-110 group-focus-within:scale-110 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-white/50 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-sm font-semibold text-slate-700 dark:text-white hover:bg-primary/20 hover:border-primary/30 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                  >
                    {project.linkText || 'View Project'}
                  </a>
                )}
                {project.tag && (
                  <span className={`px-3 py-2 rounded-xl text-sm font-bold border ${
                    project.tagColor === 'uiuc' ? 'bg-orange-100 dark:bg-orange-500/20 border-orange-200 dark:border-orange-500/30 text-orange-600 dark:text-orange-300' : 
                    project.tagColor === 'vssc' ? 'bg-blue-100 dark:bg-blue-500/20 border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-300' :
                    'bg-slate-100 dark:bg-white/10 border-slate-200 dark:border-white/20 text-slate-500 dark:text-slate-300'
                  }`}>
                    {project.tag}
                  </span>
                )}
              </div>

            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default Projects;