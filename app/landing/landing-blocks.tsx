import { FamilyOwnedBadge, MapleLeaf } from '../family-owned-badge';
import type { ReactNode } from 'react';
import { ArrowUpRight, Check, Clock, Mail, Phone } from 'lucide-react';
import { mediaCssImage, OptimizedImage } from '../optimized-image';
import { SiteHeader } from '../site-components';
import { YachtBookingPanel } from '../yachts/yacht-booking-panel';
import { FaqList, type FaqEntry } from '../shared-patterns';

// Shared sections for the paid-search landing pages (/corporate-events, /weddings).

type Stat = { value: string; label: string; leaf?: boolean };
type Photo = { src: string; alt: string; position?: string };

export function LandingHero({ eyebrow, title, intro, image, position = 'center', stats, cta = 'Check your date', ctaHref = '#availability', compactStats = false }: { eyebrow: string; title: ReactNode; intro: string; image: string; position?: string; stats: Stat[]; cta?: string; ctaHref?: string; compactStats?: boolean }) {
  return <section className={`interior-hero lp-hero${compactStats ? ' lp-hero-compact' : ''}`} style={{ backgroundImage: `linear-gradient(90deg, rgba(3,15,24,.9) 0%, rgba(3,15,24,.6) 45%, rgba(3,15,24,.18) 100%), linear-gradient(180deg, rgba(3,15,24,.55) 0%, transparent 32%, rgba(3,15,24,.8) 100%), ${mediaCssImage(image)}`, backgroundPosition: position }}>
    <SiteHeader />
    <div className="interior-hero-copy lp-hero-copy" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{intro}</p>
      <div className="hero-actions interior-actions">
        <a className="button button-primary" href={ctaHref}>{cta}<ArrowUpRight size={17} strokeWidth={1.5} /></a>
        <a className="button button-ghost" href="tel:+14168680000"><Phone size={16} strokeWidth={1.5} aria-hidden="true" /> 416 868 0000</a>
      </div>
    </div>
    <ul className={`lp-hero-stats${compactStats ? ' lp-hero-stats-compact' : ''}`} data-reveal data-delay="150">
      {stats.map(stat => <li key={stat.label}><strong>{stat.leaf && <MapleLeaf className="lp-stat-leaf" />}{stat.value}</strong><span>{stat.label}</span></li>)}
    </ul>
    {!compactStats && <FamilyOwnedBadge />}
  </section>;
}

export function LandingHeading({ label, title, intro, id }: { label: string; title: ReactNode; intro?: string; id?: string }) {
  return <div className="lp-heading">
    <div><p className="lp-label" data-reveal>{label}</p><h2 id={id} data-reveal data-delay="80">{title}</h2></div>
    {intro && <p data-reveal data-delay="160">{intro}</p>}
  </div>;
}

export function LandingCards({ items, columns = 4, immersive = false, label = 'Corporate occasions' }: { items: (Photo & { title: string; body: string })[]; columns?: 3 | 4; immersive?: boolean; label?: string }) {
  return <div className={`lp-cards lp-cards-${columns}${immersive ? ' lp-cards-immersive' : ''}`} tabIndex={immersive ? 0 : undefined} role={immersive ? 'region' : undefined} aria-label={immersive ? `${label}; scroll horizontally to explore on smaller screens` : undefined}>
    {items.map((item, index) => <article className="lp-card" key={item.title} data-reveal data-delay={String(index * 90)}>
      <div className="lp-card-media"><OptimizedImage src={item.src} alt={item.alt} sizes={immersive ? `(max-width: 600px) 86vw, (max-width: 1000px) 46vw, ${columns === 3 ? 33 : 25}vw` : "(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 25vw"} /></div>
      <div className="lp-card-body"><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.body}</p></div>
    </article>)}
  </div>;
}

