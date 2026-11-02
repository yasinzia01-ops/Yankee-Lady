import type { Metadata } from 'next';
import Link from '../native-link';
import { HeroPreload } from '../optimized-image';
import { ArrowRight, ArrowUpRight, UsersRound, DraftingCompass, PartyPopper, ShieldCheck } from 'lucide-react';
import { MotionObserver } from '../motion-observer';
import { BookingCalendarLink, SiteFooter, SiteHeader } from '../site-components';
import { HistoryTimeline } from './history-timeline';
import { AboutFaq } from './about-faq';
import { LegacyVideo } from './legacy-video';
import { buildMetadata, faqSchema, JsonLd } from '../seo';
import { faqs } from '../faq-data';

export const metadata: Metadata = buildMetadata(
  'Our Toronto Harbour Story | Yankee Lady Yacht Charters',
  'Explore the family history of Yankee Lady Yacht Charters, from its 1984 Toronto beginnings to a purpose-built private event venue on the harbour today.',
  '/about',
);

export default function About() {
  return (
    <main className="about-page"><JsonLd data={faqSchema(faqs)} /><HeroPreload src="/originals/boarding.jpg" />
      <MotionObserver />
      <section className="about-hero" id="top"><SiteHeader /><div className="about-hero-copy" data-reveal><p className="eyebrow">Family-owned in Toronto since 1984</p><h1>A family legacy,<br /><em>since 1984.</em></h1><p>Four decades of family-built celebrations on Toronto Harbour.</p><Link prefetch={false} className="button button-primary" href="/booking">Plan your event <ArrowUpRight size={17} /></Link></div></section>

      <HistoryTimeline />

      <section className="legacy-section about-legacy">
        <div className="section-kicker dark-kicker"><span>02</span> The venue today</div>
        <h2>One venue.<br /><em>A lasting legacy.</em></h2>
        <div className="legacy-grid"><LegacyVideo /><div><p>Step aboard Yankee Lady: a 113-foot private venue welcoming up to 280 guests across three decks. Its flexible interiors, outdoor observation areas and unmistakable Toronto setting carry the founders’ original idea forward.</p><div className="legacy-button-row"><Link prefetch={false} className="button button-dark" href="/venue">Plan your event <ArrowRight size={16} /></Link></div></div></div>
      </section>

      <section className="about-purpose" aria-labelledby="purpose-title" data-defer-bg>
        <div className="purpose-heading"><div className="section-kicker dark-kicker"><span>03</span> Built with purpose</div><h2 id="purpose-title">Designed here.<br /><em>Made to gather.</em></h2></div>
        <div className="purpose-story"><div><p>Founders and cousins John and Jim Greeley designed and constructed their vessels in Toronto Harbour.</p><p>What began with Yankee Lady I grew into a family-run events company devoted to remarkable events.</p></div></div>
        <ul className="purpose-values">{[
          { label: 'Family-owned and proudly Canadian', Icon: UsersRound },
          { label: 'Designed and constructed by the owners', Icon: DraftingCompass },
          { label: 'Purpose-built for social occasions', Icon: PartyPopper },
          { label: 'Professionally crewed and Transport Canada licensed', Icon: ShieldCheck },
        ].map(({ label, Icon }) => <li key={label}><span className="purpose-icon" aria-hidden="true"><Icon size={30} strokeWidth={1.25} /></span><span>{label}</span></li>)}</ul>
      </section>


      <AboutFaq />
      <section className="page-cta" data-defer-bg><p>Continue the story</p><h2>Make the next chapter<br /><em>your celebration.</em></h2><Link prefetch={false} className="button button-primary" href="/booking">Plan your event <ArrowUpRight size={17} /></Link></section>
      <BookingCalendarLink />
      <SiteFooter />
    </main>
  );
}
