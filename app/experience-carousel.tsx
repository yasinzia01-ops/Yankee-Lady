'use client';

import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from './native-link';
import { mediaCssImage } from './optimized-image';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, FocusEvent } from 'react';

const experiences = [
  { label: 'Wedding cruises', title: <>Say “I do”<br />against the skyline.</>, link: 'Explore weddings', image: '/gallery/event-5.jpg', className:'experience-wedding' },
  { label: 'Corporate events', title: <>Give the room<br />a better view.</>, link: 'Explore corporate', image: '/gallery/event-2.jpg', className:'' },
  { label: 'Catering & dining', title: <>A menu made<br />for the moment.</>, link: 'Explore catering', image: '/gallery/yacht-catering-buffet.jpg', className:'' },
  { label: 'Private celebrations', title: <>Make a milestone<br />feel monumental.</>, link: 'Explore celebrations', image: '/gallery/yacht-fruit-display.jpg', className:'' },
];

export function ExperienceCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const swipe = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (paused || window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setActive(current => (current + 1) % experiences.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const move = (direction: number) => {
    setActive(current => (current + direction + experiences.length) % experiences.length);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
  };

  return (
    <div
      className="experience-carousel"
      data-reveal="image"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={handleBlur}
    >
      <div className="experience-stage"
        onTouchStart={event => {
          const touch = event.touches[0];
          swipe.current = { x: touch.clientX, y: touch.clientY };
          setPaused(true);
        }}
        onTouchEnd={event => {
          const start = swipe.current;
          swipe.current = null;
          if (!start) return;
          const touch = event.changedTouches[0];
          const dx = touch.clientX - start.x;
          const dy = touch.clientY - start.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
        }}
        onTouchCancel={() => { swipe.current = null; }}
      >
        {experiences.map((experience, index) => {
          const offset = (index - active + experiences.length) % experiences.length;
          const position = offset === 0 ? 'is-active' : offset === 1 ? 'is-next' : offset === experiences.length - 1 ? 'is-prev' : 'is-hidden';
          const isActive = position === 'is-active';

          return (
            <article
              className={`experience-slide ${experience.className} ${position}`}
              style={{ '--experience-image': mediaCssImage(experience.image) } as CSSProperties}
              aria-hidden={!isActive}
              key={experience.label}
            >
              <div className="card-number">0{index + 1}</div>
              <div>
                <p>{experience.label}</p>
                <h3>{experience.title}</h3>
                <Link prefetch={false} href="/venue" tabIndex={isActive ? undefined : -1}>{experience.link} <ArrowUpRight size={15} /></Link>
              </div>
            </article>
          );
        })}
      </div>

      <div className="experience-controls" aria-label="Experience slideshow controls">
        <button className="experience-arrow" type="button" onClick={() => move(-1)} aria-label="Previous experience">
          <ArrowLeft size={17} strokeWidth={1.4} />
        </button>
        <div className="experience-dots">
          {experiences.map((experience, index) => (
            <button
              className={`experience-dot ${index === active ? 'is-active' : ''}`}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${experience.label}`}
              aria-current={index === active ? 'true' : undefined}
              key={experience.label}
            />
          ))}
        </div>
        <button className="experience-arrow" type="button" onClick={() => move(1)} aria-label="Next experience">
          <ArrowRight size={17} strokeWidth={1.4} />
        </button>
      </div>
    </div>
  );
}
