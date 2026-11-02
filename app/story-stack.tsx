'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { OptimizedImage } from './optimized-image';

type StoryImage = { src: string; label: string; alt: string };

export function StoryStack({ images }: { images: StoryImage[] }) {
  const [active, setActive] = useState([0]);
  const root = useRef<HTMLDivElement>(null);
  const manualScroll = useRef<number | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (hoverTimer.current) clearTimeout(hoverTimer.current); }, []);

  useEffect(() => {
    let frame = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      frame = 0;
      const element = root.current;
      if (!element || reduced.matches || element.querySelector(':focus-visible')) return;
      if (manualScroll.current !== null && Math.abs(window.scrollY - manualScroll.current) < 160) return;
      manualScroll.current = null;
      const rect = element.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const progress = (window.innerHeight * .65 - rect.top) / (rect.height + window.innerHeight * .15);
      const next = Math.max(0, Math.min(images.length - 1, Math.floor(progress * images.length)));
      setActive(current => current[0] === next ? current : [next]);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [images.length]);

  return <div ref={root} className="story-stack" aria-label="Scenes from life aboard Yankee Lady">
    <Accordion value={active} onValueChange={value => {
      manualScroll.current = window.scrollY;
      if (value.length) setActive(value as number[]);
    }}>
      {images.map((image, index) => {
        const href = '/events#gallery';
        return <AccordionItem className="story-stack-item" value={index} key={image.src} onPointerEnter={event => { if (event.pointerType === 'mouse') { if (hoverTimer.current) clearTimeout(hoverTimer.current); hoverTimer.current = setTimeout(() => { manualScroll.current = window.scrollY; setActive([index]); }, 180); } }} onPointerLeave={() => { if (hoverTimer.current) clearTimeout(hoverTimer.current); }} onFocusCapture={() => setActive([index])}>
          <OptimizedImage src={image.src} alt={image.alt} sizes="(max-width: 760px) 100vw, 85vw" />
          <AccordionTrigger className="story-stack-trigger"><span className="story-stack-number">{String(index + 1).padStart(2, '0')}</span><span>{image.label.charAt(0).toUpperCase() + image.label.slice(1).toLowerCase()}</span></AccordionTrigger>
          <AccordionContent keepMounted className="story-stack-content">
            <a className="story-stack-link" href={href} aria-label={`View more ${image.label.toLowerCase()} experiences`}><span className="story-stack-link-label">View more</span> <span className="sr-only">{image.label.toLowerCase()} experiences</span><ArrowRight size={18} aria-hidden="true" /></a>
          </AccordionContent>
        </AccordionItem>;
      })}
    </Accordion>
  </div>;
}
