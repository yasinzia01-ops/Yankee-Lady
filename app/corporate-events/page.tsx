import type { Metadata } from 'next';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import '../landing/landing.css';
import { HeroPreload } from '../optimized-image';
import { MotionObserver } from '../motion-observer';
import { SiteFooter } from '../site-components';
import { CompanyShowcase } from '../company-showcase';
import { GuestReviews } from '../guest-reviews';
import { FloatingBookButton } from '../yachts/floating-book-button';
import { YachtLocationSelector } from '../yachts/venue-maps';
import { YachtGallery } from '../yachts/yacht-gallery';
import { LandingFilm } from '../landing/landing-film';
import { buildMetadata, faqSchema, JsonLd, SITE_URL } from '../seo';
import { LandingCards, LandingEnquiry, LandingFaq, LandingHeading, LandingHero, LandingSplit } from '../landing/landing-blocks';

export const metadata: Metadata = buildMetadata(
  'Corporate Event Venue Toronto | Yankee Lady Yacht Charters',
  'Host client receptions, team outings, holiday parties and presentations aboard a private 113-ft yacht on Toronto Harbour. Up to 280 guests, licensed bar and AV.',
  '/corporate-events',
);

const heroImage = '/gallery/dji-20250914200827-0304-d.jpg';

const occasions = [
  { title: 'Client appreciation', body: 'A reception your clients will remember, with cocktails on the open deck and the Toronto skyline all around.', src: '/gallery/event-2.jpg', alt: 'Guests sharing a catered spread on the open upper deck' },
  { title: 'Team celebrations', body: 'Milestones, launches and summer socials, from a relaxed lunch on deck to an evening of dancing.', src: '/originals/guests.jpg', alt: 'Guests relaxing on the open deck on a summer afternoon' },
  { title: 'Holiday & year-end parties', body: 'A climate-controlled salon, a licensed bar and the city lit up after dark. Events run rain or shine.', src: '/gallery/uicon-event-4.jpg', alt: 'Red holiday décor and dining tables in the main salon' },
  { title: 'Meetings & presentations', body: 'Screens, projectors, sound and lighting for speeches, awards and announcements before the celebration begins.', src: '/gallery/yankee-lady-yacht-charters.jpg', alt: 'Indoor lounge with white seating and harbour views' },
];

const corporatePhotos = [
  ['/gallery/formal-dining-setup.jpg', 'Formal dining tables set with white florals and gold chairs aboard Yankee Lady'],
  ['/gallery/uicon-event-3.jpg', 'Candlelit dining tables with red florals aboard Yankee Lady'],
  ['/gallery/yankee-lady-cruises.webp', 'Guests sharing a toast on the open deck'],
  ['/gallery/yacht-catering-buffet.jpg', 'A catered buffet arranged on the outdoor deck'],
  ['/gallery/img-2630.jpg', 'Yankee Lady docked beneath the Toronto skyline at night'],
  ['/gallery/2025-guests-upper-deck.webp', 'A private gathering with Toronto Harbour all around'],
  ['/gallery/yankee-lady-story.jpg', 'An elegant upper-deck dining setup overlooking the Toronto skyline'],
  ['/gallery/yankee-lady-gallery.webp', 'Guests descending the interior staircase aboard Yankee Lady'],
  ['/gallery/2025-dinner-table.webp', 'An elegant dinner setup on the upper deck'],
  ['/gallery/yacht-dusk-aerial.jpg', 'Yankee Lady returning toward the Toronto skyline at dusk'],
] as const;

