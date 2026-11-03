import type { Metadata } from 'next';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import '../landing/landing.css';
import Link from '../native-link';
import { HeroPreload } from '../optimized-image';
import { MotionObserver } from '../motion-observer';
import { SiteFooter } from '../site-components';
import { DeckPlans } from '../deck-plans';
import { GuestReviews } from '../guest-reviews';
import { FloatingBookButton } from '../yachts/floating-book-button';
import { YachtLocationSelector } from '../yachts/venue-maps';
import { buildMetadata, faqSchema, JsonLd, SITE_URL } from '../seo';
import { LandingCards, LandingEnquiry, LandingFaq, LandingHeading, LandingHero, LandingJourney, LandingSplit } from '../landing/landing-blocks';

export const metadata: Metadata = buildMetadata(
  'Boat Weddings in Toronto | Yankee Lady Yacht Charters',
  'Hold your ceremony, dinner and dancing aboard a private yacht on Toronto Harbour. Up to 150 seated or 280 cocktail-style guests, with skyline views.',
  '/weddings',
);

const heroImage = '/gallery/event-5.jpg';

const day = [
  { step: 'Arrival', title: 'Guests step aboard', body: 'Guests gather at Queens Quay West and are welcomed aboard by the crew. An hour of setup before boarding is included, so the yacht is ready when they arrive.', src: '/gallery/verity-wedding-boarding.webp', alt: 'Wedding guests boarding Yankee Lady at the dock' },
  { step: 'Ceremony', title: 'Vows on the open deck', body: 'The open aft deck on the second deck is laid out for ceremony seating and an arch, with Toronto Harbour behind you.', src: heroImage, alt: 'A couple embracing beneath a balloon arch on the bow at sunset' },
  { step: 'Dinner', title: 'Toasts by candlelight', body: 'Dressed tables in the climate-controlled salon seat up to 150 guests for dinner, toasts and speeches.', src: '/gallery/formal-dining-setup.jpg', alt: 'Formal dining tables set with white florals and gold chairs aboard Yankee Lady' },
  { step: 'Celebration', title: 'Dancing after dark', body: 'The DJ takes over the dance floor as the CN Tower and the city skyline light up around you.', src: '/gallery/celebrating-40-years.png', alt: 'A guest raising a bouquet as friends cheer at a candlelit table on deck' },
];

const occasions = [
  { title: 'Rehearsal dinners', body: 'An intimate seated dinner the night before, with the skyline as the conversation starter.', src: '/gallery/uicon-event-3.jpg', alt: 'Candlelit dining tables with red florals aboard Yankee Lady' },
  { title: 'Engagement parties', body: 'Celebrate the “yes” with family and friends, cocktails in hand on the open deck.', src: '/gallery/birthday-white-party.jpg', alt: 'Guests dressed in white gathering beside Yankee Lady at the dock' },
  { title: 'Showers & after-parties', body: 'Bridal showers, welcome receptions and late-night celebrations shaped around your guests.', src: '/originals/guests.jpg', alt: 'Guests relaxing on the open deck on a summer afternoon' },
];

