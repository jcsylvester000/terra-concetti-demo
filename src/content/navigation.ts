/** Primary navigation (BRD §5.3). "Book a site visit" header button is held (D2). */
export type NavItem = { label: string; href: string; megaMenu?: "destinations" };

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Destinations", href: "/destinations", megaMenu: "destinations" },
  { label: "Why Anilao", href: "/anilao" },
  { label: "Ownership", href: "/ownership" },
  { label: "Invest", href: "/invest" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Destinations",
    links: [
      { label: "The Coral at Anilao", href: "/destinations/the-coral-anilao" },
      { label: "Ocean View Anilao", href: "/destinations/ocean-view-anilao" },
      { label: "Mabini Golf & Country Club", href: "/destinations/mabini-golf-country-club" },
      { label: "The Urban Coral", href: "/destinations/the-urban-coral" },
      { label: "All destinations", href: "/destinations" },
    ],
  },
  {
    heading: "Terra Concetti",
    links: [
      { label: "About", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Why Anilao", href: "/anilao" },
      { label: "Ownership", href: "/ownership" },
      { label: "Invest", href: "/invest" },
      { label: "Journal", href: "/journal" },
    ],
  },
];

export const legalNav = [
  { label: "Privacy Notice", href: "/legal/privacy-notice" },
  { label: "Terms of Use", href: "/legal/terms" },
  { label: "Disclaimers", href: "/legal/disclaimers" },
];
