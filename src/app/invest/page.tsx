import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { TextLink } from "@/components/ui/button-link";
import { ContactBlock } from "@/components/ui/contact";
import { SimpleHero } from "@/components/sections/simple-hero";
import { Media } from "@/components/ui/media";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Invest with Terra Concetti | Investor Relations",
  description: "Partner with Terra Concetti, a design-led developer of sustainable coastal communities in the Philippines. Find out how to request our investor pack.",
  path: "/invest",
  absoluteTitle: true,
});

const why = [
  { title: "A credentialed team", text: "Founders with decades in corporate real estate, architecture, finance and high-net-worth sales, and an award-winning design partner." },
  { title: "A clear pipeline", text: "Two communities in Anilao, a golf and resort estate in Batangas and a city gateway in Makati, with more destinations under study." },
  { title: "A sustainability platform", text: "Conservation, passive design, solar and water strategies built into every project from the masterplan up." },
];

const value = [
  { title: "Acquisition", text: "Strategic acquisition of prime sites through local insight and due diligence: legal and financial checks, highest and best use, titling and permits." },
  { title: "Development", text: "Masterplanning, architecture, engineering and project management, with branding, marketing and sales." },
  { title: "Operations", text: "Property, asset and hospitality management that keeps communities well run and valuable over time." },
  { title: "Divestment", text: "Planned exits and turnover strategies through investor management and brokerage." },
];

const vision = [
  { year: "Year 1", text: "Establish Terra Concetti as a leading developer of niche tourism communities in the Philippines." },
  { year: "Year 2", text: "Complete at least two flagship developments as the prototype for sustainable, high-value tourism communities." },
  { year: "Years 4–6", text: "Deliver the initial projects, begin expansion areas and secure new sites across the country." },
  { year: "Year 8", text: "Deliver at least four more projects nationwide, growing the asset base." },
  { year: "Year 10", text: "Broaden access to capital as a recognised player in sustainable tourism development." },
];

/** P12 Invest. No figures of any kind (P12-AC1); investor enquiries by email as text (P12-AC2). */
export default function InvestPage() {
  return (
    <>
      <SimpleHero
        crumbs={[{ name: "Invest", path: "/invest" }]}
        eyebrow="Investor relations"
        title="Invest with Terra Concetti"
        lead="We are building a portfolio of sustainable coastal communities, beginning in Anilao, Batangas. We welcome conversations with investors and strategic partners who share the purpose."
        aside={<Media image="ovResidences" sizes="(min-width: 1024px) 50vw, 100vw" priority className="rounded-[6px]" />}
      />

      <Section tone="shell">
        <Container>
          <SectionHeading eyebrow="Why Terra Concetti" title="Team, pipeline and purpose" />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {why.map((w) => (
              <li key={w.title} className="rounded-[6px] bg-linen p-6">
                <h3 className="t-h3">{w.title}</h3>
                <p className="mt-3 text-forest/80">{w.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-6">
            <TextLink href="/about#leadership">Meet the leadership</TextLink>
            <TextLink href="/destinations">See the destinations</TextLink>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="How we create value" title="A full-cycle model" lead="We work across the whole life of a destination, from the first site visit to long-term operations." />
          <ol className="mt-10 grid gap-4 md:grid-cols-4">
            {value.map((v, i) => (
              <li key={v.title} className="relative rounded-[6px] bg-moss p-6 text-shell">
                <span className="t-eyebrow text-gold">0{i + 1}</span>
                <h3 className="mt-3 font-display text-[28px] leading-8 font-semibold">{v.title}</h3>
                <p className="mt-3 text-[15px] leading-6 text-shell/85">{v.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="sage">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Ten-year vision" title="Expanding our foothold" lead="Plans, subject to change." />
          <ol className="space-y-4">
            {vision.map((v) => (
              <li key={v.year} className="grid grid-cols-[110px_1fr] gap-4 rounded-[6px] bg-shell p-5">
                <span className="font-display text-[24px] leading-7 font-semibold text-moss">{v.year}</span>
                <span className="text-forest/85">{v.text}</span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="shell">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <SectionHeading eyebrow="Investor pack" title="Requesting the investor pack" />
          <div className="space-y-4 text-forest/85">
            <p>
              Detailed information is shared privately with qualified investors after a non-disclosure agreement. To request the investor pack, email us at{" "}
              <strong className="font-semibold text-forest select-all">{site.email}</strong> with your name, organisation and the kind of partnership you are interested in.
            </p>
            <p className="t-caption">Nothing on this page is an offer of securities or an invitation to invest.</p>
          </div>
        </Container>
      </Section>

      <ContactBlock title="Investor enquiries" intro="For the investor pack or a conversation with our leadership team, reach us directly." />
    </>
  );
}
