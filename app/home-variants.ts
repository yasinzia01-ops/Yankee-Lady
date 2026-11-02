import { planningArticles } from './blog/articles';
import { faqs } from './faq-data';

export type HomeCopy = {
  eyebrow?: string;
  heroLead?: string;
  heroEmphasis?: string;
  heroIntro?: string;
  experienceIntro?: string;
  fleetIntro?: string;
  storyIntro?: string;
  faqIntro?: string;
  closingIntro?: string;
  questions?: { question: string; answer: string }[];
};

const localQuestions = (index: number) => [
  ...planningArticles[index].questions,
  faqs[0], faqs[2], faqs[3], faqs[4],
];

export const homeVariants = [
  {
    slug: 'toronto-yacht-rental-event-planning',
    area: 'Toronto',
    title: 'Toronto Yacht Rental & Private Event Venue | Yankee Lady',
    description: 'A crewed Toronto yacht rental venue for weddings, corporate events and private celebrations. Discover three decks, catering options and Queens Quay boarding.',
    copy: {
      eyebrow: 'Private yacht rentals on Toronto Harbour',
      heroLead: 'Toronto’s most',
      heroEmphasis: 'unforgettable venue.',
      heroIntro: 'Bring your reception, dinner and celebration together aboard a private yacht on Toronto Harbour.',
      experienceIntro: 'A wedding, a corporate gathering or a milestone celebration: shape the layout, dining and entertainment around how you want your guests to feel.',
      fleetIntro: 'A crewed 113-foot yacht with three decks, a climate-controlled interior and open-air views. Welcome up to 280 cocktail-style guests or 150 seated-dinner guests.',
      storyIntro: 'A Toronto yacht rental can bring your reception, dinner and celebration into one private waterfront setting. Yankee Lady is a crewed event venue—not a self-drive boat rental. Tell us your guest count, preferred date and event style, and we’ll shape a proposal around the experience you have in mind.',
      faqIntro: 'From dining and entertainment to Queens Quay boarding, a clear plan makes the day easier. Share your requirements before confirming the schedule; an enquiry does not reserve a date.',
      closingIntro: 'Plan your Toronto yacht event',
      questions: localQuestions(0),
    },
  },
  {
    slug: 'humber-bay-private-yacht-events',
    area: 'Humber Bay',
    title: 'Yacht Events for Humber Bay Guests | Yankee Lady Toronto',
    description: 'Bring Humber Bay and west-end Toronto guests together for a private yacht celebration. Explore Yankee Lady’s venue, hospitality and Queens Quay boarding details.',
    copy: {
      eyebrow: 'For Humber Bay & west-end Toronto guests',
      heroLead: 'Your west-end gathering.',
      heroEmphasis: 'A harbour celebration.',
      heroIntro: 'Bring your Humber Bay guest list together aboard a private Toronto Harbour yacht, with boarding on Queens Quay.',
      experienceIntro: 'From a neighbourhood celebration to a company reception, choose a seated meal, a cocktail gathering or an evening of dancing shaped around your group.',
      fleetIntro: 'Three decks for dining, conversation and open-air views. Yankee Lady welcomes up to 280 cocktail-style guests or 150 seated-dinner guests, with hospitality tailored to your occasion.',
      storyIntro: 'For a group based in Humber Bay, Humber Bay Shores or west-end Toronto, the waterfront can inspire the celebration without being the boarding location. Yankee Lady boards on Queens Quay, not in Humber Bay. Give guests the confirmed vessel, dock and arrival time, and consider a shared transport plan for the journey home.',
      faqIntro: 'Make the meeting point unambiguous: Yankee Lady III boards at 259 Queens Quay West, while Yankee Lady IV boards at 539 Queens Quay West. A west-end view can be discussed, but the captain determines the route according to conditions and timing.',
      closingIntro: 'Bring your Humber Bay guests aboard',
      questions: localQuestions(1),
    },
  },
  {
    slug: 'toronto-lake-shore-yacht-event-guide',
    area: 'Toronto Lake Shore',
    title: 'Toronto Lake Shore Yacht Events | Yankee Lady Charters',
    description: 'Plan a private yacht event for Toronto Lake Shore guests. Explore onboard dining, entertainment and practical arrival details for Yankee Lady on Queens Quay.',
    copy: {
      eyebrow: 'Private events for Toronto Lake Shore guests',
      heroLead: 'From the Lake Shore.',
      heroEmphasis: 'Into the unforgettable.',
      heroIntro: 'A private yacht venue for your Lake Shore celebration, bringing dining, entertainment and Toronto Harbour views together.',
      experienceIntro: 'A warm welcome, a carefully timed dinner and a celebration on the water. Plan your guest arrival and onboard programme as one seamless experience.',
      fleetIntro: 'Charter a crewed 113-foot Toronto yacht with a climate-controlled interior, licensed bar and three decks for dining, dancing and celebrating.',
      storyIntro: 'For guests along Toronto’s Lake Shore, clear arrival information matters as much as the onboard programme. Lake Shore is an area reference, not a boarding address. Use the confirmed Queens Quay dock for your vessel, keep parking instructions separate, and allow time to walk to the yacht before the agreed arrival time.',
      faqIntro: 'Separate setup, guest arrival and departure in your event brief. Nearby parking is not reserved or included with a charter, and returns after midnight should be checked against the following day’s date when arranging transport.',
      closingIntro: 'Plan your Lake Shore celebration',
      questions: localQuestions(2),
    },
  },
  {
    slug: 'harbourfront-corporate-yacht-events',
    area: 'Harbourfront',
    title: 'Harbourfront Corporate Yacht Venue | Yankee Lady Toronto',
    description: 'Host a Harbourfront corporate gathering aboard Yankee Lady. A private Toronto yacht venue for networking, presentations, dining and celebrations.',
    copy: {
      eyebrow: 'Harbourfront & downtown Toronto events',
      heroLead: 'Beyond the boardroom.',
      heroEmphasis: 'Onto the harbour.',
      heroIntro: 'Bring your downtown Toronto team together in a private yacht venue for presentations, dining and memorable celebrations.',
      experienceIntro: 'A client reception, staff celebration or working meeting deserves its own rhythm. Shape the balance of networking, presentations and entertainment around your guests.',
      fleetIntro: 'A crewed 113-foot venue with three decks, sound and lighting systems, a licensed bar and open-air harbour views. Welcome up to 280 cocktail-style or 150 seated-dinner guests.',
      storyIntro: 'A Harbourfront yacht event is about more than the cruise. Start with what your guests should accomplish, then plan the meal format, presentation time and opportunities to connect. Screens and projectors are available; confirm the equipment, connections and test time with the team before the event.',
      faqIntro: 'Even a downtown guest list needs the correct dock: Yankee Lady III boards at 259 Queens Quay West, while Yankee Lady IV boards at 539 Queens Quay West. Nominate an arrival coordinator and confirm the schedule, hospitality and indoor alternative with the team.',
      closingIntro: 'Plan your Harbourfront corporate event',
      questions: localQuestions(3),
    },
  },
] satisfies { slug: string; area: string; title: string; description: string; copy: HomeCopy }[];
