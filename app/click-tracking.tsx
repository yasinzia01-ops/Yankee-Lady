'use client';

import { useEffect } from 'react';

// One listener labels every call, booking, email and link click for GTM, so GA4 gets the same
// event names and parameters wherever a button lives. GTM forwards these; it needs no per-button triggers.

const PLACES: [selector: string, place: string][] = [
  ['.mobile-inquire-bar', 'mobile_bar'],
  ['.mobile-inquire-sheet', 'mobile_sheet'],
  ['.floating-book-tab', 'floating_tab'],
  ['.yacht-booking-section', 'form_panel'],
  ['.mobile-menu', 'mobile_menu'],
  ['.site-header', 'header'],
  ['.site-footer', 'footer'],
  ['.hero, .interior-hero, .about-hero, .event-gallery-hero', 'hero'],
];

function clickPlace(element: Element) {
  for (const [selector, place] of PLACES) if (element.closest(selector)) return place;
  return element.closest('section[id], [aria-labelledby]')?.getAttribute('id') || element.closest('section[class]')?.classList[0] || 'page';
}

function clickEvent(element: HTMLAnchorElement | HTMLButtonElement) {
  if (element instanceof HTMLButtonElement) {
    return element.classList.contains('mobile-inquire-button') ? { event: 'book_click', url: '#availability' } : null;
  }
  const href = element.getAttribute('href') || '';
  if (href.startsWith('tel:')) return { event: 'phone_click', url: href };
  if (href.startsWith('mailto:')) return { event: 'email_click', url: href.split('?')[0] };
  const url = new URL(element.href, window.location.href);
  if (url.hostname === 'embed.perfectvenue.com') return { event: 'book_click', url: 'perfect_venue_new_tab' };
  if (url.origin !== window.location.origin) return null; // GA4 enhanced measurement covers outbound links.
  const booking = ['#availability', '#contact-form'].includes(url.hash) || url.pathname === '/booking' || element.matches('.header-cta, .floating-book-tab');
  return { event: booking ? 'book_click' : 'link_click', url: url.pathname + url.hash };
}

export function ClickTracking() {
  useEffect(() => {
    const track = (event: MouseEvent) => {
      const element = (event.target as Element | null)?.closest<HTMLAnchorElement | HTMLButtonElement>('a[href], button');
      if (!element) return;
      const click = clickEvent(element);
      if (!click) return;
      const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: click.event,
        click_text: (element.getAttribute('aria-label') || element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100),
        click_url: click.url,
        click_location: clickPlace(element),
      });
    };
    // Capture phase, so components that stop propagation still report.
    document.addEventListener('click', track, true);
    return () => document.removeEventListener('click', track, true);
  }, []);
  return null;
}
