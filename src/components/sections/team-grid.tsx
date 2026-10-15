import { team } from "@/content/team";
import { cn } from "@/lib/cn";

/** Initials from a name, skipping honorifics such as "Atty." and "Ar." */
function initials(name: string) {
  const parts = name.split(/\s+/).filter((w) => !/\.$/.test(w) && !/^(I{1,3}|IV|V|Jr|Sr)$/.test(w) && /^[A-Z]/.test(w));
  return (parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "");
}

/** Leadership cards. No photos yet: an initials badge instead of an empty frame, never a stock face (P02-AC1).
 *  When headshots arrive (asset A10), swap the badge for the photo. */
export function TeamGrid({ detailed = false, className }: { detailed?: boolean; className?: string }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {team.map((p) => (
        <li key={p.slug} id={p.slug} className="flex flex-col overflow-hidden rounded-[6px] bg-shell ring-1 ring-line/70">
          <div className="flex items-center gap-4 border-b border-line/70 p-5">
            <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-full bg-sage font-display text-[22px] font-semibold text-moss">
              {initials(p.name)}
            </span>
            <div>
              <h3 className="t-h4">{p.name}</h3>
              <p className="t-caption mt-1">{p.role}</p>
            </div>
          </div>
          <div className="p-5 pt-4">
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
