import type { ReactNode } from "react";
import { Container } from "@/components/ui/layout";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { Crumb } from "@/lib/jsonld";

/** Text-led page header for content pages (About, Ownership, Invest, Contact, Legal). */
export function SimpleHero({ crumbs, eyebrow, title, lead, aside, contours = true }: { crumbs: Crumb[]; eyebrow?: string; title: ReactNode; lead?: ReactNode; aside?: ReactNode; contours?: boolean }) {
  return (
    <section className={contours ? "bg-contours py-10 md:py-14" : "py-10 md:py-14"}>
      <Container>
        <Breadcrumbs items={crumbs} />
        <div className={aside ? "mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end" : "mt-10 max-w-3xl"}>
          <div>
            {eyebrow ? <p className="t-eyebrow text-bronze-ink">{eyebrow}</p> : null}
            <h1 className="t-display-xl mt-4">{title}</h1>
            {lead ? <p className="t-lead mt-6 max-w-2xl text-forest/85">{lead}</p> : null}
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}
