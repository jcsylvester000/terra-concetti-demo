import Link from "next/link";
import { cn } from "@/lib/cn";
import { Monogram } from "./monogram";

/**
 * INTERIM logo lockup: traced monogram + Roman-caps wordmark set in Cormorant Garamond.
 * Replace with the official vector files when supplied (asset A1). Never re-type the official
 * wordmark once it exists (BRD §6.2).
 */
export function Logo({ onDark, className, asLink = true }: { onDark?: boolean; className?: string; asLink?: boolean }) {
  const inner = (
    <span className={cn("inline-flex items-center gap-3", onDark ? "text-shell" : "text-moss", className)}>
      <Monogram className="w-[19px] shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[19px] font-semibold tracking-[0.16em] whitespace-nowrap">TERRA CONCETTI</span>
        <span className={cn("t-eyebrow mt-1 !text-[8.5px] !tracking-[0.32em]", onDark ? "text-shell/70" : "text-driftwood")}>Properties Corp.</span>
      </span>
    </span>
  );
  if (!asLink) return inner;
  return (
    <Link href="/" className="inline-flex min-h-11 items-center">
      {inner}
      <span className="sr-only">, home</span>
    </Link>
  );
}
