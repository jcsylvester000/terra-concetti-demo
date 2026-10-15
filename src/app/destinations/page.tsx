import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { Media } from "@/components/ui/media";
import { ContactBlock } from "@/components/ui/contact";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProjectCard } from "@/components/sections/project-card";
import { projects, projectPath } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/env";

export const metadata: Metadata = pageMetadata({
  title: "Coastal Communities in Batangas | Terra Concetti",
  description:
    "The Coral and Ocean View in Anilao, with Mabini Golf & Country Club and The Urban Coral coming soon. Find your Terra Concetti destination.",
  path: "/destinations",
  absoluteTitle: true,
});

const prospective = ["El Nido", "Siargao", "Siquijor", "Dumaguete", "Bohol", "Camotes", "Masbate", "General Santos", "Cebu", "Davao"];

/** P04 Destinations hub. */
export default function DestinationsPage() {
  return (
    <>
      <Section className="bg-contours pt-10 md:pt-14">
        <Container>
          <Breadcrumbs items={[{ name: "Destinations", path: "/destinations" }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <div>
              <p className="t-eyebrow text-bronze-ink">Batangas · Makati</p>
              <h1 className="t-display-xl mt-4">Our destinations</h1>
              <p className="t-lead mt-6 max-w-xl text-forest/85">
                Batangas is Terra Concetti&apos;s first home. Two communities sit above Anilao&apos;s coast, two hours from Manila, with a golf estate and a city gateway in
                planning.
              </p>
            </div>
            <figure>
              <Media image="philippinesGateway" sizes="(min-width: 1024px) 50vw, 100vw" className="rounded-[6px] ring-1 ring-line" caption="none" />
              <figcaption className="t-caption mt-3">
                Batangas is our current destination. Other locations shown are prospective and under study: {prospective.join(", ")}.
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      <Section tone="shell">
        <Container>
          <SectionHeading eyebrow="Current and coming soon" title="Choose your destination" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p) => (
              <li key={p.slug} className="flex">
                <ProjectCard project={p} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading
            eyebrow="Looking ahead"
            title="Future destinations"
            lead="Our ten-year vision looks beyond Batangas to other natural settings across the Philippines. These are prospective locations under study, not active projects."
          />
          <ul className="flex flex-wrap content-start gap-2 self-end">
            {prospective.map((p) => (
              <li key={p} className="rounded-[2px] bg-shell px-3 py-2 text-[15px] ring-1 ring-line">
                {p} <span className="text-driftwood">· prospective</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ContactBlock />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Terra Concetti destinations",
          itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.nameWithPlace, url: absoluteUrl(projectPath(p)) })),
        }}
      />
    </>
  );
}
