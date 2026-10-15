import { z } from "zod";

/**
 * Residence types per project (BRD §4.2, P06, P07). Counts and sizes from the investor deck
 * (The Coral S. 60–61, Ocean View S. 99). The Coral condo cluster split is NOT published
 * (open data item 6); only the total of 36 is shown.
 * pricePhp stays null until TCPC approves a price list AND the project is "now-selling" (D3).
 * Whole pesos only.
 */
const UnitTypeSchema = z.object({
  project: z.enum(["the-coral-anilao", "ocean-view-anilao"]),
  group: z.string(),
  name: z.string(),
  bedrooms: z.string(),
  floorArea: z.string(),
  extra: z.string().optional(),
  count: z.number().int().positive(),
  pricePhp: z.number().int().positive().nullable(),
  description: z.string().optional(),
});

export type UnitType = z.infer<typeof UnitTypeSchema>;

const data: UnitType[] = [
  // The Coral at Anilao
  { project: "the-coral-anilao", group: "Villas", name: "Single Detached Villas", bedrooms: "1–3", floorArea: "108–208 sqm", extra: "Lots 1–7, 11–26", count: 23, pricePhp: null,
    description: "Private hillside villas, each on its own lot, with open living spaces and terraces facing the sea." },
  { project: "the-coral-anilao", group: "Villas", name: "Townhouse Villas", bedrooms: "2–3", floorArea: "268–348 sqm", count: 3, pricePhp: null,
    description: "Generous attached villas for larger families, with room to host." },
  { project: "the-coral-anilao", group: "Villas", name: "Treehouse Villas", bedrooms: "1–3", floorArea: "118–178 sqm", count: 6, pricePhp: null,
    description: "Raised among the trees, with the canopy at eye level and the sea beyond." },
  { project: "the-coral-anilao", group: "Condominium residences", name: "Studio", bedrooms: "Studio", floorArea: "48 sqm", count: 7, pricePhp: null },
  { project: "the-coral-anilao", group: "Condominium residences", name: "1 Bedroom", bedrooms: "1", floorArea: "68 sqm", count: 12, pricePhp: null },
  { project: "the-coral-anilao", group: "Condominium residences", name: "1 Bedroom Premium", bedrooms: "1", floorArea: "88 sqm", count: 10, pricePhp: null },
  { project: "the-coral-anilao", group: "Condominium residences", name: "2 Bedroom", bedrooms: "2", floorArea: "108 sqm", count: 7, pricePhp: null },
  // Ocean View Anilao
  { project: "ocean-view-anilao", group: "Condominiums", name: "Studio", bedrooms: "Studio", floorArea: "38 sqm", extra: "+ 3.6 sqm balcony", count: 66, pricePhp: null },
  { project: "ocean-view-anilao", group: "Condominiums", name: "1 Bedroom", bedrooms: "1", floorArea: "58 sqm", extra: "+ 3.6 sqm balcony", count: 28, pricePhp: null },
  { project: "ocean-view-anilao", group: "Condominiums", name: "1 Bedroom Premium", bedrooms: "1", floorArea: "68 sqm", extra: "+ 3.6 sqm balcony", count: 18, pricePhp: null },
  { project: "ocean-view-anilao", group: "Condominiums", name: "2 Bedroom", bedrooms: "2", floorArea: "88 sqm", extra: "+ 7.2 sqm balcony", count: 13, pricePhp: null },
  { project: "ocean-view-anilao", group: "Houses", name: "Townhouses", bedrooms: "2–3", floorArea: "88 / 108 sqm", count: 12, pricePhp: null },
  { project: "ocean-view-anilao", group: "Houses", name: "Single Detached Cliff Houses", bedrooms: "—", floorArea: "On lots of about 260–320 sqm", count: 12, pricePhp: null },
];

export const unitTypes: UnitType[] = data.map((u) => UnitTypeSchema.parse(u));

export const unitsFor = (project: UnitType["project"]) => unitTypes.filter((u) => u.project === project);

// Integrity checks against the deck totals (fail the build if someone edits counts inconsistently).
const total = (p: UnitType["project"], group?: string) =>
  unitsFor(p).filter((u) => !group || u.group === group).reduce((n, u) => n + u.count, 0);
if (total("the-coral-anilao") !== 68) throw new Error("The Coral must total 68 homes (S. 60–61).");
if (total("the-coral-anilao", "Condominium residences") !== 36) throw new Error("The Coral condos must total 36.");
if (total("ocean-view-anilao", "Condominiums") !== 125) throw new Error("Ocean View condos must total 125 (S. 99).");

export function priceLabel(u: UnitType, showPrices: boolean) {
  if (!showPrices || u.pricePhp == null) return "On request";
  return `Starts at ₱${u.pricePhp.toLocaleString("en-PH")}`;
}
