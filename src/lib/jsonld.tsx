import { absoluteUrl } from "./env";
import { site } from "@/content/site";

/** Server-rendered JSON-LD with "<" escaped (agency rule W08). */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export const orgId = () => absoluteUrl("/#organization");

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId(),
    name: site.legalName,
    alternateName: site.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/logo-square.png"),
    slogan: site.tagline,
    email: site.email,
    telephone: site.phones[0],
    address: postalAddressLd(),
    sameAs: site.socials.map((s) => s.url),
  };
}

export function postalAddressLd() {
  return {
    "@type": "PostalAddress",
    streetAddress: site.office.street,
    addressLocality: site.office.locality,
    addressRegion: site.office.region,
    addressCountry: site.office.country,
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: absoluteUrl("/"),
    publisher: { "@id": orgId() },
    inLanguage: "en",
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}
