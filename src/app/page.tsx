import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui/layout";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Media } from "@/components/ui/media";
import { FeatureTile, StatBlock } from "@/components/ui/blocks";
import { ContactBlock } from "@/components/ui/contact";
import { PageHero } from "@/components/sections/page-hero";
import { DestinationPanels } from "@/components/sections/destination-panels";
import { TeamGrid } from "@/components/sections/team-grid";
import { NumberTicker } from "@/components/motion/number-ticker";
import { TextReveal } from "@/components/motion/text-reveal";
import { LatestJournal } from "@/components/sections/latest-journal";
import { projects } from "@/content/projects";
import { designPartner } from "@/content/team";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, organizationLd, websiteLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Terra Concetti | Sustainable Homes in Anilao, Batangas",
  description: "Eco-luxury villas and residences above Anilao's reefs, two hours from Manila. Explore The Coral and Ocean View.",
  path: "/",
  absoluteTitle: true,
});

const pillars = [
  { icon: "droplet", title: "Water", text: "Rainwater harvesting, cooling ponds and permeable landscapes." },
  { icon: "sun", title: "Energy", text: "Solar roofs and passive cooling that let sea air do the work." },
  { icon: "leaf", title: "Land", text: "Native planting, bioswales, community gardens and bamboo groves." },
  { icon: "layers", title: "Materials", text: "Mass timber and low-impact materials from trusted partners." },
];

const ownership = [
  { title: "Filipino buyers", text: "Own a house and lot or a condominium residence outright.", href: "/ownership#filipino-buyers" },
  { title: "Foreign buyers", text: "Own a condominium within the foreign-ownership limit, or a house through a long-term lease.", href: "/ownership#foreign-buyers" },
  { title: "Owner benefits", text: "Property management, concierge, an optional rental pool and owner nights.", href: "/ownership#owner-benefits" },
];

