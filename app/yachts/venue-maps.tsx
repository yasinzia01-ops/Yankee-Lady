'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, Expand, MapPin, Navigation, SquareParking, X } from 'lucide-react';
import { OptimizedImage } from '../optimized-image';

const routePoints = [
  { number:'1', label:'Queens Quay', detail:'Private boarding', x:'45.6%', y:'30%' },
  { number:'2', label:'Toronto Islands', detail:'Island views', x:'48.3%', y:'65%' },
  { number:'3', label:'Eastern Harbour', detail:'Open-water backdrop', x:'88.8%', y:'40%' },
  { number:'4', label:'Western Harbour', detail:'City skyline views', x:'17.2%', y:'53.5%' },
];

function HarbourArtwork({ active, onActive, expanded = false }: { active:number; onActive:(index:number) => void; expanded?:boolean }) {
  const canvas = useRef<HTMLDivElement>(null);
  const [crop, setCrop] = useState({ x:1, y:1, left:0, top:0, positionX:50, positionY:50, contain:false });
  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return;
      const coverScale = Math.max(width / 2014, height / 1412);
      const contain = 2014 * coverScale * .716 > width - 48 || 1412 * coverScale * .35 > height - 48;
      const scale = contain ? Math.min(width / 2014, height / 1412) : coverScale;
      const imageWidth = 2014 * scale;
      const imageHeight = 1412 * scale;
      // Center the four-point bounding box, clamping to avoid empty edges when covering.
      const left = imageWidth > width ? Math.max(width - imageWidth, Math.min(0, width / 2 - imageWidth * .53)) : (width - imageWidth) / 2;
      const top = imageHeight > height ? Math.max(height - imageHeight, Math.min(0, height / 2 - imageHeight * .475)) : (height - imageHeight) / 2;
      setCrop({ x:imageWidth / width, y:imageHeight / height, left:left / width * 100, top:top / height * 100, positionX:imageWidth === width ? 50 : left / (width - imageWidth) * 100, positionY:imageHeight === height ? 50 : top / (height - imageHeight) * 100, contain });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={canvas} className={`venue-map-canvas harbour-artwork${expanded ? ' is-expanded' : ''}`}>
    <OptimizedImage className="harbour-artwork-base" style={{objectFit:crop.contain ? 'contain' : 'cover',objectPosition:`${crop.positionX}% ${crop.positionY}%`}} src="/media/toronto-harbour-map.jpg" alt="Map of Toronto Harbour and the Toronto Islands" />
    <div className="harbour-route-overlay" aria-label="Harbour route points">
      {routePoints.map((point,index) => <button key={point.number} type="button" className={active === index ? 'is-active' : ''} style={{left:`${crop.left + parseFloat(point.x) * crop.x}%`,top:`${crop.top + parseFloat(point.y) * crop.y}%`}} onPointerEnter={() => onActive(index)} onFocus={() => onActive(index)} onClick={() => onActive(index)} aria-label={`${point.number}, ${point.label}: ${point.detail}`} aria-pressed={active === index}><span>{point.number}</span><i><strong>{point.label}</strong><small>{point.detail}</small></i></button>)}
    </div>
  </div>;
}

function ExpandedHarbourMap({ active, onActive, onClose }: { active:number; onActive:(index:number) => void; onClose:() => void }) {
  useEffect(() => {
    const close = (event:KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', close);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', close); };
  }, [onClose]);
  return <dialog open className="venue-map-dialog harbour-map-dialog" aria-label="Toronto Harbour route, expanded"><div className="venue-map-dialog-panel"><div className="venue-map-dialog-bar"><button type="button" onClick={onClose} aria-label="Close expanded map"><X size={20} /></button></div><HarbourArtwork active={active} onActive={onActive} expanded /></div></dialog>;
}

function ExpandedMap({ title, src, onClose, route = false }: { title:string; src:string; onClose:() => void; route?:boolean }) {
  useEffect(() => {
    const close = (event:KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', close);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', close); };
  }, [onClose]);

  return <dialog open className="venue-map-dialog" aria-label={`${title}, expanded`}>
    <div className="venue-map-dialog-panel">
      <div className="venue-map-dialog-bar"><strong>{title}</strong><button type="button" onClick={onClose} aria-label="Close expanded map"><X size={20} /></button></div>
      <MapCanvas title={title} src={src} route={route} expanded />
    </div>
  </dialog>;
}

