"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { NavLink } from "./nav-link";
import { StatusChip, type StatusText } from "@/components/ui/status-chip";

type Item = { href: string; name: string; location: string; status: StatusText; image: StaticImageData; alt: string };

/**
 * Destinations mega-menu (BRD §5.3, N-AC1/N-AC2). The panel links are always in the server HTML
 * (crawlable); the panel toggles with click or keyboard, closes on Escape and outside click.
 */
export function DestinationsMenu({ label, href, items }: { label: string; href: string; items: Item[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative flex items-center" onBlur={(e) => !ref.current?.contains(e.relatedTarget as Node) && setOpen(false)}>
      <NavLink href={href} className="pr-1">
        {label}
      </NavLink>
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${open ? "Hide" : "Show"} destinations`}
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 place-items-center text-forest/70 hover:text-forest"
      >
        <ChevronDown aria-hidden strokeWidth={1.5} className={cn("size-4 transition-transform duration-300", open && "rotate-180")} />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-[72px] border-b border-line bg-shell shadow-[0_18px_40px_-20px_rgba(31,36,24,0.35)]"
      >
        <div className="mx-auto grid max-w-[1280px] grid-cols-4 gap-6 px-8 py-8">
          {items.map((d) => (
            <Link key={d.href} href={d.href} onClick={() => setOpen(false)} className="group block rounded-[6px] focus-visible:outline-offset-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-sage">
                <Image src={d.image} alt="" fill sizes="280px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
              </div>
              <div className="mt-3 flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold leading-6 group-hover:underline group-hover:decoration-gold group-hover:decoration-2 group-hover:underline-offset-4">{d.name}</p>
                  <p className="t-caption">{d.location}</p>
                </div>
                <StatusChip status={d.status} className="shrink-0" />
              </div>
            </Link>
          ))}
        </div>
        <div className="mx-auto max-w-[1280px] px-8 pb-6">
          <Link href={href} onClick={() => setOpen(false)} className="t-eyebrow text-bronze hover:text-forest">
            All destinations →
          </Link>
        </div>
      </div>
    </div>
  );
}
