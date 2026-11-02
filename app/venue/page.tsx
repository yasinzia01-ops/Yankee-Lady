import { YachtPage, yachtMetadata } from '../yachts/yacht-page';

export const metadata = yachtMetadata('Yankee Lady');

export default function Venue() {
  return <YachtPage name="Yankee Lady" numeral="III" dock="259 Queens Quay West, Toronto, ON" parking="545 Lake Shore Blvd West · Green P" intro="Yankee Lady is a crewed 113-foot yacht charter and private event venue on Toronto Harbour. Host a wedding, corporate reception or milestone celebration with up to 280 cocktail-style guests or 150 seated-dinner guests. A climate-controlled interior, licensed bar and open-air decks bring dining, entertainment and Toronto skyline views together in one venue." />;
}
