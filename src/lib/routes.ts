import { projects, projectPath } from "@/content/projects";

/**
 * Every indexable static route with its last meaningful content change (sitemap lastmod, S-AC4).
 * Thank-you pages, /styleguide and 404 are excluded. Update the date when a page's content changes.
 */
export type RouteEntry = { path: string; lastModified: string; priority: number };

export const staticRoutes: RouteEntry[] = [
  { path: "/", lastModified: "2026-10-15", priority: 1 },
  { path: "/destinations", lastModified: "2026-10-15", priority: 0.9 },
];

export const projectRoutes: RouteEntry[] = [
  ...projects.map((p) => ({ path: projectPath(p), lastModified: "2026-10-15", priority: p.template === "project" ? 0.9 : 0.6 })),
  { path: "/destinations/the-coral-anilao/residences", lastModified: "2026-10-15", priority: 0.8 },
];

export function allRoutes(): RouteEntry[] {
  return [...staticRoutes, ...projectRoutes];
}

export { projects, projectPath };
