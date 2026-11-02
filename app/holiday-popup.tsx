'use client';

import { useEffect, useRef, useState } from 'react';
import './holiday-popup.css';

export function HolidayPopup() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [eligible, setEligible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setEligible(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!eligible || !ready || !dialog.current) return;
    const modal = dialog.current;
    const overflow = document.body.style.overflow;
    modal.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      if (modal.open) modal.close();
    };
  }, [eligible, ready]);

  function dismiss() {
    dialog.current?.close();
    setEligible(false);
  }

  if (!eligible) return null;

  return (
    <dialog
      ref={dialog}
      className="holiday-popup"
      aria-label="Holiday celebrations aboard Yankee Lady"
      onCancel={event => { event.preventDefault(); dismiss(); }}
      onClose={() => setEligible(false)}
      onClick={event => { if (event.target === event.currentTarget) dismiss(); }}
    >
      <button type="button" className="holiday-popup-close" aria-label="Close holiday offer" autoFocus onClick={dismiss}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>
      <a className="holiday-popup-booking" href="/booking" aria-label="Reserve your holiday event date — go to booking">
        <img
          src="/media/holidays-aboard-1280.webp"
          srcSet="/media/holidays-aboard-640.webp 640w, /media/holidays-aboard-1280.webp 1280w"
          sizes="(max-width: 600px) calc(100vw - 24px), (max-width: 928px) calc(100vw - 48px), 880px"
          width="1748"
          height="1240"
          decoding="async"
          fetchPriority="low"
          onLoad={() => setReady(true)}
          onError={() => setEligible(false)}
          alt="Yankee Lady: The year-end party, better aboard. Christmas parties, holiday galas and New Year's Eve on Toronto Harbour. Reserve your date."
        />
      </a>
    </dialog>
  );
}