function MapCanvas({ title, src, route = false, expanded = false }: { title:string; src:string; route?:boolean; expanded?:boolean }) {
  const [active, setActive] = useState(0);
  return <div className={`venue-map-canvas${expanded ? ' is-expanded' : ''}`}>
    <iframe title={title} src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    {route && <div className="harbour-route-overlay" aria-label="Harbour route points">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points="51,31 24,51 57,72 75,38 51,31" /></svg>
      {routePoints.map((point,index) => <button key={point.number} type="button" className={active === index ? 'is-active' : ''} style={{left:point.x,top:point.y}} onClick={() => setActive(index)} aria-label={`${point.number}, ${point.label}: ${point.detail}`}><span>{point.number}</span><i><strong>{point.label}</strong><small>{point.detail}</small></i></button>)}
    </div>}
  </div>;
}

function MapShell({ title, src, route = false }: { title:string; src:string; route?:boolean }) {
  const [expanded, setExpanded] = useState(false);
  const labelId = useId();
  return <div className={`venue-interactive-map${route ? ' harbour-route-map' : ' dock-map'}`} data-reveal="soft" aria-labelledby={labelId}>
    <span className="sr-only" id={labelId}>{title}</span>
    <MapCanvas title={title} src={src} route={route} />
    <button className="venue-map-expand" type="button" onClick={() => setExpanded(true)}><Expand size={15} /> Expand map</button>
    {expanded && <ExpandedMap title={title} src={src} route={route} onClose={() => setExpanded(false)} />}
  </div>;
}

export function HarbourRouteExperience() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  return <div className="harbour-route-experience">
    <div className="venue-interactive-map harbour-route-map">
      <HarbourArtwork active={active} onActive={setActive} />
      <button className="venue-map-expand" type="button" onClick={() => setExpanded(true)}><Expand size={15} /> Expand map</button>
      {expanded && <ExpandedHarbourMap active={active} onActive={setActive} onClose={() => setExpanded(false)} />}
    </div>
    <div className="yacht-cruise-route" aria-label="Typical Toronto Harbour cruise route">
      {routePoints.map((point,index) => <button key={point.number} type="button" className={active === index ? 'is-active' : ''} onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} aria-pressed={active === index}><b>{point.number}</b><strong>{point.label}</strong><small>{point.detail}</small></button>)}
    </div>
  </div>;
}

export function DockMap({ title, query }: { title:string; query:string }) {
  return <MapShell title={title} src={`https://www.google.com/maps?q=${query}&output=embed`} />;
}

type YachtLocationSelectorProps = {
  primaryDock:string;
  primaryParking:string;
};

export function YachtLocationSelector({ primaryDock, primaryParking }: YachtLocationSelectorProps) {
  const [activeLocation, setActiveLocation] = useState<'iii' | 'iv'>('iii');
  const panelId = useId();
  const locations = {
    iii: {
      name:'Yankee Lady III',
      dock:primaryDock,
      parking:primaryParking,
      query:primaryDock,
    },
    iv: {
      name:'Yankee Lady IV',
      dock:'539 Queens Quay West, Toronto, ON',
      parking:'Confirm nearby parking with our team',
      query:'539 Queens Quay West, Toronto, ON',
    },
  };
  const location = locations[activeLocation];
  const mapQuery = encodeURIComponent(location.query);

  return <section className="yacht-location-section">
    <div className="yacht-location-copy" data-reveal>
      <div className="section-kicker dark-kicker">Our locations</div>
      <div className="yacht-location-heading">
        <h2>Meet us<br /><em>at the water.</em></h2>
        <a className="text-link dark-link yacht-directions-desktop" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer"><Navigation size={15} strokeWidth={1.4} /> Get directions to {location.name} <ArrowRight size={16} /></a>
      </div>
      <div className="dock-card" id={panelId} role="tabpanel" aria-labelledby={`${panelId}-${activeLocation}-tab`}>
        <div className="dock-detail"><span><MapPin size={19} strokeWidth={1.3} /></span><div><p>Boarding location</p><strong>{location.dock}</strong></div></div>
        <div className="dock-detail"><span><SquareParking size={19} strokeWidth={1.3} /></span><div><p>Nearby parking</p><strong>{location.parking}</strong></div></div>
      </div>
      <a className="text-link dark-link yacht-directions-mobile" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer"><Navigation size={15} strokeWidth={1.4} /> Get directions to {location.name} <ArrowRight size={16} /></a>
    </div>
    <div className="yacht-location-map-column">
      <div className="yacht-location-tabs" role="tablist" aria-label="Choose a yacht boarding location">
        {(['iii','iv'] as const).map(id => <button key={id} id={`${panelId}-${id}-tab`} type="button" role="tab" aria-selected={activeLocation === id} aria-controls={panelId} className={activeLocation === id ? 'is-active' : ''} onClick={() => setActiveLocation(id)}><span>{locations[id].name}</span></button>)}
      </div>
      <DockMap title={`${location.name} boarding location map`} query={mapQuery} />
    </div>
  </section>;
}
