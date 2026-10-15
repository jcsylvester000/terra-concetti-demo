"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * I2 Bento gallery that settles on scroll (BRD §6.11; pattern after Systaliko UI "Hero Gallery
 * Scroll Animation", MIT, rebuilt in CSS). Cells start slightly apart and settle into the grid once.
 * Offsets are applied only to grids that start below the fold, and only with JavaScript, so content
 * is always visible (DS-AC1) and in-view grids never jump. Reduced motion: static.
 */
const offsets = [
  ["-26px", "-18px"],
  ["24px", "-22px"],
  ["-18px", "24px"],
  ["24px", "20px"],
  ["0px", "28px"],
  ["-12px", "18px"],
];

export type BentoCell = { key: string; className?: string; content: ReactNode };

export function BentoSettle({ cells, className }: { cells: BentoCell[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    el.dataset.settle = "pending";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        el.dataset.settle = "done";
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-settle="static" className={cn("grid gap-3 md:gap-4", className)}>
      {cells.map((c, i) => (
        <div
          key={c.key}
          className={cn("bento-cell", c.className)}
          style={{ ["--sx" as string]: offsets[i % 6][0], ["--sy" as string]: offsets[i % 6][1], ["--sd" as string]: `${i * 0.06}s` } as CSSProperties}
        >
          {c.content}
        </div>
      ))}
    </div>
  );
}
