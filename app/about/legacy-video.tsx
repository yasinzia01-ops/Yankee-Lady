'use client';

import { useEffect, useRef, useState } from 'react';
import { mediaSrc } from '../optimized-image';

const dropboxPage = 'https://www.dropbox.com/scl/fi/a2hkjai574gd4x7u6i38e/Yankee-Lady-Client-FolderYL_40YOGT_OfficialCommercial.mov?rlkey=ad12038qzsoagdq52pznnbgir&dl=0';
const videoSource = '/media/yankee-lady-commercial-v1.mp4';

export function LegacyVideo() {
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let disposed = false;
    let cleanup = () => {};
    const stream = '/media/legacy-film.m3u8';
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = stream;
    } else {
      void import('hls.js').then(({ default: Hls }) => {
        if (disposed) return;
        if (!Hls.isSupported()) { video.src = videoSource; return; }
        const hls = new Hls({ autoStartLoad: false, enableWorker: false, maxBufferLength: 30, maxMaxBufferLength: 60 });
        const startLoading = () => hls.startLoad();
        video.addEventListener('play', startLoading, { once: true });
        hls.loadSource(stream);
        hls.attachMedia(video);
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (!data.fatal) return;
          hls.destroy();
          video.src = videoSource;
        });
        cleanup = () => {
          video.removeEventListener('play', startLoading);
          hls.destroy();
        };
      }).catch(() => { if (!disposed) video.src = videoSource; });
    }
    return () => { disposed = true; cleanup(); };
  }, []);
  return <figure className="legacy-film">
    <div className="legacy-film-player">
      {/* oxlint-disable-next-line jsx-a11y/media-has-caption -- No approved transcript or caption file was supplied for this legacy commercial. */}
      <video ref={videoRef} controls playsInline preload="metadata" poster={mediaSrc('/originals/story.jpg')} aria-label="Yankee Lady official commercial" onError={() => setFailed(true)}>
        Your browser cannot play this video.
      </video>
      {failed && <div className="legacy-film-fallback"><p>This browser can’t play the preview.</p><a href={dropboxPage} target="_blank" rel="noreferrer">Watch the film on Dropbox ↗</a></div>}
    </div>
  </figure>;
}
