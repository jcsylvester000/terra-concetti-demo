"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const pathname = usePathname() ?? "/";
  const active = isActive(pathname, href);
  return (
    <Link
      href={href}
      aria-current={pathname === href ? "page" : undefined}
      className={cn(
        "relative inline-flex min-h-11 items-center px-3 text-[15px] font-medium text-forest/85 transition-colors hover:text-forest",
        "after:absolute after:inset-x-3 after:bottom-2 after:h-[2px] after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300",
        active && "text-forest after:scale-x-100",
        "hover:after:scale-x-100",
        className,
      )}
    >
      {children}
    </Link>
  );
}
