import { useState } from 'react';
import { ArrowUpRight, CheckCircle } from '@phosphor-icons/react';
import { lazy, Suspense } from 'react';
const CadViewer = lazy(() => import('../components/CadViewer'));
import CadStateBar from '../components/CadStateBar';
import { CAD_MODELS } from '../cadModels';
import { assetUrl, cadHref } from '../portfolioData';
import { DetailHeader } from './DetailSections';

export default function CadSection() {
  const [activeId, setActiveId] = useState(CAD_MODELS[0].id);
  const [fileOverride, setFileOverride] = useState<string | undefined>(undefined);
  const model = CAD_MODELS.find((item) => item.id === activeId) || CAD_MODELS[0];

  return (
    <section id="cad-models" className="detail-section cad-section">
      <DetailHeader
        index="06"
        title="CAD models"
        description="Interactive CAD assemblies from my design work — orbit, section, measure and explode them right here, with the full part tree."
      />
      <div className="cad-layout">
        <aside className="cad-details" aria-label={`${model.name} details`}>
          <p className="eyebrow">{model.code} · {model.revision}</p>
          <h3>{model.name}</h3>
          <p className="cad-details-desc">{model.shortDescription}</p>
          <dl className="cad-spec-list">
            {model.specs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="cad-highlights">
            {model.highlights.map((item) => (
              <li key={item}><CheckCircle size={16} weight="fill" aria-hidden="true" />{item}</li>
            ))}
          </ul>
          <a className="cad-enhanced-link" href={cadHref(model.id)}>
            Open enhanced view <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
          </a>
        </aside>
        <div className="cad-viewer-wrap">
          <Suspense fallback={<div className="cad-viewer-status" role="status">Loading viewer…</div>}>
          <CadViewer key={model.id} model={model} variant="section" fileOverride={fileOverride} />
        </Suspense>
          {model.states && (
            <CadStateBar key={model.id} model={model} onStateFile={setFileOverride} />
          )}
        </div>
      </div>

      <div className="cad-carousel" role="listbox" aria-label="CAD model gallery">
        {CAD_MODELS.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="option"
            aria-selected={item.id === activeId}
            className={`cad-card${item.id === activeId ? ' is-active' : ''}`}
            onClick={() => { setActiveId(item.id); setFileOverride(undefined); }}
          >
            <span className="cad-card-media">
              {item.thumbnail
                ? <img src={assetUrl(item.thumbnail)} alt="" loading="lazy" />
                : <span className="cad-card-fallback">{item.code}</span>}
            </span>
            <span className="cad-card-copy">
              <small>{String(index + 1).padStart(2, '0')} · {item.code} · {item.revision}</small>
              <strong>{item.name}</strong>
              <em>{item.specs[1].value}</em>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
