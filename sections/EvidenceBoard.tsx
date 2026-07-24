import { useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  EnvelopeSimple,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  XLogo,
} from '@phosphor-icons/react';
import { CONFERENCE_PAPERS, JOURNAL_PAPERS, PROJECTS } from '../constants';
import { assetUrl, SKILL_GROUPS, SOCIAL_LINKS } from '../portfolioData';
import SectionHeading from '../components/SectionHeading';

const publicationRows = [JOURNAL_PAPERS[0], CONFERENCE_PAPERS[0], CONFERENCE_PAPERS[1]];

function publicationKind(index: number) {
  if (index === 0) return 'Journal';
  if (index === 1) return 'Book chapter';
  return 'Conference';
}

function SimulationPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPlayback = () => {
      const video = videoRef.current;
      if (!video) return;
      if (reduceMotion.matches) video.pause();
      else void video.play().catch(() => undefined);
    };

    syncPlayback();
    reduceMotion.addEventListener('change', syncPlayback);
    return () => reduceMotion.removeEventListener('change', syncPlayback);
  }, []);

  return (
    <video
      ref={videoRef}
      className="simulation-preview-video"
      src={assetUrl('simulations/1_non_newtonian_poiseuille/nonNewtonian_planar_poiseuille_10s.mp4')}
      poster={assetUrl('simulations/1_non_newtonian_poiseuille/final_velocity_contour.png')}
      aria-label="Animated velocity and viscosity fields for non-Newtonian planar Poiseuille flow"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onLoadedMetadata={(event) => { event.currentTarget.currentTime = 2; }}
    />
  );
}

export default function EvidenceBoard() {
  return (
    <>
      <section className="evidence-board" aria-label="Selected portfolio evidence">
        <div id="publications" className="board-panel publications-panel">
          <SectionHeading title="Publications" actionLabel="View all" actionHref="#publication-index" />
          <div className="publication-list">
            {publicationRows.map((publication, index) => {
              const content = (
                <>
                  <span className="document-mark" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span className="publication-copy">
                    <strong>{publication.title}</strong>
                    <small>{publication.authors}</small>
                    <em>{publication.venue}</em>
                  </span>
                  <span className="publication-kind">{publicationKind(index)}</span>
                </>
              );

              return publication.link ? (
                <a
                  className="publication-row"
                  href={publication.link}
                  key={publication.title}
                  target="_blank"
                  rel="noreferrer"
                >
                  {content}
                </a>
              ) : (
                <article className="publication-row" key={publication.title}>{content}</article>
              );
            })}
          </div>
        </div>

        <div id="projects" className="board-panel projects-panel">
          <SectionHeading title="Featured projects" actionLabel="View all" actionHref="#project-index" />
          <div className="project-mini-grid">
            {PROJECTS.slice(0, 6).map((project, index) => (
              <a
                className="project-mini"
                href={project.link}
                key={project.title}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} — ${project.linkText || 'Open project'}`}
              >
                <span className="project-mini-image">
                  <img src={assetUrl(project.images[index === 1 || index === 5 ? 1 : 0])} alt="" loading="lazy" />
                </span>
                <span className="project-year">{project.year}</span>
                <strong>{project.title}</strong>
                <small>{project.tag || (project.linkText === 'GitHub Link' ? 'Engineering / code' : 'Research / analysis')}</small>
              </a>
            ))}
          </div>
        </div>

        <div id="skills" className="board-panel skills-panel">
          <SectionHeading title="Technical skills" actionLabel="View all" actionHref="#skill-index" />
          {SKILL_GROUPS.slice(0, 4).map((group) => (
            <div className="skill-row" key={group.title}>
              <h3>{group.title}</h3>
              <div className="skill-tags">
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="spotlight-band">
        <div id="simulations" className="simulation-spotlight">
          <p className="eyebrow">Simulation spotlight</p>
          <h2>Non-Newtonian planar Poiseuille Flow</h2>
          <div className="simulation-visuals">
            <SimulationPreview />
            <div className="simulation-summary">
              <p>
                Laminar, incompressible flow governed by the Herschel–Bulkley model in a 2D channel.
                The transient study resolves plug formation and the nonlinear pressure–flow response.
              </p>
              <a href="#simulation-index">
                View case studies <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <aside className="contact-spotlight" aria-label="Contact preview">
          <SectionHeading title="Let’s connect" inverse />
          <div className="contact-spotlight-grid">
            <div>
              <p>Interested in research collaborations, engineering opportunities, or a thoughtful technical conversation?</p>
              <a className="contact-button" href="mailto:aswinmr0060@gmail.com">
                Get in touch <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
              </a>
            </div>
            <div className="contact-details">
              <a href="mailto:aswinmr0060@gmail.com">
                <EnvelopeSimple size={18} aria-hidden="true" />
                aswinmr0060@gmail.com
              </a>
              <p><MapPin size={18} aria-hidden="true" /> Urbana, Illinois, US</p>
              <div className="social-row" aria-label="Social links">
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinLogo size={22} weight="fill" /></a>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubLogo size={22} weight="fill" /></a>
                <a href={SOCIAL_LINKS.x} target="_blank" rel="noreferrer" aria-label="X"><XLogo size={20} /></a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramLogo size={21} /></a>
                <a href="mailto:aswinmr0060@gmail.com" aria-label="Email"><EnvelopeSimple size={21} /></a>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
