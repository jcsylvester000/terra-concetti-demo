import type { Metadata } from "next";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui/layout";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { StatusChip } from "@/components/ui/status-chip";
import { FeatureTile, StatBlock } from "@/components/ui/blocks";
import { Media } from "@/components/ui/media";
import { ContactDetails } from "@/components/ui/contact";
import { Monogram } from "@/components/ui/monogram";

export const metadata: Metadata = { title: "Style guide", robots: { index: false, follow: false } };

const swatches: [string, string, string][] = [
  ["Terra Moss", "#404939", "bg-moss text-white"],
  ["Forest Floor", "#1F2418", "bg-forest text-white"],
  ["Linen", "#F0E9DD", "bg-linen"],
  ["Shell", "#FAF7F2", "bg-shell"],
  ["Sand Gold", "#D3BF84", "bg-gold"],
  ["Bronze Bark", "#88633E", "bg-bronze text-white"],
  ["Sage Mist", "#E2E7D7", "bg-sage"],
  ["Driftwood", "#6B6056", "bg-driftwood text-white"],
  ["Coral · Reef Teal", "#429AAF", "bg-coral-teal"],
  ["Coral · Teal Text", "#2C6E7E", "bg-coral-teal-text text-white"],
  ["Coral · Bloom", "#DF644E", "bg-coral-bloom"],
  ["Ocean View · Navy", "#1F3A56", "bg-ov-navy text-white"],
  ["Ocean View · Mist", "#D1E2F4", "bg-ov-mist"],
  ["Mabini Golf · Fairway", "#335B55", "bg-mgcc-fairway text-white"],
  ["Urban Coral · Lichen", "#6E7C53", "bg-uc-lichen text-white"],
  ["Urban Coral · Concrete", "#B6B5AD", "bg-uc-concrete"],
];

/** Hidden design-system review page (BRD M1). Not in the sitemap; noindex. */
export default function StyleguidePage() {
  return (
    <>
      <Section>
        <Container>
          <Eyebrow>Terra Concetti · Design system</Eyebrow>
          <h1 className="t-display-xl mt-3">Style guide</h1>
          <p className="t-lead mt-4 max-w-2xl text-forest/85">Tokens and components from the BRD brand kit (§6). For internal review; not indexed.</p>
        </Container>
      </Section>

      <Section tone="shell">
        <Container>
          <SectionHeading eyebrow="Colour" title="Palette" />
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {swatches.map(([name, hex, cls]) => (
              <li key={hex} className="overflow-hidden rounded-[6px] border border-line">
                <div className={`h-24 p-3 ${cls}`} />
                <div className="bg-shell p-3">
                  <p className="font-semibold">{name}</p>
                  <p className="t-caption">{hex}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-6">
          <SectionHeading eyebrow="Typography" title="Type scale" />
          <p className="t-display-xl">Live above Anilao&apos;s reefs</p>
          <p className="t-display">Development with purpose</p>
          <p className="t-h3">Single Detached Villas</p>
          <p className="t-h4">Premium dive center</p>
          <p className="t-lead max-w-2xl">Sustainable villas and residences two hours from Manila.</p>
          <p className="max-w-2xl">Passive cooling draws sea air through every room, so homes stay comfortable without heavy air-conditioning.</p>
          <p className="t-eyebrow text-bronze">Anilao · Mabini · Batangas</p>
          <p className="t-caption">Artist&apos;s perspective. Final design may change.</p>
        </Container>
      </Section>

      <Section tone="shell">
        <Container className="space-y-8">
          <SectionHeading eyebrow="Components" title="Buttons and chips" lead="Navigation buttons only. Contact buttons are held (decision D2)." />
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href="/destinations">Explore destinations</ButtonLink>
            <ButtonLink href="/destinations/the-coral-anilao" variant="secondary">Explore The Coral</ButtonLink>
            <TextLink href="/anilao">Why Anilao</TextLink>
          </div>
          <div className="flex flex-wrap items-center gap-4 rounded-[6px] bg-moss p-6">
            <ButtonLink href="/destinations" variant="onDark">Explore destinations</ButtonLink>
            <ButtonLink href="/about" variant="outlineLight">About us</ButtonLink>
            <TextLink href="/journal" onDark>Journal</TextLink>
          </div>
          <div className="flex flex-wrap gap-3">
            <StatusChip status="Now selling" />
            <StatusChip status="Reserved" />
            <StatusChip status="Sold" />
            <StatusChip status="Coming soon" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-6 md:grid-cols-2">
          <StatBlock eyebrow="Development with purpose" statement="1 hectare built · up to 10 hectares of bamboo" note="Our preliminary planning benchmark for carbon sequestration." />
          <div className="grid gap-4">
            <FeatureTile icon="sun" title="Solar power" text="On-site panels to cut reliance on the grid." />
            <FeatureTile icon="droplet" title="Rainwater harvesting" text="Collected and reused for gardens and cooling ponds." />
            <FeatureTile icon="wind" title="Passive cooling" text="Sea air drawn through every room." />
          </div>
        </Container>
      </Section>

      <Section tone="shell">
        <Container className="grid gap-6 md:grid-cols-2">
          <Media image="coralVillaSunset" sizes="(min-width: 768px) 50vw, 100vw" className="rounded-[6px]" />
          <Media image="siteSlope" sizes="(min-width: 768px) 50vw, 100vw" className="rounded-[6px]" caption="below" />
        </Container>
      </Section>

      <Section tone="moss">
        <Container className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
          <Monogram className="w-16 text-shell" title="Terra Concetti monogram" />
          <ContactDetails onDark />
        </Container>
      </Section>
    </>
  );
}