export function LandingSplit({ image, label, title, body, list, tone = 'light', reverse = false, id, children }: { image: Photo; label: string; title: ReactNode; body: string; list?: string[]; tone?: 'light' | 'dark'; reverse?: boolean; id?: string; children?: ReactNode }) {
  return <section className={`lp-split lp-split-${tone}${reverse ? ' lp-split-reverse' : ''}`} id={id} aria-labelledby={id ? `${id}-title` : undefined}>
    <div className="lp-split-media" data-reveal="image"><OptimizedImage src={image.src} alt={image.alt} style={image.position ? { objectPosition: image.position } : undefined} sizes="(max-width: 1000px) 100vw, 52vw" /></div>
    <div className="lp-split-copy">
      <p className="lp-label" data-reveal>{label}</p>
      <h2 id={id ? `${id}-title` : undefined} data-reveal data-delay="80">{title}</h2>
      <p data-reveal data-delay="140">{body}</p>
      {list && <ul className="lp-checklist" data-reveal data-delay="200">{list.map(item => <li key={item}><Check size={16} strokeWidth={1.5} aria-hidden="true" /><span>{item}</span></li>)}</ul>}
      {children && <div className="lp-split-actions" data-reveal data-delay="240">{children}</div>}
    </div>
  </section>;
}

export function LandingJourney({ items }: { items: (Photo & { step: string; title: string; body: string })[] }) {
  return <ol className="lp-journey">
    {items.map((item, index) => <li key={item.title} data-reveal data-delay={String(index * 110)}>
      <div className="lp-journey-media"><OptimizedImage src={item.src} alt={item.alt} sizes="(max-width: 760px) 80vw, 25vw" /></div>
      <p className="lp-journey-step"><b>{String(index + 1).padStart(2, '0')}</b>{item.step}</p>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </li>)}
  </ol>;
}

export function LandingEnquiry({ label, title, intro, steps, solid = false }: { label: string; title: ReactNode; intro: string; steps: { title: string; body: string }[]; solid?: boolean }) {
  return <section className={`lp-enquiry${solid ? ' lp-enquiry-solid' : ''}`} id="plan" aria-labelledby="plan-title">
    <div className="lp-enquiry-copy">
      <div className="lp-enquiry-head">
        <p className="lp-label" data-reveal>{label}</p>
        <h2 id="plan-title" data-reveal data-delay="80">{title}</h2>
        <p className="lp-enquiry-intro" data-reveal data-delay="140">{intro}</p>
        <a className="button button-primary lp-mobile-plan" href="#availability">Plan your event <ArrowUpRight size={17} strokeWidth={1.5} /></a>
      </div>
      <div className="lp-enquiry-extra">
        <p className="lp-next-label" data-reveal data-delay="180">What happens next</p>
        <ol className="lp-next" data-reveal data-delay="200">
          {steps.map((step, index) => <li key={step.title}><b>{index + 1}</b><span><strong>{step.title}</strong>{step.body}</span></li>)}
        </ol>
        <div className="lp-talk" data-reveal data-delay="240">
          <p>Prefer to talk?</p>
          <a href="tel:+14168680000"><Phone size={16} strokeWidth={1.5} aria-hidden="true" />416 868 0000</a>
          <a href="mailto:info@yankeelady.ca"><Mail size={16} strokeWidth={1.5} aria-hidden="true" />info@yankeelady.ca</a>
          <small><Clock size={13} strokeWidth={1.5} aria-hidden="true" />Mon–Thu 10am–4pm · Fri 10am–3pm</small>
        </div>
      </div>
    </div>
    <div className="lp-form-card" data-reveal data-delay="120">
      <div className="lp-form-card-head"><p>Event enquiry</p><span>Fields marked * are required</span></div>
      <YachtBookingPanel yacht="Yankee Lady" showContactLink={false} />
      <p className="lp-form-card-foot">Pricing is shared in a tailored proposal. An enquiry does not reserve a date.</p>
    </div>
  </section>;
}

export function LandingFaq({ title, intro, items }: { title: ReactNode; intro: string; items: readonly FaqEntry[] }) {
  return <section className="faq-section" id="faq" aria-labelledby="lp-faq-title">
    <div className="faq-intro"><h2 id="lp-faq-title" data-reveal>{title}</h2><p data-reveal data-delay="100">{intro}</p><a className="text-link dark-link" href="#availability">Ask about your date <ArrowUpRight size={16} strokeWidth={1.5} /></a></div>
    <FaqList items={items} reveal />
  </section>;
}
