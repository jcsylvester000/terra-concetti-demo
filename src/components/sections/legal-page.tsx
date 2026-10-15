import type { ReactNode } from "react";
import { Container } from "@/components/ui/layout";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { legal } from "@/content/legal";

/** Shared layout for P17–P19. Shows a draft note until TCPC counsel approves (P17-AC1). */
export function LegalPage({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  return (
    <section className="py-10 md:py-14">
      <Container>
        <Breadcrumbs items={[{ name: title, path }]} />
        <h1 className="t-display-xl mt-10">{title}</h1>
        <p className="t-caption mt-4">
          Last updated {legal.lastUpdated} · {legal.version}
        </p>
        {!legal.reviewed ? (
          <p className="mt-6 max-w-3xl rounded-[6px] bg-status-reserved p-4 text-[15px]">
            Draft for review by Terra Concetti&apos;s legal counsel. This page will be finalised before the site launches.
          </p>
        ) : null}
        <div className="prose-tc mt-10 text-forest/85">{children}</div>
      </Container>
    </section>
  );
}
