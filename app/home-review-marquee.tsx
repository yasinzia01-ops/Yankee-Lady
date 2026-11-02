'use client';

import { useEffect, useRef, useState } from 'react';

const reviews = [
  { name: 'Scott Edwards', occasion: 'Google · 2 weeks ago at verification', review: '', source: 'https://www.google.com/maps/contrib/112661601030334515526/reviews' },
  { name: 'Do We', occasion: 'Google · 4 weeks ago at verification', review: 'We had a fantastic experience whilst aboard this beautiful yacht, friendly staff, the food was fantastic', source: 'https://share.google/SFfQpXyKz5gvY5RvG' },
  { name: 'NTRPY', occasion: 'Google · a month ago at verification', review: 'We had an amazing experience with the yacht charter service! From start to finish, everything was handled professionally and smoothly.', source: 'https://share.google/CznCK6VKFoWXTDknC' },
].filter(review => review.review.trim().length > 0);

function ReviewGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="home-review-group" aria-hidden={duplicate || undefined}>
      {reviews.map(review => (
        <article className="review-card" key={review.name}>
          <div className="review-stars" aria-label={duplicate ? undefined : '5 stars'}>★★★★★</div>
          <blockquote>“{review.review}…”</blockquote>
          <footer><strong><a href={review.source} target="_blank" rel="noreferrer" tabIndex={duplicate ? -1 : undefined}>{review.name}</a></strong><span>{review.occasion}</span></footer>
        </article>
      ))}
    </div>
  );
}

export function HomeReviewMarquee() {
  const viewport = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let previous = 0;
    let resumeAt = 0;
    let holding = false;
    let visible = false;
    let mouseStart: { x: number; scroll: number } | null = null;
    let position = element.scrollLeft;
    let lastWritten = position;
    const pause = () => { resumeAt = performance.now() + 700; };
    const down = (event: PointerEvent) => {
      if (event.button !== 0) return;
      holding = true;
      pause();
      if (event.pointerType === 'mouse') {
        mouseStart = { x:event.clientX, scroll:element.scrollLeft };
        element.setPointerCapture(event.pointerId);
      }
    };
    const move = (event: PointerEvent) => {
      if (!mouseStart) return;
      element.scrollLeft = mouseStart.scroll - (event.clientX - mouseStart.x);
      pause();
    };
    const up = () => {
      if (!holding) return;
      holding = false;
      mouseStart = null;
      pause();
    };
    const scroll = () => {
      // Ignore our own animation writes; touch momentum and scrollbar dragging
      // extend the pause until three seconds after the final user movement.
      if (Math.abs(element.scrollLeft - lastWritten) > 2) pause();
    };
    const group = element.querySelector<HTMLElement>('.home-review-group');
    let groupWidth = group?.getBoundingClientRect().width ?? 0;
    const resizeObserver = new ResizeObserver(entries => {
      groupWidth = group?.getBoundingClientRect().width ?? 0;
    });
    if (group) resizeObserver.observe(group);
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden || paused || preference.matches) { previous = 0; return; }
      const elapsed = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      if (!paused && !preference.matches && visible && !document.hidden && !holding && now >= resumeAt && groupWidth > 0) {
        position += elapsed * .04;
        if (position >= groupWidth) position %= groupWidth;
        element.scrollLeft = position;
        lastWritten = element.scrollLeft;
      } else {
        position = element.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };
    const syncAnimation = () => {
      if (visible && !document.hidden && !paused && !preference.matches) {
        if (!frame) frame = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
        previous = 0;
      }
    };
    const observer = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? false;
      syncAnimation();
    });
    document.addEventListener('visibilitychange', syncAnimation);
    preference.addEventListener('change', syncAnimation);
    observer.observe(element);
    element.addEventListener('pointerdown', down);
    element.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    element.addEventListener('lostpointercapture', up);
    element.addEventListener('wheel', pause, { passive:true });
    element.addEventListener('keydown', pause);
    element.addEventListener('scroll', scroll, { passive:true });
    syncAnimation();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', syncAnimation);
      preference.removeEventListener('change', syncAnimation);
      element.removeEventListener('pointerdown', down);
      element.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      element.removeEventListener('lostpointercapture', up);
      element.removeEventListener('wheel', pause);
      element.removeEventListener('keydown', pause);
      element.removeEventListener('scroll', scroll);
    };
  }, [paused]);
  return (
    <>
    <section ref={viewport} className="home-review-marquee" aria-label="Guest reviews; swipe horizontally to browse">
      <button className="sr-only" type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Resume' : 'Pause'} automatic review scrolling</button>
      <div className="home-review-track">
        <ReviewGroup />
        <ReviewGroup duplicate />
      </div>
    </section>
    </>
  );
}
