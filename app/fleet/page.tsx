import { redirect } from 'next/navigation';
export { metadata } from '../venue/page';

export default function FleetPage() {
  redirect('/venue');
}
