import { cn } from "@/lib/cn";
import type { ComponentProps, ElementType, ReactNode } from "react";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8", className)} {...props} />;
}

const tones = {
  linen: "bg-linen text-forest",
  shell: "bg-shell text-forest",
  sage: "bg-sage text-forest",
  moss: "bg-moss text-shell",
  forest: "bg-forest text-shell",
  mist: "bg-ov-mist text-forest",
} as const;
export type Tone = keyof typeof tones;

export function Section({
  tone = "linen",
  className,
  children,
  as: Tag = "section",
  ...props
}: { tone?: Tone; as?: ElementType; children: ReactNode } & Omit<ComponentProps<"section">, "children">) {
  return (
    <Tag className={cn("py-16 md:py-24", tones[tone], className)} data-tone={tone} {...props}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ className, onDark, ...props }: ComponentProps<"p"> & { onDark?: boolean }) {
  return <p className={cn("t-eyebrow", onDark ? "text-gold" : "text-bronze", className)} {...props} />;
}

/** Section heading block: eyebrow + H2 + optional lead. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  onDark,
  align = "left",
  className,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  onDark?: boolean;
  align?: "left" | "center";
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow> : null}
      <h2 id={id} className={cn("t-display mt-3", onDark ? "text-shell" : "text-forest")}>
        {title}
      </h2>
      {lead ? <p className={cn("t-lead mt-5", onDark ? "text-shell/85" : "text-forest/85")}>{lead}</p> : null}
    </div>
  );
}
