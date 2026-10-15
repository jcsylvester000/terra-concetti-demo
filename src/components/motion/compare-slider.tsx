"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { SiteImage } from "@/content/images";

/**
 * I4 Today / planned slider (BRD §6.11). A real site photo vs the render from the same angle.
 * Uses a native range input: keyboard (arrow keys) and touch work by default (DS-AC3).
 */
export function CompareSlider({ today, planned, caption }: { today: SiteImage; planned: SiteImage; caption: string }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <figure>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-sage select-none">
        <Image src={today.src} alt={today.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" placeholder="blur" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <Image src={planned.src} alt={planned.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" placeholder="blur" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-shell shadow-[0_0_0_1px_rgba(31,36,24,0.15)]" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-shell text-forest shadow-md">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </div>
        <span className="t-eyebrow absolute top-3 left-3 rounded-[2px] bg-forest/75 px-2 py-1 !text-[10.5px] text-shell">Today</span>
        <span className="t-eyebrow absolute top-3 right-3 rounded-[2px] bg-forest/75 px-2 py-1 !text-[10.5px] text-shell">Planned<span className="hidden sm:inline"> · Artist&apos;s perspective</span></span>
        <label htmlFor={id} className="sr-only">Compare today and planned. Move left for more of the plan, right for more of today.</label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          aria-valuetext={`${pos}% today`}
        />
      </div>
      <figcaption className="t-caption mt-3">{caption}</figcaption>
    </figure>
  );
}
