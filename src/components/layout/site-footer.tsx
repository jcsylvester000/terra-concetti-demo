import Link from "next/link";
import { footerNav, legalNav } from "@/content/navigation";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { Logo } from "@/components/ui/logo";
import { Monogram } from "@/components/ui/monogram";
import { ContactDetails } from "@/components/ui/contact";
import { CookieSettingsButton } from "@/components/consent/cookie-settings-button";
import { gtmId } from "@/lib/env";

export function SiteFooter() {
  const year = 2026;
  const selling = projects.filter((p) => p.template === "project");
  return (
    <footer className="relative overflow-hidden bg-forest text-shell">
      <Monogram className="pointer-events-none absolute -right-10 -bottom-16 w-[260px] text-shell opacity-[0.05]" />
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-16 pb-10 md:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo onDark />
            <p className="mt-5 max-w-sm text-shell/80">
              {site.tagline}. Sustainable coastal communities in the Philippines, beginning above the reefs of Anilao.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <p className="t-eyebrow text-gold">{col.heading}</p>
                <ul className="mt-4 space-y-1">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="inline-flex min-h-9 items-center text-shell/85 hover:text-gold">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <p className="t-eyebrow text-gold">Contact</p>
              <ContactDetails onDark compact className="mt-4 text-shell/90" />
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-shell/15 pt-6 text-[13px] leading-5 text-shell/65">
          <p className="max-w-4xl">
            {selling.map((p, i) => (
              <span key={p.slug}>
                {p.nameWithPlace}: DHSUD registration and License to Sell no.{" "}
                {site.licenseToSell[p.slug] ?? "to be published once issued"}.{i < selling.length - 1 ? " " : ""}
              </span>
            ))}{" "}
            Renders are artist&apos;s perspectives; plans, specifications and availability may change. Nothing on this site is an offer to sell.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} {site.legalName}. All rights reserved.</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {legalNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-9 items-center hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
              {gtmId ? (
                <li>
                  <CookieSettingsButton />
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
