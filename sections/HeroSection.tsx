import type { ReactNode } from 'react';
import {
  Article,
  Briefcase,
  Cube,
  GraduationCap,
  MapPin,
  Quotes,
} from '@phosphor-icons/react';
import { assetUrl } from '../portfolioData';

interface MetricProps {
  icon: ReactNode;
  value: string;
  label: string;
  detail: string;
}

function Metric({ icon, value, label, detail }: MetricProps) {
  return (
    <article className="metric">
      <div className="metric-top">
        <span className="metric-icon">{icon}</span>
        <strong>{value}</strong>
      </div>
      <h2>{label}</h2>
      <p>{detail}</p>
    </article>
  );
}

export default function HeroSection() {
  return (
    <section id="top" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-identity">
        <div className="hero-statement">
          <div className="hero-name-wrap">
            <p className="eyebrow">Hello, I’m</p>
            <h1 id="hero-title">
              <span>Ashwin</span>
              <span>M R</span>
            </h1>
            <img
              className="datum-matrix"
              src={assetUrl('images/drafting-datum-matrix.png')}
              alt=""
              aria-hidden="true"
            />
          </div>
          <p className="hero-intro">
            Aerospace systems engineer working across thermal testing, CFD, model-based systems
            engineering, and simulation for space applications.
          </p>
        </div>

        <div className="metric-grid" aria-label="Portfolio highlights">
          <Metric
            icon={<GraduationCap size={23} weight="regular" aria-hidden="true" />}
            value="MEng"
            label="Aerospace systems engineering"
            detail="University of Illinois Urbana–Champaign"
          />
          <Metric
            icon={<Briefcase size={22} weight="regular" aria-hidden="true" />}
            value="7 mo"
            label="ISRO · VSSC"
            detail="Thermal testing and radiant-heater analysis"
          />
          <Metric
            icon={<Cube size={22} weight="regular" aria-hidden="true" />}
            value="8"
            label="Engineering projects"
            detail="Design · simulate · test · validate"
          />
          <Metric
            icon={<Article size={22} weight="regular" aria-hidden="true" />}
            value="4 + 2"
            label="Papers · patent entries"
            detail="Journal · conferences · applied research"
          />
        </div>
      </div>

      <figure className="hero-portrait">
        <img
          src={assetUrl('images/profile.jpg')}
          alt="Ashwin M R wearing a black suit"
          width="1920"
          height="1280"
          fetchPriority="high"
        />
      </figure>

      <aside className="hero-quote" aria-label="Professional focus">
        <Quotes className="quote-icon" size={30} weight="fill" aria-hidden="true" />
        <blockquote>
          I enjoy solving complex engineering problems at the intersection of thermal sciences,
          fluids, and systems design.
        </blockquote>
        <img className="name-wordmark" src={assetUrl('images/ashwin-wordmark.png')} alt="Ashwin M R" />
        <p className="location-line">
          <MapPin size={15} weight="regular" aria-hidden="true" />
          Urbana, Illinois, US
        </p>
      </aside>
    </section>
  );
}
