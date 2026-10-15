import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects, projectPath } from "@/content/projects";
import { ProjectTemplate } from "@/components/templates/project-template";
import { ComingSoonTemplate } from "@/components/templates/coming-soon-template";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/content/images";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({
    title: p.seo.title,
    description: p.seo.description,
    path: projectPath(p),
    absoluteTitle: true,
    image: images[p.heroImage].src.src,
    imageAlt: images[p.heroImage].alt,
  });
}

/** P05, P07 (project template) and P08, P09 (coming-soon template). */
export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  return p.template === "project" ? <ProjectTemplate project={p} /> : <ComingSoonTemplate project={p} />;
}
