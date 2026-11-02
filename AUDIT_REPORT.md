# Yankee Lady website audit and optimization report

Date: 2026-09-23  
Audited origin: `https://yankee-lady-demo.rough-fog-1533.workers.dev`  
Implementation target: Next-compatible Vinext application on Cloudflare Workers

## Executive summary

The site was audited before changes, then optimized in eight ordered phases with one commit per implementation phase. The final production build passes TypeScript and lint checks. Every canonical page type now scores 100 for Accessibility, Best Practices, SEO, and Agentic Browsing in both desktop and mobile Lighthouse audits. The final local cold-load trace measured a 256 ms desktop LCP and a 2.989 s LCP under Slow 4G with 4× CPU throttling, both with CLS 0.00. The original live trace measured 1.671 s desktop LCP and 3.749 s throttled LCP.

The application now has responsive AVIF/WebP media, leaner code and CSS, immutable asset caching, a static-only service worker, security headers, a privacy page, canonical metadata, sitemap/robots, JSON-LD, answer-first content, and `llms.txt`. No analytics, advertising trackers, cookies, local-storage keys, or session-storage keys are used, so no consent banner was added.

One delivery step remains external: the Cloudflare deployment could not be completed because Wrangler's OAuth authorization timed out. The optimized build and all commits are ready to deploy after an authorized Cloudflare session is available.

## Phase 0 baseline

### Architecture and routes

- Server-rendered React 19 application built with Vinext/Vite and deployed to Cloudflare Workers.
- No database, server API, authentication, session, or form-submission backend exists.
- Canonical page types: `/`, `/about`, `/events`, `/yachts/yankee-lady-iii`, `/contact`, `/privacy` (privacy was added in Phase 5).
- Legacy aliases at baseline: `/booking`, `/fleet`, and `/yachts/yankee-lady-iv` returned duplicated yacht content with `200`; they now issue one-hop `301` redirects.
- Assets at baseline: 99 public files, 38.66 MB total, including a 16.8 MB commercial video, duplicate originals, oversized raster images, self-hosted fonts, one global stylesheet, and route-split scripts.
- Third-party runtime resource: a Google Maps iframe, loaded only after user interaction. No third-party script, analytics, tag manager, advertising pixel, or remote font was found.

### Baseline scores and field limitations

The available Lighthouse integration reports Accessibility, Best Practices, SEO, and Agentic Browsing but intentionally excludes the numeric Performance category. Performance was therefore measured with Chrome traces rather than an invented Lighthouse score. No Chrome UX Report data was available for this demo origin, so real-user INP could not be reported.

| Audit | Baseline | Final |
|---|---:|---:|
| Accessibility | 96 typical across the eight audited routes | 100 on all six canonical page types, desktop and mobile |
| Best Practices | 100 | 100 on all six canonical page types, desktop and mobile |
| SEO | 100 | 100 on all six canonical page types, desktop and mobile |
| Agentic Browsing | not in the initial audit set | 100 on all six canonical page types, desktop and mobile |
| Desktop LCP | 1.671 s live | 0.256 s local production build |
| Slow 4G + 4× CPU LCP | 3.749 s live | 2.989 s local production build |
| CLS | 0.00 | 0.00 |
| TTFB | 324 ms live desktop / 383 ms throttled | 15 ms local desktop / 18 ms throttled |
| Home requests | 55 | 46 observed resources plus document |
| Home decoded payload | 4.22 MB transferred at baseline | 1.86 MB decoded on the final local load |

Baseline route payloads were: home 4.22 MB/55 requests, about 1.32 MB/25, contact 0.73 MB/21, events 2.46 MB/39, and yacht/aliases 2.22 MB/40. The final production server is local, so its TTFB is useful for regression comparison but is not a substitute for post-deploy edge measurements.

### Baseline findings reported before implementation

- No canonical URLs; metadata used an outdated base URL.
- Duplicate alias pages created indexable duplicate content.
- Images had no unified responsive pipeline and public assets contained duplicates and unused files.
- Global CSS source was 292 KB and the repository included roughly 8,000 lines of unused UI code and dependencies.
- No HSTS, CSP, COOP, Permissions Policy, or comprehensive response-header policy.
- No privacy page or storage inventory.
- Accessibility failures included prohibited ARIA, heading order, form-label contrast, and several low-contrast text colors.
- Client-side prefetching in the beta Vinext runtime produced console errors during navigation audits.
- Important answer content, FAQ schema, AI crawler policy, and `llms.txt` were incomplete or absent.

