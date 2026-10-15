import { expect, test } from "@playwright/test";

/** Batch 2+: page-level acceptance checks. ROUTES grows with each batch. */
export const ROUTES = [
  "/",
  "/destinations",
  "/destinations/the-coral-anilao",
  "/destinations/the-coral-anilao/residences",
  "/destinations/ocean-view-anilao",
  "/destinations/mabini-golf-country-club",
  "/destinations/the-urban-coral",
  "/about",
  "/sustainability",
  "/anilao",
  "/ownership",
  "/invest",
  "/contact",
  "/legal/privacy-notice",
  "/legal/terms",
  "/legal/disclaimers",
  "/journal",
  "/journal/how-to-get-to-anilao-from-manila",
  "/journal/why-we-plan-bamboo-for-every-hectare",
  "/journal/inside-the-coral-design-story",
];

for (const path of ROUTES) {
  test(`${path}: 200, one H1, canonical, no contact links, no horizontal scroll`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    expect(await page.locator('a[href^="tel:"], a[href^="mailto:"], a[href*="wa.me"], a[href*="viber:"], form').count()).toBe(0);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    // Every render on the page carries the "Artist's perspective" label (M-AC2).
    const renders = await page.locator('img[alt*="artist\'s perspective"]').count();
    if (renders) await expect(page.getByText(/Artist's perspective/).first()).toBeAttached();
  });
}

test("The Coral residences total 68 and show prices on request (P06-AC1/AC2)", async ({ page }) => {
  await page.goto("/destinations/the-coral-anilao/residences");
  const table = page.locator("table");
  await expect(table.locator("tfoot")).toContainText("68");
  await expect(table).toContainText("On request");
  await expect(page.locator("body")).not.toContainText("Cluster 1");
});

test("Ocean View shows 125 condominiums and no lot-status table (P07-AC2/AC3)", async ({ page }) => {
  await page.goto("/destinations/ocean-view-anilao");
  await expect(page.locator("body")).toContainText("125");
  await expect(page.locator("body")).not.toContainText(/buy back/i);
});

test("coming-soon pages: concept label, no sizes, no buttons (P08/P09)", async ({ page }) => {
  for (const path of ["/destinations/mabini-golf-country-club", "/destinations/the-urban-coral"]) {
    await page.goto(path);
    await expect(page.getByText("Proposed concept, subject to change")).toBeVisible();
    await expect(page.locator("main")).not.toContainText(/hectares|\bha\b|casino|keys/i);
  }
});

test("project pages carry ApartmentComplex JSON-LD and breadcrumbs", async ({ page }) => {
  await page.goto("/destinations/the-coral-anilao");
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(ld.join(" ")).toContain('"ApartmentComplex"');
  expect(ld.join(" ")).toContain('"BreadcrumbList"');
});

test("today/planned slider works by keyboard (DS-AC3)", async ({ page }) => {
  await page.goto("/destinations/the-coral-anilao");
  const slider = page.getByRole("slider");
  await slider.focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await expect(slider).toHaveValue("52");
});

test("hero image is eager with high fetch priority (P01-AC2)", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("section").first().locator("img").first();
  await expect(hero).toHaveAttribute("fetchpriority", "high");
  expect(await hero.getAttribute("loading")).not.toBe("lazy");
});

test("Invest page has no financial figures (P12-AC1)", async ({ page }) => {
  await page.goto("/invest");
  const text = await page.locator("main").innerText();
  expect(text).not.toMatch(/\bIRR\b|\bGDV\b|MOIC|valuation|tranche|₱\s?\d|US\$\s?\d|\bNOI\b/i);
});

test("Ownership has no visa or citizenship claims and keeps the no-guarantee note (P11)", async ({ page }) => {
  await page.goto("/ownership");
  const text = await page.locator("main").innerText();
  expect(text).not.toMatch(/SRRV|SIRV|TIEZA|citizenship|visa|fractional/i);
  await expect(page.locator("main")).toContainText("No income or return is guaranteed");
});

test("Q&A accordion opens by keyboard (P11-AC4)", async ({ page }) => {
  await page.goto("/ownership");
  const trigger = page.getByRole("button", { name: /Are prices published/ });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
});

test("Why Anilao: 26 dive sites as text, never 50+, 1,200+ words, TouristDestination LD (P10)", async ({ page }) => {
  await page.goto("/anilao");
  const main = page.locator("main");
  await expect(main.locator('h3:has-text("The 26 documented dive sites") + ol > li')).toHaveCount(26);
  const text = await main.innerText();
  expect(text).not.toMatch(/50\+/);
  expect(text.split(/\s+/).length).toBeGreaterThan(1200);
  const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join(" ");
  expect(ld).toContain('"TouristDestination"');
});

test("Contact: details as plain text, RealEstateAgent LD, no map embed (P15)", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator("main")).toContainText("+63 917 882 8880");
  await expect(page.locator("main")).toContainText("info@terraconcetti.com");
  expect(await page.locator("iframe").count()).toBe(0);
  const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join(" ");
  expect(ld).toContain('"RealEstateAgent"');
});

test("legal pages show the draft note until counsel review (P17-AC1)", async ({ page }) => {
  await page.goto("/legal/privacy-notice");
  await expect(page.getByText(/Draft for review/)).toBeVisible();
  await expect(page.locator("main")).toContainText("Data Privacy Act");
});
