'use client';

import { useEffect, useRef, useState } from 'react';
import Link from '../native-link';

const FORM_ORIGIN = 'https://embed.perfectvenue.com';
const FORM_URL = `${FORM_ORIGIN}/contact-form/551ba9ac20?form-type=venue`;
const ATTRIBUTION_KEY = 'yl-attribution';
export const ENQUIRY_PAGE_KEY = 'yl-enquiry-page';

// Perfect Venue stores utm_source/utm_campaign from its own URL on each lead, so pass the visit's
// ad source through. Kept for the tab's session so it survives moving between pages.
function attributedFormUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const clicked = ['gclid', 'gbraid', 'wbraid'].some(key => params.has(key));
    const source = params.get('utm_source') || (clicked ? 'google' : '');
    if (source) {
      const attribution = new URLSearchParams({ utm_source: source });
      const campaign = params.get('utm_campaign');
      if (campaign) attribution.set('utm_campaign', campaign);
      sessionStorage.setItem(ATTRIBUTION_KEY, attribution.toString());
    }
    const stored = sessionStorage.getItem(ATTRIBUTION_KEY);
    return stored ? `${FORM_URL}&${stored}` : FORM_URL;
  } catch {
    return FORM_URL;
  }
}

export function YachtBookingPanel({ yacht, embedded = false, showContactLink = true }: { yacht: string; embedded?: boolean; showContactLink?: boolean }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1500);
  const [panelScrolled, setPanelScrolled] = useState(false);
  const newTabLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const formUrl = attributedFormUrl();
    if (formUrl !== FORM_URL && frame.current && newTabLink.current) {
      frame.current.src = formUrl;
      newTabLink.current.href = formUrl;
    }
    // /thank-you reports the form's page and the page that led there (e.g. /events → /contact).
    // localStorage, because the new-tab form returns in another tab.
    try {
      const referrer = document.referrer ? new URL(document.referrer) : null;
      const from = referrer?.origin === window.location.origin ? referrer.pathname : '(entrance)';
      localStorage.setItem(ENQUIRY_PAGE_KEY, JSON.stringify({ path: window.location.pathname, from, at: Date.now() }));
    } catch {}
  }, []);

  useEffect(() => {
    const resize = (event: MessageEvent) => {
      if (event.origin !== FORM_ORIGIN || event.source !== frame.current?.contentWindow) return;
      const data = event.data;
      if (!data || data.action !== 'setDimensions') return;
      const nextHeight = Number(data.payload?.height);
      if (Number.isFinite(nextHeight) && nextHeight > 0 && nextHeight < 20000) {
        setHeight(Math.ceil(nextHeight));
      }
    };
    window.addEventListener('message', resize);
    return () => window.removeEventListener('message', resize);
  }, []);

  return <aside
    className="yacht-booking-section"
    id={embedded ? 'mobile-availability' : 'availability'}
    tabIndex={embedded ? undefined : 0}
    aria-label={`Enquire about ${yacht}`}
    data-form-scrolled={!embedded && panelScrolled ? 'true' : undefined}
    onScroll={embedded ? undefined : event => setPanelScrolled(event.currentTarget.scrollTop > 6)}
  >
    <div className="compact-booking-shell perfect-venue-booking-shell" data-reveal={embedded ? undefined : true} data-delay="100">
      <header className="perfect-venue-booking-heading">
        <h2>Tell us about your event.</h2>
      </header>
      <iframe
        ref={frame}
        title={`Event enquiry for ${yacht}`}
        src={FORM_URL}
        width="100%"
        height={height}
        loading="eager"
        style={{ display: 'block', border: 0, width: '100%' }}
      />
      <p className="compact-form-note">An enquiry does not reserve the venue or confirm availability.{' '}
        <a ref={newTabLink} href={FORM_URL} target="_blank" rel="noopener noreferrer">Open form in a new tab</a>
      </p>
    </div>
    <p className="booking-aside-help">Need help? {showContactLink && <><Link prefetch={false} href="/contact">Contact us</Link> or </>}<a href="tel:+14168680000">416 868 0000</a>.</p>
  </aside>;
}
