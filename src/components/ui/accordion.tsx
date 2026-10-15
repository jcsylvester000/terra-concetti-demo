"use client";

import * as A from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

/** Accessible Q&A accordion (P11-AC4). Content is in the HTML; Radix handles keyboard and ARIA. */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <A.Root type="multiple" className="divide-y divide-line rounded-[6px] bg-shell ring-1 ring-line">
      {items.map((it, i) => (
        <A.Item key={it.q} value={`q${i}`}>
          <A.Header>
            <A.Trigger className="group flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold">
              {it.q}
              <ChevronDown aria-hidden strokeWidth={1.5} className="size-5 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
            </A.Trigger>
          </A.Header>
          <A.Content forceMount className="px-5 pb-5 text-forest/85 data-[state=closed]:hidden">
            {it.a}
          </A.Content>
        </A.Item>
      ))}
    </A.Root>
  );
}
