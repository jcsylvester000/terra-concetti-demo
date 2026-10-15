import Link from "next/link";
import Image from "next/image";
import { images } from "@/content/images";
import { projectPath, type Project } from "@/content/projects";
import { ProjectStatusChip } from "@/components/ui/project-status";

/**
 * I7 Expanding destination panels (BRD §6.11). Desktop: four tall panels; the hovered or focused one
 * widens (pure CSS, no JS). Mobile: horizontal swipe cards with the next card peeking.
 */
export function DestinationPanels({ projects }: { projects: Project[] }) {
  return (
    <>
      <ul className="tc-panels hidden lg:flex" aria-label="Destinations">
        {projects.map((p) => {
          const img = images[p.cardImage];
          return (
            <li key={p.slug} className="tc-panel relative overflow-hidden rounded-[6px]">
              <Link href={projectPath(p)} className="group absolute inset-0 block text-shell focus-visible:outline-offset-[-4px]">
                <Image src={img.src} alt="" fill sizes="(min-width: 1024px) 45vw" placeholder="blur" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]" />
                <span className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/25 to-transparent" />
                <span className="absolute top-4 left-4"><ProjectStatusChip project={p} /></span>
                <span className="absolute inset-x-0 bottom-0 block p-6">
                  <span className="t-eyebrow block !text-[11px] text-gold">{p.location}</span>
                  <span className="mt-2 block font-display text-[30px] leading-[34px] font-semibold">{p.nameWithPlace}</span>
                  <span className="tc-panel-more mt-3 block max-w-sm text-[15px] leading-6 text-shell/90">
                    {p.tagline}. {p.summary}
                  </span>
                </span>
                {p.heroImage && images[p.cardImage].kind === "render" ? (
                  <span className="absolute right-3 bottom-2 text-[11px] text-shell/70">Artist&apos;s perspective</span>
                ) : images[p.cardImage].kind === "concept" ? (
                  <span className="absolute right-3 bottom-2 text-[11px] text-shell/70">Concept imagery</span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 lg:hidden" aria-label="Destinations">
        {projects.map((p) => {
          const img = images[p.cardImage];
          return (
            <li key={p.slug} className="relative w-[78%] shrink-0 snap-start overflow-hidden rounded-[6px] sm:w-[46%]">
              <Link href={projectPath(p)} className="block text-shell">
                <span className="relative block aspect-[3/4]">
                  <Image src={img.src} alt="" fill sizes="80vw" placeholder="blur" className="object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent" />
                  <span className="absolute top-3 left-3"><ProjectStatusChip project={p} /></span>
                  <span className="absolute inset-x-0 bottom-0 block p-4">
                    <span className="t-eyebrow block !text-[10.5px] text-gold">{p.location}</span>
                    <span className="mt-1 block font-display text-[26px] leading-[30px] font-semibold">{p.nameWithPlace}</span>
                    <span className="mt-1 block text-[14px] text-shell/85">{p.tagline}</span>
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
