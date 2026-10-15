import { ChevronDown } from "lucide-react";

/**
 * Accessible Q&A using native <details>/<summary> (P11-AC4): keyboard and screen-reader support
 * built in, content always in the HTML, no JavaScript.
 */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-[6px] bg-shell ring-1 ring-line">
      {items.map((it) => (
        <details key={it.q} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold [&::-webkit-details-marker]:hidden">
            {it.q}
            <ChevronDown aria-hidden strokeWidth={1.5} className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <div className="px-5 pb-5 text-forest/85">{it.a}</div>
        </details>
      ))}
    </div>
  );
}
