import type { Metadata } from "next";
import { Container } from "@/components/ui/layout";
import { ButtonLink, TextLink } from "@/components/ui/button-link";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

/** P20: real 404 status with helpful links (P20-AC1). */
export default function NotFound() {
  return (
    <section className="bg-contours py-24 md:py-32">
      <Container>
        <p className="t-eyebrow text-bronze-ink">404</p>
        <h1 className="t-display-xl mt-4 max-w-2xl">This page drifted out to sea.</h1>
        <p className="t-lead mt-6 max-w-xl text-forest/85">The link may be old or mistyped. These will get you back on course.</p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink href="/destinations">Our destinations</ButtonLink>
          <TextLink href="/anilao">Why Anilao</TextLink>
          <TextLink href="/contact">Contact</TextLink>
        </div>
      </Container>
    </section>
  );
}
