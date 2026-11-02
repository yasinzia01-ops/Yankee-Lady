import { SiteFooter, SiteHeader } from '../site-components';
import { buildMetadata, JsonLd, SITE_URL } from '../seo';
import { homeVariants } from '../home-variants';

export const metadata = buildMetadata(
  'Explore Toronto Yacht Events by Area | Yankee Lady',
  'Explore Yankee Lady’s private yacht venue with local event-planning information for Toronto, Humber Bay, Lake Shore and Harbourfront guests.',
  '/blog',
);

export default function BlogPage() {
  return <main className="journal-page">
    <SiteHeader />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': `${SITE_URL}/blog#areas`, url: `${SITE_URL}/blog`, name: 'Explore Yankee Lady by area', publisher: { '@id': `${SITE_URL}/#organization` }, inLanguage: 'en-CA' }} />
    <article className="journal-content">
      <header className="journal-heading"><p className="eyebrow">Explore by area</p><h1>One unforgettable venue.<br /><em>Your local perspective.</em></h1><p>Choose your area to explore Yankee Lady with event-planning information tailored to your guests.</p></header>
      <section className="journal-overview"><h2>Your celebration starts here.</h2><p>Explore the same yacht, galleries and event experiences with local advice for Toronto, Humber Bay, Lake Shore or Harbourfront guests. Each page brings the private venue together with the arrival and planning details most relevant to your group.</p><p>All events board at the confirmed Queens Quay location for your vessel. These area pages do not advertise additional docks or guaranteed cruise routes.</p></section>
      <div className="journal-guide-list">{homeVariants.map(variant => <section key={variant.slug}><p className="journal-area">{variant.area}</p><h2><a href={`/blog/${variant.slug}`}>Yankee Lady for {variant.area} guests</a></h2><p>{variant.description}</p><a className="journal-read-guide" href={`/blog/${variant.slug}`}>Explore {variant.area} <span aria-hidden="true">→</span></a></section>)}</div>
      <section className="journal-next-step"><h2>Tell us what you have in mind.</h2><p>Share your preferred date, guest count and event style with the Yankee Lady team. Catering, bar service, entertainment and setup requirements can then be considered in a tailored proposal. Use the Contact link in the footer to start a conversation; an enquiry does not reserve a date.</p></section>
    </article>
    <SiteFooter />
  </main>;
}
