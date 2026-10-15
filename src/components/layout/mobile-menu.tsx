"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/logo";
import { isActive } from "./nav-link";
import type { ReactNode } from "react";

/** Full-screen mobile menu: focus trapped, background scroll locked, ≥ 44 px targets (N-AC5). */
export function MobileMenu({
  items,
  destinations,
  contact,
}: {
  items: { label: string; href: string }[];
  destinations: { href: string; name: string }[];
  contact?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="grid size-11 place-items-center rounded-[2px] text-forest" aria-label="Open menu">
        <Menu aria-hidden strokeWidth={1.5} className="size-6" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-linen data-[state=open]:animate-[tc-fade_250ms_ease-out]">
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
          <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-line px-4">
            <span onClick={() => setOpen(false)}>
              <Logo />
            </span>
            <Dialog.Close className="grid size-11 place-items-center text-forest" aria-label="Close menu">
              <X aria-hidden strokeWidth={1.5} className="size-6" />
            </Dialog.Close>
          </div>
          <nav aria-label="Mobile" className="px-4 py-6">
            <ul className="divide-y divide-line">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn("flex min-h-14 items-center font-display text-[28px] font-semibold", isActive(pathname, item.href) ? "text-moss" : "text-forest")}
                  >
                    {item.label}
                  </Link>
                  {item.href === "/destinations" ? (
                    <ul className="-mt-1 mb-3 space-y-1 pl-1">
                      {destinations.map((d) => (
                        <li key={d.href}>
                          <Link href={d.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center text-[16px] text-forest/80">
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
