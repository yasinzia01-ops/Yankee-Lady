import type { Metadata } from 'next';
import { HeroPreload } from '../optimized-image';
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { MotionObserver } from '../motion-observer';
import { BookingCalendarLink, SiteFooter, SiteHeader } from '../site-components';
import { YachtBookingPanel } from '../yachts/yacht-booking-panel';
import { buildMetadata } from '../seo';

export const metadata: Metadata = buildMetadata(
  'Contact Yankee Lady Yacht Charters | Toronto Harbour',
  'Contact Yankee Lady Yacht Charters for event enquiries, office hours, accessibility information and boarding directions at Toronto’s Queens Quay.',
  '/contact',
);

const officeMapQuery = encodeURIComponent('249 Queens Quay West, Toronto, Ontario, Canada');

export default function ContactPage() {
  return <main className="contact-page"><HeroPreload src="/gallery/dji-20250912182638-0045-d-scaled.jpg" /><MotionObserver /><section className="interior-hero contact-hero"><SiteHeader /><div className="interior-hero-copy" data-reveal><p className="eyebrow">Information &amp; enquiries</p><h1>We’re here<br /><em>to help.</em></h1><p>Planning an event or need directions? Our team is here to help.</p><a className="button button-primary" href="#contact-form">Send a message <ArrowUpRight size={17} /></a></div></section><section className="contact-section"><div className="contact-details"><div className="section-kicker dark-kicker" data-reveal><span>01</span> Contact</div><h2 data-reveal>Come find us<br /><em>by the harbour.</em></h2><div className="contact-list" data-reveal data-delay="100"><a href="tel:+14168680000"><Phone size={18} /><span><small>Phone</small>416 868 0000</span></a><a href="mailto:info@yankeelady.ca"><Mail size={18} /><span><small>Email</small>info@yankeelady.ca</span></a><div><MapPin size={18} /><span><small>Office</small>249 Queens Quay West, Unit 110<br />Toronto, ON M5J 2N5</span></div><div><Clock size={18} /><span><small>Office hours</small>Mon–Thu · 10am–4pm<br />Friday · 10am–3pm</span></div></div>
      <section className="contact-office-map" aria-labelledby="office-map-title">
        <h3 id="office-map-title">Our office</h3>
        <address>249 Queens Quay West, Unit 110<br />Toronto, ON M5J 2N5</address>
        <div className="office-map-links"><a href={`https://maps.apple.com/?q=${officeMapQuery}`} target="_blank" rel="noreferrer">Apple Maps <ArrowUpRight size={15} /></a><a href={`https://www.google.com/maps/search/?api=1&query=${officeMapQuery}`} target="_blank" rel="noreferrer">Google Maps <ArrowUpRight size={15} /></a></div>
        <iframe title="Yankee Lady office at 249 Queens Quay West, Toronto" src={`https://www.google.com/maps?q=${officeMapQuery}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </section>
      </div><div className="contact-booking-form" id="contact-form" tabIndex={-1}><YachtBookingPanel yacht="Yankee Lady" showContactLink={false} /></div></section><BookingCalendarLink /><SiteFooter /></main>;
}
