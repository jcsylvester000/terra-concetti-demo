import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd, breadcrumbLd, type Crumb } from "@/lib/jsonld";
import { cn } from "@/lib/cn";

/** Visible breadcrumbs + BreadcrumbList markup on every page below level 1 (BRD §5.3). */
export function Breadcrumbs({ items, onDark, className }: { items: Crumb[]; onDark?: boolean; className?: string }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-[13.5px]", className)}>
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className={cn("inline-flex min-h-8 items-center hover:underline", onDark ? "text-shell/80" : "text-driftwood")}>
              Home
            </Link>
          </li>
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1">
                <ChevronRight aria-hidden className={cn("size-3.5", onDark ? "text-shell/60" : "text-driftwood/70")} />
                {last ? (
                  <span aria-current="page" className={onDark ? "text-shell" : "text-forest"}>{c.name}</span>
                ) : (
                  <Link href={c.path} className={cn("inline-flex min-h-8 items-center hover:underline", onDark ? "text-shell/80" : "text-driftwood")}>
                    {c.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(items)} />
    </>
  );
}
