import { ArrowRight } from '@phosphor-icons/react';

interface SectionHeadingProps {
  title: string;
  actionLabel?: string;
  actionHref?: string;
  inverse?: boolean;
}

export default function SectionHeading({ title, actionLabel, actionHref, inverse = false }: SectionHeadingProps) {
  return (
    <header className={`section-heading${inverse ? ' section-heading--inverse' : ''}`}>
      <h2>{title}</h2>
      {actionLabel && actionHref ? (
        <a className="section-link" href={actionHref}>
          {actionLabel}
          <ArrowRight aria-hidden="true" size={14} weight="bold" />
        </a>
      ) : null}
    </header>
  );
}
