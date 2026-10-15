import { z } from "zod";
import { images, type ImageKey } from "./images";
import { site } from "./site";

/**
 * Destinations (BRD §4.2, §4.6). Adding a record here adds a card, a mega-menu item,
 * a sitemap entry and (for template "project") a full project page.
 *
 * salesStatus (License to Sell guardrail, PD 957):
 *  - coming-soon : concept projects. Chip "Coming soon". No prices.
 *  - pre-launch  : The Coral + Ocean View until the DHSUD LTS is confirmed. Chip "Coming soon". "Price on request".
 *  - now-selling : only allowed when site.licenseToSell[slug] has a number (enforced below).
 */
const ImageKeySchema = z.custom<ImageKey>((v) => typeof v === "string" && v in images, "Unknown image key");

const Fact = z.object({ value: z.string(), label: z.string(), count: z.number().optional(), suffix: z.string().optional() });
const Feature = z.object({ title: z.string(), text: z.string(), icon: z.string() });
const Block = z.object({ heading: z.string(), body: z.array(z.string()) });

const ProjectSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string(),
    /** Name with location, used in titles and headings (BRD §9.1: names are generic on their own). */
    nameWithPlace: z.string(),
    template: z.enum(["project", "coming-soon"]),
    location: z.string(),
    eyebrow: z.string(),
    tagline: z.string(),
    summary: z.string(),
    salesStatus: z.enum(["coming-soon", "pre-launch", "now-selling"]),
    showPrices: z.boolean(),
    accent: z.enum(["coral", "ov", "mgcc", "uc"]),
    heroImage: ImageKeySchema,
    cardImage: ImageKeySchema,
    keyFacts: z.array(Fact),
    geo: z.object({ lat: z.number(), lng: z.number() }).nullable(),
    seo: z.object({ title: z.string().max(70), description: z.string().max(170) }),
    /** Long-form page content. Optional sections render only when present. */
    page: z.object({
      intro: z.array(z.string()),
      story: Block.optional(),
      location: Block.optional(),
      features: z.object({ heading: z.string(), intro: z.string().optional(), items: z.array(Feature) }).optional(),
      sustainability: z.object({ heading: z.string(), intro: z.string().optional(), items: z.array(Feature) }).optional(),
      audiences: z.array(z.object({ title: z.string(), text: z.string() })).optional(),
      principles: z.array(z.object({ title: z.string(), text: z.string() })).optional(),
      gallery: z.array(ImageKeySchema),
      siteViews: z.array(ImageKeySchema).optional(),
      compare: z.object({ today: ImageKeySchema, planned: ImageKeySchema, caption: z.string() }).optional(),
      masterplan: z.object({ image: ImageKeySchema, caption: z.string(), legend: z.array(z.string()) }).optional(),
      availabilityNote: z.string().optional(),
      conceptLabel: z.string().optional(),
    }),
  })
  .superRefine((p, ctx) => {
    if (p.salesStatus === "now-selling" && !site.licenseToSell[p.slug]) {
      ctx.addIssue({
        code: "custom",
        message: `${p.slug}: "now-selling" needs a DHSUD License to Sell number in site.licenseToSell (BRD §4.6).`,
      });
    }
    if (p.showPrices && p.salesStatus !== "now-selling") {
      ctx.addIssue({ code: "custom", message: `${p.slug}: prices can only show when the project is "now-selling".` });
    }
  });

export type Project = z.infer<typeof ProjectSchema>;

