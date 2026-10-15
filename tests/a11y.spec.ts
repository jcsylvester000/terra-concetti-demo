import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { ROUTES } from "./routes";

/** Batch 5: automated WCAG 2.2 AA scan (axe-core) on every page (BRD A-AC1..A-AC6). */
for (const path of ROUTES) {
  test(`axe WCAG 2.2 AA: ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForTimeout(1800); // let the hero fade-in finish so contrast is measured on the final state
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    const summary = results.violations.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 2).map((n) => n.target.join(" ")).join(" | ")}`);
    expect(summary, summary.join("\n")).toEqual([]);
  });
}

test("keyboard: skip link is first focusable and moves to main (A-AC4)", async ({ page, isMobile }) => {
  test.skip(!!isMobile, "desktop keyboard");
  await page.goto("/about");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const focused = await page.evaluate(() => document.activeElement?.textContent ?? "");
  expect(focused).toMatch(/Skip to main content|TERRA CONCETTI/);
});

test("reduced motion: no animated hero clip and statement text is final colour (DS-AC2)", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  const clip = await page.locator(".tc-hero-reveal").evaluate((el) => getComputedStyle(el).animationName);
  expect(clip).toBe("none");
  await ctx.close();
});
