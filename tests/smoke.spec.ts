import { expect, test } from "@playwright/test";

/** Batch 1 smoke tests: shell, contact rules, SEO basics. Extended each batch. */

test("home renders one H1, header, footer and contact details as text", async ({ page }) => {
  const res = await page.goto("/");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText("Anilao");
  await expect(page.locator("footer")).toContainText("+63 917 882 8880");
  await expect(page.locator("footer")).toContainText("info@terraconcetti.com");
});

test("no contact links or forms while contactMode is info-only (CD-AC2)", async ({ page }) => {
  for (const path of ["/", "/styleguide"]) {
    await page.goto(path);
    const bad = await page.locator('a[href^="tel:"], a[href^="mailto:"], a[href*="wa.me"], a[href*="viber:"], a[href*="m.me/"], form').count();
    expect(bad, path).toBe(0);
  }
});

test("navigation links are crawlable anchors (N-AC1)", async ({ page }) => {
  await page.goto("/");
  for (const href of ["/about", "/sustainability", "/destinations", "/anilao", "/ownership", "/invest", "/journal", "/contact"]) {
    await expect(page.locator(`header a[href="${href}"]`).first()).toBeAttached();
  }
  for (const href of ["/destinations/the-coral-anilao", "/destinations/ocean-view-anilao"]) {
    await expect(page.locator(`a[href="${href}"]`).first()).toBeAttached();
  }
});

test("unknown URL returns 404 with helpful links (P20-AC1)", async ({ page }) => {
  const res = await page.goto("/this-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.locator('main a[href="/destinations"]')).toBeVisible();
});

test("indexing is off by default (S-AC5)", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Disallow: /");
  const res = await request.get("/");
  expect(res.headers()["x-robots-tag"]).toContain("noindex");
});

test("destinations menu opens by keyboard and closes on Escape (N-AC2)", async ({ page, isMobile }) => {
  test.skip(!!isMobile, "desktop only");
  await page.goto("/");
  const btn = page.getByRole("button", { name: /show destinations/i });
  await btn.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: /hide destinations/i })).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: /show destinations/i })).toHaveAttribute("aria-expanded", "false");
});

test("mobile menu opens, shows contact details and closes (N-AC5)", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("info@terraconcetti.com");
  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(dialog).toBeHidden();
});
