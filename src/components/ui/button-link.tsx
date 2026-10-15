import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";

/**
 * Navigation buttons (links between pages). These are NOT contact buttons; contact actions are
 * held in Phase 1 (D2). 48 px tall, 2 px radius, 16 px label (BRD §6.8).
 */
const variants = {
  primary: "bg-moss text-white hover:bg-forest",
  secondary: "border border-forest text-forest hover:bg-forest hover:text-shell",
  onDark: "bg-gold text-forest hover:bg-shell",
  outlineLight: "border border-shell/80 text-shell hover:bg-shell hover:text-forest",
  accent: "bg-[var(--accent-strong)] text-white hover:brightness-110",
} as const;

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof variants }) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-[2px] px-6 text-[16px] font-medium transition-colors duration-200 ease-out",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

/** Text link with a Sand Gold underline and arrow. */
export function TextLink({ className, children, onDark, ...props }: ComponentProps<typeof Link> & { onDark?: boolean }) {
  return (
    <Link
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 border-b-2 border-gold pb-0.5 font-medium transition-colors",
        onDark ? "text-shell hover:text-gold" : "text-moss hover:text-forest",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
