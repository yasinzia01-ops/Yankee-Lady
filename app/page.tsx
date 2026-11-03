import { HolidayPopup } from './holiday-popup';
import { HomePage } from './home-page';
import { buildMetadata } from './seo';

export const metadata = buildMetadata(
  'Toronto Yacht Rental & Private Event Venue | Yankee Lady',
  'Private yacht rental in Toronto for weddings, corporate events and parties. Yankee Lady is a crewed 113-ft harbour venue for up to 280 guests.',
  '/',
);

export default function Home() {
  return <><HomePage /><HolidayPopup /></>;
}
