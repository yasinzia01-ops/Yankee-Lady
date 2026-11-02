'use client';
/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions -- The fieldset is a composite picker and handles Escape from its interactive descendants. */

import { useEffect, useId, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function CharterChoice({ label, name, value, placeholder, options, onChange, error = false, required = true }: {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  error?: boolean;
  required?: boolean;
}) {
  const id = useId();
  const details = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);
  useEffect(() => {
    if (error && details.current) { details.current.open = true; summary.current?.focus(); }
  }, [error]);
  const close = () => {
    if (details.current) details.current.open = false;
    summary.current?.focus({ preventScroll: true });
  };
  return <details ref={details} className="charter-services charter-choice" data-choice-name={name} data-ui-pattern="dropdown">
    <summary ref={summary} className={required ? 'required-entry' : undefined} aria-invalid={error || undefined} aria-describedby={error ? `${id}-error` : undefined}>
      <span><small id={`${id}-label`}>{label}</small><strong>{options.find(option => option.value === value)?.label ?? placeholder}</strong></span><ChevronDown size={18} aria-hidden="true" />
    </summary>
    <fieldset className="charter-choice-panel" onKeyDown={event => {
      if (event.key === 'Escape' && details.current?.open) { event.stopPropagation(); close(); }
    }}>
      <RadioGroup className="charter-time-options charter-choice-options" aria-labelledby={`${id}-label`} value={value} onValueChange={selected => { onChange(String(selected)); close(); }}>
        {options.map(option => <label key={option.value} className={value === option.value ? 'is-selected' : ''}><RadioGroupItem value={option.value} /><span>{option.label}</span></label>)}
      </RadioGroup>
      {error && <p id={`${id}-error`} className="charter-picker-error" role="alert">Please fill this field out.</p>}
    </fieldset>
    <input type="hidden" name={name} value={value} />
  </details>;
}
