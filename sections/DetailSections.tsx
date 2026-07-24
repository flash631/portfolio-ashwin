import {
  ArrowUpRight,
  CheckCircle,
  DownloadSimple,
  FilePdf,
  Flask,
} from '@phosphor-icons/react';
import { CONFERENCE_PAPERS, EXPERIENCES, JOURNAL_PAPERS, PATENTS, PROJECTS } from '../constants';
import { assetUrl, SIMULATION_VISUALS, simulationHref, SKILL_GROUPS } from '../portfolioData';
import { SIMULATIONS } from '../simulationData';

export function DetailHeader({ index, title, description }: { index: string; title: string; description: string }) {
  return (
    <header className="detail-header">
      <span>{index}</span>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </header>
  );
}

export function ExperienceSection() {
  const experience = EXPERIENCES[0];

  return (
    <section id="experience" className="detail-section experience-section">
      <DetailHeader
        index="02"
        title="Field experience"
        description="Hands-on thermal testing, simulation, and team coordination across space and student engineering programmes."
      />
      <div className="experience-layout">
        <figure className="experience-image">
          <img src={assetUrl(experience.image || '')} alt={experience.imageCaption} loading="lazy" />
          <figcaption>VSSC thermal systems team · 2024</figcaption>
        </figure>
        <article className="experience-note">
          <p className="eyebrow">{experience.dates} · {experience.location}</p>
          <h3>{experience.role}</h3>
          <h4>{experience.company}</h4>
          <ul>
            {experience.bullets.map((bullet) => (
              <li key={bullet}><CheckCircle size={17} weight="fill" aria-hidden="true" />{bullet}</li>
            ))}
          </ul>
        </article>
        <article className="experience-secondary">
          <p className="eyebrow">Nov 2021 – Nov 2022</p>
          <h3>Project coordinator</h3>
          <h4>Astrionics</h4>
          <p>
            Coordinated student aerospace research and contributed to electrothermal-thruster work while completing a BTech in aerospace engineering.
          </p>
          <a href={assetUrl('images/aswinmr_resume_job.pdf')} download>
            Download résumé <DownloadSimple size={17} weight="bold" aria-hidden="true" />
          </a>
        </article>
      </div>
    </section>
  );
}

export function PublicationIndex() {
  const publications = [...JOURNAL_PAPERS, ...CONFERENCE_PAPERS];

  return (
    <section id="publication-index" className="detail-section publication-index">
      <DetailHeader
        index="03"
        title="Publication index"
        description="One journal article, three conference or proceedings contributions, and two patent entries."
      />
      <div className="publication-index-grid">
        <div>
          {publications.map((publication, index) => (
            <article className="publication-index-row" key={publication.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p className="eyebrow">{index === 0 ? 'Journal paper' : 'Conference / proceedings'}</p>
                <h3>{publication.title}</h3>
                <p>{publication.authors}</p>
                <small>{publication.venue}</small>
              </div>
              {publication.link ? (
                <a href={publication.link} target="_blank" rel="noreferrer" aria-label={`Open ${publication.title}`}>
                  <ArrowUpRight size={19} weight="bold" />
                </a>
              ) : null}
            </article>
          ))}
        </div>
        <aside className="patent-list">
          <p className="eyebrow">Patent entries</p>
          <p className="patent-note">Application and grant-stage details are omitted.</p>
          {PATENTS.map((patent) => (
            <article key={patent.title}>
              <FilePdf size={22} weight="regular" aria-hidden="true" />
              <p>{patent.title}</p>
            </article>
          ))}
        </aside>
      </div>
    </section>
  );
}

export function ProjectIndex() {
  return (
    <section id="project-index" className="detail-section project-index">
      <DetailHeader
        index="04"
        title="Project archive"
        description="Eight projects spanning CFD, thermal systems, model reduction, MBSE, optical analysis, propulsion, and robotics."
      />
      <div className="project-index-grid">
        {PROJECTS.map((project, index) => (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="project-card"
            key={project.title}
          >
            <span className="project-card-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="project-card-media">
              <img src={assetUrl(project.images[0])} alt="" loading="lazy" />
            </span>
            <span className="project-card-copy">
              <small>{project.year}{project.tag ? ` · ${project.tag}` : ''}</small>
              <strong>{project.title}</strong>
              <em>{project.linkText || 'Open project'} <ArrowUpRight size={14} weight="bold" aria-hidden="true" /></em>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function SimulationIndex() {
  return (
    <section id="simulation-index" className="detail-section simulation-index">
      <DetailHeader
        index="05"
        title="Simulation studies"
        description="Seven OpenFOAM studies covering rheology, separated flow, vortex shedding, natural convection, and airfoil behaviour."
      />
      <div className="simulation-index-grid">
        {SIMULATIONS.map((simulation) => {
          const summary = simulation.content.find((block) => block.type === 'paragraph')?.text || '';
          const image = SIMULATION_VISUALS[simulation.id];

          return (
            <article className="simulation-card" key={simulation.id}>
              <div className="simulation-card-image">
                <img src={assetUrl(image)} alt={`${simulation.shortTitle} result plot`} loading="lazy" />
                <span><Flask size={15} weight="fill" aria-hidden="true" /> OpenFOAM study {String(simulation.order).padStart(2, '0')}</span>
              </div>
              <div>
                <h3>{simulation.title}</h3>
                <p>{summary}</p>
                <a href={simulationHref(simulation.id)}>
                  Read full study <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function SkillIndex() {
  return (
    <section id="skill-index" className="detail-section skill-index">
      <DetailHeader
        index="06"
        title="Technical skills"
        description="Tools and methods I use across simulation, engineering analysis, software development, and systems work."
      />
      <div className="skill-index-grid">
        {SKILL_GROUPS.map((group, index) => (
          <article key={group.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{group.title}</h3>
            <div className="skill-tags">
              {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
