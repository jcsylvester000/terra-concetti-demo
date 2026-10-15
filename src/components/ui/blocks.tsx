import { cn } from "@/lib/cn";
import { Icon } from "./icon";
import type { ReactNode } from "react";

/** Feature tile: icon in a Moss circle + title + one line, on Sage Mist (BRD §6.8). */
export function FeatureTile({ icon, title, text, className }: { icon: string; title: string; text: string; className?: string }) {
  return (
    <div className={cn("flex gap-4 rounded-[6px] bg-sage p-5", className)}>
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-moss text-shell">
        <Icon name={icon} className="size-5" />
      </span>
      <div>
        <h3 className="t-h4">{title}</h3>
        <p className="mt-1 text-[15px] leading-6 text-forest/80">{text}</p>
      </div>
    </div>
  );
}

/** Stat block: Moss background, Sand Gold eyebrow, Cormorant statement, one-line note. */
export function StatBlock({ eyebrow, statement, note, className }: { eyebrow: string; statement: ReactNode; note: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[6px] bg-moss p-8 text-shell md:p-10", className)}>
      <p className="t-eyebrow text-gold">{eyebrow}</p>
      <p className="mt-4 font-display text-[34px] leading-[40px] font-semibold md:text-[44px] md:leading-[50px]">{statement}</p>
      <p className="mt-4 max-w-md text-shell/85">{note}</p>
    </div>
  );
}
