import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { Media } from "@/components/ui/media";
import { TextLink } from "@/components/ui/button-link";
import { ContactBlock } from "@/components/ui/contact";
import { accentVars } from "@/components/ui/accent";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { UnitTable } from "@/components/sections/unit-table";
import { BentoSettle } from "@/components/motion/bento-settle";
import { getProject, projectPath } from "@/content/projects";
import { unitsFor } from "@/content/unit-types";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ slug: "the-coral-anilao" }];
}

export const metadata: Metadata = pageMetadata({
  title: "Villas, Townhouses & Condos at The Coral, Anilao | Terra Concetti",
  description:
    "Single detached villas, townhouse villas, treehouse villas and condominium residences at The Coral at Anilao. Sizes, floor plans and site visits.",
  path: "/destinations/the-coral-anilao/residences",
  absoluteTitle: true,
});

/** P06 The Coral: Residences. */
export default async function ResidencesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || slug !== "the-coral-anilao") notFound();
  const units = unitsFor("the-coral-anilao");
  const villas = units.filter((u) => u.description);
  const path = `${projectPath(p)}/residences`;

  return (
    <div style={accentVars(p.accent)}>
      <Section tone="shell" className="bg-contours pt-10 md:pt-14">
        <Container>
          <Breadcrumbs items={[{ name: "Destinations", path: "/destinations" }, { name: p.nameWithPlace, path: projectPath(p) }, { name: "Residences", path }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <p className="t-eyebrow text-[var(--accent-text)]">{p.eyebrow}</p>
              <h1 className="t-display-xl mt-4">Residences at The Coral</h1>
              <p className="t-lead mt-6 max-w-xl text-forest/85">
                Sixty-eight homes in four forms: hillside villas, generous townhouse villas, treehouse villas among the canopy and two clusters of condominium residences.
              </p>
            </div>
            <Media image="coralVillaSunset" sizes="(min-width: 1024px) 55vw, 100vw" priority className="rounded-[6px]" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Villas" title="Three ways to live on the hillside" />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {villas.map((u) => (
              <li key={u.name} className="rounded-[6px] bg-shell p-6 ring-1 ring-line/70">
                <p className="t-eyebrow !text-[11px] text-[var(--accent-text)]">{u.count} homes</p>
                <h3 className="t-h3 mt-2">{u.name}</h3>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-[15px]">
                  <div><dt className="text-driftwood">Bedrooms</dt><dd className="font-semibold">{u.bedrooms}</dd></div>
                  <div><dt className="text-driftwood">Floor area</dt><dd className="font-semibold">{u.floorArea}</dd></div>
                  <div><dt className="text-driftwood">Price</dt><dd className="font-semibold">On request</dd></div>
                </dl>
                <p className="mt-4 text-[15px] leading-6 text-forest/80">{u.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="shell">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Condominium residences" title="Stepped clusters, every level a mix" />
            <p className="mt-5 text-forest/85">
              Thirty-six condominium residences sit in two clusters. Each level offers a mix of home types, premium residences take the corners, and the stepped, interlocking
              massing gives most homes a terrace and a view.
            </p>
          </div>
          <Media image="coralMassing" sizes="(min-width: 1024px) 50vw, 100vw" className="rounded-[6px] bg-shell" caption="none" />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="All residences" title="Sizes and homes at a glance" lead="Sizes from the current plans; final specifications may change. Prices are available on request." />
          <div className="mt-10">
            <UnitTable units={units} showPrices={p.showPrices} caption="Residence types at The Coral at Anilao" />
          </div>
          <p className="t-caption mt-4">Floor plans are available on request and will be added here when final drawings are released.</p>
        </Container>
      </Section>

      <Section tone="shell">
        <Container>
          <SectionHeading eyebrow="Interiors" title="Timber, light and the sea" />
          <BentoSettle
            className="mt-10 grid-cols-2 md:grid-cols-4"
            cells={(["coralInteriorLiving", "coralInteriorDining", "coralInteriorLounge", "coralInteriorBedroom"] as const).map((k) => ({
              key: k,
              className: "aspect-[4/3]",
              content: <Media image={k} sizes="(min-width: 768px) 25vw, 50vw" className="h-full rounded-[6px]" fill />,
            }))}
          />
          <TextLink href={projectPath(p)} className="mt-10">Back to The Coral at Anilao</TextLink>
        </Container>
      </Section>

      <ContactBlock title="Ask about a residence" intro="For floor plans, prices or a site visit to The Coral, reach our team directly." />
    </div>
  );
}
