import { expect, test } from "@playwright/test";

/** Batch 4: site-wide SEO checks over every URL in the sitemap (BRD §9.1). */
test("every sitemap URL: unique title ≤ 60, description ≤ 155, one canonical, one H1, valid JSON-LD, OG image", async ({ page, request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  expect(urls.length).toBeGreaterThanOrEqual(20);
  expect(urls).not.toContain("/styleguide");
  const seenTitles = new Set<string>();
  for (const path of urls) {
    await page.goto(path);
    const title = await page.title();
    expect(title.length, `${path} title`).toBeLessThanOrEqual(60);
    expect(seenTitles.has(title), `${path} duplicate title`).toBeFalsy();
    seenTitles.add(title);
    const desc = (await page.locator('meta[name="description"]').getAttribute("content")) ?? "";
    expect(desc.length, `${path} description`).toBeGreaterThan(40);
    expect(desc.length, `${path} description`).toBeLessThanOrEqual(155);
    await expect(page.locator('link[rel="canonical"]'), path).toHaveCount(1);
    await expect(page.locator("h1"), path).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]').first(), path).toBeAttached();
    for (const ld of await page.locator('script[type="application/ld+json"]').allTextContents()) {
      expect(() => JSON.parse(ld), `${path} JSON-LD`).not.toThrow();
    }
  }
});

test("journal: index lists articles, article has Article LD, author, pillar and project links (P13/P14)", async ({ page }) => {
  await page.goto("/journal");
  const links = page.locator('main a[href^="/journal/"]');
  expect(await links.count()).toBeGreaterThanOrEqual(3);
  await page.goto("/journal/inside-the-coral-design-story");
  const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join(" ");
  expect(ld).toContain('"Article"');
  await expect(page.getByText("About the author")).toBeVisible();
  expect(await page.locator('article a[href^="/destinations/"]').count()).toBeGreaterThan(0);
  const hero = page.locator("article img").first();
  await expect(hero).toHaveAttribute("fetchpriority", "high");
});

test("home shows the three latest journal articles", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Stories from the coast" })).toBeVisible();
  expect(await page.locator('main a[href^="/journal/"]').count()).toBeGreaterThanOrEqual(3);
});