const data: Project[] = [
  {
    slug: "the-coral-anilao",
    name: "The Coral",
    nameWithPlace: "The Coral at Anilao",
    template: "project",
    location: "Mabini, Batangas",
    eyebrow: "Anilao · Mabini · Batangas",
    tagline: "A Diving and Resort Community",
    summary: "A diving and resort community of 68 villas, townhouses, treehouses and residences above Anilao's reefs.",
    salesStatus: "pre-launch",
    showPrices: false,
    accent: "coral",
    heroImage: "coralHero",
    cardImage: "coralHero",
    keyFacts: [
      { value: "2.3", label: "hectares", count: 2.3 },
      { value: "68", label: "homes", count: 68 },
      { value: "60–80 m", label: "above sea level" },
      { value: "2 hrs", label: "from Manila" },
    ],
    // Approximate (Anilao, Mabini). Replace with surveyed coordinates from TCPC.
    geo: { lat: 13.762, lng: 120.925 },
    seo: {
      title: "The Coral at Anilao | Villas & Residences in Mabini, Batangas",
      description:
        "A diving and resort community of 68 villas, townhouses, treehouses and condos above Anilao's reefs. See the residences, design and location.",
    },
    page: {
      intro: [
        "The Coral is a hillside community 60 to 80 metres above the sea, looking out to Sombrero and Tingloy Islands. It is planned for people who come to Anilao for the water and want a home that lets them stay longer.",
        "Sixty-eight homes sit across 2.3 hectares: single detached villas, townhouse villas, treehouse villas and two clusters of condominium residences, with a premium dive center at the heart of the estate.",
      ],
      story: {
        heading: "Architecture that breathes with the landscape and the sea",
        body: [
          "Every home is designed to open up. Walls give way to wide openings, so the line between inside and outside blurs and sea air moves freely through each room.",
          "Passive cooling does much of the work: deep overhangs, louvres and awnings shade the walls, and cross and stack ventilation draw the breeze through. The aim is comfort with far less air-conditioning.",
          "Materials are chosen to belong to the place: mass timber, cross-laminated and glue-laminated timber, green roofs and living walls, with rainwater collected for gardens and cooling ponds.",
        ],
      },
      location: {
        heading: "Above the reefs, two hours from Manila",
        body: [
          "The site sits on a slope above Anilao's coast, about two hours (122 km) from NAIA via the South Luzon Expressway and STAR Tollway, and two minutes (637 m) from the Mabini Circumferential Road.",
          "Surrounding islands shelter the coast during typhoons. From the upper slopes, the view runs west to Sombrero and Tingloy, where the sun sets over the water.",
        ],
      },
      features: {
        heading: "Estate features",
        intro: "Planned shared services that make The Coral easy to live in and easy to leave in good hands.",
        items: [
          { title: "Premium dive center", text: "A dive base within the estate for guided dives across Anilao's dive sites.", icon: "waves" },
          { title: "Full concierge", text: "Help with arrivals, housekeeping, dining and local trips.", icon: "concierge" },
          { title: "Walkable estate", text: "Parking is kept at the edge so the paths between homes stay quiet and pedestrian.", icon: "footprints" },
          { title: "Central waste management", text: "Responsible, centralised handling of solid waste for the whole estate.", icon: "recycle" },
          { title: "Support-staff facility", text: "An integrated back-of-house for the people who look after the estate.", icon: "users" },
          { title: "In-house legal consultancy", text: "Guidance on transactions and ownership structures from our own team.", icon: "scale" },
          { title: "Unit selection options", text: "A curated range of residence types and sizes to choose from.", icon: "layout" },
          { title: "Flexible ownership structures", text: "Ownership arrangements suited to Filipino and foreign buyers.", icon: "key" },
        ],
      },
      sustainability: {
        heading: "Designed to use less",
        items: [
          { title: "Natural ventilation", text: "Cross and stack ventilation with operable windows.", icon: "wind" },
          { title: "Natural materials", text: "Mass timber, CLT and GLT with termite protection and fire retardants.", icon: "trees" },
          { title: "Passive cooling", text: "Overhangs, louvres, awnings and pools that shade and cool.", icon: "sun" },
          { title: "Tropical landscaping", text: "Bioswales and a community garden planted with native species.", icon: "leaf" },
          { title: "Water features", text: "Rainwater harvesting and cooling ponds.", icon: "droplet" },
          { title: "Green roofs and walls", text: "Planted roofs, green façades and living walls.", icon: "sprout" },
          { title: "Sustainable design practice", text: "Climate-responsive planning from the masterplan down.", icon: "compass" },
          { title: "Flexible, open spaces", text: "Open layouts and modular furniture that adapt over time.", icon: "layout" },
        ],
      },
      gallery: ["coralAerial", "coralVillaSunset", "coralInteriorLiving", "coralInteriorDining", "coralInteriorLounge", "coralInteriorBedroom"],
      siteViews: ["siteSlope", "siteMeadow", "siteSunsetSombrero", "siteCoastView", "siteSunsetTingloy"],
      compare: {
        today: "siteSlope",
        planned: "coralVillaSunset",
        caption: "Today: the actual hillside at The Coral. Planned: a coastal villa, artist's perspective. Placeholder pairing until matching-angle photos and renders are supplied.",
      },
      masterplan: {
        image: "coralMasterplan",
        caption: "Masterplan, Phase 1 (static). 12,483 sqm of residential lots on a 23,021 sqm site.",
        legend: ["Condominium villas", "Single detached villas", "Townhouses", "Treehouses", "Amenities", "Back of house"],
      },
    },
  },
  {
    slug: "ocean-view-anilao",
    name: "Ocean View",
    nameWithPlace: "Ocean View Anilao",
    template: "project",
    location: "Anilao, Mabini, Batangas",
    eyebrow: "Anilao · Mabini · Batangas",
    tagline: "A Life Carved by the Coast",
    summary: "Resort-style condominiums, townhouses and cliff houses on the coast of Anilao.",
    salesStatus: "pre-launch",
    showPrices: false,
    accent: "ov",
    heroImage: "ovHero",
    cardImage: "ovHero",
    keyFacts: [
      { value: "3.41", label: "hectares", count: 3.41 },
      { value: "125", label: "condominiums", count: 125 },
      { value: "12", label: "townhouses", count: 12 },
      { value: "12", label: "cliff houses", count: 12 },
    ],
    // Approximate (Anilao, Mabini). Replace with surveyed coordinates from TCPC.
    geo: { lat: 13.762, lng: 120.925 },
    seo: {
      title: "Ocean View Anilao | Condos & Cliff Houses in Mabini, Batangas",
      description:
        "Resort-style condos, townhouses and cliff houses on the coast of Anilao, Batangas. See the residences, sustainability features and views.",
    },
    page: {
      intro: [
        "Ocean View brings condominium living with resort-like amenities to the Anilao coast. Four clusters of condominiums sit among townhouses and single detached cliff houses on a 3.41-hectare hillside.",
        "It is planned for people who want an easy coastal base: a weekend home for families, a first leisure property for young professionals and investors, and a long-stay home for divers and retirees.",
      ],
      audiences: [
        { title: "Families", text: "A weekend and holiday home two hours from the city." },
        { title: "Young professionals and investors", text: "An entry point to coastal ownership with managed rental options." },
        { title: "Divers and foreign buyers", text: "A base on Anilao's coast, close to its dive sites." },
        { title: "Retirees", text: "Long-stay living with community and services nearby." },
      ],
      principles: [
        { title: "Life in balance", text: "Homes and shared spaces that keep nature close at hand." },
        { title: "Nature-based solutions", text: "Landscape that manages water, shade and biodiversity." },
        { title: "Regenerative community design", text: "Planting, gardens and paths that improve the land over time." },
      ],
      sustainability: {
        heading: "Ten sustainability features",
        intro: "Planned features that shape how Ocean View is built and run.",
        items: [
          { title: "Solar power", text: "On-site solar panels to cut reliance on the grid.", icon: "sun" },
          { title: "Rainwater harvesting", text: "Rainwater collected and reused for irrigation and other non-potable uses.", icon: "droplet" },
          { title: "Permeable pavers", text: "Walkways that let rain soak into the ground.", icon: "footprints" },
          { title: "Remote parking", text: "Parking kept at the edge so the community stays walkable.", icon: "car" },
          { title: "Bamboo grove", text: "Bamboo planting that absorbs carbon and supports the landscape.", icon: "trees" },
          { title: "Community and farm garden", text: "Shared garden areas to grow food together.", icon: "sprout" },
          { title: "Native planting", text: "Native species that protect local ecosystems and need less water.", icon: "leaf" },
          { title: "Sustainable materials", text: "Responsibly and locally sourced materials with lower embodied energy.", icon: "layers" },
          { title: "Passive cooling and daylight", text: "Orientation, ventilation and shading that reduce heat gain and energy use.", icon: "wind" },
          { title: "Integrated waste management", text: "Segregation, recycling and proper disposal for the whole community.", icon: "recycle" },
        ],
      },
      gallery: ["ovResidences", "ovHero"],
      siteViews: ["ovSiteView2", "ovSiteView1", "ovSiteView3"],
      compare: {
        today: "ovSiteView2",
        planned: "ovResidences",
        caption: "Today: the view from the Ocean View site. Planned: hillside residences, artist's perspective. Placeholder pairing until matching-angle photos and renders are supplied.",
      },
      availabilityNote: "Contact our team for current availability.",
    },
  },
  {
    slug: "mabini-golf-country-club",
    name: "Mabini Golf & Country Club",
    nameWithPlace: "Mabini Golf & Country Club",
    template: "coming-soon",
    location: "Batangas",
    eyebrow: "Batangas · Proposed concept",
    tagline: "Build less. Preserve more. Experience more.",
    summary: "A proposed golf, resort and residential estate where the landscape leads.",
    salesStatus: "coming-soon",
    showPrices: false,
    accent: "mgcc",
    heroImage: "mgccGolf",
    cardImage: "mgccGolf",
    keyFacts: [],
    geo: null,
    seo: {
      title: "Mabini Golf & Country Club, Batangas | Coming Soon",
      description: "A proposed golf, resort and residential estate in Batangas by Terra Concetti. See the vision and how to reach our team.",
    },
    page: {
      intro: [
        "Mabini Golf & Country Club is envisioned as a private coastal sanctuary in Batangas. Rather than a dense resort city, it follows the idea of discovering the destination.",
        "The golf landscape becomes the green spine of the estate, with a hotel, residences, a beach club and villas set around it. The aim is one masterplan that works as a resort, a residential community, a golf destination, a beach club and a wellness retreat.",
      ],
      gallery: ["mgccGolf", "mgccBeach", "mgccHospitality", "mgccEntertainment"],
      conceptLabel: "Proposed concept, subject to change",
    },
  },
  {
    slug: "the-urban-coral",
    name: "The Urban Coral",
    nameWithPlace: "The Urban Coral",
    template: "coming-soon",
    location: "Makati, Metro Manila",
    eyebrow: "Makati · Proposed concept",
    tagline: "An urban escape, and a gateway to the coast",
    summary: "A proposed urban escape in Makati that links city life to our coastal destinations.",
    salesStatus: "coming-soon",
    showPrices: false,
    accent: "uc",
    heroImage: "ucCover",
    cardImage: "ucCover",
    keyFacts: [],
    geo: null,
    seo: {
      title: "The Urban Coral, Makati | Coming Soon",
      description: "A proposed urban escape in Makati by Terra Concetti, linking city life to our coastal destinations.",
    },
    page: {
      intro: [
        "The Urban Coral is envisioned as an urban escape for the people who shape the next generation of Makati: a place of exchange where work meets conversation and individuals become a community.",
        "It is also a gateway. From the city, The Urban Coral connects residents and guests to Terra Concetti's coastal destinations two hours away.",
      ],
      location: {
        heading: "In the heart of Makati",
        body: ["Makati CBD is about 1 km away, MRT Buendia about 1.7 km, and NAIA about 26 minutes via the Skyway."],
      },
      gallery: ["ucConcept"],
      conceptLabel: "Proposed concept, subject to change",
    },
  },
];

export const projects: Project[] = data.map((p) => ProjectSchema.parse(p));

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const projectPath = (p: Pick<Project, "slug">) => `/destinations/${p.slug}`;

export function statusLabel(p: Pick<Project, "salesStatus">): "Now selling" | "Coming soon" {
  return p.salesStatus === "now-selling" ? "Now selling" : "Coming soon";
}
