import React from 'react';
import Reveal from '../components/Reveal';

interface SkillCategory {
    title: string;
    icon: React.ReactNode;
    skills: string[];
    gradient: string;
}

const SKILL_CATEGORIES: SkillCategory[] = [
    {
        title: "Simulation Softwares",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
                <path d="M6 8l3 3-3 3M11 14h4" />
            </svg>
        ),
        skills: ["ANSYS (CFX, Fluent, Transient Structural)", "OpenFOAM", "COMSOL Multiphysics", "ABAQUS", "Solidworks", "Creo Parametric", "MeshLab", "Matlab"],
        gradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
        title: "SysML & AI Tools",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
        ),
        skills: ["SysML2", "Papyrus", "NLP (spaCy)", "Chaos Engineering", "Codex", "Antigravity"],
        gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
        title: "Programming Languages",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
                <line x1="12" y1="2" x2="12" y2="22" />
            </svg>
        ),
        skills: ["C++", "Python", "HTML", "CSS", "Javascript", "MATLAB", "Next.js", "React.js", "Tailwind CSS", "LaTeX"],
        gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
        title: "Operating Systems",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M6 8h.01M9 8h.01M12 8h.01" />
                <path d="M6 12h12M6 16h8" />
            </svg>
        ),
        skills: ["Windows", "Fedora", "Arch", "Ubuntu", "Oracle Cloud Infrastructure"],
        gradient: "from-orange-500/20 to-amber-500/20"
    },
    {
        title: "CFD Expertise",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12c0 3.5 3.5 6 9 6s9-2.5 9-6-3.5-6-9-6-9 2.5-9 6Z" />
                <path d="M3 12c2 1 4.5 1.5 9 1.5s7-0.5 9-1.5" />
                <path d="M12 6v12" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        ),
        skills: ["AMR", "Multiphase Flow", "Turbulence Modeling", "Discretization Methods", "Post-processing", "CHT", "Reduced Order Model", "Data Visualization using Parafoam"],
        gradient: "from-blue-500/20 to-indigo-500/20"
    },
    {
        title: "Experimental Skills",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 3h6v5l3 9H6l3-9V3Z" />
                <path d="M9 3h6" />
                <circle cx="12" cy="14" r="1" />
                <path d="M10 17.5a2.5 2.5 0 0 1 4 0" />
            </svg>
        ),
        skills: ["TPS Characterization", "Sensor Calibration and Heat Flux Mapping", "IR Thermography", "Radiative Property Testing", "Heat Flux Gauges and Thermocouples"],
        gradient: "from-red-500/20 to-rose-500/20"
    },
    {
        title: "Backend & Data",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
        ),
        skills: ["PostgreSQL", "Docker", "AWS", "OCI", "Git", "GitHub", "Firebase", "Google Cloud", "Vercel"],
        gradient: "from-teal-500/20 to-cyan-500/20"
    }
];

const Skills: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 lg:py-20">
            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
                <Reveal>
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
                        Technical Skills
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full mt-4"></div>
                </Reveal>
                <Reveal delay={100}>
                    <span className="text-slate-500 dark:text-slate-300 uppercase tracking-widest text-sm font-bold transition-colors">
                        Tools, languages & expertise
                    </span>
                </Reveal>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SKILL_CATEGORIES.map((category, idx) => (
                    <Reveal key={idx} delay={idx * 80}>
                        <article className={`
              h-full bg-white/60 dark:bg-white/5 backdrop-blur-md
              p-6 rounded-3xl flex flex-col gap-5
              group hover:-translate-y-2 hover:bg-white/80 dark:hover:bg-white/10
              border border-slate-200 dark:border-white/10
              shadow-lg dark:shadow-2xl
              transition-all duration-500
              relative overflow-hidden
            `}>
                            {/* Background Gradient Glow */}
                            <div className={`
                absolute inset-0 bg-gradient-to-br ${category.gradient}
                opacity-0 group-hover:opacity-100 transition-opacity duration-500
                pointer-events-none
              `}></div>

                            {/* Subtle Grid Pattern */}
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50 pointer-events-none"></div>

                            {/* Icon + Title Header */}
                            <div className="relative z-10 flex items-center gap-4">
                                <div className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center
                  bg-gradient-to-br ${category.gradient.replace('/20', '/30')}
                  border border-slate-200/50 dark:border-white/10
                  group-hover:scale-110 group-hover:shadow-lg
                  transition-all duration-500
                `}>
                                    <div className="w-6 h-6 text-slate-700 dark:text-white group-hover:text-primary dark:group-hover:text-cyan-300 transition-colors duration-300">
                                        {category.icon}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug transition-colors">
                                    {category.title}
                                </h3>
                            </div>

                            {/* Skills Tags */}
                            <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                                {category.skills.map((skill, skillIdx) => (
                                    <span
                                        key={skillIdx}
                                        className={`
                      px-3 py-1.5 rounded-xl text-xs font-semibold
                      bg-white/70 dark:bg-white/10
                      border border-slate-200/80 dark:border-white/10
                      text-slate-700 dark:text-slate-200
                      hover:bg-primary/10 hover:border-primary/30 hover:text-primary
                      dark:hover:bg-cyan-500/20 dark:hover:border-cyan-500/30 dark:hover:text-cyan-300
                      transition-all duration-300 cursor-default
                      shadow-sm hover:shadow-md
                    `}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>
        </div>
    );
};

export default Skills;
