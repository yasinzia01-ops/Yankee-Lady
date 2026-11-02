'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { OptimizedImage } from '../optimized-image';
import { ArrowLeft, ChevronLeft, ChevronRight, Grid3X3, X } from 'lucide-react';

import { galleryPhotos } from '../gallery-data';

type GalleryHeading = { label: string; title: ReactNode; note: string };

// `photos`, `heading` and `className` let landing pages show their own selection in the listing layout.
export function YachtGallery({ name, variant = 'listing', showHeading = true, photos = galleryPhotos, heading, className }: { name: string; numeral: 'III' | 'IV'; variant?: 'listing' | 'masonry' | 'grid'; showHeading?: boolean; photos?: readonly (readonly [string, string])[]; heading?: GalleryHeading; className?: string }) {
  const images = photos;
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => { setGalleryOpen(false); setActive(null); }, []);
  const openGrid = useCallback(() => { setActive(null); setGalleryOpen(true); }, []);
  const openPhoto = useCallback((index: number) => { setActive(index); setGalleryOpen(true); }, []);
  const move = useCallback((direction: number) => setActive(current => current === null ? 0 : (current + direction + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (!galleryOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { if (active === null) close(); else setActive(null); }
      if (active !== null && event.key === 'ArrowLeft') move(-1);
      if (active !== null && event.key === 'ArrowRight') move(1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [active, close, galleryOpen, move]);

  return (
    <section className={`${variant === 'grid' ? 'event-gallery-sections event-gallery-unified' : variant === 'masonry' ? 'yacht-gallery-section fleet-gallery-immersive' : 'yacht-gallery-section'}${className ? ` ${className}` : ''}`} id="gallery" aria-label={`${name} photo gallery`}>
      {showHeading && variant === 'masonry' && <div className="gallery-heading"><div><p>Step aboard</p><h2>Your event.<br /><em>Every perspective.</em></h2></div><span>Explore the decks, the dining and the views.<br />Select any photograph for a closer look.</span></div>}
      {showHeading && variant === 'listing' && <div className="gallery-heading" data-reveal><div><p>{heading?.label ?? 'A closer look'}</p><h2>{heading?.title ?? <>Life aboard <em>{name}.</em></>}</h2></div><span>{images.length} photographs · {heading?.note ?? 'exterior, decks and celebrations'}</span></div>}
      <div className={variant === 'grid' ? 'event-photo-grid event-photo-aligned site-gallery-grid' : variant === 'masonry' ? 'fleet-masonry-gallery site-gallery-grid' : 'listing-gallery site-gallery-grid'} data-ui-pattern="gallery-grid">
        {images.slice(0, variant === 'listing' ? 5 : images.length).map(([src, alt], index) => <button key={src} className={index === 0 && variant === 'listing' ? 'gallery-lead' : ''} onClick={() => openPhoto(index)} aria-label={`Open photo ${index + 1}: ${alt}`}><OptimizedImage src={src} alt={alt} loading="lazy" />{variant === 'masonry' && <span className="fleet-photo-caption">{alt}<span aria-hidden="true">↗</span></span>}</button>)}
        {variant === 'listing' && <button className="show-gallery" onClick={openGrid}><Grid3X3 size={16} /> View all {images.length} photos</button>}
      </div>
      {galleryOpen && <dialog open className={`gallery-lightbox ${active === null ? 'is-grid' : 'is-photo'}`} aria-label={`${name} gallery viewer`}>
        <button className="lightbox-backdrop" onClick={close} aria-label="Close gallery" />
        <div className="lightbox-bar"><div className="lightbox-bar-main">{active !== null && <button className="lightbox-back" onClick={() => setActive(null)} aria-label="Back to all photos"><ArrowLeft size={18} /><span>All photos</span></button>}<p>{name}<span>{active === null ? `${images.length} photographs` : `${active + 1} / ${images.length}`}</span></p></div><button className="lightbox-close" onClick={close} aria-label="Close gallery"><X /></button></div>
        {active === null ? <section className="lightbox-masonry" aria-label={`All ${name} photographs`}>
          <div className="lightbox-masonry-columns">
            {images.map(([src, alt], index) => <button key={src} onClick={() => setActive(index)} aria-label={`Open photo ${index + 1}: ${alt}`}><OptimizedImage sizes="(max-width: 1000px) 50vw, 33vw" src={src} alt={alt} loading="lazy" /></button>)}
          </div>
        </section> : <>
          <button className="lightbox-arrow previous" onClick={() => move(-1)} aria-label="Previous photo"><ChevronLeft /></button>
          <figure><OptimizedImage sizes="100vw" loading="eager" src={images[active][0]} alt={images[active][1]} /><figcaption>{images[active][1]}</figcaption></figure>
          <button className="lightbox-arrow next" onClick={() => move(1)} aria-label="Next photo"><ChevronRight /></button>
        </>}
      </dialog>}
    </section>
  );
}
