import { cn } from "@/lib/cn";
import type { CSSProperties } from "react";

/**
 * I6 Statement text reveal (BRD §6.11): words brighten from Driftwood to Forest Floor as the
 * sentence scrolls through the view. Pure CSS scroll-driven animation (no JavaScript); browsers
 * without support, and reduced motion, show the final colour. Plain text, nothing hidden (DS-AC1).
 * Start colour is Driftwood, which already passes WCAG AA contrast on every section tone.
 */
export function TextReveal({ text, className, as: Tag = "p" }: { text: string; className?: string; as?: "p" | "h2" }) {
  const words = text.split(" ");
  return (
    <Tag className={cn("tc-reveal", className)}>
      {words.map((w, i) => (
        <span key={i} style={{ ["--i" as string]: i, ["--n" as string]: words.length } as CSSProperties}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
