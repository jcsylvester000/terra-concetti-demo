import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { ButtonLink } from "@/components/ui/button-link";
import { Media } from "@/components/ui/media";
import { ContactBlock } from "@/components/ui/contact";
import { SimpleHero } from "@/components/sections/simple-hero";
import { TeamGrid } from "@/components/sections/team-grid";
import { TextReveal } from "@/components/motion/text-reveal";
import { designPartner, team } from "@/content/team";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, orgId } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/env";

export const metadata: Metadata = pageMetadata({
  title: "About Terra Concetti | Award-Winning Sustainable Developer",
  description:
    "Meet the architects, lawyers and conservationists behind Terra Concetti Properties Corp. and our approach to development with purpose.",
  path: "/about",
  absoluteTitle: true,
});

const timeline = [
  { year: "2017", title: "Founders connect", text: "Our founders meet as honorees of the Lamudi Real Estate Power Women." },
  { year: "ULI", title: "Leadership in the industry", text: "They co-chair efforts in the Urban Land Institute Women's Leadership Initiative." },
  { year: "2023", title: "A first pilot", text: "A pilot sustainable community is launched in Bagac, Bataan." },
  { year: "2025", title: "To the coast", text: "Tessa Neri joins, and the pipeline expands into eco-luxury coastal, resort-residential and integrated communities, beginning in Anilao." },
];

const approach = [
  { title: "End-user insight", text: "We are divers, travelers and property investors ourselves, so our developments are shaped by real market insight." },
  { title: "Agile and responsive", text: "A compact structure allows faster decisions and adaptation, without the bureaucracy of larger corporations." },
  { title: "Transparent operations", text: "Backed by decades of multi-million-dollar real-estate experience, we hold every project to high standards of governance and delivery." },
  { title: "Luxury eco developments", text: "Premium, sustainable communities that join design excellence and environmental care." },
  { title: "Focused scale, proven expertise", text: "The planning rigour of major developers, brought to small and mid-scale luxury eco-projects." },
  { title: "Flexible purchase options", text: "Ownership and purchase models tailored to different buyers, combining accessibility with exclusivity." },
];

/** P02 About. */
export default function AboutPage() {
  return (
    <>
      <SimpleHero
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="Our story"
        title="About Terra Concetti"
        lead="Development and conservation can exist together. We are a small, design-led team of architects, lawyers and divers building communities that protect the places they stand in."
        aside={<Media image="monogramPlaster" sizes="(min-width: 1024px) 50vw, 100vw" priority className="rounded-[6px]" caption="none" />}
      />

      <Section tone="shell">
        <Container>
          <TextReveal
            as="p"
            className="t-display max-w-4xl"
            text="For Filipino and international buyers who want a home by the sea that does right by the place, we create eco-luxury communities in the Philippines' most beautiful natural settings."
          />
        </Container>
      </Section>

      {/* Story timeline (I8) */}
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Our story" title="From a shared conviction to the coast" />
          <ol className="tc-timeline relative pl-8">
            <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-line" />
            <span aria-hidden className="tc-timeline-fill absolute top-2 bottom-2 left-[7px] w-0.5 bg-gold" />
            {timeline.map((t) => (
              <li key={t.year} className="relative pb-10 last:pb-0">
                <span aria-hidden className="absolute top-1.5 -left-8 size-4 rounded-full border-2 border-gold bg-linen" />
                <p className="font-display text-[34px] leading-none font-semibold text-moss">{t.year}</p>
                <h3 className="t-h4 mt-2">{t.title}</h3>
                <p className="mt-1 max-w-xl text-forest/80">{t.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="sage">
        <Container>
          <SectionHeading eyebrow="Our approach" title="What sets us apart" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {approach.map((a, i) => (
              <li key={a.title} className="rounded-[6px] bg-shell p-6">
                <span className="font-display text-[28px] leading-none font-semibold text-gold">0{i + 1}</span>
                <h3 className="t-h4 mt-3">{a.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-forest/80">{a.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="leadership">
        <Container>
          <SectionHeading eyebrow="Leadership" title="The people behind the places" lead="Credentials as presented by Terra Concetti." />
          <TeamGrid detailed className="mt-10" />
        </Container>
      </Section>

      <Section tone="shell">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Design partner" title={designPartner.name} lead="Our core design partner shapes the architecture and masterplanning of every destination." />
            <ul className="mt-6 flex flex-wrap gap-2">
              {designPartner.credentials.map((c) => (
                <li key={c} className="rounded-[2px] bg-linen px-3 py-2 text-[15px] ring-1 ring-line">{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Partners" title="Built with people who share the purpose" />
            <p className="mt-5 text-forest/85">
              Billion Bricks partners with us on solar roofs, rainwater harvesting, sustainable materials and climate-responsive design. TRANDUC supplies sustainable
              materials, and we work with international and local furniture partners on interiors.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="text-center">
        <Container>
          <h2 className="t-display mx-auto max-w-2xl">See where we are building first</h2>
          <ButtonLink href="/destinations" className="mt-8">Explore our destinations</ButtonLink>
        </Container>
      </Section>

      <ContactBlock />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: absoluteUrl("/about"),
          mainEntity: {
            "@type": "Organization",
            "@id": orgId(),
            name: site.legalName,
            employee: team.map((p) => ({ "@type": "Person", name: p.name, jobTitle: p.role })),
          },
        }}
      />
    </>
  );
}
