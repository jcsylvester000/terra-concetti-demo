import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { ContactDetails } from "@/components/ui/contact";
import { Media } from "@/components/ui/media";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContourDraw } from "@/components/motion/contour-draw";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, orgId, postalAddressLd } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/env";

export const metadata: Metadata = pageMetadata({
  title: "Contact Terra Concetti | Makati Office, Phone & Email",
  description: "Contact Terra Concetti Properties Corp.: our Makati office address, phone numbers and email for The Coral and Ocean View in Anilao.",
  path: "/contact",
  absoluteTitle: true,
});

/**
 * P15 Contact. Phones and email are plain text (no tel:/mailto:/chat links, no form) per
 * decisions D2 + D4 (P15-AC1). Static map image, no embed and no directions link (P15-AC2).
 */
export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden py-10 md:py-14">
        <ContourDraw />
        <Container className="relative">
          <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          <div className="mt-10 max-w-3xl">
            <p className="t-eyebrow text-bronze">Contact</p>
            <h1 className="t-display-xl mt-4">Contact Terra Concetti</h1>
            <p className="t-lead mt-6 text-forest/85">
              For information about our destinations, residences, ownership or a site visit, call or email our team.
            </p>
          </div>
        </Container>
      </section>

      <Section tone="moss" className="py-14 md:py-16">
        <Container>
          <ContactDetails onDark className="text-[18px]" />
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Our office" title={site.office.label} />
            <address className="mt-6 not-italic text-forest/85 t-lead">
              {site.legalName}
              <br />
              {site.office.street}
              <br />
              {site.office.locality}, {site.office.region}
            </address>
            {site.salesGallery ? (
              <div className="mt-8">
                <h3 className="t-h4">{site.salesGallery.label}</h3>
                <p className="mt-2 text-forest/85">{site.salesGallery.address}</p>
              </div>
            ) : (
              <p className="t-caption mt-8">The Anilao sales gallery address will be added here once it opens.</p>
            )}
          </div>
          <figure>
            <Media image="batangasPoi" sizes="(min-width: 1024px) 55vw, 100vw" className="rounded-[6px] ring-1 ring-line" caption="none" />
            <figcaption className="t-caption mt-3">Our projects in Batangas. A map of the Makati office will be added with the final map assets.</figcaption>
          </figure>
        </Container>
      </Section>

      <Section tone="shell">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading eyebrow="Site visits" title="Visiting the site" />
          <div className="space-y-4 text-forest/85">
            <p>
              Site visits to The Coral and Ocean View are arranged by appointment. Call or email our team with your preferred date and we will confirm the details.
            </p>
            <p>
              Anilao is about two hours (122 km) from NAIA by car via SLEX and the STAR Tollway. Comfortable shoes are a good idea: the sites are on a hillside with views
              of Sombrero and Tingloy Islands.
            </p>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "@id": absoluteUrl("/contact#office"),
          name: site.legalName,
          url: absoluteUrl("/contact"),
          email: site.email,
          telephone: site.phones,
          address: postalAddressLd(),
          geo: { "@type": "GeoCoordinates", latitude: site.office.geo.lat, longitude: site.office.geo.lng },
          parentOrganization: { "@id": orgId() },
          image: absoluteUrl("/og/default.jpg"),
        }}
      />
    </>
  );
}
