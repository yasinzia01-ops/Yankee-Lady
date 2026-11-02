import { DeckPlans } from '../deck-plans';
import type { Metadata } from 'next';
import { HeroPreload, mediaCssImage } from '../optimized-image';
import {
  Anchor, Bath, Car, Check, CookingPot,
  CupSoda, GlassWater, Layers3, Music2,
  Refrigerator, ShieldCheck, Sun, Volume2,
} from 'lucide-react';
import { MotionObserver } from '../motion-observer';
import { SiteFooter, SiteHeader } from '../site-components';
import { YachtGallery } from './yacht-gallery';
import { YachtBookingPanel } from './yacht-booking-panel';
import { GuestReviews } from '../guest-reviews';
import { FloatingBookButton } from './floating-book-button';
import { VenueFaq, venueQuestions } from './venue-faq';
import { HarbourRouteExperience, YachtLocationSelector } from './venue-maps';
import { buildMetadata, faqSchema, JsonLd, SITE_URL } from '../seo';
import { DisclosureList } from '../shared-patterns';

type YachtPageProps = { name: string; numeral: 'III' | 'IV'; dock: string; parking: string; intro: string };

function SmokingAreaIcon({ size = 18, strokeWidth = 1.25 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14h12v4H3z" />
      <path d="M18 14v4M21 14v4" />
      <path d="M15.5 3.5c-1.1 1-1.1 2 0 3s1.1 2 0 3" />
      <path d="M19.5 2.5c-1.1 1-1.1 2 0 3s1.1 2 0 3" />
    </svg>
  );
}

const included = [
  { label: 'Licensed captain & first mate', icon: Anchor },
  { label: 'Three decks: main deck and open-air upper levels', icon: Layers3 },
  { label: 'Full bar setup & glassware', icon: GlassWater },
  { label: 'Sun deck & panoramic observation lounge', icon: Sun },
  { label: 'Full washroom facilities', icon: Bath },
  { label: 'Powerful speakers, inside and out', icon: Volume2 },
  { label: 'Full-service catering preparation areas', icon: CookingPot },
  { label: 'Transport Canada safety equipment', icon: ShieldCheck },
  { label: 'Dance floor & flexible reception layout', icon: Music2 },
  { label: 'Nearby dockside parking', icon: Car },
  { label: 'Cooler & bar refrigeration on board', icon: Refrigerator },
  { label: 'Complimentary water & ice', icon: CupSoda },
  { label: 'Designated outdoor smoking area', icon: SmokingAreaIcon },
];

const eventDetails = [
  { title: 'Estimate & details', body: 'Your event proposal is tailored to the date, guest count, menu and service requirements.' },
  { title: 'Catering options', body: 'Choose from cocktail receptions, buffets, stations and seated dining with a fully licensed bar.' },
  { title: 'Policies', body: 'Availability and booking terms are confirmed personally before any booking is finalized.' },
] as const;

export function yachtMetadata(name: string): Metadata {
  return buildMetadata(
    `${name} | Toronto Yacht Charter & Private Event Venue`,
    `Explore ${name}, a crewed Toronto yacht charter venue for weddings and corporate events. Three decks welcome up to 280 cocktail-style or 150 seated guests.`,
    '/venue',
  );
}

export function YachtPage({ name, numeral, dock, parking, intro }: YachtPageProps) {
  const heroImage = numeral === 'III' ? '/gallery/yankee-lady-cruises.webp' : '/originals/cruising.jpg';

  return (
    <main className="yacht-page"><JsonLd data={[faqSchema(venueQuestions), {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${SITE_URL}/venue#venue`,
      name: `${name} Private Event Venue`,
      serviceType: 'Private yacht event venue',
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'City', name: 'Toronto' },
      url: `${SITE_URL}/venue`,
      description: intro,
    }]} /><HeroPreload src={heroImage} />
      <MotionObserver />
      <FloatingBookButton name={name} />
      <section className={`interior-hero yacht-hero yacht-hero-${numeral.toLowerCase()}`} style={numeral === 'III' ? { backgroundImage: `linear-gradient(180deg, rgba(3, 17, 26, .82) 0%, rgba(3, 17, 26, .52) 55%, rgba(3, 17, 26, .28) 100%), ${mediaCssImage(heroImage)}`, backgroundPosition: 'center bottom' } : undefined}>
        <SiteHeader />
        <div className="interior-hero-copy yacht-hero-copy yacht-hero-copy-simple" data-reveal><p className="eyebrow">Your private event venue on Toronto Harbour</p><h1>{name}<br /><em>is yours for the evening.</em></h1></div>
        <div className="yacht-hero-stats" data-reveal><span><strong>280</strong> guests</span><span><strong>150</strong> seated dining</span><span><strong>3</strong> decks</span></div>
      </section>

      <section className="yacht-overview-shell">
        <div className="yacht-primary-grid yacht-primary-grid-long">
          <div className="yacht-primary-content">
            <YachtGallery name={name} numeral={numeral} />

            <DisclosureList className="yacht-about-details" label="Event details" items={eventDetails} before={<section className="venue-about-content venue-about-static"><div className="yacht-about-grid"><ul>{['Up to 280 guests', 'Three distinct decks', 'Flexible dining & catering', 'Dance floor, sound & lighting', 'Panoramic harbour views'].map(item => <li key={item}><Check size={15} strokeWidth={1.5} /><span>{item}</span></li>)}</ul><div><h2>A Toronto icon<br />on the water.</h2><p>Bring your guests together for an occasion that feels a world away from the everyday. From the first welcome to the final toast, our crew helps you create a celebration that reflects your style.</p></div></div></section>} />

            <section className="yacht-included-section" data-reveal>
              <div className="section-kicker dark-kicker">What the venue offers</div>
              <h2>Everything considered.<br /><em>Everything aboard.</em></h2>
              <ul>{included.slice(0,4).map(item => { const Icon = item.icon; return <li key={item.label}><Icon size={18} strokeWidth={1.25} /><span>{item.label}</span></li>; })}</ul>
              <details className="venue-amenities-more"><summary><span className="amenities-show">Show all amenities</span><span className="amenities-hide">Show fewer amenities</span><span className="amenities-toggle" aria-hidden="true">+</span></summary><ul>{included.slice(4).map(item => { const Icon = item.icon; return <li key={item.label}><Icon size={18} strokeWidth={1.25} /><span>{item.label}</span></li>; })}</ul></details>
            </section>

            <DeckPlans className="yacht-deck-plans" title={<>Find your place<br /><em>on every deck.</em></>} intro="Explore the layouts of the main deck and second deck to picture your ceremony, reception and dance floor aboard." />

            <section className="yacht-cruise-section" data-reveal>
              <div className="yacht-cruise-copy"><div className="section-kicker dark-kicker">Where you’ll cruise</div><h2>Toronto<br /><em>from the water.</em></h2><p>Your event begins at Queens Quay and follows a tailored harbour route past the city’s most memorable waterfront views. The captain adapts each cruise to the weather, harbour conditions and timing of your event.</p></div>
              <HarbourRouteExperience />
            </section>

            <YachtLocationSelector primaryDock={dock} primaryParking={parking} />

          </div>
          <YachtBookingPanel yacht={name} />
        </div>
      </section>
      <GuestReviews />
      <VenueFaq />
      <SiteFooter />
    </main>
  );
}
