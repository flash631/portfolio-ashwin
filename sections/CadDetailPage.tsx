import { ArrowLeft, Cube } from '@phosphor-icons/react';
import { lazy, Suspense, useState } from 'react';
const CadViewer = lazy(() => import('../components/CadViewer'));
import CadStateBar from '../components/CadStateBar';
import { CAD_MODELS, type CadModel } from '../cadModels';

export default function CadDetailPage({ model, requestedId }: { model?: CadModel; requestedId: string }) {
  const [fileOverride, setFileOverride] = useState<string | undefined>(undefined);
  if (!model) {
    return (
      <section className="simulation-not-found" aria-labelledby="cad-not-found-title">
        <p className="eyebrow">CAD model not found</p>
        <h2 id="cad-not-found-title">No CAD model matches “{requestedId}”.</h2>
        <p>The model may have been renamed or removed. Return to the CAD section to browse the available assemblies.</p>
        <a className="simulation-back-link" href={`${import.meta.env.BASE_URL}#cad-models`}>
          <ArrowLeft size={16} weight="bold" aria-hidden="true" /> Back to CAD models
        </a>
      </section>
    );
  }

  return (
    <article id="top" className="cad-detail-page">
      <header className="cad-detail-hero">
        <a className="simulation-back-link" href={`${import.meta.env.BASE_URL}#cad-models`}>
          <ArrowLeft size={16} weight="bold" aria-hidden="true" /> Back to portfolio
        </a>
        <div className="cad-detail-title">
          <div>
            <p className="eyebrow"><Cube size={15} weight="fill" aria-hidden="true" /> CAD model · {model.code} · {model.revision}</p>
            <h2>{model.name}</h2>
            <p className="cad-detail-sub">{model.fullTitle} — designed in {model.designedIn}, shared as {model.sourceFile} and converted for the web with the assembly tree intact.</p>
          </div>
        </div>
      </header>

      <nav className="simulation-case-strip" aria-label="CAD models">
        {CAD_MODELS.map((item, index) => (
          <a
            key={item.id}
            className={item.id === model.id ? 'is-active' : ''}
            href={`${import.meta.env.BASE_URL}?cad=${encodeURIComponent(item.id)}`}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {item.name}
          </a>
        ))}
      </nav>

      <section className="cad-detail-viewer" aria-label={`${model.name} interactive viewer`}>
        <Suspense fallback={<div className="cad-viewer-status" role="status">Loading viewer…</div>}>
          <CadViewer key={model.id} model={model} variant="full" fileOverride={fileOverride} />
        </Suspense>
        {model.states && (
          <CadStateBar model={model} onStateFile={setFileOverride} />
        )}
      </section>

      <section className="cad-detail-info">
        <div className="cad-detail-about">
          <p className="eyebrow">About this assembly</p>
          <p>{model.description}</p>
          <dl className="cad-spec-list">
            {model.specs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="cad-detail-parts">
          <p className="eyebrow">Parts list</p>
          <table className="cad-parts-table">
            <thead>
              <tr><th>Part</th><th>Qty</th></tr>
            </thead>
            <tbody>
              {model.parts.map((part) => (
                <tr key={part.name}><td>{part.name}</td><td>{part.count ?? '\u2014'}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
