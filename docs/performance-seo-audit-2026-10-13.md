# Live-site performance and search audit — 2026-10-13

Target: https://yankeelady.ca

## Measurements

Chrome DevTools lab samples, not field data or a performance score. Cold reloads bypassed browser cache and cleared this audit browser's service-worker caches. Mobile: 390×844, 3× DPR, Fast 4G, 4× CPU slowdown. Desktop: 1440×900, unthrottled.

| Measurement | Before | After |
| --- | --- | --- |
| Mobile home LCP | 1.521 s | 1.084 s |
| Mobile home CLS | 0.00 | 0.00 |
| Desktop home LCP | — | 0.323 s |
| Desktop home CLS | — | 0.00 |
| Home Lighthouse SEO | 100 | 100 |
| Home Lighthouse accessibility | 100 | 100 |
| Home Lighthouse best practices | 92 | 100 |

No CrUX field data was available. These individual samples do not establish real-user INP or guarantee identical results on other devices/networks.

## Implemented

- Production canonical URLs, sitemap, robots sitemap reference, social metadata and business identity now use yankeelady.ca, not the demo hostname.
- www permanently redirects to the apex, preserving paths and queries. Demo HTML sends noindex.
- Legacy main-page redirects preserve relevant old links. Old sitemap index redirects to the new sitemap.
- Structured business data now includes visible office hours, consistent social profiles and an existing logo/image. Existing FAQ data matches visible answers.
- Corrected llms.txt production links and stale claim that the form does not send enquiries. This file is supplementary, not a prerequisite for AI search visibility.
- Subsetted, compressed WOFF2 fonts retain Latin/extended-Latin characters and punctuation. Original font files remain available.
- Mobile hero video uses a 720p variant (about 4.1 MiB versus 8.5 MiB); desktop retains the original 1080p video. Video waits until page load plus one second, and respects reduced-motion/data-saving settings.
- Removed the duplicate video-poster request. HLS auto-loading is disabled until play where hls.js is used.
- Security policy permits the installed GTM and Cloudflare analytics scripts without opening script access to arbitrary hosts.
- Custom-domain configuration is persisted in the deployment source so subsequent deployments retain both domains.
- Darkened Contact labels to improve contrast.

## Verification

Production build, deployment dry run, targeted lint and diff whitespace checks passed. Live checks passed on all six primary pages: HTTP 200, one H1, production canonical, description and parseable JSON-LD. robots.txt, sitemap.xml and llms.txt passed production-domain checks; www, legacy-page redirects and demo noindex passed.

Both Contact and Venue forms were tested without submission: single-choice dropdowns close, departure opens return, return closes after selection, and DJ/Event catering are in Services & Extras with corresponding submission-payload fields. Mobile had no horizontal overflow. About video playback advanced without an error.

## Remaining work / limits

- Verify/submit the sitemap in Google Search Console and review indexing over time; account access was not established in this audit.
- Old WordPress blog articles still exist on the former host, but have not been migrated. Choose which to retain and migrate them with their URLs/content; do not blanket-redirect unrelated articles to the homepage.
- Search rankings, rich results and AI citations are not guaranteed by technical checks or structured data. Follow Google's AI search guidance: https://developers.google.com/search/docs/appearance/ai-features
- FormSubmit recipient activation/delivery is separate from the non-submitting UI tests.
