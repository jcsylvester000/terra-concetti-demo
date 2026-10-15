import Link from "next/link";
import Image from "next/image";
import { images } from "@/content/images";
import { projectPath, type Project } from "@/content/projects";
import { ProjectStatusChip } from "@/components/ui/project-status";
import { accentVars } from "@/components/ui/accent";
import { ArrowRight } from "lucide-react";

/** Project card: 4:3 image, eyebrow, H3, one line, key facts, link in project accent (BRD §6.8). */
export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const img = images[project.cardImage];
  const H = headingLevel;
  return (
    <article style={accentVars(project.accent)} className="group flex w-full flex-col overflow-hidden rounded-[6px] bg-shell ring-1 ring-line/70">
      <Link href={projectPath(project)} className="flex flex-1 flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-sage">
          <Image src={img.src} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" placeholder="blur" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
          <ProjectStatusChip project={project} className="absolute top-3 left-3" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="t-eyebrow !text-[11px] text-[var(--accent-text)]">{project.location}</p>
          <H className="t-h3 mt-2">{project.nameWithPlace}</H>
          <p className="mt-2 text-[15px] leading-6 text-forest/80">{project.summary}</p>
          {project.keyFacts.length ? (
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[14px] text-driftwood">
              {project.keyFacts.slice(0, 3).map((f) => (
                <li key={f.label}>
                  <span className="font-semibold text-forest">{f.value}</span> {f.label}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-[14px] text-driftwood">Proposed concept</p>
          )}
          <span className="mt-auto inline-flex items-center gap-2 pt-5 font-medium text-[var(--accent-text)]">
            View destination <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
