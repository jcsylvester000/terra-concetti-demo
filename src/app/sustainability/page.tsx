import type { Metadata } from "next";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui/layout";
import { ButtonLink } from "@/components/ui/button-link";
import { Media } from "@/components/ui/media";
import { StatBlock } from "@/components/ui/blocks";
import { ContactBlock } from "@/components/ui/contact";
import { SimpleHero } from "@/components/sections/simple-hero";
import { NumberTicker } from "@/components/motion/number-ticker";
import { areas, bambooSteps, communityActivities, communityThemes } from "@/content/sustainability";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sustainable Development in the Philippines | Terra Concetti",
  description:
    "Solar power, rainwater harvesting, native landscapes and marine conservation: how Terra Concetti builds communities that protect the places they stand in.",
  path: "/sustainability",
  absoluteTitle: true,
});

/** P03 Sustainability. */
export default function SustainabilityPage() {
  return (
    <>
      <SimpleHero
        crumbs={[{ name: "Sustainability", path: "/sustainability" }]}
        eyebrow="Sustainability · Conservation · Community"
        title="Development with purpose"
        lead="Sustainability is not a feature we add at the end. It shapes where we build, how homes are designed, what they are made of and how the land and reef around them are looked after."
        aside={<Media image="coralSustainableDesign" sizes="(min-width: 1024px) 50vw, 100vw" priority className="rounded-[6px]" />}
      />

      <nav aria-label="On this page" className="border-y border-line bg-shell">
        <Container>
          <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 py-2">
            {areas.map((a) => (
              <li key={a.id} className="shrink-0">
                <a href={`#${a.id}`} className="inline-flex min-h-11 items-center px-3 text-[15px] font-medium text-forest/80 hover:text-forest">{a.title}</a>
              </li>
            ))}
            <li className="shrink-0"><a href="#bamboo" className="inline-flex min-h-11 items-center px-3 text-[15px] font-medium text-forest/80 hover:text-forest">Bamboo benchmark</a></li>
            <li className="shrink-0"><a href="#community" className="inline-flex min-h-11 items-center px-3 text-[15px] font-medium text-forest/80 hover:text-forest">Community</a></li>
          </ul>
        </Container>
      </nav>

      {areas.map((a, i) => (
        <Section key={a.id} id={a.id} tone={i % 2 ? "shell" : "linen"} className="scroll-mt-20">
          <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className={i % 2 ? "lg:order-2" : undefined}>
              <Eyebrow>0{i + 1}</Eyebrow>
              <h2 className="t-display mt-3">{a.title}</h2>
              <p className="t-lead mt-5 text-forest/85">{a.lead}</p>
              <div className="mt-5 space-y-4 text-forest/80">
                {a.body.map((t) => <p key={t}>{t}</p>)}
              </div>
            </div>
            <Media image={a.image} sizes="(min-width: 1024px) 50vw, 100vw" className="rounded-[6px] bg-shell ring-1 ring-line/60" caption="below" />
          </Container>
        </Section>
      ))}

      <Section id="bamboo" tone="sage" className="scroll-mt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <SectionHeading eyebrow="Carbon" title="Our 1:10 bamboo benchmark" lead="For every hectare we develop, we plan for up to ten hectares of managed bamboo to absorb carbon. It is a preliminary planning benchmark, refined project by project." />
              <StatBlock className="mt-8" eyebrow="Preliminary planning benchmark" statement={<>1 hectare built · up to <NumberTicker value={10} /> hectares of bamboo</>} note="Bamboo grows fast, stores carbon and can be harvested sustainably." />
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {bambooSteps.map((s, i) => (
                <li key={s.title} className="rounded-[6px] bg-shell p-6">
                  <span className="t-eyebrow text-bronze-ink">Step {i + 1}</span>
                  <h3 className="t-h4 mt-2">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-forest/80">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section id="community" className="scroll-mt-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Community and conservation" title="Conservation work with our partners" lead="Conservation happens in the water and along the shore, with local partners and volunteers." />
            <ul className="mt-6 space-y-2">
              {communityActivities.map((c) => (
                <li key={c} className="flex gap-3"><span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" />{c}</li>
              ))}
            </ul>
          </div>
          <Media image="communityActivities" sizes="(min-width: 1024px) 55vw, 100vw" className="rounded-[6px] bg-shell" caption="none" />
        </Container>
      </Section>

      <Section tone="shell">
        <Container>
          <SectionHeading eyebrow="Creating community" title="Culture and sustainability, together" lead="Our communities are planned around the things that connect people to a place." />
          <ul className="mt-8 flex flex-wrap gap-2">
            {communityThemes.map((t) => (
              <li key={t} className="rounded-[2px] bg-sage px-4 py-2 font-medium">{t}</li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="text-center">
        <Container>
          <h2 className="t-display mx-auto max-w-2xl">See how it shapes The Coral</h2>
          <ButtonLink href="/destinations/the-coral-anilao" className="mt-8">See how it shapes The Coral</ButtonLink>
        </Container>
      </Section>

      <ContactBlock />
    </>
  );
}
