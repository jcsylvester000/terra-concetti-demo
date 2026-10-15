#!/usr/bin/env node
/**
 * Build-time content guard (BRD Q-AC4, Q-AC6, CD-AC2). Runs before every `next build`.
 *
 * Fails the build when:
 *  1. Confidential or regulated claims appear in site content (financial figures, visa/citizenship
 *     claims, unapproved ownership claims).
 *  2. While site.contactMode is "info-only": any tel:, mailto:, Viber, WhatsApp or Messenger link,
 *     or any <form> element, appears in the source (decisions D2 + D4).
 *
 * Reports (does not fail) the number of placeholder images still in use, unless
 * REQUIRE_FINAL_ASSETS=true, in which case any placeholder fails the build (production launch gate).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const SRC = join(root, "src");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|mdx?|json)$/.test(name)) out.push(p);
  }
  return out;
}

const files = walk(SRC);
const errors = [];

/* ---------- 1. Blocked terms in published content ---------- */
// Content = src/content/** (data + journal) and src/app/** (page copy). Components are UI only.
const contentFiles = files.filter((f) => /\/src\/(content|app)\//.test(f));
const blocked = [
  [/\bIRR\b/, "IRR (investor return)"],
  [/\bGDV\b/, "GDV (gross development value)"],
  [/\bMOIC\b/, "MOIC"],
  [/\bvaluation\b/i, "valuation"],
  [/\bpre-money\b|\bpost-money\b/i, "pre/post-money"],
  [/\btranche/i, "tranches"],
  [/guaranteed (return|income|yield)/i, "guaranteed returns"],
  [/\bSRRV\b/, "SRRV visa claim (needs legal review)"],
  [/\bSIRV\b/, "SIRV visa claim (needs legal review)"],
  [/\bTIEZA\b/, "TIEZA visa claim (needs legal review)"],
  [/citizenship/i, "citizenship claim (needs legal review)"],
  [/retirement[- ]visa/i, "retirement-visa claim (needs legal review)"],
  [/fractional ownership/i, "fractional ownership (needs legal review)"],
  [/carbon[- ]neutral/i, "carbon-neutral (not certified)"],
  [/\bnet[- ]zero\b/i, "net-zero (not an achieved claim)"],
  [/\b50\+ dive/i, "50+ dive sites (use 26)"],
  [/\bparadise\b/i, "'paradise' (voice rule)"],
  [/hurry|only \d+ left|limited time/i, "fake urgency (RA 11967)"],
  [/\bsold \(buy back\)/i, "Ocean View lot-status table"],
];
for (const f of contentFiles) {
  const text = readFileSync(f, "utf8");
  for (const [re, label] of blocked) {
    const lines = text.split("\n");
    lines.forEach((line, i) => {
      if (re.test(line) && !/content-guard: allow/.test(line)) errors.push(`${relative(root, f)}:${i + 1}  blocked term: ${label}`);
    });
  }
}

/* ---------- 2. Contact switch ---------- */
const siteTs = readFileSync(join(SRC, "content/site.ts"), "utf8");
const infoOnly = /contactMode:\s*"info-only"/.test(siteTs);
if (infoOnly) {
  const contactPatterns = [
    [/["'`(]tel:/, "tel: link"],
    [/["'`(]mailto:/, "mailto: link"],
    [/viber:\/\//i, "Viber link"],
    [/wa\.me\//i, "WhatsApp link"],
    [/api\.whatsapp\.com/i, "WhatsApp link"],
    [/m\.me\//i, "Messenger link"],
    [/<form[\s>]/, "<form> element"],
  ];
  for (const f of files) {
    const text = readFileSync(f, "utf8");
    text.split("\n").forEach((line, i) => {
      for (const [re, label] of contactPatterns) {
        if (re.test(line)) errors.push(`${relative(root, f)}:${i + 1}  ${label} not allowed while contactMode is "info-only" (D2/D4)`);
      }
    });
  }
}

/* ---------- 3. Placeholder images ---------- */
const imagesTs = readFileSync(join(SRC, "content/images.ts"), "utf8");
const total = (imagesTs.match(/^\s+\w+: img\(/gm) || []).length;
const finals = (imagesTs.match(/placeholder: false/g) || []).length;
const placeholders = total - finals;

if (errors.length) {
  console.error(`\n✖ Content guard failed (${errors.length}):\n  ` + errors.join("\n  ") + "\n");
  process.exit(1);
}
console.log(`✔ Content guard passed. contactMode=${infoOnly ? "info-only" : "enabled"} · placeholder images in library: ${placeholders} of ${total}`);
if (process.env.REQUIRE_FINAL_ASSETS === "true" && placeholders > 0) {
  console.error(`✖ REQUIRE_FINAL_ASSETS=true but ${placeholders} placeholder image(s) remain (BRD Q-AC6).`);
  process.exit(1);
}
