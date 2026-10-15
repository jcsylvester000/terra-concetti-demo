import Link from "next/link";
import Image from "next/image";
import { images } from "@/content/images";
import { projectPath, type Project } from "@/content/projects";
import { ProjectStatusChip } from "@/components/ui/project-status";
import { captionFor } from "@/components/ui/media";

/**
 * I7 Expanding destination panels (BRD §6.11). One list for every screen size:
 * mobile = horizontal swipe cards with the next card peeking; desktop (lg) = four tall panels where
 * the hovered or focused one widens (pure CSS, no JS).
 */
export function DestinationPanels({ projects }: { projects: Project[] }) {
  return (
    <ul aria-label="Destinations" className="tc-panels -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
      {projects.map((p) => {
        const img = images[p.cardImage];
        const note = captionFor(img);
        return (
          <li key={p.slug} className="tc-panel relative aspect-[3/4] w-[78%] shrink-0 snap-start overflow-hidden rounded-[6px] sm:w-[46%] lg:aspect-auto lg:w-auto lg:shrink">
            <Link href={projectPath(p)} className="group absolute inset-0 block text-shell focus-visible:outline-offset-[-4px]">
              <Image src={img.src} alt="" fill sizes="(min-width: 1024px) 45vw, 80vw" placeholder="blur" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]" />
              <span className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/25 to-transparent" />
              <span className="absolute top-3 left-3 lg:top-4 lg:left-4"><ProjectStatusChip project={p} /></span>
              <span className="absolute inset-x-0 bottom-0 block p-4 lg:p-6">
                <span className="t-eyebrow block !text-[10.5px] text-gold lg:!text-[11px]">{p.location}</span>
                <span className="mt-1 block font-display text-[26px] leading-[30px] font-semibold lg:mt-2 lg:text-[30px] lg:leading-[34px]">{p.nameWithPlace}</span>
                <span className="mt-1 block text-[14px] text-shell/85 lg:hidden">{p.tagline}</span>
                <span className="tc-panel-more mt-3 hidden max-w-sm text-[15px] leading-6 text-shell/90 lg:block">
                  {p.tagline}. {p.summary}
                </span>
              </span>
              {note ? <span className="absolute right-3 bottom-2 hidden text-[11px] text-shell/70 lg:block">{note.replace(" Final design may change.", "").replace(".", "")}</span> : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
