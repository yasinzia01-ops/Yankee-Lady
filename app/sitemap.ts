import type { MetadataRoute } from 'next';
import { SITE_URL } from './seo';
import { homeVariants } from './home-variants';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ['/', 1, 'weekly'],
    ['/venue', 0.9, 'weekly'],
    ['/weddings', 0.8, 'monthly'],
    ['/corporate-events', 0.8, 'monthly'],
    ['/events', 0.8, 'monthly'],
    ['/about', 0.7, 'monthly'],
    ['/contact', 0.6, 'monthly'],
    ['/blog', 0.6, 'monthly'],
    ['/forms', 0.5, 'monthly'],
    ['/privacy', 0.2, 'yearly'],
  ] as const;

  return [...routes.map(([path, priority, changeFrequency]) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  })), ...homeVariants.map(variant => ({
    url: `${SITE_URL}/blog/${variant.slug}`,
    lastModified: new Date('2026-10-13'),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))];
}
