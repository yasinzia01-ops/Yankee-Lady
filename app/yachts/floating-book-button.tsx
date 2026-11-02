'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { CalendarDays, ChevronDown, ChevronUp } from 'lucide-react';
import { Dialog } from '@base-ui/react/dialog';
import { Sheet, SheetTrigger, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';
import { YachtBookingPanel } from './yacht-booking-panel';

export function FloatingBookButton({ name }: { name: string }) {
  const [panelVisible, setPanelVisible] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [dragY, setDragY] = useState(0);
  const swipeStart = useRef<{ x: number; y: number; id: number } | null>(null);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 1000px)');
    const sync = () => { setMobile(query.matches); if (!query.matches) setOpen(false); };
    const openFromHash = () => {
      if (query.matches && window.location.hash === '#availability') setOpen(true);
    };
    const openFromLink = (event: MouseEvent) => {
      if (!query.matches || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest('a') : null;
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin === window.location.origin && url.pathname === window.location.pathname && url.hash === '#availability') {
        event.preventDefault();
        setOpen(true);
      }
    };
    queueMicrotask(() => { sync(); openFromHash(); });
    query.addEventListener('change', sync);
    window.addEventListener('hashchange', openFromHash);
    document.addEventListener('click', openFromLink);
    return () => {
      query.removeEventListener('change', sync);
      window.removeEventListener('hashchange', openFromHash);
      document.removeEventListener('click', openFromLink);
    };
  }, []);

  useEffect(() => {
    const panel = document.getElementById('availability');
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    queueMicrotask(() => setPanelVisible(rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth));
    const observer = new IntersectionObserver(([entry]) => {
      setPanelVisible(entry.isIntersecting && entry.intersectionRect.height > 0);
    }, { threshold: 0 });
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  if (mobile) return <Sheet open={open} onOpenChange={value => { setOpen(value); setDragY(0); swipeStart.current = null; }}>
    <div className="mobile-inquire-bar"><SheetTrigger className="mobile-inquire-button">Plan your event <ChevronUp size={18} /></SheetTrigger></div>
    <Dialog.Portal keepMounted>
      <Dialog.Backdrop className="mobile-inquire-overlay" />
      <Dialog.Popup className="mobile-inquire-sheet" data-dragging={dragY > 0 || undefined} style={{ '--sheet-drag-y': `${dragY}px` } as CSSProperties}>
        <div className="mobile-inquire-heading"
          onPointerDown={event => {
            if (!event.isPrimary || event.button !== 0 || (event.target as Element).closest('button')) return;
            swipeStart.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={event => {
            const start = swipeStart.current;
            if (!start || start.id !== event.pointerId) return;
            const dy = event.clientY - start.y;
            const dx = Math.abs(event.clientX - start.x);
            setDragY(dy > dx ? Math.max(0, dy) : 0);
          }}
          onPointerUp={event => {
            const start = swipeStart.current;
            if (!start || start.id !== event.pointerId) return;
            const dy = event.clientY - start.y;
            if (dy >= 80 && dy > Math.abs(event.clientX - start.x) * 1.5) setOpen(false);
            swipeStart.current = null;
            setDragY(0);
          }}
          onPointerCancel={() => { swipeStart.current = null; setDragY(0); }}
          onLostPointerCapture={() => { swipeStart.current = null; setDragY(0); }}
        >
          <div><SheetTitle>Plan your event</SheetTitle><SheetDescription>Tell us about your occasion aboard {name}.</SheetDescription></div>
          <SheetClose className="mobile-inquire-close" aria-label="Close booking form" title="Close booking form"><ChevronDown size={24} aria-hidden="true" /></SheetClose>
        </div>
        <div className="mobile-inquire-scroll"><YachtBookingPanel yacht={name} embedded /></div>
      </Dialog.Popup>
    </Dialog.Portal>
  </Sheet>;
  if (panelVisible) return null;
  return <a className="floating-book-tab" href="/booking" aria-label={`Plan your event aboard ${name}`}><span>Plan your event</span><CalendarDays size={20} strokeWidth={1.35} /></a>;
}
