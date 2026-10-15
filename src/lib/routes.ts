import { projects, projectPath } from "@/content/projects";
import { articlePath, getArticles } from "@/lib/journal";

/**
 * Every indexable static route with its last meaningful content change (sitemap lastmod, S-AC4).
 * Thank-you pages, /styleguide and 404 are excluded. Update the date when a page’s content changes.
 */
export type RouteEntry = { path: string; lastModified: string; priority: number };

export const staticRoutes: RouteEntry[] = [
  { path: "/", lastModified: "2026-10-15", priority: 1 },
  { path: "/destinations", lastModified: "2026-10-15", priority: 0.9 },
  { path: "/about", lastModified: "2026-10-15", priority: 0.7 },
  { path: "/sustainability", lastModified: "2026-10-15", priority: 0.7 },
  { path: "/anilao", lastModified: "2026-10-15", priority: 0.9 },
  { path: "/ownership", lastModified: "2026-10-15", priority: 0.8 },
  { path: "/invest", lastModified: "2026-10-15", priority: 0.5 },
  { path: "/contact", lastModified: "2026-10-15", priority: 0.7 },
  { path: "/journal", lastModified: "2026-10-15", priority: 0.7 },
  { path: "/legal/privacy-notice", lastModified: "2026-10-15", priority: 0.2 },
  { path: "/legal/terms", lastModified: "2026-10-15", priority: 0.2 },
  { path: "/legal/disclaimers", lastModified: "2026-10-15", priority: 0.2 },
];

export const projectRoutes: RouteEntry[] = [
  ...projects.map((p) => ({ path: projectPath(p), lastModified: "2026-10-15", priority: p.template === "project" ? 0.9 : 0.6 })),
  { path: "/destinations/the-coral-anilao/residences", lastModified: "2026-10-15", priority: 0.8 },
];

export function articleRoutes(): RouteEntry[] {
  return getArticles().map((a) => ({ path: articlePath(a), lastModified: a.updated ?? a.date, priority: 0.6 }));
}

export function allRoutes(): RouteEntry[] {
  return [...staticRoutes, ...projectRoutes, ...articleRoutes()];
}

export { projects, projectPath };
