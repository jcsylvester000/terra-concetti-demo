import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import { Eyebrow } from "./layout";

/**
 * Contact details as PLAIN TEXT (decisions D2 + D4, BRD §4.7, CD-AC1..3).
 * No tel:, mailto: or chat links while site.contactMode is "info-only".
 * This block is the reserved slot where buttons/forms appear once the contact flow is enabled.
 */
export function ContactDetails({ onDark, className, compact }: { onDark?: boolean; className?: string; compact?: boolean }) {
  const muted = onDark ? "text-shell/70" : "text-driftwood";
  return (
    <dl className={cn("grid gap-5 select-text", compact ? "text-[15px]" : "sm:grid-cols-3", className)} data-contact-mode={site.contactMode}>
      <div>
        <dt className={cn("t-eyebrow !text-[11px]", muted)}>Phone</dt>
        {site.phones.map((p) => (
          <dd key={p} className="mt-1 font-medium tabular-nums">{p}</dd>
        ))}
      </div>
      <div>
        <dt className={cn("t-eyebrow !text-[11px]", muted)}>Email</dt>
        <dd className="mt-1 font-medium break-all">{site.email}</dd>
      </div>
      <div>
        <dt className={cn("t-eyebrow !text-[11px]", muted)}>{site.office.label}</dt>
        <dd className="mt-1">
          {site.office.street}, {site.office.locality}
        </dd>
        {site.salesGallery ? (
          <dd className="mt-2">
            <span className={cn("block text-[13px]", muted)}>{site.salesGallery.label}</span>
            {site.salesGallery.address}
          </dd>
        ) : null}
      </div>
    </dl>
  );
}

/** End-of-page contact block used on every page (replaces the brief’s conversion bands in Phase 1). */
export function ContactBlock({
  title = "Speak with our team",
  intro = "For information about our destinations, residences or site visits, reach us directly.",
  tone = "moss",
}: {
  title?: string;
  intro?: string;
  tone?: "moss" | "shell";
}) {
  const dark = tone === "moss";
  return (
    <section
      aria-labelledby="contact-block-title"
      data-cv=""
      className={cn("relative overflow-hidden py-16 md:py-20", dark ? "bg-moss text-shell" : "bg-shell text-forest")}
    >
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-4 md:grid-cols-[1fr_1.4fr] md:px-6 lg:px-8">
        <div>
          <Eyebrow onDark={dark}>Contact</Eyebrow>
          <h2 id="contact-block-title" className="t-display mt-3">{title}</h2>
          <p className={cn("mt-4 max-w-md", dark ? "text-shell/85" : "text-forest/80")}>{intro}</p>
        </div>
        <ContactDetails onDark={dark} className="self-end" />
      </div>
    </section>
  );
}
