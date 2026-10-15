import type { Metadata } from "next";
import { Container } from "@/components/ui/layout";
import { ButtonLink } from "@/components/ui/button-link";
import { Media } from "@/components/ui/media";
import { ContactBlock } from "@/components/ui/contact";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, organizationLd, websiteLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Terra Concetti | Sustainable Homes in Anilao, Batangas",
  description: "Eco-luxury villas and residences above Anilao's reefs, two hours from Manila. Explore The Coral and Ocean View.",
  path: "/",
  absoluteTitle: true,
});

/** Batch 1 holding page. The full Home (P01) is built in Batch 2. */
export default function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[78svh] overflow-hidden bg-forest text-shell">
        <Media image="homeHero" sizes="100vw" priority fill className="absolute inset-0 -z-10" imgClassName="opacity-90" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest/85 via-forest/30 to-forest/10" />
        <Container className="flex min-h-[78svh] flex-col justify-end pb-16 md:pb-24">
          <p className="t-eyebrow text-gold">Anilao · Mabini · Batangas</p>
          <h1 className="t-display-xl mt-4 max-w-3xl">Live above Anilao&apos;s reefs.</h1>
          <p className="t-lead mt-5 max-w-xl text-shell/90">
            Sustainable villas and residences in Anilao, Batangas, the birthplace of Philippine diving. Two hours from Manila.
          </p>
          <div className="mt-8">
            <ButtonLink href="/destinations" variant="onDark">Explore destinations</ButtonLink>
          </div>
        </Container>
      </section>
      <ContactBlock />
      <JsonLd data={[organizationLd(), websiteLd()]} />
    </>
  );
}
