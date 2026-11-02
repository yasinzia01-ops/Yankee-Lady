'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export function StickyHeader({ children, homePage = false }: { children: ReactNode; homePage?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroBrandHidden, setHeroBrandHidden] = useState(false);
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
    const update = () => {
      setScrolled(window.scrollY > 24);

      if (homePage) {
        const heroBrand = document.querySelector<HTMLElement>('.hero-brand');
        const headerHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-header-height')) || 0;
        setHeroBrandHidden(Boolean(heroBrand && heroBrand.getBoundingClientRect().bottom <= headerHeight));
      } else {
        const pageHero = document.querySelector<HTMLElement>('.about-hero,.interior-hero,.event-gallery-hero');
        if (pageHero) {
          const heroTop = pageHero.getBoundingClientRect().top + window.scrollY;
          setCondensed(window.scrollY >= heroTop + pageHero.offsetHeight / 2);
        } else {
          setCondensed(window.scrollY > 240);
        }
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [homePage]);

  const header = <header className={`site-header site-header-sticky${homePage ? ' site-header-home' : ''}`} data-scrolled={scrolled} data-hero-brand-hidden={homePage ? heroBrandHidden : undefined} data-condensed={!homePage ? condensed : undefined}>{children}</header>;
  // Keep the original header's space; the portal escapes hero clipping and stacking contexts.
  return <><div className="site-header-space" aria-hidden="true" />{mounted ? createPortal(header, document.body) : header}</>;
}