const questions = [
  { question: 'How many guests can a corporate event host?', answer: 'Yankee Lady welcomes up to 280 guests for a cocktail-style reception or 150 guests for a seated dinner, across three decks. Our events team can recommend a layout for your headcount and programme.' },
  { question: 'Do we get the whole yacht, or is it a shared cruise?', answer: 'The whole yacht is yours. Yankee Lady is a private, crewed charter with a licensed captain and first mate aboard, so your company has exclusive use of the venue. It is not a shared cruise or a self-drive boat rental.' },
  { question: 'What kinds of corporate events can we host aboard?', answer: 'Client appreciation receptions, team celebrations and summer socials, launches and milestones, holiday and year-end parties, and meetings with speeches, awards and announcements. Our events team tailors the layout and programme to your occasion.' },
  { question: 'Can we host a daytime event or a lunch?', answer: 'Yes. Corporate charters range from a relaxed lunch on deck to an evening reception with dancing. Share your preferred date and timing, and our team will confirm availability.' },
  { question: 'Can we give presentations aboard?', answer: 'Yes. Screens and projectors are available, and the venue has modern sound and lighting systems. Confirm your equipment, connections and a test time with our team before the event.' },
  { question: 'Can we host a holiday or year-end party?', answer: 'Yes. Holiday parties are held in the climate-controlled interior salon, with open decks for skyline views, and events run rain or shine. A DJ can be arranged, or you may bring your own DJ for an additional charge.' },
  { question: 'How do catering and bar service work?', answer: 'Menus and beverage service are tailored to your guest count and event style, from cocktail receptions and buffets to stations and seated dining, with a fully licensed bar aboard. Preferred caterers are recommended. Outside caterers may be approved when they meet our catering guidelines, and they cannot supply beverages.' },
  { question: 'Where does the yacht cruise during a corporate event?', answer: 'Charters begin at Queens Quay West and follow a tailored route around Toronto Harbour, with views of the Toronto Islands, the open water of the eastern harbour and the city skyline to the west. The captain adapts each cruise to the weather, harbour conditions and your event timing.' },
  { question: 'Where do guests board?', answer: 'Yankee Lady III boards at 259 Queens Quay West and Yankee Lady IV boards at 539 Queens Quay West, in downtown Toronto. Our team confirms the vessel and meeting point with your booking. Green P parking at 545 Lake Shore Blvd West is nearby but is not reserved or included.' },
  { question: 'How do guests get to the dock by transit?', answer: 'Take the subway to Union Station, then the streetcar along Queens Quay: get off at Rees Street for Yankee Lady III, or take the 509 to Dan Leckie Way for Yankee Lady IV. Printable directions for each yacht are on our Client Forms page.' },
  { question: 'How much setup time is included?', answer: 'One hour of setup before guest boarding is included, and more setup time can be arranged for staging, AV or décor.' },
  { question: 'What happens if it rains?', answer: 'Events take place rain or shine. The venue includes a climate-controlled interior salon, while extreme-weather decisions remain with the captain.' },
  { question: 'How much does a corporate charter cost?', answer: 'Yankee Lady provides a tailored proposal rather than a single published rate. Pricing depends on the date, guest count, timing, menu, beverages and entertainment. An enquiry does not reserve a date.' },
];

