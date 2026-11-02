'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { OptimizedImage } from '../optimized-image';

// Shows a local poster and loads the YouTube player only after a tap, so the film costs nothing on page load.
export function LandingFilm({ videoId, title, poster, posterAlt, label }: { videoId: string; title: string; poster: string; posterAlt: string; label: string }) {
  const [playing, setPlaying] = useState(false);
  return <div className="lp-film" data-reveal="image">
    {playing
      ? <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`} title={title} referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      : <button type="button" className="lp-film-poster" onClick={() => setPlaying(true)} aria-label={`Play film: ${title}`}>
        <OptimizedImage src={poster} alt={posterAlt} loading="lazy" sizes="(max-width: 1000px) 100vw, 80vw" />
        <span className="lp-film-play"><Play size={22} strokeWidth={1.5} aria-hidden="true" /></span>
        <span className="lp-film-label">{label}</span>
      </button>}
  </div>;
}
