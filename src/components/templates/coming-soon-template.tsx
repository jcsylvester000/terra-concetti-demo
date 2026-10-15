import { galleryCellClass } from "@/lib/gallery";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { Media } from "@/components/ui/media";
import { ContactBlock } from "@/components/ui/contact";
import { ProjectStatusChip } from "@/components/ui/project-status";
import { accentVars } from "@/components/ui/accent";
import { TextLink } from "@/components/ui/button-link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHero } from "@/components/sections/page-hero";
import { BentoSettle } from "@/components/motion/bento-settle";
import { projectPath, type Project } from "@/content/projects";

/**
 * Coming-soon template (P08 Mabini Golf & CC, P09 The Urban Coral). Introduces the concept without
 * over-promising: no sizes, zoning, counts or prices (P08-AC1, P09-AC2), "Proposed concept" label
 * in the hero (P08-AC2), no buttons or forms (P08-AC3).
 */
export function ComingSoonTemplate({ project: p }: { project: Project }) {
  const path = projectPath(p);
  return (
    <div style={accentVars(p.accent)}>
      <PageHero
        image={p.heroImage}
        size="medium"
        notToScale={p.slug === "the-urban-coral"}
        eyebrow={<span className="flex flex-wrap items-center gap-3">{p.eyebrow} <ProjectStatusChip project={p} /></span>}
        title={p.nameWithPlace}
        lead={p.tagline}
      >
        <p className="mt-6 inline-flex w-fit rounded-[2px] border border-shell/40 px-3 py-1.5 text-[13px] text-shell/90">{p.page.conceptLabel}</p>
      </PageHero>

      <Section tone="shell" className="pt-8 md:pt-10">
        <Container>
          <Breadcrumbs items={[{ name: "Destinations", path: "/destinations" }, { name: p.nameWithPlace, path }]} />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <SectionHeading eyebrow="The vision" title={p.summary} />
            <div className="space-y-5 text-forest/85 md:t-lead">
              {p.page.intro.map((t) => <p key={t}>{t}</p>)}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Concept imagery" title="The mood we are designing toward" lead="Reference and concept images only. Final design is still in development and may change." />
          <BentoSettle
            className="mt-10 grid-cols-2 md:grid-cols-4"
            cells={p.page.gallery.map((k, i) => ({
              key: k,
              className: galleryCellClass(p.page.gallery.length, i),
              content: <Media image={k} sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"} className="h-full rounded-[6px]" fill />,
            }))}
          />
        </Container>
      </Section>

      {p.page.location ? (
        <Section tone="sage">
          <Container className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <SectionHeading eyebrow="Location" title={p.page.location.heading} />
            <div className="space-y-4 text-forest/85">
              {p.page.location.body.map((t) => <p key={t}>{t}</p>)}
              <TextLink href="/destinations">All destinations</TextLink>
            </div>
          </Container>
        </Section>
      ) : null}

      <ContactBlock title="For early enquiries" intro={`To hear first about ${p.nameWithPlace} as plans develop, reach our team directly.`} />
    </div>
  );
}
