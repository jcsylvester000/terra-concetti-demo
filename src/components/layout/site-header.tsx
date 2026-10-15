import Link from "next/link";
import { primaryNav } from "@/content/navigation";
import { projects, projectPath, statusLabel } from "@/content/projects";
import { images } from "@/content/images";
import { Logo } from "@/components/ui/logo";
import { DestinationsMenu } from "./destinations-menu";
import { MobileMenu } from "./mobile-menu";
import { NavLink } from "./nav-link";
import { ContactDetails } from "@/components/ui/contact";

export function SiteHeader() {
  const destinations = projects.map((p) => ({
    href: projectPath(p),
    name: p.nameWithPlace,
    location: p.location,
    status: statusLabel(p),
    image: images[p.cardImage].src,
    alt: images[p.cardImage].alt,
  }));
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-linen/95 backdrop-blur supports-[backdrop-filter]:bg-linen/85">
      <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between gap-6 px-4 md:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) =>
              item.megaMenu === "destinations" ? (
                <li key={item.href}>
                  <DestinationsMenu label={item.label} href={item.href} items={destinations} />
                </li>
              ) : (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>
        {/* Reserved slot for the "Book a site visit" button (held, decision D2). */}
        <div className="lg:hidden">
          <MobileMenu items={primaryNav.map(({ label, href }) => ({ label, href }))} destinations={destinations.map(({ href, name }) => ({ href, name }))}
            contact={<ContactDetails compact />}
          />
        </div>
      </div>
      <Link href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-20 focus:z-50 focus:bg-shell focus:px-4 focus:py-2">
        Skip to main content
      </Link>
    </header>
  );
}
