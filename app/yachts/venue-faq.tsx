import { ArrowRight } from 'lucide-react';
import Link from '../native-link';
import { FaqList } from '../shared-patterns';

export const venueQuestions = [
  { question:'How many guests can come aboard?', answer:'Yankee Lady welcomes up to 280 guests for a cocktail-style event or 150 for seated dining. Our team can help you choose a layout that suits your occasion.' },
  { question:'What events can we host?', answer:'Weddings, corporate gatherings, birthdays, anniversaries and other private celebrations. The decks, dining and entertainment can be arranged around your group.' },
  { question:'Can we arrange catering and drinks?', answer:'Menus and beverage service are tailored to your guest count and event style, with a fully licensed bar aboard. Include your catering preferences and dietary requirements in the planning form so our team can tailor your proposal once your enquiry is received. The demo planning form does not send an enquiry or reserve the venue.' },
  { question:'Where do we board?', answer:'Yankee Lady III boards at 259 Queens Quay West, Toronto, ON. Yankee Lady IV boards at 539 Queens Quay West, Toronto, ON. Use the location tabs above for directions, and confirm your vessel and meeting point with our team.' },
  { question:'How do we confirm a date?', answer:'Fill out the planning form with your preferred date, guest count and occasion. Once your enquiry is received, our team will confirm availability and prepare a tailored proposal. The demo planning form does not send an enquiry or reserve the venue.' },
];

export function VenueFaq() {
  return <section className="faq-section venue-faq" aria-labelledby="venue-faq-title">
    <div className="faq-intro"><h2 id="venue-faq-title" data-reveal>Before you<br /><em>come aboard.</em></h2><p data-reveal>Questions about your celebration? Start here, or speak with our team about the details that matter to you.</p><Link prefetch={false} className="button button-dark venue-contact-cta" href="/contact#contact-form">Contact our team <ArrowRight size={18} /></Link></div>
    <FaqList items={venueQuestions} reveal />
  </section>;
}
