import { ArrowUpRight, Check, Phone } from 'lucide-react';
import type { Metadata } from 'next';
import Link from '../native-link';
import { SiteFooter, SiteHeader } from '../site-components';
import { buildMetadata } from '../seo';
import { EnquirySent } from './enquiry-sent';

// Reached only through the Perfect Venue redirect, so it stays out of search and the sitemap.
export const metadata: Metadata = {
  ...buildMetadata('Thank you | Yankee Lady', 'Thank you for your enquiry.', '/thank-you'),
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <main className="legal-page thank-you-page">
    <SiteHeader />
    <EnquirySent />
    <section className="booking-success">
      <span aria-hidden="true"><Check size={24} strokeWidth={1.4} /></span>
      <p className="eyebrow">Enquiry received</p>
      <h1>Thank you. <em>Your enquiry is with our events team.</em></h1>
      <p>We’ll review your date, guest count and plans, then come back to you with availability and a proposal. Need an answer sooner? Call <a href="tel:+14168680000">416 868 0000</a>.</p>
      <div className="booking-success-actions">
        <a className="button button-dark" href="tel:+14168680000"><Phone size={16} strokeWidth={1.5} aria-hidden="true" /> 416 868 0000</a>
        <Link prefetch={false} className="button button-ghost" href="/events">See real events <ArrowUpRight size={17} strokeWidth={1.5} /></Link>
        <Link prefetch={false} className="button button-ghost" href="/venue">Tour the yachts <ArrowUpRight size={17} strokeWidth={1.5} /></Link>
      </div>
    </section>
    <SiteFooter />
  </main>;
}