const questions = [
  { question: 'Can we hold the ceremony and reception aboard?', answer: 'Yes. The open aft deck on the second deck is laid out for ceremony seating with an arch, and the enclosed salon, bar and dance floor host your dinner and reception. Our team can help you plan how guests move between them.' },
  { question: 'Can we book only a ceremony or only a reception?', answer: 'Yes. When you share your date and guest count, tell us whether you are planning a ceremony, a reception or both, and our events team will shape the charter and layout around it.' },
  { question: 'How many wedding guests can come aboard?', answer: 'Yankee Lady welcomes up to 150 guests for a seated dinner or up to 280 guests for a cocktail-style reception. Planning a smaller wedding? Share your guest count and our team will recommend a layout.' },
  { question: 'Is this a shared wedding cruise or a private yacht?', answer: 'Yankee Lady is a private, crewed charter reserved for your wedding party and guests, with a licensed captain and first mate aboard. It is not a shared dinner cruise or a self-drive boat rental.' },
  { question: 'Where does the yacht cruise during a wedding?', answer: 'Charters begin at Queens Quay West and follow a tailored route around Toronto Harbour, with views of the Toronto Islands, the open water of the eastern harbour and the city skyline to the west. The captain adapts each cruise to the weather, harbour conditions and the timing of your wedding.' },
  { question: 'Where do wedding guests board?', answer: 'Yankee Lady III boards at 259 Queens Quay West, behind the Toronto Police Marine Unit. Yankee Lady IV boards at 539 Queens Quay West. Our team confirms the vessel and meeting point with your booking.' },
  { question: 'How do guests get to the dock?', answer: 'By transit, take the subway to Union Station, then the streetcar along Queens Quay: get off at Rees Street for Yankee Lady III, or take the 509 to Dan Leckie Way for Yankee Lady IV. Drivers can use nearby paid parking, including the Green P lot at 545 Lake Shore Blvd West; parking is not reserved or included. Printable directions for each yacht are on our Client Forms page.' },
  { question: 'How do catering and bar service work?', answer: 'Menus and beverage service are tailored to your guest count and wedding style, with a fully licensed bar aboard. Preferred caterers are recommended. Outside caterers may be approved when they meet our catering guidelines, including proof of insurance and food-handling certification, and they cannot supply beverages.' },
  { question: 'Can we bring our own DJ and décor?', answer: 'DJs and entertainment can be arranged, or you may bring your own DJ for an additional charge. Share your music profile with your event planner at least five days before the wedding. Décor can be included in your proposal. One hour of setup before guest boarding is included, and more setup time can be arranged.' },
  { question: 'What happens if it rains?', answer: 'Weddings take place rain or shine. The venue includes a climate-controlled interior salon, while extreme-weather decisions remain with the captain.' },
  { question: 'Are there washrooms and indoor space aboard?', answer: 'Yes. The yacht has full washroom facilities and a climate-controlled interior salon, alongside open-air decks with panoramic harbour views.' },
  { question: 'Can we host our rehearsal dinner or engagement party aboard?', answer: 'Yes. Rehearsal dinners, engagement parties, bridal showers, welcome receptions and after-parties can all be planned aboard, scaled to your guest list.' },
  { question: 'How much does a wedding aboard cost?', answer: 'Yankee Lady provides a tailored proposal rather than a single published rate. Pricing depends on the date, guest count, timing, menu, beverages and entertainment. An enquiry does not reserve a date.' },
];

const testimonial = 'The venue was breathtaking. Every corner was picture-perfect and created an incredible ambience for our wedding. Being on the water made it even better.';

