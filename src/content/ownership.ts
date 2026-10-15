/**
 * Ownership content (BRD P11). DRAFT wording pending TCPC legal review (asset A11, P17-AC1).
 * - No visa, residency or citizenship claims (P11-AC1): the retirement/long-stay section is behind
 *   `showRetirementSection`, which stays false until counsel approves exact wording.
 * - No "fractional ownership" (P11-AC3).
 */
export const showRetirementSection = false;

export const buyerPaths = [
  {
    id: "filipino-buyers",
    title: "Filipino buyers",
    lead: "Own your home and the land it stands on.",
    points: [
      "House and lot: a villa, townhouse villa or treehouse villa with its own lot.",
      "Condominium: a condominium residence with a share in the common areas.",
    ],
  },
  {
    id: "foreign-buyers",
    title: "Foreign buyers",
    lead: "Clear, lawful structures for buyers from abroad.",
    points: [
      "Condominium: foreigners can own condominium units, within the project's foreign-ownership limit.",
      "Houses: foreigners cannot own land in the Philippines. A house can be held through a long-term land lease, a usufruct or a similar structure.",
      "Our in-house legal team explains each structure; we also recommend independent legal advice before you commit.",
    ],
  },
];

export const ownerBenefits = [
  { icon: "scale", title: "Legal guidance", text: "Help with ownership structures and transactions from our in-house legal team." },
  { icon: "key", title: "Property management", text: "In-house management so your home is cared for while you are away." },
  { icon: "concierge", title: "Concierge", text: "Arrivals, housekeeping, dining and local trips arranged for you." },
  { icon: "layers", title: "Access to other managed projects", text: "Owner access to other Terra Concetti destinations as they open." },
  { icon: "waves", title: "Dive-center discount", text: "Owner rates at the premium dive center." },
  { icon: "compass", title: "Branded hotel operator (planned)", text: "A hotel operator is planned to run hospitality services." },
  { icon: "recycle", title: "Optional rental pool", text: "A 10-year rental agreement, renewable by the owner, if you choose to join." },
  { icon: "sun", title: "Owner nights and priority", text: "Free owner nights each year and priority booking." },
];

export const buyingSteps = [
  { title: "Inquire", text: "Contact our team by phone or email with the destination and type of home you are interested in." },
  { title: "Visit the site", text: "See the land, the views and the plans in person on an appointment-only site visit." },
  { title: "Choose your home", text: "Select a residence type and location with guidance on ownership structure and terms." },
  { title: "Reserve and sign", text: "Reservations and contracts open once the project's DHSUD License to Sell is issued." },
  { title: "Turnover and move in", text: "Receive your home, then let our team look after it whenever you are away." },
];

export const faqs = [
  {
    q: "Can foreigners buy a home at The Coral or Ocean View?",
    a: "Yes, through the right structure. Foreigners can own condominium units within the project's foreign-ownership limit. Land cannot be owned by foreigners, so houses are held through a long-term lease, a usufruct or a similar arrangement. Our legal team can walk you through each option.",
  },
  {
    q: "Are prices published?",
    a: "Not yet. Prices are available on request and will be shown on this site once the price list is approved and the project is licensed to sell.",
  },
  {
    q: "Is the project licensed to sell?",
    a: "DHSUD registration and License to Sell details will be published on each project page and in the site footer once issued. Until then we share information and arrange site visits, but we do not take reservations or payments.",
  },
  {
    q: "Can I rent out my home when I am not using it?",
    a: "You can choose to join an optional rental pool under a 10-year agreement that you can renew. Owner benefits depend on the final rental and management agreements, and no income or return is guaranteed.",
  },
  {
    q: "How do I arrange a site visit?",
    a: "Site visits are by appointment. Call or email our team using the contact details on this page and we will arrange a date.",
  },
  {
    q: "How far is Anilao from Manila?",
    a: "About two hours (122 km) from NAIA by car via the South Luzon Expressway and the STAR Tollway. No flights or boat rides are needed.",
  },
];
