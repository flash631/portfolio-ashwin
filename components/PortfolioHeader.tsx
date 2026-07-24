import { useEffect, useRef, useState } from 'react';
import { List, Moon, Sun, X } from '@phosphor-icons/react';
import { NAV_ITEMS, sectionHref } from '../portfolioData';

interface PortfolioHeaderProps {
  theme: 'light' | 'night';
  onThemeToggle: () => void;
  simulationPage?: boolean;
}

export default function PortfolioHeader({ theme, onThemeToggle, simulationPage = false }: PortfolioHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>('a');
    firstLink?.focus();
    document.body.classList.add('menu-locked');

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('menu-locked');
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href={sectionHref('top', simulationPage)} aria-label="Ashwin M R — back to the portfolio">
        <span>AM</span>
        <i aria-hidden="true" />
      </a>

      <div className="header-inner">
        <p className="discipline">Aerospace engineer</p>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={sectionHref(item.id, simulationPage)}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="icon-button theme-button"
          type="button"
          onClick={onThemeToggle}
          aria-label={theme === 'light' ? 'Switch to night theme' : 'Switch to light theme'}
        >
          {theme === 'light' ? <Sun size={19} weight="fill" /> : <Moon size={18} weight="fill" />}
        </button>

        <button
          ref={menuButtonRef}
          className="icon-button menu-button"
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      <nav
        ref={menuRef}
        id="mobile-navigation"
        className={`mobile-nav${menuOpen ? ' is-open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <p>Navigate the portfolio</p>
        {NAV_ITEMS.map((item, index) => (
          <a
            key={item.id}
            href={sectionHref(item.id, simulationPage)}
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
