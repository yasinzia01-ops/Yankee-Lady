import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import '../landing/landing.css';
import { HeroPreload } from '../optimized-image';
import { MotionObserver } from '../motion-observer';
import { SiteFooter } from '../site-components';
import { GuestReviews } from '../guest-reviews';
import { FloatingBookButton } from '../yachts/floating-book-button';
import { YachtLocationSelector } from '../yachts/venue-maps';
import { buildMetadata, faqSchema, JsonLd } from '../seo';
import { LandingCards, LandingEnquiry, LandingFaq, LandingHeading, LandingHero, LandingSplit } from '../landing/landing-blocks';
import { EventGallery } from './event-gallery';

export const metadata: Metadata = buildMetadata(
  'Toronto Yacht Events Gallery | Yankee Lady Charters',
  'Explore weddings, corporate events, birthdays and private parties aboard Yankee Lady, with onboard dining, open-air decks and Toronto skyline views.',
  '/events',
);

const heroImage = '/gallery/yankee-lady-gallery.webp';

const occasions = [
  { title: 'Birthdays & milestones', body: 'From a 30th with the whole crew to a family milestone with dinner, toasts and the skyline lit up.', src: '/gallery/celebrating-40-years.png', alt: 'A guest raising a bouquet as friends cheer at a candlelit table on deck' },
  { title: 'Bachelor & bachelorette', body: 'One last celebration before the big day, with the whole group together on the water.', src: '/gallery/yankee-lady-gallery.webp', alt: 'Two guests in summer dresses smiling on the open deck' },
  { title: 'Engagement parties', body: 'Celebrate the “yes” with family and friends, cocktails in hand on the open deck.', src: '/gallery/birthday-white-party.jpg', alt: 'Guests dressed in white gathering beside Yankee Lady at the dock' },
  { title: 'Anniversaries', body: 'A seated dinner for the people who were there from the start, with the harbour as the backdrop.', src: '/gallery/2025-dinner-table.webp', alt: 'A candlelit dinner table on deck with the CN Tower lit up behind' },
  { title: 'Bridal & baby showers', body: 'An afternoon on the water for close friends and family, shaped around your guests.', src: '/gallery/uicon-event-3.jpg', alt: 'Candlelit dining tables with red florals aboard Yankee Lady' },
  { title: 'Graduations', body: 'Mark the moment with the people who helped get you there, from a relaxed lunch to an evening party.', src: '/originals/guests.jpg', alt: 'Guests relaxing on the open deck on a summer afternoon' },
];

const questions = [
  { question: 'How many guests can a private party have?', answer: 'Yankee Lady welcomes up to 280 guests for a cocktail-style party or 150 guests for a seated dinner, across three decks. Planning something smaller? Share your guest count and our team will recommend a layout.' },
  { question: 'What kinds of parties can we host aboard?', answer: 'Birthdays and milestone birthdays, anniversaries, engagement parties, bridal and baby showers, graduations, bachelor and bachelorette parties and other private celebrations. Our events team tailors the layout and experience to your group.' },
  { question: 'Is this a private party boat or a shared cruise?', answer: 'It is a private, crewed charter: the whole yacht is reserved for your group, with a licensed captain and first mate aboard. It is not a shared cruise or a self-drive boat rental.' },
  { question: 'Can we bring our own DJ or music?', answer: 'DJs and entertainment can be arranged, or you may bring your own DJ for an additional charge. Share your music profile with your event planner at least five days before the party so the playlist and any special dedications are ready.' },
  { question: 'Can we decorate the yacht?', answer: 'Yes. Décor can be included in your proposal, and one hour of setup before guests board is included. More setup time can be arranged.' },
  { question: 'How do food and drinks work?', answer: 'Menus and beverage service are tailored to your guest count and party style, from cocktail receptions and buffets to stations and seated dinners, with a fully licensed bar aboard. Preferred caterers are recommended. Outside caterers may be approved when they meet our catering guidelines, and they cannot supply beverages.' },
  { question: 'Where does the yacht cruise during a party?', answer: 'Charters begin at Queens Quay West and follow a tailored route around Toronto Harbour, with views of the Toronto Islands, the open water of the eastern harbour and the city skyline to the west. The captain adapts each cruise to the weather, harbour conditions and your party timing.' },
  { question: 'Where do guests board?', answer: 'Yankee Lady III boards at 259 Queens Quay West and Yankee Lady IV boards at 539 Queens Quay West, in downtown Toronto. Our team confirms the vessel and meeting point with your booking. Green P parking at 545 Lake Shore Blvd West is nearby but is not reserved or included.' },
  { question: 'How do guests get to the dock by transit?', answer: 'Take the subway to Union Station, then the streetcar along Queens Quay: get off at Rees Street for Yankee Lady III, or take the 509 to Dan Leckie Way for Yankee Lady IV. Printable directions for each yacht are on our Client Forms page.' },
  { question: 'What happens if it rains?', answer: 'Parties take place rain or shine. The venue includes a climate-controlled interior salon, while extreme-weather decisions remain with the captain.' },
  { question: 'Are there washrooms and indoor space aboard?', answer: 'Yes. The yacht has full washroom facilities and a climate-controlled interior salon, alongside open-air decks with panoramic harbour views.' },
  { question: 'How much does a private yacht party cost?', answer: 'Yankee Lady provides a tailored proposal rather than a single published rate. Pricing depends on the date, guest count, timing, menu, beverages and entertainment.' },
  { question: 'How do we confirm a date?', answer: 'Share your preferred date, guest count and occasion through the enquiry form. Our team confirms availability and prepares a tailored proposal. Submitting an enquiry does not reserve a date.' },
];

