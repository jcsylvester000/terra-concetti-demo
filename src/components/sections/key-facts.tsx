import { NumberTicker } from "@/components/motion/number-ticker";
import { cn } from "@/lib/cn";

type Fact = { value: string; label: string; count?: number };

/** Key facts bar with I5 counting numbers (final values in the HTML). */
export function KeyFacts({ facts, className, onDark }: { facts: Fact[]; className?: string; onDark?: boolean }) {
  return (
    <dl className={cn("grid grid-cols-2 gap-px overflow-hidden rounded-[6px] md:grid-cols-4", onDark ? "bg-shell/15" : "bg-line", className)}>
      {facts.map((f) => (
        <div key={f.label} className={cn("flex flex-col-reverse px-5 py-6", onDark ? "bg-forest" : "bg-shell")}>
          <dt className={cn("mt-1 text-[14px]", onDark ? "text-shell/75" : "text-driftwood")}>{f.label}</dt>
          <dd className={cn("font-display text-[34px] leading-none font-semibold sm:text-[40px] md:text-[48px]", onDark ? "text-shell" : "text-[var(--accent-text,#1F2418)]")}>
            {f.count != null ? <NumberTicker value={f.count} decimals={String(f.count).includes(".") ? String(f.count).split(".")[1].length : 0} /> : f.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