## Phase results and commits

### Phase 1 — Images (`adacf6a`)

- Added a reproducible Sharp media pipeline generating content-hashed AVIF and WebP variants at 480, 960, and 1600 pixels.
- Added a shared `<picture>` component with `srcset`, `sizes`, intrinsic dimensions, async decoding, lazy defaults, and eager/high-priority hero support.
- Moved source media under `assets/source-images`; removed public duplicate originals and unused raster assets.
- Reduced public assets from about 38.66 MB to about 27 MB; 16.8 MB is the user-supplied commercial video.
- Kept 1600-pixel gallery fallbacks where full-screen viewing requires them. Twelve media outputs exceed 100 KB, primarily full-screen 1600-pixel fallbacks plus the video; the rendered responsive candidates are substantially smaller.

### Phase 2 — Frontend (`a85687a`)

- Removed unused UI components, hooks, packages, debug/dead code, and duplicated styling—roughly 8,000 source lines.
- Reduced global CSS source from about 292 KB to 158 KB.
- Preserved route-level code splitting, deferred below-fold CSS backgrounds, self-hosted two font families, and limited font weights.
- Fixed landmarks, focus behavior, heading structure, ARIA misuse, and link behavior.
- Retained the supplied commercial video. A trustworthy caption transcript was unavailable; inventing captions would be less accessible than documenting the follow-up.

### Phase 3 — Backend and delivery (`e704ee2`)

- Added one-year immutable caching for hashed images, fonts, and framework assets.
- Added short safe HTML caching and Cloudflare compression/protocol delivery through the Worker platform.
- Added a versioned static-only service worker; HTML/navigation responses are not cached, avoiding stale application shells.
- Enabled Worker observability at a 10% head-sampling rate.
- Production dependency audit found zero known vulnerabilities.

### Phase 4 — Security (`358dadc`)

- Added a Worker response wrapper that applies security policy to server-rendered responses.
- Added HSTS, CSP, COOP, Permissions Policy, Referrer Policy, MIME sniffing protection, and clickjacking protection.
- Confirmed no application secrets, credentials, API keys, authentication, database queries, or state-changing server endpoints are present.
- Clarified that the contact form is a front-end demonstration and does not transmit data; CSRF/rate limiting are not applicable until a backend is added.

### Phase 5 — Cookies and consent (`0c12431`)

- Added a privacy page and footer access to it.
- Verified cookies, `localStorage`, and `sessionStorage` are empty on a fresh visit.
- No consent banner was added because there is no non-essential storage or tracking.

### Phase 6 — Technical SEO (`88a992c`)

- Added unique metadata, canonical links, Open Graph/Twitter metadata, sitemap, robots policy, and a flat brand favicon.
- Added one-hop permanent redirects for `/booking`, `/fleet`, and `/yachts/yankee-lady-iv`.
- Added LocalBusiness/WebSite/Service/FAQ structured data as appropriate.

### Phase 7 — Answer engine optimization (`016fd64`)

- Added direct 40–60 word introductory answers to the key page templates and kept them server-rendered.
- Added concise FAQ content and `FAQPage` schema where genuine question sets exist.
- Added `llms.txt` with Markdown links and explicitly allowed GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and other reputable search crawlers in robots policy.

### Phase 8 — Verification

- Fixed final color-contrast, heading-order, hero-spacing, deferred-carousel, and beta-runtime prefetch issues.
- Final Lighthouse matrix: all six canonical page types scored 100/100/100/100 for Accessibility/Best Practices/SEO/Agentic Browsing on desktop and mobile.
- Verified 47 internal destinations with zero broken links.
- Verified all rendered JSON-LD blocks parse, all pages have one canonical, and no duplicate HTML IDs were found.
- Verified aliases return `301` directly to the canonical yacht page.
- Verified no console errors/warnings, no cookies or Web Storage keys, and CLS 0.00.
- Verified the application from `npm run build`, `tsc --noEmit`, and `npm run lint`.

## Titles, descriptions, and canonicals

