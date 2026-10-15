import { projects, projectPath } from "@/content/projects";

/**
 * Every indexable static route with its last meaningful content change (sitemap lastmod, S-AC4).
 * Thank-you pages, /styleguide and 404 are excluded. Update the date when a page's content changes.
 */
export type RouteEntry = { path: string; lastModified: string; priority: number };

export const staticRoutes: RouteEntry[] = [
  { path: "/", lastModified: "2026-10-15", priority: 1 },
];

export const projectRoutes: RouteEntry[] = [];

export function allRoutes(): RouteEntry[] {
  return [...staticRoutes, ...projectRoutes];
}

export { projects, projectPath };
