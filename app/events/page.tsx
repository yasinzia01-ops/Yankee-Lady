import type { Metadata } from 'next';
import { HeroPreload } from '../optimized-image';
import { ArrowRight } from 'lucide-react';
import Link from '../native-link';
import { BookingCalendarLink, SiteHeader, SiteFooter } from '../site-components';
import { EventGallery } from './event-gallery';
import { AboutFaq } from '../about/about-faq';
import { MotionObserver } from '../motion-observer';
import { buildMetadata, faqSchema, JsonLd } from '../seo';
import { faqs } from '../faq-data';

export const metadata: Metadata = buildMetadata(
  'Toronto Yacht Events Gallery | Yankee Lady Charters',
  'Explore weddings, corporate events, birthdays and private parties aboard Yankee Lady, with onboard dining, open-air decks and Toronto skyline views.',
  '/events',
);

export default function EventsPage() {
  return <main className="event-gallery-page"><JsonLd data={faqSchema(faqs)} /><HeroPreload src="/gallery/yankee-lady-gallery.webp" />
    <MotionObserver />
    <BookingCalendarLink />
    <section className="event-gallery-hero">
      <SiteHeader />
      <div className="event-gallery-intro"><p>Celebrations aboard Yankee Lady</p><h1>Memories created<br /><em>aboard Yankee Lady.</em></h1><span>Explore weddings, corporate events and milestone celebrations aboard Yankee Lady.</span></div>
    </section>
    <section className="event-gallery-film" aria-labelledby="event-film-title">
      <div className="event-gallery-film-inner">
        <div className="event-gallery-film-heading"><p>Life aboard</p><h2 id="event-film-title">A wedding <em>on the water.</em></h2></div>
        <div className="event-gallery-film-player">
          <iframe
            src="https://www.youtube-nocookie.com/embed/TzvV29xYo5c"
            title="Jennie and Luke's Yankee Lady yacht wedding film"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
    <EventGallery />
    <AboutFaq />
    <section className="event-gallery-enquire"><h2>Make it <em>your occasion.</em></h2><Link prefetch={false} className="button button-primary" href="/venue#availability">Plan your event <ArrowRight size={18} /></Link></section>
    <SiteFooter />
  </main>;
}
