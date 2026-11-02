import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { ClickTracking } from './click-tracking';
import { NavigationScrollReset } from './navigation-scroll-reset';
import { ServiceWorkerRegistration } from './service-worker-registration';
import { JsonLd, SITE_URL } from './seo';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Yankee Lady Yacht Charters | Toronto Private Events',
    template: '%s | Yankee Lady Yacht Charters',
  },
  description:
    'A private event venue for weddings, corporate events and celebrations on Toronto Harbour.',
  openGraph: {
    title: 'The city’s most unforgettable venue.',
    description: 'A private event venue on Toronto Harbour.',
    images: [{ url: '/media/yankee-lady-share-sunset.jpg', width: 1200, height: 675, alt: 'Yankee Lady cruising past the Toronto skyline at sunset' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The city’s most unforgettable venue.',
    description: 'A private event venue on Toronto Harbour.',
    images: ['/media/yankee-lady-share-sunset.jpg'],
  },
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KP9L4DB3');` }} />
        <link rel="preload" href="/fonts/cormorant-300-latin-v1.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KP9L4DB3" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} title="Google Tag Manager" /></noscript>
        <JsonLd data={[
        {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': `${SITE_URL}/#organization`,
          name: 'Yankee Lady Yacht Charters',
          description: 'Family-owned crewed yacht charters and private event venue on Toronto Harbour for weddings, corporate events and celebrations. Founded in 1984, with three decks for up to 280 cocktail-style or 150 seated-dinner guests.',
          url: SITE_URL,
          image: `${SITE_URL}/media/yankee-lady-share-sunset.jpg`,
          logo: `${SITE_URL}/media/root-yankee-lady-logo-6e98f96bc1-480.webp`,
          telephone: '+1-416-868-0000',
          email: 'info@yankeelady.ca',
          foundingDate: '1984',
          areaServed: { '@type': 'City', name: 'Toronto' },
          openingHoursSpecification: [
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '10:00', closes: '16:00' },
            { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '10:00', closes: '15:00' },
          ],
          address: {
            '@type': 'PostalAddress',
            streetAddress: '249 Queens Quay West, Unit 110',
            addressLocality: 'Toronto',
            addressRegion: 'ON',
            postalCode: 'M5J 2N5',
            addressCountry: 'CA',
          },
          sameAs: [
            'https://share.google/VRnWoEMu4cpwSjoDJ',
            'https://www.instagram.com/yankeeladycharters/',
            'https://www.facebook.com/yankeeladycruises/',
            'https://www.linkedin.com/company/yankee-lady/',
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': `${SITE_URL}/#private-yacht-charters`,
          name: 'Toronto private yacht charters and event venue hire',
          serviceType: 'Crewed private yacht charter and event venue hire',
          description: 'Private Toronto Harbour yacht events for weddings, corporate gatherings and celebrations, with catering, bar service and entertainment options confirmed in a tailored proposal. Not a self-drive boat rental.',
          provider: { '@id': `${SITE_URL}/#organization` },
          areaServed: { '@type': 'City', name: 'Toronto' },
          url: `${SITE_URL}/venue`,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'Yankee Lady Yacht Charters',
          publisher: { '@id': `${SITE_URL}/#organization` },
          inLanguage: 'en-CA',
        },
      ]} /><NavigationScrollReset /><ServiceWorkerRegistration /><ClickTracking />{children}</body>
    </html>
  );
}
