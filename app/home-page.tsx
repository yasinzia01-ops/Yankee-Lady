import { FamilyOwnedBadge } from './family-owned-badge';
import { Fragment } from 'react';
import Link from './native-link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { MotionObserver } from './motion-observer';
import { BookingCalendarLink, BrandLogo, SiteFooter, SiteHeader } from './site-components';
import { ExperienceCarousel } from './experience-carousel';
import { GuestReviews } from './guest-reviews';
import { StoryStack } from './story-stack';
import { YachtGallery } from './yachts/yacht-gallery';
import { HeroVideo } from './hero-video';
import { CompanyShowcase } from './company-showcase';
import { LandingSplit } from './landing/landing-blocks';
import './landing/landing.css';

const quoteUrl = '/venue';
const testimonialQuote = 'The venue was breathtaking. Every corner was picture-perfect and created an incredible ambience for our wedding. Being on the water made it even better.';
const storyImages = [
  { src: '/gallery/event-5.jpg', label: 'Weddings', alt: 'Wedding ceremony on the upper deck' },
  { src: '/gallery/event-2.jpg', label: 'Corporate events', alt: 'Corporate reception overlooking Lake Ontario' },
  { src: '/gallery/yacht-catering-buffet.jpg', label: 'Dining', alt: 'Catered buffet arranged on the outdoor deck' },
  { src: '/gallery/celebrating-40-years.png', label: 'Celebrations', alt: 'Guests celebrating on the deck of Yankee Lady at night' },
  { src: '/gallery/yacht-dusk-aerial.jpg', label: 'After dark', alt: 'Yankee Lady returning toward the skyline at dusk' },
  { src: '/gallery/uicon-event-4.jpg', label: 'On deck', alt: 'Event-ready dining space aboard Yankee Lady' },
  { src: '/gallery/dji-20250912182638-0045-d-scaled.jpg', label: 'Toronto Harbour', alt: 'Aerial view of the Toronto skyline and harbour islands' },
];
import { faqs, homeExtraQuestions, searchQuestions } from './faq-data';
import { FaqList } from './shared-patterns';
import { faqSchema, JsonLd } from './seo';
import type { HomeCopy } from './home-variants';