export default function EventsPage() {
  return <main className="lp-page">
    <JsonLd data={faqSchema(questions)} />
    <HeroPreload src={heroImage} />
    <MotionObserver />
    <FloatingBookButton name="Yankee Lady" />

    <LandingHero
      eyebrow="Private yacht parties in Toronto"
      title={<>Your celebration,<br /><em>on a private yacht.</em></>}
      intro="Birthdays, anniversaries, engagement parties, showers, graduations and bachelor or bachelorette groups aboard Yankee Lady, a crewed 113-foot party yacht on Toronto Harbour."
      image={heroImage}
      position="center 40%"
      cta="Check your party date"
      stats={[{ value: '280', label: 'Cocktail guests' }, { value: '150', label: 'Seated dinner' }, { value: '3', label: 'Private decks' }, { value: '1984', label: 'Family-owned since' }]}
    />

    <LandingSplit
      id="large-groups"
      image={{ src: '/gallery/evening.jpg', alt: 'The open deck lit up at night, with the Toronto skyline across the water' }}
      label="A party boat for the whole group"
      title={<>Built for the<br /><em>bigger celebration.</em></>}
      body="Many Toronto party boat rentals are built for about a dozen guests. Yankee Lady is a private, crewed 113-foot yacht with room for your whole guest list across three decks, a licensed bar and a dance floor. The yacht is reserved for your group alone, with a licensed captain and first mate aboard."
      list={['Up to 280 guests cocktail-style or 150 seated', 'Fully licensed bar, dance floor, sound & lighting', 'Climate-controlled salon, rain or shine', 'Private charter: no other groups aboard']}
    >
      <a className="text-link dark-link" href="/venue">Explore the venue <ArrowRight size={16} strokeWidth={1.5} /></a>
    </LandingSplit>

    <section className="lp-section lp-section-linen" aria-labelledby="occasions-title">
      <LandingHeading id="occasions-title" label="Every occasion" title={<>Celebrations<br /><em>we host aboard.</em></>} intro="The same yacht, shaped around your group, from an afternoon shower to a late-night birthday on the dance floor." />
      <LandingCards items={occasions} columns={3} />
    </section>

    <LandingSplit
      id="route"
      tone="dark"
      reverse
      image={{ src: '/gallery/yacht-dusk-aerial.jpg', alt: 'Yankee Lady returning toward the Toronto skyline at dusk' }}
      label="Where you’ll cruise"
      title={<>Toronto,<br /><em>from the water.</em></>}
      body="Charters begin at Queens Quay West and follow a tailored route around Toronto Harbour. The captain shapes each cruise around the weather, harbour conditions and your party timing, so your guests take in the Toronto Islands, the open water and the downtown skyline."
      list={['Queens Quay West: private boarding downtown', 'Toronto Islands: island views', 'Eastern harbour: an open-water backdrop', 'Western harbour: city skyline views']}
    />

    <LandingSplit
      id="food-music"
      image={{ src: '/gallery/yacht-catering-buffet.jpg', alt: 'Catered buffet arranged on the outdoor deck' }}
      label="Food, drinks & music"
      title={<>Your menu,<br /><em>your playlist.</em></>}
      body="Menus and beverage service are tailored to your guest count and party style, with a fully licensed bar aboard. Preferred caterers are recommended, and outside caterers may be approved when they meet our licensing and staffing requirements."
      list={['Cocktail receptions, buffets, stations or seated dinners', 'Fully licensed bar; outside caterers cannot supply beverages', 'DJ arranged by our team, or bring your own for an additional charge', 'Music profile shared with your planner five days before', 'Décor built into your proposal']}
    >
      <a className="text-link dark-link" href="/forms">Catering guidelines &amp; client forms <ArrowRight size={16} strokeWidth={1.5} /></a>
    </LandingSplit>

    <section className="lp-section lp-section-linen" aria-labelledby="gallery-title">
      <LandingHeading id="gallery-title" label="Life aboard" title={<>A celebration<br /><em>on the water.</em></>} intro="Photographs from celebrations, dinners and evenings aboard Yankee Lady. Planning a wedding or a company event? See our dedicated pages." />
      <p className="lp-crosslinks" data-reveal>
        <a className="text-link dark-link" href="/weddings">Yacht weddings <ArrowRight size={16} strokeWidth={1.5} /></a>
        <a className="text-link dark-link" href="/corporate-events">Corporate events <ArrowRight size={16} strokeWidth={1.5} /></a>
      </p>
      <EventGallery />
    </section>

    <GuestReviews />

    <YachtLocationSelector primaryDock="259 Queens Quay West, Toronto, ON" primaryParking="545 Lake Shore Blvd West · Green P" />

    <LandingEnquiry
      label="Plan your party"
      title={<>Tell us about<br /><em>your celebration.</em></>}
      intro="Share your date, guest count and occasion, and our events team will be in touch to confirm availability and prepare your proposal."
      steps={[
        { title: 'Share your plans', body: 'Your preferred date, guest count and what you’re celebrating.' },
        { title: 'Receive your proposal', body: 'We confirm availability and tailor catering, bar, décor and music.' },
        { title: 'Step aboard', body: 'Board on Queens Quay West, with an hour of setup included.' },
      ]}
    />
    <LandingFaq title={<>Planning a<br /><em>party aboard.</em></>} intro="The essentials for a private yacht party in Toronto. Our events team will build anything more specific into your proposal." items={questions} />

    <section className="closing-cta"><div className="closing-image" aria-hidden="true" /><div className="closing-overlay" aria-hidden="true" /><div className="closing-copy" data-reveal><p>Plan your celebration</p><h2>Make it<br /><em>your occasion.</em></h2><a className="button button-primary" href="#availability">Check your date <ArrowRight size={17} strokeWidth={1.5} /></a></div></section>
    <SiteFooter />
  </main>;
}
