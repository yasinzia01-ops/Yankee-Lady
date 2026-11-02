import { ArrowRight } from 'lucide-react';
import Link from '../native-link';
import { faqs } from '../faq-data';
import { FaqList } from '../shared-patterns';

export function AboutFaq() {
  return <section className="faq-section about-faq" aria-labelledby="about-faq-title">
    <div className="faq-intro"><div className="section-kicker dark-kicker">Good to know</div><h2 id="about-faq-title">Before you<br /><em>come aboard.</em></h2><p>The essentials for planning a private event. Our events team can help with anything more specific.</p><Link prefetch={false} className="text-link dark-link about-faq-link-desktop" href="/contact#contact-form">Ask a question <ArrowRight size={16} /></Link></div>
    <FaqList items={faqs} />
    <Link prefetch={false} className="text-link dark-link about-faq-link-mobile" href="/contact#contact-form">Ask a question <ArrowRight size={16} /></Link>
  </section>;
}