export function HomePage({ copy = {} }: { copy?: HomeCopy }) {
  const questions = [...searchQuestions, ...(copy.questions ?? [...faqs, ...homeExtraQuestions])];
  return (
    <main><JsonLd data={faqSchema(questions)} /><link rel="preconnect" href="https://www.youtube-nocookie.com" crossOrigin="anonymous" /><link rel="preload" as="image" href="/media/home-hero-cover-v1.avif" type="image/avif" fetchPriority="high" />
      <MotionObserver />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-image" aria-hidden="true" /><HeroVideo /><div className="hero-shade" aria-hidden="true" /><div className="hero-glow" aria-hidden="true" />
        <SiteHeader home />
        <div className="hero-content" id="top">
          <div className="hero-brand"><span className="sr-only">Yankee Lady Yacht Charters</span><BrandLogo /></div>
          <p className="eyebrow">{copy.eyebrow ?? 'Toronto yacht rental & private event venue'}</p>
          <h1 id="hero-title"><span className="hero-line"><span>{copy.heroLead ?? 'Toronto’s most'}</span></span>{' '}<em className="hero-line"><span>{copy.heroEmphasis ?? 'unforgettable venue.'}</span></em></h1>
          <p className="hero-intro">{copy.heroIntro ?? 'A crewed private yacht on Toronto Harbour for weddings, corporate events and milestone celebrations, with room for up to 280 guests.'}</p>
          <div className="hero-actions"><Link prefetch={false} className="button button-primary" href={quoteUrl}>Plan your event <ArrowUpRight size={17} strokeWidth={1.5} /></Link></div>
        </div>
        <FamilyOwnedBadge />
        <div className="hero-foot hero-foot-minimal"><a className="scroll-cue" href="#experiences"><span>Explore</span><span className="scroll-cue-icon"><svg width="16" height="28" viewBox="0 0 16 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 2v24m-5-5 5 5 5-5" /></svg></span></a></div>
      </section>

      <CompanyShowcase />

      <section className="experiences" id="experiences">
        <div className="section-heading light-heading experience-heading"><h2 data-reveal data-delay="80"><span>One harbour.</span><em>Endless possibilities.</em></h2><p data-reveal data-delay="160">{copy.experienceIntro ?? 'From the first welcome to the last dance, every detail can be shaped around your guests.'}</p></div>
        <ExperienceCarousel />
      </section>

      <section className="fleet home-fleet" id="fleet" data-defer-bg>
        <div className="home-fleet-heading-row">
          <div className="fleet-heading fleet-heading-stacked"><h2 data-reveal>Meet the <em>Yankee Lady.</em></h2><p data-reveal data-delay="130">{copy.fleetIntro ?? 'Yankee Lady is a crewed 113-foot Toronto yacht rental and private event venue, with three decks for weddings, corporate gatherings and celebrations on the harbour.'}</p></div>
          <div className="home-fleet-summary">
            <Link prefetch={false} className="featured-yacht-link" href="/venue">Explore the venue <ArrowUpRight size={16} strokeWidth={1.5} /></Link>
            <div className="featured-yacht-specs"><span><b>280</b> guests</span><span><b>3</b> decks</span><span><b>113′</b> length</span></div>
          </div>
        </div>
        <YachtGallery name="Yankee Lady" numeral="III" showHeading={false} />
      </section>

      <LandingSplit
        id="crewed-charter"
        image={{ src: '/gallery/2025-aerial-lake-ontario.webp', alt: 'Aerial view of Yankee Lady cruising through the Toronto Islands' }}
        label="A crewed yacht rental, built for events"
        title={<>More than a boat.<br /><em>A private event venue.</em></>}
        body="Many Toronto yacht rentals are small boats for about a dozen guests, booked by the hour. Yankee Lady is a crewed 113-foot event yacht with three decks, a licensed bar, a climate-controlled salon and room for up to 280 guests. A licensed captain and first mate run the harbour, while our events team shapes catering, bar, décor and entertainment into one tailored proposal."
        list={['Up to 280 guests cocktail-style or 150 seated', 'Licensed captain & first mate aboard', 'Catering, licensed bar, DJ & décor in one proposal', 'Boarding at Queens Quay West, downtown Toronto']}
      >
        <Link prefetch={false} className="text-link dark-link" href="/weddings">Yacht weddings <ArrowRight size={16} strokeWidth={1.5} /></Link>
        <Link prefetch={false} className="text-link dark-link" href="/corporate-events">Corporate events <ArrowRight size={16} strokeWidth={1.5} /></Link>
        <Link prefetch={false} className="text-link dark-link" href="/events">Private parties <ArrowRight size={16} strokeWidth={1.5} /></Link>
      </LandingSplit>

      <LandingSplit
        id="route"
        tone="dark"
        reverse
        image={{ src: '/gallery/yankee-lady-harbour-cn-tower.webp', alt: 'Yankee Lady on Toronto Harbour with the downtown skyline and CN Tower behind' }}
        label="Where you’ll cruise"
        title={<>Toronto,<br /><em>from the water.</em></>}
        body="Every charter begins at Queens Quay West and follows a tailored route around Toronto Harbour. The captain shapes each cruise around the weather, harbour conditions and the timing of your event, so your guests take in the Toronto Islands, the open water of Lake Ontario and the downtown skyline."
        list={['Queens Quay West: private boarding downtown', 'Toronto Islands: island views', 'Eastern harbour: an open-water backdrop', 'Western harbour: city skyline views']}
      />

      <section className="introduction" id="story">
        <div className="section-kicker" data-reveal><span>03</span> An uncommon setting</div>
        <div className="intro-copy"><h2 data-reveal>Your celebration deserves<br />a <em>moving</em> backdrop.</h2><div className="intro-detail" data-reveal data-delay="130"><p>{copy.storyIntro ?? 'For more than 40 years, this family-owned Toronto company has hosted landmark celebrations on Lake Ontario. Every event pairs the freedom of the water with the ease of a fully planned venue.'}</p><Link prefetch={false} className="text-link" href="/about">Our story <ArrowRight size={16} strokeWidth={1.5} /></Link></div></div>
        <div className="experience-stats"><div data-reveal><span data-count-to="1984" aria-label="1984">1984</span><p>Family-owned<br />since</p></div><div data-reveal data-delay="90"><span data-count-to="360" data-count-suffix="°" data-count-delay="90" aria-label="360 degrees">360°</span><p>Skyline views<br />from the upper deck</p></div><div data-reveal data-delay="180"><span data-count-to="113" data-count-suffix="′" data-count-delay="180" aria-label="113 feet">113′</span><p>Private venue<br />built in Toronto</p></div></div>
        <StoryStack images={storyImages} />
      </section>

      <section className="testimonial" data-reveal="quote" data-defer-bg>
        <p className="quote-mark">“</p>
        <blockquote><span>{testimonialQuote.split(' ').map((word, index) => <Fragment key={`${word}-${index}`}><span className="quote-word">{word}</span>{' '}</Fragment>)}</span></blockquote>
        <p className="quote-credit">Louis &amp; Cielle · Wedding celebration</p>
      </section>

      <GuestReviews />

      <section className="faq-section" id="faq">
        <div className="faq-intro"><div className="section-kicker dark-kicker" data-reveal><span>05</span> Good to know</div><h2 data-reveal>Before you<br /><em>come aboard.</em></h2><p data-reveal data-delay="100">{copy.faqIntro ?? 'The essentials for planning a private event. For anything more specific, our events team can build a proposal around your occasion.'}</p><Link prefetch={false} className="text-link dark-link" href={quoteUrl}>Ask a question <ArrowRight size={16} strokeWidth={1.5} /></Link></div>
        <FaqList items={questions} reveal />
      </section>

      <section className="closing-cta" data-defer-bg><div className="closing-image" aria-hidden="true" /><div className="closing-overlay" aria-hidden="true" /><div className="closing-copy" data-reveal><p>{copy.closingIntro ?? 'Plan your private event'}</p><h2>Take your event<br /><em>beyond the shore.</em></h2><Link prefetch={false} className="button button-primary" href={quoteUrl}>Plan your event <ArrowUpRight size={17} strokeWidth={1.5} /></Link></div></section>
      <BookingCalendarLink />
      <SiteFooter />
    </main>
  );
}

