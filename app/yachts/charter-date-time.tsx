'use client';
/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions -- The fieldset is a composite picker and handles Escape from its interactive descendants. */

import { useEffect, useId, useRef } from 'react';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { timeLabel } from './charter-times';

export type DateTimePanel = 'date' | 'time' | 'return' | null;
const firstDeparture = 10 * 60;
const lastReturn = 24 * 60 + 90;
const departures = Array.from({ length: (lastReturn - firstDeparture) / 30 }, (_, index) => firstDeparture + index * 30);

export function CharterDateTime({ date, departure, returnTime, panel, onDate, onDeparture, onReturn, onPanel, error }: {
  date: Date | undefined;
  departure: string;
  returnTime: string;
  panel: DateTimePanel;
  onDate: (date: Date) => void;
  onDeparture: (time: string) => void;
  onReturn: (time: string) => void;
  onPanel: (panel: DateTimePanel) => void;
  error: boolean;
}) {
  const id = useId();
  const dateButton = useRef<HTMLButtonElement>(null);
  const timeButton = useRef<HTMLButtonElement>(null);
  const returnButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (panel === 'return') returnButton.current?.focus({ preventScroll: true });
  }, [panel]);
  const times = panel === 'return' && departure
    ? Array.from({ length: Math.max(0, (lastReturn - Number(departure)) / 30) }, (_, index) => Number(departure) + (index + 1) * 30)
    : departures;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const close = () => {
    (panel === 'date' ? dateButton : panel === 'return' ? returnButton : timeButton).current?.focus();
    onPanel(null);
  };
  const isoDate = date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : '';

  return <div className="charter-date-time">
    <div className="charter-picker-fields">
      <button type="button" className="required-entry" ref={dateButton} aria-expanded={panel === 'date'} aria-controls={`${id}-date`} data-invalid={error && !date || undefined} onClick={() => onPanel(panel === 'date' ? null : 'date')}>
        <span>Date</span><strong>{date ? date.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Add date'}</strong><CalendarDays size={18} aria-hidden="true" />
      </button>
      <button type="button" className="required-entry" ref={timeButton} aria-expanded={panel === 'time'} aria-controls={`${id}-time`} data-invalid={error && !departure || undefined} onClick={() => onPanel(panel === 'time' ? null : 'time')}>
        <span>Departure</span><strong>{departure ? timeLabel(Number(departure)) : 'Select time'}</strong><ChevronDown size={18} aria-hidden="true" />
      </button>
      <button type="button" className="required-entry" ref={returnButton} disabled={!departure} aria-expanded={panel === 'return'} aria-controls={`${id}-return`} data-invalid={error && !returnTime || undefined} onClick={() => onPanel(panel === 'return' ? null : 'return')}>
        <span>Return</span><strong>{returnTime ? timeLabel(Number(returnTime)) : 'Select time'}</strong><ChevronDown size={18} aria-hidden="true" />
      </button>
    </div>
    <input type="hidden" name="date" value={isoDate} />
    <input type="hidden" name="departure" value={departure} />
    <input type="hidden" name="returnTime" value={returnTime} />
    {error && (!date || !departure || !returnTime) && <p className="charter-picker-error" role="alert">Please choose a date, departure and return time.</p>}
    {panel && <fieldset key={panel} className="charter-picker-panel" onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); close(); } }}>
      {panel === 'date' ? <div id={`${id}-date`}>
        <Calendar className="charter-calendar" mode="single" required selected={date} onSelect={value => { onDate(value); onPanel('time'); timeButton.current?.focus(); }} defaultMonth={date || today} startMonth={today} disabled={{ before: today }} showOutsideDays={false} />
        <p>Choose your preferred date for the planning form. Our team confirms availability once your enquiry is received. This demo does not send an enquiry or reserve the venue.</p>
      </div> : <div id={`${id}-${panel}`}>
        <p className="charter-time-heading" id={`${id}-time-label`}>Preferred {panel === 'return' ? 'return' : 'departure'}{date ? ` · ${date.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}` : ''}</p>
        <RadioGroup className="charter-time-options charter-time-scroll" aria-labelledby={`${id}-time-label`} value={panel === 'return' ? returnTime : departure} onValueChange={value => {
          if (panel === 'return') { onReturn(String(value)); close(); }
          else { onDeparture(String(value)); onPanel('return'); }
        }}>
          {times.map(time => <label key={time} className={(panel === 'return' ? returnTime : departure) === String(time) ? 'is-selected' : ''}><RadioGroupItem value={String(time)} /><span>{timeLabel(time)}</span></label>)}
        </RadioGroup>
        <p>Toronto local time. These are requested times, not confirmed availability. Returns after midnight are marked “next day.”</p>
      </div>}
      {panel === 'date' && <button type="button" className="charter-picker-done" onClick={close}>Done <ChevronDown size={16} /></button>}
    </fieldset>}
  </div>;
}
