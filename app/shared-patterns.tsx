import type { ReactNode } from 'react';

export type FaqEntry = {
  question: string;
  answer: string;
};

export function FaqList({ items, reveal = false }: { items: readonly FaqEntry[]; reveal?: boolean }) {
  return <div className="faq-list" data-ui-pattern="faq-list">{items.map((item, index) => <details className="faq-item" key={item.question} data-reveal={reveal ? '' : undefined} data-delay={reveal ? String(index * 55) : undefined}>
    <summary><span>{String(index + 1).padStart(2, '0')}</span>{item.question}<i aria-hidden="true" /></summary>
    <div><p>{item.answer}</p></div>
  </details>)}</div>;
}

export type DisclosureEntry = {
  title: string;
  body: string;
};

export function DisclosureList({ items, className = '', label, before }: { items: readonly DisclosureEntry[]; className?: string; label: string; before?: ReactNode }) {
  return <div className={`booking-aside-details shared-disclosure-list ${className}`.trim()} aria-label={label} data-ui-pattern="disclosure-list">
    {before}
    {items.map(item => <details key={item.title}><summary>{item.title}<span aria-hidden="true">+</span></summary><p>{item.body}</p></details>)}
  </div>;
}
