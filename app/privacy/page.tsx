import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-components';
import { buildMetadata } from '../seo';

export const metadata: Metadata = buildMetadata(
  'Website Privacy Policy | Yankee Lady Yacht Charters',
  'Learn how Yankee Lady Yacht Charters handles event enquiries, site analytics, browser storage and embedded maps.',
  '/privacy',
);

export default function PrivacyPage() {
  return <main className="legal-page">
    <SiteHeader />
    <article className="legal-content">
      <header><p className="eyebrow">Website information</p><h1>Privacy<br /><em>policy.</em></h1><p>Last updated October 15, 2026</p></header>

      <section>
        <h2>What this website collects</h2>
        <p>When you submit an event enquiry, the form collects the details you enter, such as your name, phone number, email address, preferred date and times, guest count, event preferences and message. We use these details to respond to your enquiry and prepare an event proposal. Submitting an enquiry does not reserve a yacht or confirm availability.</p>
        <p>The event enquiry form is hosted by Perfect Venue. Details submitted through it are handled by Perfect Venue and made available to Yankee Lady Yacht Charters so the team can respond. Perfect Venue may store and process information in the United States or other countries. See the <a href="https://www.perfectvenue.com/privacy-policy" target="_blank" rel="noreferrer">Perfect Venue Privacy Policy</a> for its data practices. Please do not include sensitive personal information in an enquiry.</p>
      </section>

      <section>
        <h2>Browser storage and caching</h2>
        <p>The site uses a short-lived first-party session-storage flag to return new pages to the top after navigation. A first-party service worker may also cache static images, fonts and styles on your device so repeat visits load faster. This storage supports site functionality. When an enquiry form is shown, the site also stores the page you were on and, for visits from an ad or tagged link, the ad source and campaign, so enquiries can be attributed to the page and campaign that led to them.</p>
      </section>

      <section>
        <h2>Site measurement</h2>
        <p>This website loads Google Tag Manager and Cloudflare website measurement tools. These services may process browser, device and page-visit information and may use cookies or similar technologies according to their settings. Google Tag Manager can also load additional tags configured by the site operator, including Google Ads conversion and call tracking, which measures whether an ad visit led to an enquiry or a phone call and may show a Google forwarding number in place of our main number.</p>
      </section>

      <section>
        <h2>Embedded maps and external links</h2>
        <p>Some pages include a Google Maps embed and links to services such as Google Maps, Apple Maps, Instagram, Facebook, YouTube and Dropbox. Those services receive standard browser request information when you load their content or follow a link, and their own privacy policies apply.</p>
      </section>

      <section>
        <h2>Information you send directly</h2>
        <p>If you contact Yankee Lady Yacht Charters by phone or email, the team uses the details you provide to answer your enquiry and support your event planning. Please do not submit sensitive personal information through ordinary email.</p>
      </section>

      <section>
        <h2>Questions</h2>
        <p>For privacy questions, contact Yankee Lady Yacht Charters at <a href="mailto:info@yankeelady.ca">info@yankeelady.ca</a> or <a href="tel:+14168680000">416 868 0000</a>.</p>
      </section>
    </article>
    <SiteFooter />
  </main>;
}
