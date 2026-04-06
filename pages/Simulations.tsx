import React, { useState, useRef, useEffect, useMemo } from 'react';
import { SIMULATIONS, ContentBlock, SimulationData } from '../simulationData';

/* ──────────────────────────────────────────────────────────────
   KaTeX helper – renders a LaTeX string to HTML.
   Falls back to the raw string if KaTeX CDN didn't load.
   ────────────────────────────────────────────────────────────── */
const renderLatex = (latex: string, displayMode = true): string => {
  try {
    const katex = (window as any).katex;
    if (katex) {
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode,
      });
    }
  } catch {
    // fall through
  }
  return displayMode ? `$$${latex}$$` : `$${latex}$`;
};

/* ──────────────────────────────────────────────────────────────
   Inline LaTeX helper – finds $...$ in text and renders them
   ────────────────────────────────────────────────────────────── */
const renderInlineLatex = (text: string): string => {
  // Find $...$ patterns (non-greedy) and render them
  return text.replace(/\$([^$]+)\$/g, (_match, latex) => {
    return renderLatex(latex, false);
  });
};

/* ──────────────────────────────────────────────────────────────
   Content Block Renderer
   ────────────────────────────────────────────────────────────── */
const BlockRenderer: React.FC<{ block: ContentBlock; index: number }> = ({ block, index }) => {
  switch (block.type) {
    case 'heading':
      return (
        <h3
          className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mt-6 mb-3 flex items-center gap-2 transition-colors"
          key={index}
        >
          <span className="w-1 h-5 bg-gradient-to-b from-primary to-secondary rounded-full inline-block"></span>
          {block.text}
        </h3>
      );

    case 'paragraph':
      return (
        <p
          className="text-sm md:text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 mb-4 text-justify transition-colors"
          key={index}
          dangerouslySetInnerHTML={{ __html: renderInlineLatex(block.text || '') }}
        />
      );

    case 'equation':
      return (
        <div
          className="my-4 py-3 px-4 bg-white/40 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-2xl overflow-x-auto transition-colors"
          key={index}
          dangerouslySetInnerHTML={{ __html: renderLatex(block.latex || '') }}
        />
      );

    case 'figure':
      if (!block.figure) return null;
      return (
        <figure className="my-5" key={index}>
          <div className="rounded-2xl overflow-hidden border border-slate-200/60 dark:border-white/10 bg-white/30 dark:bg-black/20 transition-colors">
            <img
              src={block.figure.src}
              alt={block.figure.caption}
              loading="lazy"
              className="w-full h-auto object-contain"
            />
          </div>
          <figcaption className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center italic transition-colors">
            {block.figure.caption}
          </figcaption>
        </figure>
      );

    case 'figure-grid':
      if (!block.figures || block.figures.length === 0) return null;
      const cols = block.figures.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2';
      return (
        <div className={`grid ${cols} gap-3 my-5`} key={index}>
          {block.figures.map((fig, figIdx) => (
            <figure key={figIdx}>
              <div className="rounded-xl overflow-hidden border border-slate-200/60 dark:border-white/10 bg-white/30 dark:bg-black/20 transition-colors">
                <img
                  src={fig.src}
                  alt={fig.caption}
                  loading="lazy"
                  className="w-full h-auto object-contain"
                />
              </div>
              <figcaption className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 text-center italic transition-colors">
                {fig.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      );

    default:
      return null;
  }
};

/* ──────────────────────────────────────────────────────────────
   Simulations Page Component
   ────────────────────────────────────────────────────────────── */
const Simulations: React.FC = () => {
  const sortedSims = useMemo(() => [...SIMULATIONS].sort((a, b) => a.order - b.order), []);
  const [activeId, setActiveId] = useState<string>(sortedSims[0]?.id || '');
  const [showSecondary, setShowSecondary] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const activeSim = useMemo(
    () => sortedSims.find((s) => s.id === activeId) || sortedSims[0],
    [activeId, sortedSims]
  );

  // When active sim changes, reset video and scroll description to top
  useEffect(() => {
    setShowSecondary(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
    if (descriptionRef.current) {
      descriptionRef.current.scrollTop = 0;
    }
  }, [activeId]);

  const handleSimClick = (sim: SimulationData) => {
    if (sim.id === activeId) return;
    setActiveId(sim.id);
  };

  const currentVideoSrc = showSecondary && activeSim.secondaryVideoSrc
    ? activeSim.secondaryVideoSrc
    : activeSim.videoSrc;

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-8 lg:py-12">
      {/* Page Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Simulations
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full mt-4"></div>
        </div>
        <span className="text-slate-500 dark:text-slate-300 uppercase tracking-widest text-sm font-bold transition-colors">
          CFD showcase — OpenFOAM studies
        </span>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-5 min-h-[70vh]">

        {/* ============ LEFT PANEL — Simulation List (1/4) ============ */}
        <aside className="w-full lg:w-1/4 lg:min-w-[260px] lg:max-w-[320px] flex-shrink-0">
          <div className="sticky top-24 bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 rounded-3xl p-3 shadow-lg dark:shadow-2xl max-h-[calc(100vh-7rem)] overflow-y-auto transition-colors"
            style={{ scrollbarWidth: 'thin' }}
          >
            <div className="px-3 pt-2 pb-3">
              <span className="text-[11px] uppercase tracking-[0.15em] font-bold text-slate-400 dark:text-slate-500 transition-colors">
                Simulation Studies
              </span>
            </div>
            <ul className="flex flex-col gap-1">
              {sortedSims.map((sim) => {
                const isActive = sim.id === activeId;
                return (
                  <li key={sim.id}>
                    <button
                      id={`sim-btn-${sim.id}`}
                      onClick={() => handleSimClick(sim)}
                      className={`
                        w-full text-left px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden
                        ${isActive
                          ? 'bg-gradient-to-r from-white/80 to-white/60 dark:from-white/15 dark:to-white/5 shadow-lg dark:shadow-none border border-primary/20 dark:border-primary/30'
                          : 'hover:bg-white/40 dark:hover:bg-white/5 border border-transparent hover:border-slate-200/50 dark:hover:border-white/10'
                        }
                      `}
                    >
                      {/* Active glow */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none" />
                      )}

                      <div className="flex items-start gap-3 relative z-10">
                        {/* Number badge */}
                        <span
                          className={`
                            flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300
                            ${isActive
                              ? 'bg-primary/20 text-primary dark:bg-primary/30 dark:text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                              : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'
                            }
                          `}
                        >
                          {sim.order}
                        </span>

                        {/* Title */}
                        <span
                          className={`
                            text-[13px] font-semibold leading-snug transition-colors duration-300
                            ${isActive
                              ? 'text-slate-900 dark:text-white'
                              : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                            }
                          `}
                        >
                          {sim.shortTitle}
                        </span>
                      </div>

                      {/* Playing indicator */}
                      {isActive && (
                        <div className="flex items-center gap-1 mt-2 ml-10">
                          <div className="flex items-end gap-[2px] h-3">
                            <span className="w-[3px] bg-primary rounded-full animate-pulse" style={{ height: '60%', animationDelay: '0ms' }} />
                            <span className="w-[3px] bg-primary rounded-full animate-pulse" style={{ height: '100%', animationDelay: '150ms' }} />
                            <span className="w-[3px] bg-primary rounded-full animate-pulse" style={{ height: '40%', animationDelay: '300ms' }} />
                            <span className="w-[3px] bg-primary rounded-full animate-pulse" style={{ height: '80%', animationDelay: '100ms' }} />
                          </div>
                          <span className="text-[10px] text-primary dark:text-cyan-400 font-medium ml-1">Playing</span>
                        </div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* ============ RIGHT PANEL — Video + Description (3/4) ============ */}
        <main className="flex-1 min-w-0 flex flex-col gap-5">
          {/* Title bar for active sim */}
          <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 rounded-2xl px-5 py-3 transition-colors">
            <h3 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
              {activeSim.title}
            </h3>
          </div>

          {/* Video Player */}
          <div className="relative bg-black/90 rounded-3xl overflow-hidden border border-slate-200/20 dark:border-white/10 shadow-2xl transition-colors">
            <video
              ref={videoRef}
              key={currentVideoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto max-h-[50vh] object-contain bg-black"
            >
              <source src={currentVideoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video view toggle for sims with secondary video */}
            {activeSim.secondaryVideoSrc && (
              <div className="absolute bottom-3 right-3 flex gap-2">
                <button
                  onClick={() => setShowSecondary(false)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 backdrop-blur-md
                    ${!showSecondary
                      ? 'bg-primary/80 text-white shadow-lg'
                      : 'bg-black/40 text-white/70 hover:bg-black/60 hover:text-white'
                    }`}
                >
                  Full View
                </button>
                <button
                  onClick={() => setShowSecondary(true)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 backdrop-blur-md
                    ${showSecondary
                      ? 'bg-primary/80 text-white shadow-lg'
                      : 'bg-black/40 text-white/70 hover:bg-black/60 hover:text-white'
                    }`}
                >
                  TE Zoom
                </button>
              </div>
            )}
          </div>

          {/* Description Panel */}
          <div
            ref={descriptionRef}
            className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 rounded-3xl p-5 md:p-8 shadow-lg dark:shadow-2xl overflow-y-auto transition-colors"
            style={{ maxHeight: 'calc(100vh - 200px)', scrollbarWidth: 'thin' }}
          >
            {activeSim.content.map((block, idx) => (
              <BlockRenderer block={block} index={idx} key={`${activeSim.id}-${idx}`} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Simulations;
