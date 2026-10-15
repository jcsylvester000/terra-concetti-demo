import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { FeatureTile } from "@/components/ui/blocks";
import { ContactBlock } from "@/components/ui/contact";
import { Accordion } from "@/components/ui/accordion";
import { SimpleHero } from "@/components/sections/simple-hero";
import { Media } from "@/components/ui/media";
import { buyerPaths, buyingSteps, faqs, ownerBenefits, showRetirementSection } from "@/content/ownership";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Owning a Home in Anilao | Filipino & Foreign Buyers",
  description: "How Filipino and foreign buyers can own a Terra Concetti home, the owner benefits, and the steps from site visit to turnover.",
  path: "/ownership",
  absoluteTitle: true,
});

/** P11 Ownership. Wording is a draft pending TCPC legal review; no visa/citizenship claims (P11-AC1). */
export default function OwnershipPage() {
  return (
    <>
      <SimpleHero
        crumbs={[{ name: "Ownership", path: "/ownership" }]}
        eyebrow="Ownership"
        title="Owning a home in Anilao"
        lead="Can I own this, and how? Whether you are Filipino, returning home or buying from abroad, there is a clear and lawful way to own a Terra Concetti residence."
        aside={<Media image="coralInteriorLiving" sizes="(min-width: 1024px) 50vw, 100vw" priority className="rounded-[6px]" />}
      />

      <Section tone="shell">
        <Container className="grid gap-6 md:grid-cols-2">
          {buyerPaths.map((b) => (
            <article key={b.id} id={b.id} className="scroll-mt-24 rounded-[6px] bg-linen p-7 md:p-9">
              <p className="t-eyebrow text-bronze-ink">Ownership path</p>
              <h2 className="t-display mt-3">{b.title}</h2>
              <p className="t-lead mt-4 text-forest/85">{b.lead}</p>
              <ul className="mt-6 space-y-3">
                {b.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-forest/85"><span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" />{pt}</li>
                ))}
              </ul>
            </article>
          ))}
        </Container>
      </Section>

      {showRetirementSection ? (
        <Section id="retirement">
          <Container>
            <SectionHeading eyebrow="Retirement and long stays" title="Living here for longer" />
          </Container>
        </Section>
      ) : null}

      <Section id="owner-benefits" className="scroll-mt-20">
        <Container>
          <SectionHeading eyebrow="Owner benefits" title="Owning here, looked after" lead="Services designed so your home is cared for whether you are here every weekend or a few times a year." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ownerBenefits.map((b) => <FeatureTile key={b.title} icon={b.icon} title={b.title} text={b.text} />)}
          </div>
          <p className="mt-6 rounded-[6px] bg-shell p-4 text-[15px] text-forest/85 ring-1 ring-line">
            Owner benefits are subject to the final rental and management agreements. No income or return is guaranteed.
          </p>
        </Container>
      </Section>

      <Section tone="sage">
        <Container>
          <SectionHeading eyebrow="How it works" title="From first call to turnover, in five steps" />
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {buyingSteps.map((s, i) => (
              <li key={s.title} className="relative rounded-[6px] bg-shell p-6">
                <span className="font-display text-[40px] leading-none font-semibold text-bronze-ink">{i + 1}</span>
                <h3 className="t-h4 mt-3">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-forest/80">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="Questions and answers" title="What buyers ask us" lead="General information only, not legal advice. Our team and your own adviser can help with your situation." />
          <Accordion items={faqs} />
        </Container>
      </Section>

      <ContactBlock title="Questions about ownership?" intro="Our team can explain the ownership options for your situation. Reach us directly." />
    </>
  );
}