export default function WeddingsPage() {
  return <main className="lp-page">
    <JsonLd data={[faqSchema(questions), {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${SITE_URL}/weddings#service`,
      name: 'Yacht weddings on Toronto Harbour',
      serviceType: 'Wedding venue hire',
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'City', name: 'Toronto' },
      url: `${SITE_URL}/weddings`,
      description: 'Wedding ceremonies, receptions, rehearsal dinners and engagement parties aboard a crewed 113-foot private yacht for up to 150 seated or 280 cocktail-style guests.',
    }]} />
    <HeroPreload src={heroImage} />
    <MotionObserver />
    <FloatingBookButton name="Yankee Lady" />

    <LandingHero
      eyebrow="Yacht wedding venue in Toronto"
      title={<>Say “I do” on a private<br /><em>yacht in Toronto.</em></>}
      intro="Your ceremony, dinner and dancing aboard Yankee Lady, a crewed 113-foot boat wedding venue on Toronto Harbour, with the skyline, the Toronto Islands and Lake Ontario around you."
      image={heroImage}
      position="center 62%"
      cta="Check your wedding date"
      stats={[{ value: '150', label: 'Seated dinner' }, { value: '280', label: 'Cocktail guests' }, { value: '3', label: 'Private decks' }, { value: '1984', label: 'Family-owned since' }]}
    />

    <LandingSplit
      image={{ src: '/gallery/2025-dinner-table.webp', alt: 'A candlelit wedding table on deck with the CN Tower lit up behind' }}
      label="A waterfront wedding venue"
      title={<>Not another<br /><em>banquet hall.</em></>}
      body="Yankee Lady is a private, crewed yacht wedding venue on Toronto Harbour, family-owned since 1984. Guests board at Queens Quay West, the city drifts past the windows, and every photograph has the skyline behind it. It is a private charter for your guests only, not a shared dinner cruise."
      list={['Ceremony, reception or both in one venue', 'Seated dinner for up to 150 guests', 'Cocktail reception for up to 280 guests', 'Fully licensed bar & tailored menus', 'Climate-controlled interior, rain or shine']}
    >
      <Link prefetch={false} className="text-link dark-link" href="/venue">Explore the venue <ArrowRight size={16} strokeWidth={1.5} /></Link>
    </LandingSplit>

    <section className="lp-section lp-section-dark" aria-labelledby="day-title">
      <LandingHeading id="day-title" label="Your day aboard" title={<>One day.<br /><em>Three decks.</em></>} intro="Every wedding follows its own rhythm. Here’s how a day aboard often unfolds, from boarding at Queens Quay to the last dance." />
      <LandingJourney items={day} />
    </section>

    <LandingSplit
      id="route"
      tone="dark"
      reverse
      image={{ src: '/gallery/aerial.jpg', alt: 'Aerial view of the yacht cruising between the Toronto Islands, with the downtown skyline and CN Tower behind' }}
      label="Where you’ll cruise"
      title={<>Toronto,<br /><em>from the water.</em></>}
      body="Charters begin at Queens Quay West and follow a tailored route around Toronto Harbour. The captain shapes each cruise around the weather, harbour conditions and the timing of your wedding, so your photographs can take in the Toronto Islands, the open water and the downtown skyline."
      list={['Queens Quay West: private boarding downtown', 'Toronto Islands: island views', 'Eastern harbour: an open-water backdrop', 'Western harbour: city skyline views']}
    />

    <section className="testimonial testimonial-plain" aria-label="Wedding testimonial">
      <p className="quote-mark" aria-hidden="true">“</p>
      <blockquote>{testimonial}</blockquote>
      <p className="quote-credit">Louis &amp; Cielle · Wedding celebration</p>
    </section>

    <section className="lp-section" aria-label="Deck plans">
      <DeckPlans className="yacht-deck-plans" title={<>Picture your ceremony<br /><em>on every deck.</em></>} intro="See where the ceremony seating, bar, dance floor and DJ booth sit on the main deck and second deck, then picture your guests moving from vows to dinner to the dance floor." />
    </section>

    <section className="lp-section lp-section-linen" aria-labelledby="film-title">
      <LandingHeading id="film-title" label="A real wedding aboard" title={<>Watch a wedding<br /><em>unfold aboard.</em></>} intro="Jennie and Luke’s celebration on Toronto Harbour, from the first look to the last dance." />
      <div className="lp-film" data-reveal="image">
        <iframe src="https://www.youtube-nocookie.com/embed/TzvV29xYo5c" title="Jennie and Luke's Yankee Lady yacht wedding film" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      </div>
    </section>

    <LandingSplit
      image={{ src: '/gallery/yacht-catering-buffet.jpg', alt: 'Catered buffet arranged on the outdoor deck' }}
      label="Catering, bar & entertainment"
      title={<>Your menu,<br /><em>your music.</em></>}
      body="Menus and beverage service are tailored to your guest count and wedding style, with a fully licensed bar aboard. Preferred caterers are recommended, and outside caterers may be approved when they meet our licensing and staffing requirements."
      list={['Cocktail receptions, buffets, stations or seated dinners', 'Fully licensed bar; outside caterers cannot supply beverages', 'DJ arranged by our team, or bring your own for an additional charge', 'Music profile shared with your planner five days before', 'Décor built into your proposal']}
    >
      <a className="text-link dark-link" href="/forms">Catering guidelines &amp; client forms <ArrowRight size={16} strokeWidth={1.5} /></a>
    </LandingSplit>

    <section className="lp-section lp-section-sand wedding-occasions" aria-labelledby="more-title">
      <LandingHeading id="more-title" label="Before & after the big day" title={<>Every celebration<br /><em>around it.</em></>} intro="The same yacht, scaled to the moment, from a quiet family dinner to a full welcome party." />
      <LandingCards items={occasions} columns={3} immersive label="Wedding celebrations" />
      <p className="occasions-swipe-hint">Swipe to explore celebrations <ArrowRight size={16} aria-hidden="true" /></p>
    </section>

    <YachtLocationSelector primaryDock="259 Queens Quay West, Toronto, ON" primaryParking="545 Lake Shore Blvd West · Green P" />

    <LandingEnquiry
      label="Plan your wedding"
      title={<>Tell us about<br /><em>your day.</em></>}
      intro="Share your date and guest count, and our events team will be in touch to confirm availability and prepare your proposal."
      steps={[
        { title: 'Share your date', body: 'Your guest count, and whether you’re planning a ceremony, reception or both.' },
        { title: 'Receive your proposal', body: 'We confirm availability and tailor catering, bar, décor and entertainment.' },
        { title: 'Step aboard', body: 'Board on Queens Quay West, with an hour of setup included.' },
      ]}
    />

    <GuestReviews />
    <LandingFaq title={<>Planning your<br /><em>wedding aboard.</em></>} intro="The essentials for a yacht wedding in Toronto. Our events team will build anything more specific into your proposal." items={questions} />

    <section className="page-cta"><p>Plan your wedding</p><h2>Your love story,<br /><em>beyond the shore.</em></h2><a className="button button-primary" href="#availability">Check your wedding date <ArrowUpRight size={17} strokeWidth={1.5} /></a></section>
    <SiteFooter />
  </main>;
}