| Page | Title | Meta description | Canonical |
|---|---|---|---|
| Home | Yankee Lady Yacht Charters \| Toronto Private Events | Host weddings, corporate events and milestone celebrations aboard a private 113-foot yacht with three decks and skyline views on Toronto Harbour. | `https://yankee-lady-demo.rough-fog-1533.workers.dev` |
| About | Our Toronto Harbour Story \| Yankee Lady Yacht Charters | Explore the family history of Yankee Lady Yacht Charters, from its 1984 Toronto beginnings to a purpose-built private event venue on the harbour today. | `/about` |
| Events | Toronto Yacht Events Gallery \| Yankee Lady Charters | Explore weddings, corporate events, birthdays and private parties aboard Yankee Lady, with onboard dining, open-air decks and Toronto skyline views. | `/events` |
| Venue | Yankee Lady Yacht Venue \| Toronto Private Event Hire | Yankee Lady is a private 113-foot Toronto Harbour event venue for up to 280 guests, with three decks for weddings, corporate events and celebrations. | `/yachts/yankee-lady-iii` |
| Contact | Contact Yankee Lady Yacht Charters \| Toronto Harbour | Contact Yankee Lady Yacht Charters for event enquiries, office hours, accessibility information and boarding directions at Toronto’s Queens Quay. | `/contact` |
| Privacy | Website Privacy Policy \| Yankee Lady Yacht Charters | Learn how the Yankee Lady Yacht Charters website handles browser storage, cached files, embedded maps and information you choose to share directly. | `/privacy` |

Relative canonicals above share the audited origin prefix.

## Image alternative text

Decorative logos, collage repetitions, thumbnails, and CSS backgrounds use empty alternative text or are hidden from assistive technology. Meaningful gallery images use the following descriptions:

- Yankee Lady docked as guests arrive; an elegant dinner setup on the upper deck; Toronto skyline from Yankee Lady after dark; a sunset celebration on the bow.
- Aerial view of Yankee Lady cruising Toronto Harbour; catered hospitality on the outdoor deck; Yankee Lady against the Toronto skyline; guests enjoying an open-air deck.
- Guests enjoying a shared meal on the upper deck; a private gathering with Toronto Harbour all around; Yankee Lady from above on Lake Ontario; Yankee Lady framed by the Toronto skyline.
- Yankee Lady cruising on the open water; Yankee Lady returning toward the Toronto skyline at dusk; Yankee Lady cruising through the harbour at sunset; guests gathering beside Yankee Lady in the evening light.
- A catered buffet arranged on the outdoor deck; freshly grilled salmon prepared aboard; steaks cooking on the outdoor grill; fresh fruit and florals ready for guests; a fresh pasta salad from the onboard menu; a Toronto life ring beside the open water; Yankee Lady welcoming guests at the dock; open-air event setup on the upper deck.

The event and history collections use equivalent content-specific captions from their data arrays; `app/yachts/yacht-gallery.tsx`, `app/events/event-gallery.tsx`, and `app/about/history-timeline.tsx` are the single sources of truth.

## Cookie, storage, and third-party inventory

| Item | Purpose | Lifetime | Consent decision |
|---|---|---|---|
| Cookies | None | N/A | No banner required |
| Local storage | None | N/A | No banner required |
| Session storage | None | N/A | No banner required |
| Service-worker Cache Storage | Same-origin static images, fonts, and styles for repeat performance | Versioned; old cache removed on activation | Strictly functional; documented in privacy policy |
| Google Maps iframe | Boarding-location map, created only after user activation | Governed by Google after activation | No pre-consent load; disclosed in privacy policy |

