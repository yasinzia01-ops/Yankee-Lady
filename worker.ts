import handler from 'vinext/server/fetch-handler';

const securityHeaders: Record<string, string> = {
  'Content-Security-Policy': "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://static.cloudflareinsights.com https://www.googleadservices.com https://www.google.com https://googleads.g.doubleclick.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com https://www.googleadservices.com https://*.doubleclick.net https://www.google.com https://www.google.ca; font-src 'self'; media-src 'self' blob:; connect-src 'self' https://formsubmit.co https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://cloudflareinsights.com https://www.googleadservices.com https://*.doubleclick.net https://www.google.com https://www.google.ca https://pagead2.googlesyndication.com; frame-src https://www.google.com https://maps.google.com https://www.googletagmanager.com https://www.youtube-nocookie.com https://embed.perfectvenue.com https://td.doubleclick.net; worker-src 'self'; manifest-src 'self'; upgrade-insecure-requests",
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
};

// Preserve relevant links from the former WordPress site after the migration.
const legacyPaths: Record<string, string> = {
  '/our-ships': '/venue',
  '/our-story': '/about',
  '/gallery': '/events',
  '/faq': '/#faq',
  '/cruises': '/venue',
  '/cruises/private-events': '/events#private-parties',
  '/cruises/cruise-packages': '/venue',
  '/cruises/corporate-cruises': '/events#corporate',
  '/cruises/wedding-cruises': '/events#weddings',
  '/graduation-parties-ceremonies': '/events#private-parties',
  '/baby-showers': '/events#private-parties',
  '/bar-bat-mitzvah': '/events#private-parties',
  '/bachelor-bachelorette-parties': '/events#private-parties',
  '/themed-parties': '/events#private-parties',
  '/birthday-parties': '/events#private-parties',
  '/corporate-christmas': '/events#corporate',
  '/sitemap_index.xml': '/sitemap.xml',
};

const worker = {
  async fetch(request: Request, env: unknown, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const legacyTarget = legacyPaths[url.pathname.replace(/\/$/, '')];
    if (legacyTarget && ['GET', 'HEAD'].includes(request.method)) {
      const destination = new URL(legacyTarget, 'https://yankeelady.ca');
      destination.search = url.search;
      return Response.redirect(destination.toString(), 301);
    }
    if (url.hostname === 'www.yankeelady.ca' || (url.hostname === 'yankeelady.ca' && url.protocol === 'http:')) {
      url.hostname = 'yankeelady.ca';
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 308);
    }
    const response = await handler.fetch(request, env, ctx);
    const secured = new Response(response.body, response);
    for (const [name, value] of Object.entries(securityHeaders)) secured.headers.set(name, value);
    if (url.hostname.endsWith('.workers.dev')) secured.headers.set('X-Robots-Tag', 'noindex');
    if (request.method === 'GET' && secured.headers.get('content-type')?.includes('text/html')) {
      secured.headers.set('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
    }
    return secured;
  },
};

export default worker;
