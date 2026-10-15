import { z } from "zod";

/**
 * Company identity, contact details and the contact switch (BRD §4.2, §4.7).
 *
 * contactMode
 *  - "info-only" (Phase 1, decisions D2 + D4): phones, email and address appear as plain text.
 *    No buttons, forms, sticky bar, tel:, mailto:, Viber, WhatsApp or Messenger links.
 *    The build-time content guard (scripts/content-guard.mjs) fails if any appear.
 *  - "enabled" (later): reserved for the agreed contact flow. Not implemented yet, so the schema
 *    below rejects it until the flow is defined and built.
 */
const ContactMode = z.enum(["info-only", "enabled"]);

const SiteSchema = z
  .object({
    name: z.string(),
    legalName: z.string(),
    tagline: z.string(),
    contactMode: ContactMode,
    phones: z.array(z.string().regex(/^\+63 \d{3} \d{3} \d{4}$/, "Use international format: +63 917 123 4567")).min(1),
    email: z.email(),
    office: z.object({
      label: z.string(),
      street: z.string(),
      locality: z.string(),
      region: z.string(),
      country: z.literal("PH"),
      geo: z.object({ lat: z.number(), lng: z.number() }),
    }),
    /** Anilao sales gallery: add when TCPC supplies the address (asset A16). */
    salesGallery: z.object({ label: z.string(), address: z.string(), hours: z.string().optional() }).nullable(),
    socials: z.array(z.object({ label: z.string(), url: z.url() })),
    /** Stored for later; never rendered while contactMode is "info-only". */
    chat: z.object({ viber: z.string().nullable(), whatsapp: z.string().nullable(), messenger: z.string().nullable() }),
    /** DHSUD License to Sell numbers by project slug. null = not yet issued / not confirmed (asset A3). */
    licenseToSell: z.record(z.string(), z.string().nullable()),
  })
  .refine((s) => s.contactMode === "info-only", {
    message: 'contactMode "enabled" is not built yet. Define the contact flow (BRD D2) before switching.',
  });

export type Site = z.infer<typeof SiteSchema>;

export const site: Site = SiteSchema.parse({
  name: "Terra Concetti",
  legalName: "Terra Concetti Properties Corp.",
  tagline: "Development with purpose",
  contactMode: "info-only",
  phones: ["+63 917 882 8880", "+63 917 881 8840"],
  email: "info@terraconcetti.com",
  office: {
    label: "Makati office",
    street: "3F Comuna Bldg. A, 238 Pablo Ocampo Sr. Ext.",
    locality: "Makati",
    region: "Metro Manila",
    country: "PH",
    // Approximate (Pablo Ocampo Sr. Ext., Makati). Confirm with TCPC before launch.
    geo: { lat: 14.5649, lng: 121.0063 },
  },
  salesGallery: null,
  socials: [],
  chat: { viber: null, whatsapp: null, messenger: null },
  licenseToSell: { "the-coral-anilao": null, "ocean-view-anilao": null },
});
