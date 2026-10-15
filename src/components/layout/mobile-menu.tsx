"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/logo";
import { isActive } from "./nav-link";

/**
 * Full-screen mobile menu on the native <dialog> element (no dialog library, smaller JS).
 * showModal() makes the rest of the page inert (focus stays inside), Escape closes it, background
 * scroll is locked while open, targets are ≥ 44 px (N-AC5).
 */
export function MobileMenu({
  items,
  destinations,
  contact,
}: {
  items: { label: string; href: string }[];
  destinations: { href: string; name: string }[];
  contact?: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname() ?? "/";

  const open = () => {
    ref.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };
  const close = () => ref.current?.close();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => (document.documentElement.style.overflow = "");
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    ref.current?.close();
  }, [pathname]);

  return (
    <>
      <button type="button" onClick={open} className="grid size-11 place-items-center rounded-[2px] text-forest" aria-label="Open menu" aria-haspopup="dialog">
        <Menu aria-hidden strokeWidth={1.5} className="size-6" />
      </button>
      <dialog
        ref={ref}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-linen p-0 text-forest backdrop:bg-forest/40 open:flex open:flex-col open:animate-[tc-fade_250ms_ease-out]"
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-line px-4">
          <span onClick={close}>
            <Logo />
          </span>
          <button type="button" onClick={close} className="grid size-11 place-items-center text-forest" aria-label="Close menu" autoFocus>
            <X aria-hidden strokeWidth={1.5} className="size-6" />
          </button>
        </div>
        <nav aria-label="Mobile" className="overflow-y-auto px-4 py-6">
          <ul className="divide-y divide-line">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn("flex min-h-14 items-center font-display text-[28px] font-semibold", isActive(pathname, item.href) ? "text-moss" : "text-forest")}
                >
                  {item.label}
                </Link>
                {item.href === "/destinations" ? (
                  <ul className="-mt-1 mb-3 space-y-1 pl-1">
                    {destinations.map((d) => (
                      <li key={d.href}>
                        <Link href={d.href} onClick={close} className="flex min-h-11 items-center text-[16px] text-forest/80">
                          {d.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
        {contact ? <div className="mt-auto border-t border-line bg-shell px-4 py-6">{contact}</div> : null}
      </dialog>
    </>
  );
}
