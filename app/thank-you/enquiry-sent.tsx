'use client';

import { useEffect } from 'react';
import { ENQUIRY_PAGE_KEY } from '../yachts/yacht-booking-panel';

const ENQUIRY_PAGE_MAX_AGE = 24 * 60 * 60 * 1000;

function enquiryPages() {
  try {
    const stored = JSON.parse(localStorage.getItem(ENQUIRY_PAGE_KEY) || 'null') as { path?: string; from?: string; at?: number } | null;
    if (stored?.path && stored.at && Date.now() - stored.at < ENQUIRY_PAGE_MAX_AGE) return { enquiry_page: stored.path, enquiry_from: stored.from || '(not set)' };
  } catch {}
  return { enquiry_page: '(not set)', enquiry_from: '(not set)' };
}

// Perfect Venue redirects here with ?enquiry=sent after a submit. GTM's lead tags fire on the
// `enquiry_sent` event; dropping the flag afterwards keeps a reload or revisit from counting again.
export function EnquirySent() {
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get('enquiry') !== 'sent') return;
    const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: 'enquiry_sent', ...enquiryPages() });
    url.searchParams.delete('enquiry');
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
  }, []);
  return null;
}
