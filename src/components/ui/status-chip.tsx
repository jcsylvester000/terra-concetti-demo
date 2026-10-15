import { cn } from "@/lib/cn";

const styles = {
  "Now selling": "bg-status-selling text-forest",
  Reserved: "bg-status-reserved text-forest",
  Sold: "bg-status-sold text-driftwood line-through",
  "Coming soon": "bg-status-soon text-ov-navy",
} as const;

export type StatusText = keyof typeof styles;

/** Status chips are separate from brand accents (BRD §6.3). */
export function StatusChip({ status, className }: { status: StatusText; className?: string }) {
  return (
    <span className={cn("t-eyebrow inline-flex items-center rounded-[2px] px-2.5 py-1.5 !text-[10.5px] !leading-none", styles[status], className)}>
      {status}
    </span>
  );
}
