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
import { buildMetadata, faqSchema, JsonLd, SITE_URL } from '../seo';
import { LandingCards, LandingEnquiry, LandingFaq, LandingHeading, LandingHero, LandingJourney, LandingSplit } from '../landing/landing-blocks';

export const metadata: Metadata = buildMetadata(
  'Boat Weddings in Toronto | Yankee Lady Yacht Charters',
  'Hold your ceremony, dinner and dancing aboard a private yacht on Toronto Harbour. Up to 150 seated or 280 cocktail-style guests, with skyline views.',
  '/weddings',
);

const heroImage = '/gallery/event-5.jpg';

const day = [
  { step: 'Arrival', title: 'Guests step aboard', body: 'Your guests gather at Queens Quay and are welcomed aboard by the crew.', src: '/gallery/verity-wedding-boarding.webp', alt: 'Wedding guests boarding Yankee Lady at the dock' },
  { step: 'Ceremony', title: 'Vows on the open deck', body: 'The second deck’s open aft deck is laid out for ceremony seating and an arch.', src: heroImage, alt: 'A couple embracing beneath a balloon arch on the bow at sunset' },
  { step: 'Dinner', title: 'Toasts by candlelight', body: 'Gather around dressed tables in the salon for a seated dinner for up to 150 guests.', src: '/gallery/formal-dining-setup.jpg', alt: 'Formal dining tables set with white florals and gold chairs aboard Yankee Lady' },
  { step: 'Celebration', title: 'Dancing after dark', body: 'The DJ takes over as the city lights up around you, from the dance floor to the deck rail.', src: '/gallery/celebrating-40-years.png', alt: 'A guest raising a bouquet as friends cheer at a candlelit table on deck' },
];

const occasions = [
  { title: 'Rehearsal dinners', body: 'An intimate seated dinner the night before, with the skyline as the conversation starter.', src: '/gallery/uicon-event-3.jpg', alt: 'Candlelit dining tables with red florals aboard Yankee Lady' },
  { title: 'Engagement parties', body: 'Celebrate the “yes” with family and friends, cocktails in hand on the open deck.', src: '/gallery/birthday-white-party.jpg', alt: 'Guests dressed in white gathering beside Yankee Lady at the dock' },
  { title: 'Showers & after-parties', body: 'Bridal showers, welcome receptions and late-night celebrations shaped around your guests.', src: '/originals/guests.jpg', alt: 'Guests relaxing on the open deck on a summer afternoon' },
];

const questions = [
  { question: 'Can we hold the ceremony and reception aboard?', answer: 'Yes. The open aft deck on the second deck is laid out for ceremony seating with an arch, and the enclosed salon, bar and dance floor host your dinner and reception. Our team can help you plan how guests move between them.' },
  { question: 'How many wedding guests can come aboard?', answer: 'Yankee Lady welcomes up to 150 guests for a seated dinner or up to 280 guests for a cocktail-style reception.' },
  { question: 'How do catering and bar service work?', answer: 'Menus and beverage service are tailored to your guest count and wedding style, with a fully licensed bar aboard. Preferred caterers are recommended; outside catering may be approved when licensing and staffing requirements are met.' },
  { question: 'Can we bring our own DJ and décor?', answer: 'DJs and entertainment can be arranged, or you may bring your own DJ for an additional charge. Décor can be included in your proposal. One hour of setup before guest boarding is included, and more setup time can be arranged.' },
  { question: 'What happens if it rains?', answer: 'Weddings take place rain or shine. The venue includes a climate-controlled interior, while extreme-weather decisions remain with the captain.' },
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
      eyebrow="Weddings on Toronto Harbour"
      title={<>Say “I do”<br /><em>on the water.</em></>}
      intro="Your ceremony, dinner and dancing aboard one private yacht, with the Toronto skyline as your backdrop."
      image={heroImage}
      position="center 62%"
      cta="Check your wedding date"
      stats={[{ value: '150', label: 'Seated dinner' }, { value: '280', label: 'Cocktail guests' }, { value: '3', label: 'Private decks' }, { value: '1984', label: 'Family-owned since' }]}
    />

    <LandingSplit
      image={{ src: '/gallery/2025-dinner-table.webp', alt: 'A candlelit wedding table on deck with the CN Tower lit up behind' }}
      label="A waterfront wedding venue"
      title={<>Not another<br /><em>banquet hall.</em></>}
      body="Yankee Lady is a crewed, 113-foot private venue on Toronto Harbour. Your guests arrive at the dock, the city drifts past the windows, and every photograph has the skyline behind it."
      list={['Ceremony and reception in one venue', 'Seated dinner for up to 150 guests', 'Fully licensed bar & tailored menus', 'Climate-controlled interior, rain or shine']}
    >
      <Link prefetch={false} className="text-link dark-link" href="/venue">Explore the venue <ArrowRight size={16} strokeWidth={1.5} /></Link>
    </LandingSplit>

    <section className="lp-section lp-section-dark" aria-labelledby="day-title">
      <LandingHeading id="day-title" label="Your day aboard" title={<>One day.<br /><em>Three decks.</em></>} intro="Every wedding follows its own rhythm. Here’s how a day aboard often unfolds." />
      <LandingJourney items={day} />
    </section>

    <section className="testimonial" aria-label="Wedding testimonial">
      <p className="quote-mark" aria-hidden="true">“</p>
      <blockquote>{testimonial}</blockquote>
      <p className="quote-credit">Louis &amp; Cielle · Wedding celebration</p>
    </section>

    <section className="lp-section" aria-label="Deck plans">
      <DeckPlans className="yacht-deck-plans" title={<>Picture your ceremony<br /><em>on every deck.</em></>} intro="See where the ceremony seating, bar, dance floor and DJ booth sit, then imagine your guests moving from vows to dinner to the dance floor." />
    </section>

    <section className="lp-section lp-section-linen" aria-labelledby="film-title">
      <LandingHeading id="film-title" label="Life aboard" title={<>Watch a wedding<br /><em>unfold aboard.</em></>} intro="Jennie and Luke’s celebration on Toronto Harbour, from the first look to the last dance." />
      <div className="lp-film" data-reveal="image">
        <iframe src="https://www.youtube-nocookie.com/embed/TzvV29xYo5c" title="Jennie and Luke's Yankee Lady yacht wedding film" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      </div>
    </section>

    <section className="lp-section lp-section-sand wedding-occasions" aria-labelledby="more-title">
      <LandingHeading id="more-title" label="Before & after the big day" title={<>Every celebration<br /><em>around it.</em></>} intro="The same yacht, scaled to the moment, from a quiet family dinner to a full welcome party." />
      <LandingCards items={occasions} columns={3} immersive label="Wedding celebrations" />
      <p className="occasions-swipe-hint">Swipe to explore celebrations <ArrowRight size={16} aria-hidden="true" /></p>
    </section>

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
    <LandingFaq title={<>Planning your<br /><em>wedding aboard.</em></>} intro="The essentials for a wedding on the water. Our events team will build anything more specific into your proposal." items={questions} />

    <section className="page-cta"><p>Plan your wedding</p><h2>Your love story,<br /><em>beyond the shore.</em></h2><a className="button button-primary" href="#availability">Check your wedding date <ArrowUpRight size={17} strokeWidth={1.5} /></a></section>
    <SiteFooter />
  </main>;
}