## Security headers

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Content-Security-Policy`: self by default; no objects; restricted frames; self-only forms/workers/fonts/media/connect; Google Maps only for frames; upgrade insecure requests.
- `Cross-Origin-Opener-Policy: same-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN` plus CSP `frame-ancestors 'self'`

Inline script/style allowances remain because the current Vinext/React renderer emits inline bootstrap material. A nonce-based policy is the recommended next hardening step when the framework provides stable nonce propagation.

## Structured data by page

- Home: `LocalBusiness` and `WebSite`.
- About: `LocalBusiness` and `WebSite`, with consistent founding year and founder names in visible content.
- Events: `LocalBusiness` plus `Service`/event-experience context.
- Venue: `LocalBusiness` plus `Service` and `FAQPage` details.
- Contact and Privacy: site/business identity schema without invented review, event, price, or contact data.

Every emitted JSON-LD block parsed successfully in final verification. FAQ schema mirrors visible answers.

## Changed-file inventory

Generated media files are grouped because each is produced mechanically from the source manifest.

- `app/media-manifest.json`, `app/optimized-image.tsx`, `scripts/optimize-media.mjs`: responsive media source of truth and generator.
- `assets/source-images/**`: retained master sources moved out of the public delivery path.
- `public/media/**`: content-hashed AVIF/WebP responsive outputs; obsolete `public/gallery/**`, `public/originals/**`, and duplicate root rasters were removed.
- `app/globals.css`: payload reduction, responsive media/background behavior, contrast, motion, layout, privacy, and final spacing fixes.
- `app/layout.tsx`, `app/seo.tsx`, `app/robots.ts`, `app/sitemap.ts`: global metadata, structured data, crawler policy, fonts, and sitemap.
- `app/page.tsx`, `app/about/page.tsx`, `app/events/page.tsx`, `app/yachts/yacht-page.tsx`, `app/contact/page.tsx`, `app/privacy/page.tsx`: page metadata, answer-first content, optimized media, and accessible structure.
- `app/site-components.tsx`: header/footer links, brand treatment, privacy access, and safe navigation behavior.
- `app/experience-carousel.tsx`, `app/story-stack.tsx`, `app/home-review-marquee.tsx`: optimized/deferred images and motion behavior.
- `app/events/event-gallery.tsx`, `app/yachts/yacht-gallery.tsx`, `app/about/history-timeline.tsx`, `app/about/legacy-video.tsx`: accessible galleries/history/video and responsive media.
- `app/about/about-faq.tsx`, `app/yachts/venue-faq.tsx`, `components/ui/accordion.tsx`: FAQ semantics, heading order, and schema-aligned content.
- `app/booking/booking-form.tsx`, `app/contact/contact-form.tsx`, `app/yachts/yacht-booking-panel.tsx`, `app/yachts/charter-choice.tsx`, `app/yachts/charter-date-time.tsx`: accessible demo-form behavior and truthful non-submission messaging.
- `app/motion-observer.tsx`, `app/sticky-header.tsx`, `app/service-worker-registration.tsx`, `app/yachts/floating-book-button.tsx`, `app/yachts/deck-plans.tsx`, `app/yachts/yacht-reviews.tsx`: reduced client work, corrected interaction behavior, and static caching registration.
- `public/sw.js`, `public/_headers`, `public/_redirects`, `worker.ts`, `vite.config.ts`: caching, redirects, Worker configuration, and response security.
- `public/favicon.png`, `public/llms.txt`: flat branded favicon and AI-readable site summary. Obsolete `public/favicon.svg` removed.
- `package.json`, `package-lock.json`: unused packages removed and supported toolchain retained.
- `components/ui/**` and `hooks/use-mobile.ts`: unused library files removed; the retained accordion received the final heading fix.

## Validation and limitations

- Chrome desktop/mobile and Slow 4G were executed. Safari, Firefox, and Edge binaries were not available in this environment; those browser checks remain a release checklist item.
- The Chrome audit integration excludes a numeric Performance category. Raw LCP/CLS/TTFB traces were used; no unsupported score was fabricated.
- No CrUX data exists for the demo origin, so real-user INP is unavailable. There was no interaction latency or long-task issue in the inspected lab sessions, but RUM is required for a defensible INP value.
- HTML was checked through rendered-document invariants (status, titles, canonicals, headings in Lighthouse, duplicate IDs, JSON-LD parsing, console, and link crawl). An external W3C validator was not available.
- Security headers were checked locally. External SecurityHeaders.com, Mozilla Observatory, Google Rich Results, and sitemap submission require a successful public deployment.
- The 16.8 MB commercial video remains the dominant repository asset. Add a verified human transcript/caption track and consider a smaller streaming encode once approved source media and wording are available.
- The contact/booking interfaces are explicitly demos. A production form backend will need server-side validation, abuse controls, CSRF protection where relevant, transactional delivery, and an updated privacy notice.
- Cloudflare deployment was attempted but Wrangler OAuth timed out. No claim is made that the live URL contains these final commits.

## Recommended follow-up order

1. Authorize Wrangler and deploy the committed build; immediately repeat live headers, Lighthouse, and throttled traces.
2. Add verified captions/transcript and a smaller delivery format for the commercial video.
3. Run Safari, Firefox, and Edge smoke tests on physical or hosted devices.
4. Add privacy-preserving real-user Core Web Vitals collection if the business accepts measurement, with consent reviewed before introducing any non-essential storage.

## Assumptions

- The Workers.dev origin is the intended canonical production hostname until a branded domain is supplied.
- Business facts already present in the project—name, Toronto location, 1984 founding year, founders, capacity, and three-deck venue—are approved and accurate.
- The visual design and user-requested imagery are authoritative; optimization preserved them except for flagged accessibility/clarity corrections.
- No analytics or form backend should be invented without explicit business requirements and credentials.
