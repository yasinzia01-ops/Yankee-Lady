'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const scrollResetKey = 'yankee-lady-scroll-to-top';

export function NavigationScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    const markPageChange = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!target || target.target === '_blank' || target.hasAttribute('download')) return;

      const destination = new URL(target.href, window.location.href);
      if (destination.origin === window.location.origin && destination.pathname !== window.location.pathname) {
        if (destination.hash) window.sessionStorage.removeItem(scrollResetKey);
        else window.sessionStorage.setItem(scrollResetKey, 'true');
      }
    };

    document.addEventListener('click', markPageChange, true);
    return () => {
      document.removeEventListener('click', markPageChange, true);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useEffect(() => {
    if (window.sessionStorage.getItem(scrollResetKey) !== 'true') return;
    window.sessionStorage.removeItem(scrollResetKey);

    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      secondFrame = window.requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        root.style.scrollBehavior = previousBehavior;
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      root.style.scrollBehavior = previousBehavior;
    };
  }, [pathname]);

  return null;
}
