'use client';

import { useId } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown } from 'lucide-react';

const services = [
  'Event catering', 'Bar service', 'All-inclusive bar', 'DJ', 'Bring your own DJ',
  'Photographer', 'Photography & videography', 'Decor & flowers', 'Other requests',
];
const alternatives: Record<string, string> = {
  'Bar service': 'All-inclusive bar', 'All-inclusive bar': 'Bar service',
  DJ: 'Bring your own DJ', 'Bring your own DJ': 'DJ',
  Photographer: 'Photography & videography', 'Photography & videography': 'Photographer',
};

export function CharterServices({ selected, onChange, error = false }: { selected: string[]; onChange: (services: string[]) => void; error?: boolean }) {
  const id = useId();
  return <details className="charter-services" data-ui-pattern="dropdown">
    <summary aria-invalid={error || undefined} aria-describedby={error ? `${id}-error` : undefined}><span><small>Services & extras (optional)</small><strong>{selected.length ? `${selected.length} selected` : 'Choose what you’d like'}</strong></span><ChevronDown size={18} /></summary>
    <div className="charter-service-options">
      <p>Tell us what you’re interested in. Our team will confirm options and pricing.</p>
      {services.map(service => <label key={service}><Checkbox checked={selected.includes(service)} onCheckedChange={checked => onChange(checked ? [...selected.filter(item => item !== alternatives[service]), service] : selected.filter(item => item !== service))} /><span>{service}</span></label>)}
    </div>
    {error && <p id={`${id}-error`} className="charter-picker-error" role="alert">Please choose at least one service or extra.</p>}
    {selected.map(service => <input key={service} type="hidden" name="services" value={service} />)}
  </details>;
}
