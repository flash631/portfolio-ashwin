import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Flask,
} from '@phosphor-icons/react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { assetUrl, SIMULATION_VISUALS, simulationHref } from '../portfolioData';
import { ContentBlock, SIMULATIONS, SimulationData } from '../simulationData';

interface SimulationDetailPageProps {
  simulation?: SimulationData;
  requestedId: string;
}

function SimulationBlock({ block }: { block: ContentBlock; key?: string }) {
  if (block.type === 'heading') {
    return <h2 className="simulation-content-heading">{block.text}</h2>;
  }

  if (block.type === 'paragraph') {
    return <p className="simulation-content-paragraph">{block.text}</p>;
  }

  if (block.type === 'equation' && block.latex) {
    const markup = katex.renderToString(block.latex, {
      displayMode: true,
      throwOnError: false,
      strict: 'ignore',
    });

    return (
      <div
        className="simulation-equation"
        aria-label={`Equation: ${block.latex}`}
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    );
  }

  if (block.type === 'figure' && block.figure) {
    return (
      <figure className="simulation-figure simulation-figure--wide">
        <a href={assetUrl(block.figure.src)} target="_blank" rel="noreferrer" aria-label={`Open full-size figure: ${block.figure.caption}`}>
          <img src={assetUrl(block.figure.src)} alt={block.figure.caption} loading="lazy" />
        </a>
        <figcaption>{block.figure.caption}</figcaption>
      </figure>
    );
  }

  if (block.type === 'figure-grid' && block.figures?.length) {
    return (
      <div className={`simulation-figure-grid simulation-figure-grid--${Math.min(block.figures.length, 3)}`}>
        {block.figures.map((figure) => (
          <figure className="simulation-figure" key={figure.src}>
            <a href={assetUrl(figure.src)} target="_blank" rel="noreferrer" aria-label={`Open full-size figure: ${figure.caption}`}>
              <img src={assetUrl(figure.src)} alt={figure.caption} loading="lazy" />
            </a>
            <figcaption>{figure.caption}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  return null;
}

function SimulationNotFound({ requestedId }: { requestedId: string }) {
  return (
    <section className="simulation-not-found" aria-labelledby="simulation-not-found-title">
      <p className="eyebrow">Simulation not found</p>
      <h1 id="simulation-not-found-title">No study matches “{requestedId}”.</h1>
      <p>The link may be incomplete. Return to the simulation index to choose one of the seven available studies.</p>
      <a href={`${import.meta.env.BASE_URL}#simulation-index`}>
        View simulation studies <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
      </a>
    </section>
  );
}

export default function SimulationDetailPage({ simulation, requestedId }: SimulationDetailPageProps) {
  const [secondaryVideo, setSecondaryVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const caseStripRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setSecondaryVideo(false);
  }, [simulation?.id]);

  useEffect(() => {
    caseStripRef.current
      ?.querySelector('[aria-current="page"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [simulation?.id]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPlayback = () => {
      const video = videoRef.current;
      if (!video) return;
      if (mediaQuery.matches) video.pause();
      else void video.play().catch(() => undefined);
    };

    syncPlayback();
    mediaQuery.addEventListener('change', syncPlayback);
    return () => mediaQuery.removeEventListener('change', syncPlayback);
  }, [simulation?.id, secondaryVideo]);

  if (!simulation) {
    return <SimulationNotFound requestedId={requestedId} />;
  }

  const activeIndex = SIMULATIONS.findIndex((item) => item.id === simulation.id);
  const previous = activeIndex > 0 ? SIMULATIONS[activeIndex - 1] : undefined;
  const next = activeIndex < SIMULATIONS.length - 1 ? SIMULATIONS[activeIndex + 1] : undefined;
  const videoSrc = secondaryVideo && simulation.secondaryVideoSrc
    ? simulation.secondaryVideoSrc
    : simulation.videoSrc;

  return (
    <article id="top" className="simulation-detail-page">
      <header className="simulation-detail-hero">
        <a className="simulation-back-link" href={`${import.meta.env.BASE_URL}#simulation-index`}>
          <ArrowLeft size={16} weight="bold" aria-hidden="true" />
          All simulation studies
        </a>
        <div className="simulation-title-row">
          <span>{String(simulation.order).padStart(2, '0')} / {String(SIMULATIONS.length).padStart(2, '0')}</span>
          <div>
            <p className="eyebrow"><Flask size={15} weight="fill" aria-hidden="true" /> OpenFOAM study</p>
            <h1>{simulation.title}</h1>
          </div>
        </div>
      </header>

      <nav ref={caseStripRef} className="simulation-case-strip" aria-label="Simulation studies">
        {SIMULATIONS.map((item) => (
          <a
            className={item.id === simulation.id ? 'is-active' : ''}
            href={simulationHref(item.id)}
            aria-current={item.id === simulation.id ? 'page' : undefined}
            key={item.id}
          >
            <span>{String(item.order).padStart(2, '0')}</span>
            {item.shortTitle}
          </a>
        ))}
      </nav>

      <section className="simulation-media-section" aria-label={`${simulation.shortTitle} simulation video`}>
        <div className="simulation-video-frame">
          <video
            ref={videoRef}
            key={videoSrc}
            src={assetUrl(videoSrc)}
            poster={assetUrl(SIMULATION_VISUALS[simulation.id])}
            autoPlay
            controls
            loop
            muted
            playsInline
            preload="metadata"
          >
            Your browser does not support embedded video.
          </video>
        </div>

        <div className="simulation-media-note">
          <p className="eyebrow">Case record</p>
          <p>{simulation.content.find((block) => block.type === 'paragraph')?.text}</p>
          {simulation.secondaryVideoSrc ? (
            <div className="simulation-video-toggle" aria-label="Video view">
              <button type="button" onClick={() => setSecondaryVideo(false)} aria-pressed={!secondaryVideo}>
                Full airfoil
              </button>
              <button type="button" onClick={() => setSecondaryVideo(true)} aria-pressed={secondaryVideo}>
                Trailing-edge zoom
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="simulation-content" aria-label="Simulation study details">
        {simulation.content.map((block, index) => (
          <SimulationBlock block={block} key={`${simulation.id}-${index}`} />
        ))}
      </section>

      <nav className="simulation-sibling-nav" aria-label="Adjacent simulation studies">
        {previous ? (
          <a href={simulationHref(previous.id)}>
            <ArrowLeft size={18} weight="bold" aria-hidden="true" />
            <span><small>Previous study</small>{previous.shortTitle}</span>
          </a>
        ) : <span />}
        {next ? (
          <a href={simulationHref(next.id)}>
            <span><small>Next study</small>{next.shortTitle}</span>
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        ) : <span />}
      </nav>
    </article>
  );
}
