'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Square } from 'lucide-react';

const VIDEO_ID = 'dZWlvRJi-to';
// Seek back to the start this many seconds before the end (the player reports
// its position about every 250ms) so YouTube never reaches its end state,
// which flashes the play button, logo and spinner.
const LOOP_LEAD_SECONDS = 0.6;
// Minimal overscan prevents edge seams without unnecessarily enlarging the stream.
const OVERSCAN = 1.01;
const STARTUP_SETTLE_MS = 900;

const PLAYER_ORIGIN = 'https://www.youtube-nocookie.com';
const STATE = { ENDED: 0, PLAYING: 1, PAUSED: 2 };

export function HeroVideo() {
  const container = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let idleCallback: number | undefined;
    const cancelScheduledStart = () => {
      if (timer !== undefined) clearTimeout(timer);
      if (idleCallback !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleCallback);
      timer = undefined;
      idleCallback = undefined;
    };
    const update = () => {
      cancelScheduledStart();
      setEnabled(false);
      if (preference.matches || connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType ?? '')) return;
      if ('requestIdleCallback' in window) {
        idleCallback = window.requestIdleCallback(() => {
          idleCallback = undefined;
          setEnabled(true);
        }, { timeout: 400 });
      } else {
        timer = setTimeout(() => setEnabled(true), 150);
      }
    };
    update();
    preference.addEventListener('change', update);
    return () => {
      cancelScheduledStart();
      preference.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      // Cover the hero without letterboxing, including portrait mobile layouts.
      const videoWidth = Math.max(width, height * 16 / 9) * OVERSCAN;
      setSize({ width: Math.ceil(videoWidth), height: Math.ceil(videoWidth * 9 / 16) });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const active = enabled && !stopped && size.width > 0;

  // Drive the embed over YouTube's postMessage protocol (what its iframe API
  // script uses) so no third-party script is needed.
  useEffect(() => {
    if (!active || !frame.current) return;
    const iframe = frame.current;
    const send = (message: object) => iframe.contentWindow?.postMessage(JSON.stringify(message), PLAYER_ORIGIN);
    const command = (func: string, args: unknown[] = []) => send({ event: 'command', func, args, id: 1, channel: 'widget' });
    let duration = 0;
    let ready = false;
    let inView = true;
    const shouldPlay = () => inView && !document.hidden;
    const syncPlayback = () => {
      if (ready) command(shouldPlay() ? 'playVideo' : 'pauseVideo');
    };
    const visibilityObserver = new IntersectionObserver(entries => {
      inView = entries[0]?.isIntersecting ?? false;
      syncPlayback();
    });
    if (container.current) visibilityObserver.observe(container.current);
    document.addEventListener('visibilitychange', syncPlayback);
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let revealTimer: ReturnType<typeof setTimeout> | undefined;
    let revealed = false;
    let loopSeeking = false;

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== PLAYER_ORIGIN || event.source !== iframe.contentWindow || typeof event.data !== 'string') return;
      let data: { event?: string; info?: unknown };
      try { data = JSON.parse(event.data); } catch { return; }
      if (!ready && (data.event === 'onReady' || data.event === 'initialDelivery')) {
        ready = true;
        command('mute');
        syncPlayback();
      }
      const state = data.event === 'onStateChange' ? data.info as number
        : data.event === 'infoDelivery' ? (data.info as { playerState?: number })?.playerState : undefined;
      // Only show the video while it is playing, so YouTube's centre play/pause
      // overlay never appears; brief stalls (such as the loop seek) stay visible.
      if (state === STATE.PLAYING) {
        clearTimeout(hideTimer);
        hideTimer = undefined;
        // Keep the poster visible until playback has settled, then crossfade.
        if (!revealed && revealTimer === undefined) revealTimer = setTimeout(() => {
          revealTimer = undefined;
          revealed = true;
          setPlaying(true);
        }, STARTUP_SETTLE_MS);
      } else if (state !== undefined) {
        clearTimeout(revealTimer);
        revealTimer = undefined;
        if (hideTimer === undefined) hideTimer = setTimeout(() => {
          hideTimer = undefined;
          revealed = false;
          setPlaying(false);
        }, 700);
      }
      // Keep it running if the browser or YouTube pauses or ends it.
      if (shouldPlay() && state === STATE.ENDED) { command('seekTo', [0, true]); command('playVideo'); }
      if (shouldPlay() && state === STATE.PAUSED) command('playVideo');
      if (data.event === 'infoDelivery' && data.info && typeof data.info === 'object') {
        const info = data.info as { duration?: number; currentTime?: number };
        if (info.duration) duration = info.duration;
        if (info.currentTime !== undefined && duration > 1) {
          if (info.currentTime < duration - LOOP_LEAD_SECONDS) loopSeeking = false;
          if (shouldPlay() && !loopSeeking && info.currentTime >= duration - LOOP_LEAD_SECONDS) {
            loopSeeking = true;
            command('seekTo', [0, true]);
          }
        }
      }
    };
    window.addEventListener('message', onMessage);
    // Subscribe until the player answers; it ignores messages sent before it has loaded.
    const handshake = setInterval(() => { if (ready) clearInterval(handshake); else send({ event: 'listening', id: 1, channel: 'widget' }); }, 250);

    return () => {
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      clearInterval(handshake);
      clearTimeout(hideTimer);
      clearTimeout(revealTimer);
      window.removeEventListener('message', onMessage);
      setPlaying(false);
    };
  }, [active]);

  return <>
    <div ref={container} className="home-hero-video" aria-hidden="true" style={{ overflow: 'hidden' }}>
      {active && <iframe
        ref={frame}
        title="Yankee Lady yacht charter background video"
        src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}&autoplay=1&mute=1&controls=0&playsinline=1&rel=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1`}
        allow="autoplay; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        tabIndex={-1}
        style={{ position: 'absolute', top: '50%', left: '50%', width: size.width, height: size.height, maxWidth: 'none', transform: 'translate(-50%, -50%)', border: 0, pointerEvents: 'none', opacity: playing ? 1 : 0, transition: playing ? 'opacity 1.2s cubic-bezier(.22,1,.36,1)' : 'opacity .3s ease' }}
      />}
    </div>
    {enabled && <button
      className="hero-video-toggle"
      type="button"
      aria-label={stopped ? 'Play background video from beginning' : 'Stop background video'}
      onClick={() => setStopped(value => !value)}
    >{stopped ? <Play size={15} /> : <Square size={13} />}</button>}
  </>;
}
