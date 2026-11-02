import { HolidayPopup } from './holiday-popup';
import { HomePage } from './home-page';
import { buildMetadata } from './seo';

export const metadata = buildMetadata(
  'Toronto Yacht Rental & Private Event Venue | Yankee Lady',
  'Plan a private yacht charter in Toronto for weddings, corporate events and celebrations. Yankee Lady offers three decks, catering options and harbour views.',
  '/',
);

export default function Home() {
  return <><HomePage /><HolidayPopup /></>;
}
