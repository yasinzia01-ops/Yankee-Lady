import type { Metadata } from 'next';

export const SITE_URL = 'https://yankeelady.ca';

export function buildMetadata(title: string, description: string, path: string): Metadata {
  const canonical = path === '/' ? '/' : path.replace(/\/$/, '');
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: 'en_CA',
      siteName: 'Yankee Lady Yacht Charters',
      url: canonical,
      title,
      description,
      images: [{ url: '/media/yankee-lady-share-sunset.jpg', width: 1200, height: 675, alt: 'Yankee Lady cruising past the Toronto skyline at sunset' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/media/yankee-lady-share-sunset.jpg'],
    },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replaceAll('<', '\\u003c') }} />;
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
