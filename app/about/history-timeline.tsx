'use client';

import { useEffect, useRef, useState } from 'react';
import { OptimizedImage } from '../optimized-image';

const milestones = [
  ['1984', 'Built in Toronto', 'Cousins John and Jim Greeley establish Yankee Lady Yacht Charters and begin shaping a vessel around life on Toronto Harbour.', '/originals/history-1984.jpg', 'The first chapter at the dock', 'John and Jim turned their knowledge of the harbour into an owner-built event vessel. The original Yankee Lady set the enduring blueprint: generous indoor rooms, open-air decks and a close connection to the Toronto waterfront.'],
  ['1992', 'A sister vessel joins', 'A second identical event vessel expands the family fleet and carries the original owner-built design forward.', '/originals/history-1992.jpg', 'The fleet grows on Toronto Harbour', 'Eight years after the company began, a sister vessel joined the fleet. The expansion preserved the practical layout of the first yacht while welcoming more weddings, company occasions and private cruises onto the water.'],
  ['2000', 'Purpose-built for gatherings', 'Weddings, corporate occasions and private themed cruises become central to the experience aboard.', '/originals/history-2000.webp', 'The yacht becomes an event venue', 'By the turn of the millennium, Yankee Lady had evolved from a harbour charter into a dedicated floating venue. Dining, dancing and open-deck views became part of a distinctly Toronto way to celebrate.'],
  ['2010', 'A modern sister ship', 'A major fleet upgrade is completed with the arrival of the modern Yankee Lady IV.', '/originals/yacht.jpg', 'A new generation takes the water', 'Yankee Lady IV introduced a modern sister ship while keeping the family company’s original priorities intact: comfortable gathering spaces, professional crews and memorable views from every deck.'],
  ['2024', 'Forty years on the harbour', 'The family business celebrates four decades of Toronto events and begins its next chapter.', '/gallery/yankee-lady-gallery.webp', 'Four decades of celebrations', 'Forty years after the first vessel launched the company story, Yankee Lady remains family-owned and rooted in Toronto Harbour—carrying an owner-built legacy into every event aboard.'],
] as const;

export function HistoryTimeline() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const shown = hovered ?? focused ?? active;
  const list = useRef<HTMLOListElement>(null);
  const photos = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const items = Array.from(list.current?.children ?? []);
      let nearest = 0;
      const mobile = window.matchMedia('(max-width: 760px)').matches;
      const photoBounds = photos.current?.getBoundingClientRect();
      if (mobile && photoBounds && photoBounds.bottom < window.innerHeight) {
        // The fade extends below the sticky card, so hand off before the next
        // milestone enters it rather than waiting for the card's hard edge.
        const readingLine = photoBounds.bottom + 84;
        items.forEach((item, index) => {
          if (item.getBoundingClientRect().top <= readingLine + 1) nearest = index;
        });
      } else {
        const readingLine = window.innerHeight * .58;
        let distance = Infinity;
        items.forEach((item, index) => {
          const bounds = item.getBoundingClientRect();
          const delta = Math.abs(bounds.top + bounds.height / 2 - readingLine);
          if (delta < distance) { nearest = index; distance = delta; }
        });
      }
      setActive(nearest);
    };
    const schedule = () => {
      // Touch focus must not pin a photograph after the visitor resumes scrolling.
      if (window.matchMedia('(pointer: coarse)').matches) {
        setFocused(null);
        setHovered(null);
      }
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return <section className="history-section history-photo-layout" aria-labelledby="history-title">
    <div className="history-copy">
      <div className="history-heading">
        <div className="section-kicker"><span>01</span> The Yankee Lady story</div>
        <h2 id="history-title"><span>Built in Toronto.</span><em>Four decades on the water.</em></h2>
      </div>
      <div className="timeline-track">
      <span className="timeline-progress" aria-hidden="true" />
      <ol className="timeline" ref={list}>
        {milestones.map(([year, title, copy], index) => <li key={year} className={shown === index ? 'is-current' : ''}>
          <button type="button" className="timeline-entry" aria-pressed={shown === index} aria-label={`View photograph for ${year}: ${title}`} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} onFocus={() => setFocused(index)} onBlur={() => setFocused(null)} onClick={() => setFocused(index)}>
            <strong>{year}</strong><span><span className="timeline-title">{title}</span><span className="timeline-description">{copy}</span></span>
          </button>
        </li>)}
      </ol>
      </div>
    </div>
    <figure className="history-photos" ref={photos}>
      <div className="history-photo-stack">{milestones.map(([year, , , src, caption], index) =>
        <OptimizedImage key={year} src={src} alt={caption} aria-hidden={shown !== index} className={shown === index ? 'is-current' : ''} loading="lazy" />
      )}</div>
      <figcaption>
        <span className="history-photo-year">{milestones[shown][0]} · {milestones[shown][1]}</span>
        <strong>{milestones[shown][4]}</strong>
        <p>{milestones[shown][5]}</p>
      </figcaption>
    </figure>
  </section>;
}
