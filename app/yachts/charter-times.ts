export function timeLabel(minutes: number) {
  const hour = Math.floor(minutes / 60) % 24;
  return `${hour % 12 || 12}:${String(minutes % 60).padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}${minutes >= 1440 ? ' · next day' : ''}`;
}

export function durationHours(departure: string, returnTime: string) {
  if (!departure || !returnTime) return null;
  const minutes = Number(returnTime) - Number(departure);
  return Number.isFinite(minutes) && minutes > 0 && minutes <= 1440 ? minutes / 60 : null;
}
