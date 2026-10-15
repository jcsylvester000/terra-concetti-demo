import { z } from "zod";

/**
 * Leadership and design partner (BRD P02, deck S. 8–12). Credentials use the deck's wording and
 * must be approved by TCPC before launch (P02-AC2). No photos yet (asset A10): the UI shows a
 * neutral monogram placeholder, never a stock face (P02-AC1).
 */
const PersonSchema = z.object({
  slug: z.string(),
  name: z.string(),
  role: z.string(),
  short: z.string(),
  credentials: z.array(z.string()).min(1),
  photo: z.string().nullable(),
});

export type Person = z.infer<typeof PersonSchema>;

export const team: Person[] = [
  {
    slug: "tina-samson",
    name: "Atty. Tina Samson",
    role: "Chairwoman · Chief Legal & Compliance Officer",
    short: "20+ years in corporate real estate; BERDE assessor.",
    credentials: [
      "20+ years in corporate real estate",
      "US$2B+ in real-estate transactions and US$500M in project financing",
      "3 million sq ft of office space delivered",
      "BERDE assessor; PhilGBC and WorldGBC leadership recognitions",
    ],
    photo: null,
  },
  {
    slug: "cathy-saldana",
    name: "Ar. Cathy Saldaña",
    role: "Director · Chief Executive Officer",
    short: "32 years of architectural practice; RIBA 100 Women Architects 2024.",
    credentials: [
      "32 years of architectural practice",
      "300+ residential and 80+ hospitality and sustainability projects",
      "48 awards and publications",
      "RIBA 100 Women Architects (2024); UN Women WEPs 2024",
    ],
    photo: null,
  },
  {
    slug: "tessa-neri",
    name: "Tessa Neri",
    role: "Director · Chief Finance Officer",
    short: "Managing Partner of a dive resort in Anilao; co-founder of The Pink Argonauts.",
    credentials: [
      "20+ years of multi-industry leadership; 800+ team members managed",
      "Managing Partner of Aiyanar Beach & Dive Resort, Anilao",
      "Co-founder of The Pink Argonauts, a marine conservation group",
    ],
    photo: null,
  },
  {
    slug: "vicente-esguerra",
    name: "Vicente Julio Esguerra V",
    role: "Chief Commercial Officer",
    short: "25+ years in real estate with high-net-worth clients.",
    credentials: [
      "25+ years in real estate",
      "₱1.75B+ in closed sales with high-net-worth clients",
      "Projects include Balesin Island, Kawayan Cove, Alphaland Baguio and The City Club",
    ],
    photo: null,
  },
].map((p) => PersonSchema.parse(p));

export const designPartner = {
  name: "PDP Architecture (Projects Design Plus)",
  role: "Core design partner",
  credentials: ["BCI Asia Top 10 Architects 2024", "Hubexo Asia Awards 2025"],
};

export const getPerson = (slug: string) => team.find((p) => p.slug === slug);

/**
 * Journal byline used until TCPC assigns named authors to articles (BRD P14-AC1 asks for named
 * authors from this file). Articles are written by the agency (decision D7), so they are not
 * attributed to a named person who has not reviewed them.
 */
export const editorialAuthor = {
  slug: "editorial",
  name: "Terra Concetti Journal",
  role: "Editorial team, Terra Concetti Properties Corp.",
  short: "Guides and stories from the team building sustainable communities above Anilao's reefs.",
};

export function getAuthor(slug: string) {
  if (slug === editorialAuthor.slug) return { ...editorialAuthor, isPerson: false as const };
  const p = getPerson(slug);
  return p ? { slug: p.slug, name: p.name, role: p.role, short: p.short, isPerson: true as const } : undefined;
}
