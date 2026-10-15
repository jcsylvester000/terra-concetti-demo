import type { CSSProperties } from "react";
import type { Project } from "@/content/projects";

/** Project accents as CSS variables, scoped to that project's pages (BRD §6.3, ≤ 4% of area). */
const map: Record<Project["accent"], { strong: string; text: string; soft: string }> = {
  coral: { strong: "#2C6E7E", text: "#2C6E7E", soft: "#429AAF" },
  ov: { strong: "#1F3A56", text: "#1F3A56", soft: "#D1E2F4" },
  mgcc: { strong: "#335B55", text: "#335B55", soft: "#E2E7D7" },
  uc: { strong: "#6E7C53", text: "#4F5A3A", soft: "#B6B5AD" },
};

export function accentVars(accent: Project["accent"]): CSSProperties {
  const a = map[accent];
  return { ["--accent-strong" as string]: a.strong, ["--accent-text" as string]: a.text, ["--accent-soft" as string]: a.soft };
}
