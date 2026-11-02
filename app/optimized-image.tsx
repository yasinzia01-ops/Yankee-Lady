import type { ImgHTMLAttributes } from 'react';
import manifest from './media-manifest.json';

type MediaAsset = {
  src: string;
  srcSet: string;
  avifSrc: string;
  avifSrcSet: string;
  width: number;
  height: number;
  small: string;
  medium: string;
};

const media = manifest as Record<string, MediaAsset>;

export function mediaSrc(src: string) { return media[src]?.src ?? src; }
export function mediaCssImage(src: string) {
  const image = media[src];
  if (src === '/gallery/yankee-lady-cruises.webp') return `image-set(url('/media/hero-venue-2400.avif') type('image/avif'), url('/media/hero-venue-2400.webp') type('image/webp'))`;
  return image ? `image-set(url('${image.avifSrc}') type('image/avif'), url('${image.src}') type('image/webp'))` : `url('${src}')`;
}

export function HeroPreload({ src }: { src: string }) {
  const heroFiles: Record<string, string> = {
    '/originals/yacht.jpg': 'home',
    '/originals/boarding.jpg': 'about',
    '/gallery/yankee-lady-cruises.webp': 'venue',
    '/gallery/yankee-lady-gallery.webp': 'experience',
    '/gallery/dji-20250912182638-0045-d-scaled.jpg': 'contact',
  };
  if (heroFiles[src]) return <link rel="preload" as="image" href={`/media/hero-${heroFiles[src]}-2400.avif`} type="image/avif" media="(min-width: 761px)" fetchPriority="high" />;
  const image = media[src];
  if (!image) return <link rel="preload" as="image" href={src} fetchPriority="high" />;
  return <>
    <link rel="preload" as="image" href={image.medium} imageSrcSet={image.avifSrcSet} imageSizes="100vw" type="image/avif" fetchPriority="high" />
  </>;
}

export function OptimizedImage({ src, alt = '', sizes = '(max-width: 760px) 100vw, 50vw', loading = 'lazy', className, ...props }: ImgHTMLAttributes<HTMLImageElement> & { src: string }) {
  const image = media[src];
  const focalClass = src.endsWith('/event-5.jpg') ? 'media-focal-heart-couple' : src.endsWith('/dji-20250912182638-0045-d-scaled.jpg') ? 'media-focal-toronto-skyline' : '';
  const imageClassName = [className, focalClass].filter(Boolean).join(' ') || undefined;
  if (!image) {
    // oxlint-disable-next-line next/no-img-element
    return <img alt={alt} decoding="async" {...props} className={imageClassName} src={src} loading={loading} />;
  }
  return <picture>
    <source type="image/avif" srcSet={image.avifSrcSet} sizes={sizes} />
    <source type="image/webp" srcSet={image.srcSet} sizes={sizes} />
    {/* oxlint-disable-next-line next/no-img-element */}
    <img alt={alt} decoding="async" width={image.width} height={image.height} {...props} className={imageClassName} src={image.src} sizes={sizes} loading={loading} />
  </picture>;
}