export default function CorporateEventsPage() {
  return <main className="lp-page">
    <JsonLd data={[faqSchema(questions), {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${SITE_URL}/corporate-events#service`,
      name: 'Corporate yacht events on Toronto Harbour',
      serviceType: 'Corporate event venue hire',
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'City', name: 'Toronto' },
      url: `${SITE_URL}/corporate-events`,
      description: 'Client receptions, team celebrations, holiday parties and presentations aboard a crewed 113-foot private yacht for up to 280 guests.',
    }]} />
    <HeroPreload src={heroImage} />
    <MotionObserver />
    <FloatingBookButton name="Yankee Lady" />

    <LandingHero
      eyebrow="Corporate event venue in Toronto"
      title={<>Your whole team.<br /><em>One private yacht.</em></>}
      intro="Client receptions, team celebrations, holiday parties and presentations aboard Yankee Lady, a crewed 113-foot yacht on Toronto Harbour, with the CN Tower and the city skyline as your backdrop."
      image={heroImage}
      position="center 62%"
      stats={[{ value: '280', label: 'Cocktail guests' }, { value: '150', label: 'Seated dinner' }, { value: '3', label: 'Private decks' }, { value: '1984', label: 'Family-owned since' }]}
    />

    <CompanyShowcase />

    <LandingSplit
      id="private-charter"
      image={{ src: '/gallery/yacht-aerial-cruising.jpg', alt: 'Aerial view of Yankee Lady cruising on open water with guests on the upper deck' }}
      label="A private corporate yacht charter"
      title={<>The whole yacht,<br /><em>just your company.</em></>}
      body="Yankee Lady is a private, crewed corporate event venue on Toronto Harbour, family-owned since 1984. Your company has exclusive use of the yacht, with a licensed captain and first mate aboard and no other groups on deck. Guests board at Queens Quay West in downtown Toronto, and the programme moves out onto the water."
      list={['Up to 280 guests cocktail-style or 150 seated', 'Three decks, including a climate-controlled salon', 'Fully licensed bar & tailored catering', 'One hour of setup before boarding included']}
    >
      <a className="text-link dark-link" href="/venue">Explore the venue <ArrowRight size={16} strokeWidth={1.5} /></a>
    </LandingSplit>

    <section className="lp-section lp-section-linen corporate-occasions" aria-labelledby="occasions-title">
      <LandingHeading id="occasions-title" label="Corporate occasions" title={<>Business,<br /><em>beautifully hosted.</em></>} intro="Every charter is shaped around what your guests should take away, whether that’s a thank-you to clients, a team milestone or a night the office talks about all year." />
      <LandingCards items={occasions} immersive />
      <p className="occasions-swipe-hint">Swipe to explore occasions <ArrowRight size={16} aria-hidden="true" /></p>
    </section>

    <LandingSplit
      id="route"
      tone="dark"
      reverse
      image={{ src: '/gallery/img-2630.jpg', alt: 'Yankee Lady lit up at night on Toronto Harbour, with the CN Tower and downtown skyline behind' }}
      label="Where you’ll cruise"
      title={<>Toronto,<br /><em>from the water.</em></>}
      body="Charters begin at Queens Quay West and follow a tailored route around Toronto Harbour. The captain shapes each cruise around the weather, harbour conditions and your event timing, so your guests take in the Toronto Islands, the open water and the downtown skyline."
      list={['Queens Quay West: private boarding downtown', 'Toronto Islands: island views', 'Eastern harbour: an open-water backdrop', 'Western harbour: city skyline views']}
    />

    <LandingSplit
      image={{ src: '/gallery/home-slide-2.jpg', alt: 'Two women celebrating an award at the lectern in the main salon', position: '78% 28%' }}
      label="What’s aboard"
      title={<>Everything the agenda<br /><em>needs.</em></>}
      body="A working venue with an unforgettable setting. Plan the speeches, dinner and dancing as one programme, and confirm your equipment with our team before the day."
      list={['Screens & projectors for presentations', 'Modern sound & lighting, inside and out', 'Cocktail receptions, buffets, stations or seated dinners', 'Fully licensed bar; outside caterers cannot supply beverages', 'Dance floor & flexible reception layout', 'Licensed captain & professional crew']}
    >
      <a className="text-link dark-link" href="/forms">Catering guidelines &amp; client forms <ArrowRight size={16} strokeWidth={1.5} /></a>
    </LandingSplit>

    <LandingSplit
      id="holiday-parties"
      tone="dark"
      reverse
      image={{ src: '/gallery/corporate-sunset-cruise.jpg', alt: 'Yankee Lady cruising Toronto Harbour beneath the CN Tower at sunset', position: '35% 50%' }}
      label="Holiday & year-end parties"
      title={<>The skyline,<br /><em>lit for the season.</em></>}
      body="Trade the office for Toronto Harbour after dark. Your team gathers in the warm, climate-controlled salon, steps out onto the deck for the city lights and dances the year away. Corporate holiday parties run rain or shine."
      list={['Up to 280 guests cocktail-style', 'Seated holiday dinners for up to 150', 'DJ arranged, or bring your own', 'Festive décor as part of your proposal']}
    >
      <a className="button button-primary" href="#availability">Check holiday dates <ArrowUpRight size={17} strokeWidth={1.5} /></a>
    </LandingSplit>

    <GuestReviews />

    <YachtLocationSelector primaryDock="259 Queens Quay West, Toronto, ON" primaryParking="545 Lake Shore Blvd West · Green P" />

    {/* Hidden for now (not in the corporate events HTML): photo gallery and film.
    <YachtGallery
      name="Yankee Lady"
      numeral="III"
      photos={corporatePhotos}
      className="lp-gallery"
      heading={{ label: 'A closer look', title: <>Set for your guests.<br /><em>Every detail aboard.</em></>, note: 'dining, decks and the skyline' }}
    />

    <section className="lp-section lp-section-sand" aria-labelledby="film-title">
      <LandingHeading id="film-title" label="Step aboard" title={<>See the yacht<br /><em>in motion.</em></>} intro="Three decks, the salon and the Toronto skyline from the water. Press play for a closer look before you plan." />
      <LandingFilm videoId="dZWlvRJi-to" title="Yankee Lady on Toronto Harbour" poster="/gallery/yacht-dusk-aerial.jpg" posterAlt="Yankee Lady cruising toward the Toronto skyline at dusk" label="Watch the film" />
    </section>
    */}

    <LandingEnquiry
      solid
      label="Plan your corporate event"
      title={<>Let’s plan<br /><em>your event.</em></>}
      intro="Share a few details and our events team will be in touch to confirm availability and prepare your proposal."
      steps={[
        { title: 'Share your plans', body: 'Your preferred date, guest count and any presentation or AV needs.' },
        { title: 'Receive your proposal', body: 'We confirm availability and tailor catering, bar, AV and entertainment.' },
        { title: 'Welcome everyone aboard', body: 'Board on Queens Quay West, with an hour of setup included.' },
      ]}
    />
    <LandingFaq title={<>Planning a<br /><em>corporate event.</em></>} intro="The essentials for hosting your company aboard a private yacht in Toronto. For anything more specific, our events team will build the answer into your proposal." items={questions} />

    <section className="closing-cta"><div className="closing-image" aria-hidden="true" /><div className="closing-overlay" aria-hidden="true" /><div className="closing-copy" data-reveal><p>Plan your corporate event</p><h2>Take your next event<br /><em>beyond the boardroom.</em></h2><a className="button button-primary" href="#availability">Check your date <ArrowRight size={17} strokeWidth={1.5} /></a></div></section>
    <SiteFooter />
  </main>;
}
