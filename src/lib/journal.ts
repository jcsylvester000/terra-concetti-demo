import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { images, type ImageKey } from "@/content/images";
import { getAuthor } from "@/content/team";
import { getProject } from "@/content/projects";

/**
 * Journal articles live in src/content/journal/*.mdx (BRD §4.2). Adding a valid file publishes a
 * new article, card, sitemap entry and schema with no code change; invalid frontmatter fails the
 * build with a clear message (P13-AC1). Every article must link to its pillar page and to one
 * project page (P14-AC1); the build checks the body for both links.
 */
export const categories = ["Dive & destination", "Sustainability", "Ownership guides", "Project updates"] as const;
export type Category = (typeof categories)[number];

export const pillarFor: Record<Category, { path: string; label: string }> = {
  "Dive & destination": { path: "/anilao", label: "Why Anilao" },
  Sustainability: { path: "/sustainability", label: "Sustainability" },
  "Ownership guides": { path: "/ownership", label: "Ownership" },
  "Project updates": { path: "/destinations", label: "Destinations" },
};

const Frontmatter = z.object({
  title: z.string().min(10).max(90),
  seoTitle: z.string().max(60).optional(),
  description: z.string().min(50).max(155),
  author: z.string(),
  date: z.iso.date(),
  updated: z.iso.date().optional(),
  category: z.enum(categories),
  hero: z.custom<ImageKey>((v) => typeof v === "string" && v in images, "hero must be a key from src/content/images.ts"),
  relatedProject: z.string(),
  excerpt: z.string().max(220),
});

export type ArticleMeta = z.infer<typeof Frontmatter> & {
  slug: string;
  readingMinutes: number;
  words: number;
  headings: { id: string; text: string }[];
  body: string;
};

const DIR = join(process.cwd(), "src/content/journal");

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/** Minimal frontmatter reader: `key: value` lines between --- fences (strings, quoted or not). */
function splitFrontmatter(raw: string, file: string) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing --- frontmatter --- block`);
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const i = line.indexOf(":");
    if (i < 0) throw new Error(`${file}: bad frontmatter line "${line}"`);
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    data[key] = value;
  }
  return { data, body: m[2] };
}

let cache: ArticleMeta[] | null = null;

export function getArticles(): ArticleMeta[] {
  if (cache) return cache;
  const files = readdirSync(DIR).filter((f) => f.endsWith(".mdx"));
  const list = files.map((file) => {
    const raw = readFileSync(join(DIR, file), "utf8");
    const { data, body } = splitFrontmatter(raw, file);
    const parsed = Frontmatter.safeParse(data);
    if (!parsed.success) {
      throw new Error(`Journal article ${file} has invalid frontmatter:\n${parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n")}`);
    }
    const fm = parsed.data;
    if (!getAuthor(fm.author)) throw new Error(`${file}: unknown author "${fm.author}" (use a slug from src/content/team.ts or "editorial").`);
    const project = getProject(fm.relatedProject);
    if (!project) throw new Error(`${file}: unknown relatedProject "${fm.relatedProject}".`);
    const pillar = pillarFor[fm.category].path;
    if (!body.includes(`](${pillar})`) && !body.includes(`](${pillar}#`)) throw new Error(`${file}: must link to its pillar page ${pillar} (BRD P14-AC1).`);
    if (!body.includes("](/destinations/")) throw new Error(`${file}: must link to at least one project page (BRD P14-AC1).`);
    const words = body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    const headings = [...body.matchAll(/^##\s+(.+)$/gm)].map((h) => ({ id: slugify(h[1]), text: h[1].trim() }));
    return { ...fm, slug: file.replace(/\.mdx$/, ""), words, readingMinutes: Math.max(1, Math.round(words / 220)), headings, body };
  });
  cache = list.sort((a, b) => (a.date < b.date ? 1 : -1));
  return cache;
}

export const getArticle = (slug: string) => getArticles().find((a) => a.slug === slug);

export const articlePath = (a: Pick<ArticleMeta, "slug">) => `/journal/${a.slug}`;

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-PH", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
