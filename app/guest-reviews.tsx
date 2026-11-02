import { ArrowUpRight } from 'lucide-react';
import { HomeReviewMarquee } from './home-review-marquee';

export function GuestReviews() {
  return (
      <section className="reviews-section" aria-labelledby="reviews-title" data-ui-pattern="reviews">
        <div className="reviews-heading reviews-heading-compact">
          <div className="reviews-title-row"><div><div className="section-kicker dark-kicker" data-reveal><span>04</span> Guest impressions</div><h2 id="reviews-title" data-reveal data-delay="80">Celebrations<br /><em>remembered.</em></h2></div><a className="text-link dark-link" href="https://share.google/VRnWoEMu4cpwSjoDJ" target="_blank" rel="noreferrer">View all Google reviews <ArrowUpRight size={16} strokeWidth={1.5} /></a></div>
          <div className="reviews-summary" data-reveal data-delay="150"><div className="reviews-rating"><strong>4.4/5</strong><span>Google · 158 reviews</span></div></div>
        </div>
        <HomeReviewMarquee />
      </section>
  );
}
