import { ArrowUpRight, CalendarDays, Menu, X } from 'lucide-react';
import Link from './native-link';
import { createElement, type AnchorHTMLAttributes } from 'react';
import { OptimizedImage } from './optimized-image';
import { StickyHeader } from './sticky-header';

export function BrandLogo() {
  return <span className="brand-logo" aria-hidden="true"><OptimizedImage className="wordmark-logo" src="/yankee-lady-logo.png" alt="" sizes="160px" loading="eager" fetchPriority="high" /><OptimizedImage className="brand-logo-gold" src="/yankee-lady-logo.png" alt="" sizes="160px" loading="eager" /></span>;
}

// Full document navigation avoids a client-router failure in the deployed vinext build.
function ReliableNavLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return createElement('a', props);
}

export function BookingCalendarLink() {
  return <ReliableNavLink className="floating-book-tab" href="/booking" aria-label="Plan your event aboard Yankee Lady"><span>Plan your event</span><CalendarDays size={20} strokeWidth={1.35} aria-hidden="true" /></ReliableNavLink>;
}

function Instagram({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
}
function Facebook({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 22v-9h3l.5-4H14V6.5c0-1.1.3-1.5 1.7-1.5H18V1.3A25 25 0 0 0 14.7 1C11.5 1 10 3 10 6v3H7v4h3v9z" /></svg>;
}
function Linkedin({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3 9h4v12H3V9Zm6 0h4v1.6c.8-1.2 2-1.9 3.6-1.9 3 0 4.4 1.8 4.4 5.2V21h-4v-5.8c0-1.8-.5-2.8-1.9-2.8-1.5 0-2.1 1-2.1 2.8V21H9V9Z" /></svg>;
}

export function SiteHeader({ home = false }: { home?: boolean }) {
  return (
    <StickyHeader homePage={home}>
      <ReliableNavLink className="wordmark" href="/" aria-label="Yankee Lady Yacht Charters home"><BrandLogo /></ReliableNavLink>
      <nav className="desktop-nav" aria-label="Primary navigation"><ReliableNavLink href="/about">About</ReliableNavLink><ReliableNavLink href="/venue">The Venue</ReliableNavLink><ReliableNavLink href="/events">Experience</ReliableNavLink><ReliableNavLink href="/contact">Contact</ReliableNavLink></nav>
      <ReliableNavLink className="header-cta" href="/venue">Plan your event <ArrowUpRight size={15} strokeWidth={1.5} /></ReliableNavLink>
      <details className="mobile-menu"><summary aria-label="Open menu"><Menu className="menu-open" size={22} strokeWidth={1.5} /><X className="menu-close" size={22} strokeWidth={1.5} /></summary><nav aria-label="Mobile navigation"><ReliableNavLink href="/about">About</ReliableNavLink><ReliableNavLink href="/venue">The Venue</ReliableNavLink><ReliableNavLink href="/events">Experience</ReliableNavLink><ReliableNavLink href="/contact">Contact</ReliableNavLink><ReliableNavLink href="/venue">Plan Your Event</ReliableNavLink></nav></details>
    </StickyHeader>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link prefetch={false} className="wordmark footer-wordmark" href="/" aria-label="Yankee Lady Yacht Charters home"><BrandLogo /></Link>
          <p>Private yacht charters and tailored celebrations on Toronto Harbour.</p>
        </div>
        <nav className="footer-column" aria-label="The venue"><p>The Venue</p><Link prefetch={false} href="/venue">Yankee Lady</Link><Link prefetch={false} href="/venue">Explore The Venue</Link><ReliableNavLink href="/corporate-events">Corporate Events</ReliableNavLink></nav>
        <nav className="footer-column" aria-label="Explore"><p>Explore</p><ReliableNavLink href="/events">Experiences</ReliableNavLink><ReliableNavLink href="/about">Our Story</ReliableNavLink><ReliableNavLink href="/contact">Contact</ReliableNavLink><ReliableNavLink href="/blog">Blog</ReliableNavLink><ReliableNavLink href="/forms">Client Forms</ReliableNavLink></nav>
        <div className="footer-column footer-reach"><p>Contact</p><a href="tel:+14168680000">416 868 0000</a><a href="mailto:info@yankeelady.ca">info@yankeelady.ca</a><span>249 Queens Quay West<br />Toronto, Ontario</span><div className="footer-socials"><a href="https://www.instagram.com/yankeeladycharters/" target="_blank" rel="noreferrer" aria-label="Yankee Lady on Instagram"><Instagram size={19} aria-hidden="true" /></a><a href="https://www.facebook.com/yankeeladycruises" target="_blank" rel="noreferrer" aria-label="Yankee Lady on Facebook"><Facebook size={19} aria-hidden="true" /></a><a href="https://www.linkedin.com/company/yankee-lady/posts/?feedView=all" target="_blank" rel="noreferrer" aria-label="Yankee Lady on LinkedIn" title="Yankee Lady on LinkedIn"><Linkedin size={20} aria-hidden="true" /></a></div></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Yankee Lady Yacht Charters</span><p className="footer-tagline">Family-owned &amp; proudly Canadian since 1984.</p><span className="footer-legal-links"><Link prefetch={false} href="/privacy">Privacy</Link><Link prefetch={false} href="/contact">Information &amp; Enquiries</Link></span></div>
      <p className="footer-studio-credit">Designed and created by <a href="https://forkestudio.com" target="_blank" rel="noopener noreferrer">Forke Studio</a></p>
    </footer>
  );
}
