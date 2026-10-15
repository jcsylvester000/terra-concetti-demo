import { team } from "@/content/team";
import { Monogram } from "@/components/ui/monogram";
import { cn } from "@/lib/cn";

/** Leadership cards. No photos yet: neutral monogram placeholder, never a stock face (P02-AC1). */
export function TeamGrid({ detailed = false, className }: { detailed?: boolean; className?: string }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {team.map((p) => (
        <li key={p.slug} id={p.slug} className="flex flex-col overflow-hidden rounded-[6px] bg-shell ring-1 ring-line/70">
          <div className="grid aspect-[4/3] place-items-center bg-sage" aria-hidden>
            <Monogram className="w-9 text-moss/35" />
          </div>
          <div className="p-5">
            <h3 className="t-h4">{p.name}</h3>
            <p className="t-caption mt-1">{p.role}</p>
            {detailed ? (
              <ul className="mt-4 space-y-2 text-[15px] leading-6 text-forest/85">
                {p.credentials.map((c) => (
                  <li key={c} className="flex gap-2"><span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" />{c}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-[15px] leading-6 text-forest/85">{p.short}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
