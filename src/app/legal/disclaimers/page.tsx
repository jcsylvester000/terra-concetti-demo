import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimers",
  description: "Important notes about renders, plans, availability, licences to sell and owner benefits on the Terra Concetti website.",
  path: "/legal/disclaimers",
});

/** P19 Disclaimers. Draft pending counsel review. */
export default function DisclaimersPage() {
  return (
    <LegalPage title="Disclaimers" path="/legal/disclaimers">
      <h2>Renders and images</h2>
      <p>
        Renders and illustrations are artist&apos;s perspectives. Final design, materials, specifications, landscaping and furnishings may change. Concept imagery for
        projects in planning shows the intended mood only.
      </p>
      <h2>Plans, sizes and facts</h2>
      <p>
        Masterplans, unit types, sizes, counts and features describe current plans and may change as designs are finalised and approvals are obtained. Distances and
        travel times are approximate.
      </p>
      <h2>No offer to sell</h2>
      <p>
        Nothing on this website is an offer to sell or a solicitation to buy. Reservations and sales for a project open only after its License to Sell is issued by the
        Department of Human Settlements and Urban Development (DHSUD). Registration and License to Sell details are published on the site once issued.
      </p>
      <h2>Availability and prices</h2>
      <p>Availability and prices are not shown until they are confirmed and may change without notice.</p>
      <h2>Owner benefits</h2>
      <p>
        Owner benefits, rental pool arrangements and services are subject to the final rental and management agreements. No income, return or appreciation is guaranteed.
      </p>
      <h2>Projects in planning</h2>
      <p>
        Mabini Golf &amp; Country Club, The Urban Coral and any future destinations are proposed concepts. They may change substantially or may not proceed.
      </p>
      <h2>Ownership information</h2>
      <p>
        Information about ownership structures is general and is not legal advice. Please consult your own legal adviser about your circumstances.
      </p>
    </LegalPage>
  );
}
