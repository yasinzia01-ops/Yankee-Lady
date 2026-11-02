import { Maximize2 } from 'lucide-react';
import type { ReactNode } from 'react';

const deckPlans = [
  { name: 'deck-plan-main-deck', title: 'Main Deck', alt: 'Main deck floor plan of Yankee Lady showing the DJ booth, bar, outside DJ table, bench seating, exits, outside aft deck and outside bow.' },
  { name: 'deck-plan-second-deck', title: 'Second Deck', alt: 'Second deck floor plan of Yankee Lady showing the open aft deck with ceremony seating and arch, the enclosed salon with central stairs and bar, and the wheelhouse.' },
];

export function DeckPlans({ className, kicker = 'Deck plans', title, intro }: { className?: string; kicker?: string; title: ReactNode; intro?: string }) {
  return <section className={['deck-plan-gallery', className].filter(Boolean).join(' ')} aria-labelledby="deck-plan-gallery-title">
    <div className="deck-plan-gallery-heading">
      <p className="deck-plan-gallery-kicker">{kicker}</p>
      <h2 id="deck-plan-gallery-title">{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
    <div className="deck-plan-gallery-list">
      {deckPlans.map(plan => <figure key={plan.name}>
        <a href={`/media/${plan.name}.png`} target="_blank" rel="noopener" aria-label={`Open the full-size ${plan.title} floor plan`}>
          {/* oxlint-disable-next-line next/no-img-element */}
          <img src={`/media/${plan.name}-1200.webp`} srcSet={`/media/${plan.name}-1200.webp 1200w, /media/${plan.name}-2400.webp 2400w`} sizes="(max-width: 1120px) 100vw, 1120px" width={2400} height={590} alt={plan.alt} loading="lazy" decoding="async" />
        </a>
        <figcaption><span>{plan.title}</span><a href={`/media/${plan.name}.png`} target="_blank" rel="noopener">View full size <Maximize2 size={13} strokeWidth={1.5} aria-hidden="true" /></a></figcaption>
      </figure>)}
    </div>
  </section>;
}
