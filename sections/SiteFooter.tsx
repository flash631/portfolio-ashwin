import { ArrowUp } from '@phosphor-icons/react';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Ashwin M R. All rights reserved.</p>
      <p>Aerospace · thermal systems · CFD · MBSE</p>
      <a href="#top">Back to top <ArrowUp size={14} weight="bold" aria-hidden="true" /></a>
    </footer>
  );
}
