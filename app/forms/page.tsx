import { ArrowUpRight, Download, FolderOpen } from 'lucide-react';
import type { Metadata } from 'next';
import { DeckPlans } from '../deck-plans';
import { SiteFooter, SiteHeader } from '../site-components';
import { buildMetadata } from '../seo';

export const metadata: Metadata = buildMetadata(
  'Client Forms & Downloads | Yankee Lady Yacht Charters',
  'Find client forms and event-planning documents for your Yankee Lady yacht charter in one organized place.',
  '/forms',
);

const formCategories = [
  {
    number: '01',
    title: 'Event planning',
    description: 'Event details, timelines and the information that helps our team prepare for your day.',
    documents: [
      { title: 'Music Profile', format: 'PDF · 1 page', href: '/forms/yankee-lady-music-profile.pdf' },
      { title: 'Media Release Form', format: 'PDF · 3 pages', href: '/forms/media-release-form.pdf' },
    ],
  },
  {
    number: '02',
    title: 'Food & beverage',
    description: 'Menu selections, dietary notes and service details for your guests.',
    documents: [
      { title: 'Food Waiver', format: 'PDF · 1 page', href: '/forms/food-waiver.pdf' },
      { title: 'Outside Catering Guidelines', format: 'Word document', href: '/forms/outside-catering-guidelines.docx' },
    ],
  },
  {
    number: '03',
    title: 'Guests & boarding',
    description: 'Guest information and practical details to help everyone arrive ready to come aboard.',
    documents: [
      { title: 'Directions to Yankee Lady III', format: 'PDF · 1 page', href: '/forms/directions-yankee-lady-iii.pdf' },
      { title: 'Directions to Yankee Lady IV', format: 'PDF · 1 page', href: '/forms/directions-yankee-lady-iv.pdf' },
    ],
  },
];

export default function FormsPage() {
  return <main className="forms-page">
    <SiteHeader />
    <article className="forms-content">
      <header className="forms-intro">
        <div>
          <p className="eyebrow">Client resources</p>
          <h1>Everything in place<br /><em>for your day.</em></h1>
        </div>
        <p className="forms-intro-copy">A simple, organized home for the forms and planning documents you need for your Yankee Lady event.</p>
      </header>

      <section aria-labelledby="forms-library-title">
        <div className="forms-library-heading">
          <h2 id="forms-library-title">The forms library</h2>
          <p>Choose a document for a quick download. Keep a copy handy as you plan your event.</p>
        </div>
        <div className="forms-shelves">
          {formCategories.map(category => <section className="forms-shelf" key={category.number}>
            <div className="forms-shelf-top"><FolderOpen size={21} strokeWidth={1.35} aria-hidden="true" /><span>Collection {category.number}</span></div>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            <div className="forms-downloads">
              {category.documents.map(document => <a className="forms-download" href={document.href} download key={document.href}>
                <span className="forms-download-copy"><strong>{document.title}</strong><small>{document.format}</small></span>
                <Download size={17} strokeWidth={1.5} aria-label="Download" />
              </a>)}
            </div>
          </section>)}
        </div>
      </section>

      <DeckPlans className="forms-deck-plans" title="Yacht floor plans" intro="Use the deck layouts to plan seating, entertainment and how your guests move around the yacht." />

      <aside className="forms-help">
        <div><h2>Need a form today?</h2><p>Our team can send you the current documents for your event. Tell us what you’re planning and we’ll point you to the right place.</p></div>
        <a className="forms-help-link" href="mailto:info@yankeelady.ca?subject=Yankee%20Lady%20client%20forms">Request forms <ArrowUpRight size={16} aria-hidden="true" /></a>
      </aside>
    </article>
    <SiteFooter />
  </main>;
}