/** P01 Home (BRD §7). */
export default function HomePage() {
  return (
    <>
      {/* 1 · Hero (I1 sea-view reveal) */}
      <PageHero
        image="homeHero"
        eyebrow="Anilao · Mabini · Batangas"
        title={<>Live above Anilao&apos;s reefs.</>}
        lead="Sustainable villas and residences in Anilao, Batangas, the birthplace of Philippine diving. Two hours from Manila."
        actions={<ButtonLink href="/destinations" variant="onDark">Explore destinations</ButtonLink>}
      />

      {/* 2 · Proof strip */}
      <section aria-label="Why Terra Concetti" className="border-b border-line bg-shell">
        <Container>
          <ul tabIndex={0} aria-label="Key facts" className="-mx-4 flex snap-x scroll-px-4 gap-px overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
            <li className="min-w-[70%] snap-start py-6 pr-6 sm:min-w-[40%] md:min-w-0">
              <p className="font-display text-[26px] leading-8 font-semibold">Birthplace</p>
              <p className="text-[14px] text-driftwood">of Philippine scuba diving</p>
            </li>
            <li className="min-w-[70%] snap-start py-6 pr-6 sm:min-w-[40%] md:min-w-0 md:border-l md:border-line md:pl-6">
              <p className="font-display text-[26px] leading-8 font-semibold"><NumberTicker value={26} /> dive sites</p>
              <p className="text-[14px] text-driftwood">across Mabini and Tingloy</p>
            </li>
            <li className="min-w-[70%] snap-start py-6 pr-6 sm:min-w-[40%] md:min-w-0 md:border-l md:border-line md:pl-6">
              <p className="font-display text-[26px] leading-8 font-semibold"><NumberTicker value={2} /> hours</p>
              <p className="text-[14px] text-driftwood">from Manila via SLEX–STAR</p>
            </li>
            <li className="min-w-[70%] snap-start py-6 pr-6 sm:min-w-[40%] md:min-w-0 md:border-l md:border-line md:pl-6">
              <p className="font-display text-[26px] leading-8 font-semibold">Award-winning</p>
              <p className="text-[14px] text-driftwood">architects, lawyers and divers</p>
            </li>
          </ul>
        </Container>
      </section>

      {/* 3 · Destinations (I7 expanding panels) */}
      <Section>
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Our destinations"
              title="Four places, one way of building"
              lead="Two communities above Anilao's coast, and two concepts taking shape in Batangas and Makati."
            />
            <TextLink href="/destinations" className="shrink-0">All destinations</TextLink>
          </div>
          <div className="mt-10 md:mt-14">
            <DestinationPanels projects={projects} />
          </div>
        </Container>
      </Section>

      {/* 4 · Why Anilao */}
      <Section tone="shell" className="bg-contours">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Media image="anilaoDiveMap" sizes="(min-width: 1024px) 55vw, 100vw" className="rounded-[6px] ring-1 ring-line" caption="none" />
          <div>
            <SectionHeading
              eyebrow="Why Anilao"
              title="Luzon's most accessible dive coast"
              lead="Anilao is where Philippine scuba diving began. Its reefs draw divers and underwater photographers from around the world, and you can reach them by car."
            />
            <ul className="mt-8 space-y-4">
              <li className="flex gap-4"><span className="t-eyebrow w-24 shrink-0 pt-1 text-bronze-ink">Access</span><span>About two hours (122 km) from NAIA via SLEX and the STAR Tollway. No flights or boats needed.</span></li>
              <li className="flex gap-4"><span className="t-eyebrow w-24 shrink-0 pt-1 text-bronze-ink">Season</span><span>Peak visibility from November to May, with water at about 26–30 °C.</span></li>
              <li className="flex gap-4"><span className="t-eyebrow w-24 shrink-0 pt-1 text-bronze-ink">Views</span><span>Elevated sites facing Sombrero and Tingloy Islands, with the sun setting over the water.</span></li>
            </ul>
            <TextLink href="/anilao" className="mt-8">Discover Anilao</TextLink>
          </div>
        </Container>
      </Section>

      {/* 5 · Development with purpose (I6 statement reveal + pillars + bamboo stat) */}
      <Section tone="sage">
        <Container>
          <Eyebrow>Development with purpose</Eyebrow>
          <TextReveal
            as="h2"
            className="t-display mt-4 max-w-4xl"
            text="We build where people, nature and progress can coexist, and we treat conservation as part of the home you buy."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {pillars.map((p) => (
                <FeatureTile key={p.title} icon={p.icon} title={p.title} text={p.text} className="bg-shell" />
              ))}
            </div>
            <StatBlock
              eyebrow="Our bamboo benchmark"
              statement={<>1 hectare built · up to <NumberTicker value={10} /> hectares of bamboo</>}
              note="A preliminary planning benchmark for carbon sequestration across our developments."
            />
          </div>
          <TextLink href="/sustainability" className="mt-10">How we build</TextLink>
        </Container>
      </Section>

      {/* 6 · Ownership paths */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Ownership" title="Clear paths to owning by the sea" lead="Whether you are Filipino, a foreign buyer or returning home, there is a way to own a Terra Concetti residence." />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {ownership.map((o) => (
              <li key={o.title}>
                <Link href={o.href} className="group flex h-full flex-col rounded-[6px] bg-shell p-6 ring-1 ring-line/70 transition-colors hover:ring-gold">
                  <h3 className="t-h3">{o.title}</h3>
                  <p className="mt-3 text-forest/80">{o.text}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 font-medium text-moss">
                    Learn more <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 7 · The people */}
      <Section tone="shell">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="The people" title="Architects, lawyers and divers" lead="A small, design-led team with decades of real-estate, hospitality and conservation work behind it." />
            <TextLink href="/about" className="shrink-0">About us</TextLink>
          </div>
          <TeamGrid className="mt-10" />
          <p className="mt-8 text-forest/85">
            Designed with <strong className="font-semibold">{designPartner.name}</strong>, {designPartner.credentials.join(" and ")}.
          </p>
        </Container>
      </Section>

      {/* 8 · Journal (appears automatically once three articles exist) */}
      <LatestJournal />

      {/* 9 · Contact block (form and chat held, decisions D2 + D4) */}
      <ContactBlock />

      <JsonLd data={[organizationLd(), websiteLd()]} />
    </>
  );
}
