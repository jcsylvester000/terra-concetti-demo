import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { images, type ImageKey } from "@/content/images";
import { captionFor } from "@/components/ui/media";
import { Container } from "@/components/ui/layout";

/**
 * Full-bleed hero with the I1 sea-view reveal (BRD §6.11). The image is the LCP element:
 * priority, fetchpriority=high, never lazy (P01-AC2). Copy sits on a dark scrim (BRD §6.2).
 */
export function PageHero({
  image,
  eyebrow,
  title,
  lead,
  actions,
  aside,
  size = "full",
  notToScale,
  children,
}: {
  image: ImageKey;
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  size?: "full" | "medium";
  notToScale?: boolean;
  children?: ReactNode;
}) {
  const img = images[image];
  const note = captionFor(img, notToScale);
  return (
    <section className={cn("relative isolate overflow-hidden bg-forest text-shell", size === "full" ? "min-h-[86svh] md:min-h-[88vh]" : "min-h-[62svh] md:min-h-[68vh]")}>
      <div className="tc-hero-reveal absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={82}
          className="tc-parallax object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-forest/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/55 via-transparent to-transparent" />
      </div>
      <Container className={cn("flex flex-col justify-end pt-28 pb-14 md:pb-20", size === "full" ? "min-h-[86svh] md:min-h-[88vh]" : "min-h-[62svh] md:min-h-[68vh]")}>
        <div className="tc-hero-copy max-w-3xl">
          {eyebrow ? <div className="t-eyebrow text-gold">{eyebrow}</div> : <span />}
          <h1 className="t-display-xl mt-4">{title}</h1>
          {lead ? <p className="t-lead mt-5 max-w-xl text-shell/90">{lead}</p> : <span />}
          {actions ? <div className="mt-8 flex flex-wrap items-center gap-4">{actions}</div> : <span />}
        </div>
        {children}
      </Container>
      {aside}
      {note ? <p className="absolute right-3 bottom-3 rounded-[2px] bg-forest/60 px-2 py-1 text-[12px] leading-4 text-shell/90">{note}</p> : null}
    </section>
  );
}
