import { notFound } from 'next/navigation';
import { HomePage } from '../../home-page';
import { homeVariants } from '../../home-variants';
import { buildMetadata } from '../../seo';

type AreaPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return homeVariants.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: AreaPageProps) {
  const { slug } = await params;
  const variant = homeVariants.find(item => item.slug === slug);
  if (!variant) notFound();
  return buildMetadata(variant.title, variant.description, `/blog/${variant.slug}`);
}

export default async function AreaHomePage({ params }: AreaPageProps) {
  const { slug } = await params;
  const variant = homeVariants.find(item => item.slug === slug);
  if (!variant) notFound();
  return <HomePage copy={variant.copy} />;
}
