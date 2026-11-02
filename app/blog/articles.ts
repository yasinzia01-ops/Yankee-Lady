export type PlanningArticle = {
  slug: string;
  area: string;
  title: string;
  seoTitle: string;
  description: string;
  introduction: string;
  sections: { heading: string; paragraphs: string[]; checklist?: string[] }[];
  questions: { question: string; answer: string }[];
};

export const planningArticles: PlanningArticle[] = [
  {
    slug: 'toronto-yacht-rental-event-planning',
    area: 'Toronto',
    title: 'Toronto yacht rental: a guide to planning a private event',
    seoTitle: 'Toronto Yacht Rental Planning Guide | Yankee Lady',
    description: 'Plan a Toronto yacht event with practical advice on guest capacity, catering, boarding and the details to include in a private charter enquiry.',
    introduction: 'A Toronto yacht rental can bring your reception, dinner and celebration into one private waterfront setting. Yankee Lady is a crewed event venue on Toronto Harbour—not a self-drive boat rental. With three decks, a climate-controlled interior and open-air views, the venue can be shaped around weddings, corporate gatherings and private celebrations.',
    sections: [
      {
        heading: 'Start with your guest experience, not just the boat',
        paragraphs: [
          'Decide whether the event is primarily a seated meal, a standing reception or a programme with speeches and dancing. These formats use space differently. Yankee Lady welcomes up to 280 guests for cocktail-style events or 150 guests for a seated dinner; your proposed layout should reflect the actual headcount and activities.',
          'Think about how guests will move between dining, entertainment and outdoor areas. If your group includes people who need assistance boarding or moving around the vessel, discuss those needs with the team before committing to a plan. Do not assume every deck will suit every guest.',
        ],
      },
      {
        heading: 'Build a clear Toronto yacht charter brief',
        paragraphs: [
          'An event proposal depends on more than the date. Catering style, bar service, entertainment and setup requirements all affect the scope. Share a realistic guest estimate and tell the team which parts of the event matter most to you.',
          'For corporate events, include any presentation or sound requirements. For a wedding, describe the ceremony, meal and reception you have in mind. For a birthday or anniversary, explain whether the atmosphere should be relaxed, formal or focused on dancing.',
        ],
        checklist: ['Preferred date and departure/return times', 'Expected guest count and seated or cocktail format', 'Catering, bar and dietary requirements', 'DJ, speeches, décor and setup needs'],
      },
      {
        heading: 'Separate boarding time from event time',
        paragraphs: [
          'Give guests the exact vessel name and confirmed boarding address rather than simply “Toronto waterfront.” Yankee Lady III boards at 259 Queens Quay West, Toronto, ON; Yankee Lady IV boards at 539 Queens Quay West, Toronto, ON. Confirm your vessel and meeting point with the team.',
          'Allow for arrival, guest check-in and any setup before the main programme begins. One hour of setup before guest boarding is included; additional setup can be discussed. Do not put a departure time on invitations until the team has confirmed the schedule.',
        ],
      },
      {
        heading: 'Confirm the route, weather plan and proposal',
        paragraphs: [
          'Toronto Harbour provides the setting, but the captain adapts the cruise to weather, harbour conditions and the timing of your event. Treat a particular view or route as a planning preference, not a guarantee.',
          'Events take place rain or shine, with indoor space available and extreme-weather decisions remaining with the captain. Ask how your ceremony, dinner or presentation would work indoors. An enquiry requests a proposal; it does not reserve a date or confirm availability.',
        ],
      },
    ],
    questions: [
      { question: 'Is Yankee Lady a self-drive yacht rental in Toronto?', answer: 'No. Yankee Lady is a crewed private event venue on Toronto Harbour. The team plans the event with you, and the captain manages the vessel and cruise route.' },
      { question: 'How many people can attend a private yacht event?', answer: 'Yankee Lady can welcome up to 280 cocktail-style guests or 150 seated-dinner guests. Confirm a suitable layout for your event with the team.' },
    ],
  },
  {
    slug: 'humber-bay-private-yacht-events',
    area: 'Humber Bay & west-end Toronto',
    title: 'Planning a yacht event for guests coming from Humber Bay',
    seoTitle: 'Humber Bay Yacht Event Planning | Yankee Lady',
    description: 'Organising a yacht celebration for Humber Bay or west-end Toronto guests? Plan transport, boarding instructions and your private Toronto Harbour event.',
    introduction: 'For a group based in Humber Bay, Humber Bay Shores or west-end Toronto, the waterfront can inspire the celebration without being the boarding location. Yankee Lady’s boarding points are on Queens Quay, not in Humber Bay. This guide focuses on bringing a west-end guest list together for a private Toronto Harbour event.',
    sections: [
      {
        heading: 'Make the meeting point unambiguous',
        paragraphs: [
          'The most useful detail on an invitation is the correct vessel and dock. Yankee Lady III boards at 259 Queens Quay West, Toronto, ON; Yankee Lady IV boards at 539 Queens Quay West, Toronto, ON. A reference to Humber Bay alone will not take guests to the boarding point.',
          'If the organiser is based in Humber Bay, distinguish the organiser’s address from the event address in every confirmation. Repeat the confirmed boarding location in your final guest reminder, along with the requested arrival time and a contact person for the day.',
        ],
      },
      {
        heading: 'Plan transport as part of the event',
        paragraphs: [
          'Ask early whether guests will travel individually or whether a shared pickup would make the evening easier. A company group leaving from one workplace has different needs from a birthday party whose guests are coming from several homes.',
          'Check current travel conditions before setting an arrival window. Do not rely on a fixed travel-time promise between Humber Bay and Queens Quay. If arranging a shuttle, confirm the vehicle’s permitted stopping point and pickup arrangements directly with the transport provider.',
        ],
        checklist: ['Confirmed Queens Quay boarding address', 'A named guest coordinator', 'An arrival window agreed with the events team', 'A return transport plan after the event'],
      },
      {
        heading: 'Choose the right format for your west-end guest list',
        paragraphs: [
          'A cocktail reception gives a group room to mingle, while a seated dinner provides a more structured programme. Yankee Lady’s capacity is up to 280 cocktail-style guests or 150 seated-dinner guests. Share your expected count rather than choosing a format from the maximum capacity alone.',
          'For a neighbourhood celebration or family milestone, ask about meal preferences, dietary needs and any boarding assistance in advance. For a corporate gathering, identify the balance between networking, presentations and entertainment so the proposal reflects how the group will use the venue.',
        ],
      },
      {
        heading: 'Request views without promising a Humber Bay cruise',
        paragraphs: [
          'If a west-end waterfront view is important to your group, mention it when enquiring. It should not be assumed that an event will cruise through Humber Bay: the captain determines the route according to conditions, timing and operational requirements.',
          'Build the event around the private venue, dining and time together rather than a guaranteed stop or landmark. The team can discuss the experience you want and explain what is appropriate for the proposed date and schedule.',
        ],
      },
    ],
    questions: [
      { question: 'Does Yankee Lady board in Humber Bay?', answer: 'No. Yankee Lady III boards at 259 Queens Quay West, Toronto, ON; Yankee Lady IV boards at 539 Queens Quay West, Toronto, ON. Confirm your vessel and meeting point with the team.' },
      { question: 'Can we request a route toward Humber Bay?', answer: 'You can discuss route preferences when enquiring, but no specific route is guaranteed. The captain adapts the cruise to the event timing, weather and harbour conditions.' },
    ],
  },
  {
    slug: 'toronto-lake-shore-yacht-event-guide',
    area: 'Toronto Lake Shore',
    title: 'Toronto Lake Shore yacht events: getting your guests aboard',
    seoTitle: 'Toronto Lake Shore Yacht Event Guide | Yankee Lady',
    description: 'A practical Lake Shore event-planning guide covering Queens Quay boarding, parking, guest arrivals and the return plan for a Toronto yacht charter.',
    introduction: 'When planning a yacht event for guests along Toronto’s Lake Shore, clear arrival information matters as much as the onboard programme. Lake Shore is a useful area reference, but it is not a precise boarding address. Yankee Lady events board on Queens Quay, and the confirmed vessel determines where your guests should meet.',
    sections: [
      {
        heading: 'Use the dock address, not a broad waterfront label',
        paragraphs: [
          'Put the confirmed vessel name, street address and nearby landmark together on the invitation. Yankee Lady III boards at 259 Queens Quay West, Toronto, ON; Yankee Lady IV boards at 539 Queens Quay West, Toronto, ON.',
          'Guests arriving from Lake Shore Boulevard East and West may approach the waterfront differently. Share directions to the actual boarding point and ask guests to check their route before leaving. Avoid replacing the dock address with a parking-lot address.',
        ],
      },
      {
        heading: 'Keep parking separate from boarding instructions',
        paragraphs: [
          'The Yankee Lady III location lists Green P parking at 545 Lake Shore Boulevard West. Ask the team about parking near Yankee Lady IV. Check current access, rates and availability directly; parking is not a reserved space included with a charter.',
          'Explain that parking and walking to the vessel take additional time. If guests will be dropped off, agree on an appropriate meeting arrangement rather than assuming a vehicle can stop beside the yacht. Tell your coordinator how to reach guests who are delayed.',
        ],
      },
      {
        heading: 'Give the arrival programme its own timeline',
        paragraphs: [
          'Separate vendor setup, guest arrival and the preferred departure time in your event brief. Catering deliveries, décor and a DJ may need coordination before guests board. The team can advise on setup requirements; one hour of setup before boarding is included, with extra time subject to arrangement.',
          'For a seated event, consider when guests should be settled before service or speeches begin. For a cocktail party, decide whether a welcome or announcement is needed before the main programme. Confirm these details before issuing the final schedule.',
        ],
        checklist: ['Vessel name and boarding address', 'Parking information labelled as optional and unreserved', 'Guest arrival time distinct from departure', 'Coordinator details and a return pickup plan'],
      },
      {
        heading: 'Plan the end of the evening as carefully as the start',
        paragraphs: [
          'Share the confirmed return arrangement with anyone booking a ride home. The planning form distinguishes returns after midnight as “next day,” so check the date as well as the time when organising transport.',
          'Let the team know about any hard scheduling constraints when requesting a proposal. Cruise timing and the route must remain appropriate for harbour conditions and the captain’s decisions. A submitted form is an enquiry, not a confirmed reservation.',
        ],
      },
    ],
    questions: [
      { question: 'Is Lake Shore Boulevard the boarding address?', answer: 'No. Yankee Lady III boards at 259 Queens Quay West, Toronto, ON; Yankee Lady IV boards at 539 Queens Quay West, Toronto, ON. Parking has a different address.' },
      { question: 'Is parking included with a yacht event?', answer: 'The listed parking locations are nearby options, not reserved spaces included with a charter. Check current rates, access and availability with the parking operator.' },
    ],
  },
  {
    slug: 'harbourfront-corporate-yacht-events',
    area: 'Harbourfront & downtown Toronto',
    title: 'A Harbourfront yacht venue for your next corporate event',
    seoTitle: 'Harbourfront Corporate Yacht Events | Yankee Lady',
    description: 'Plan a Harbourfront corporate yacht event with guidance on presentations, catering, networking and boarding on Toronto’s Queens Quay.',
    introduction: 'A private yacht venue offers downtown Toronto teams a change of setting without making the event only about the cruise. Yankee Lady brings dining, presentations, entertainment and open-air harbour views into one crewed venue. For a Harbourfront corporate gathering, start by deciding what your guests should accomplish—and how the day should flow.',
    sections: [
      {
        heading: 'Define the purpose before choosing the programme',
        paragraphs: [
          'A client reception, a staff celebration and a working meeting need different layouts. A reception may prioritise conversation and movement; a presentation needs clear sightlines and a planned speaking slot. Explain the purpose of the gathering when requesting your proposal.',
          'Yankee Lady can accommodate up to 280 cocktail-style guests or 150 seated-dinner guests. Include the estimated number of attendees, hosts, speakers and any service requirements so the team can discuss a format that works for the whole group.',
        ],
      },
      {
        heading: 'Confirm presentation equipment and timing',
        paragraphs: [
          'Screens and projectors are available for corporate presentations, and the venue has sound and lighting systems. Tell the team what you intend to show or play, whether you have a speaker and how long the presentation will take. Confirm the exact equipment and connections required rather than assuming a particular setup.',
          'Allow time to test the presentation before guests arrive. If entertainment follows the formal programme, decide who will handle the transition and whether the DJ needs access during setup. You can request a DJ or discuss bringing your own, which may involve an additional charge.',
        ],
      },
      {
        heading: 'Match hospitality to the way guests will meet',
        paragraphs: [
          'Catering and bar service should support the event’s purpose. A standing reception and a seated dinner create different opportunities for conversation. Discuss menus, dietary requirements and beverage service with the team instead of treating them as last-minute additions.',
          'The venue has a licensed bar, and proposals can include catering, entertainment and other services. Share your priorities and budget guidance so the team can explain the available options and pricing. Do not assume every service is included in the venue enquiry.',
        ],
        checklist: ['Event objective and estimated attendance', 'Presentation length, equipment and test time', 'Meal format and dietary requirements', 'Guest arrival, departure and return arrangements'],
      },
      {
        heading: 'Make Harbourfront arrival straightforward',
        paragraphs: [
          'Include the confirmed boarding address in calendar invitations and reminders. Yankee Lady III boards at 259 Queens Quay West, Toronto, ON; Yankee Lady IV boards at 539 Queens Quay West, Toronto, ON. Even a downtown guest list needs the correct vessel and meeting point.',
          'Nominate a coordinator to greet guests and manage any late arrivals. Confirm the event schedule and indoor alternative with the team, and remember that the captain adapts the cruise route to conditions. The private venue is the centre of the experience; a particular skyline view is not a contractual promise.',
        ],
      },
    ],
    questions: [
      { question: 'Can a corporate yacht event include a presentation?', answer: 'Yes. Screens and projectors are available, along with sound and lighting systems. Confirm the required equipment, connections, layout and test time with the team before the event.' },
      { question: 'Where should downtown Toronto guests meet?', answer: 'Yankee Lady III boards at 259 Queens Quay West, Toronto, ON; Yankee Lady IV boards at 539 Queens Quay West, Toronto, ON. Confirm your vessel and meeting point with the team.' },
    ],
  },
];
