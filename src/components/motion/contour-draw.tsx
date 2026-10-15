"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { contourPaths } from "./contour-paths";

/**
 * I9 Topographic contour lines that draw in once, at low contrast, behind location content
 * (BRD §6.11). Decorative only (aria-hidden). Reduced motion: lines are simply shown.
 */
export function ContourDraw({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.classList.add("is-pending");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        el.classList.remove("is-pending");
        el.classList.add("is-drawing");
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <svg ref={ref} aria-hidden viewBox="0 0 900 900" preserveAspectRatio="xMidYMid slice" className={cn("tc-contours pointer-events-none absolute inset-0 h-full w-full", className)}>
      <g fill="none" stroke="#88633E" strokeOpacity="0.2" strokeWidth="1.2" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
        {contourPaths.map((d, i) => (
          <path key={i} d={d} pathLength={1} style={{ animationDelay: `${(i % 8) * 0.12}s` }} />
        ))}
      </g>
    </svg>
  );
}
