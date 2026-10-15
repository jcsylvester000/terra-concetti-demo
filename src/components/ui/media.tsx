import Image from "next/image";
import { cn } from "@/lib/cn";
import { images, type ImageKey, type SiteImage } from "@/content/images";

const RENDER_NOTE = "Artist’s perspective. Final design may change.";

export function captionFor(image: SiteImage, notToScale = false) {
  if (image.kind === "render") return notToScale ? "Artist’s perspective, not to scale." : RENDER_NOTE;
  if (image.kind === "concept") return "Concept imagery.";
  if (image.credit) return `Photo: ${image.credit}`;
  return null;
}

/**
 * Every image goes through here so renders always carry "Artist’s perspective" (BRD M-AC2),
 * width/height are always known (M-AC1) and only the LCP image is eager (M-AC3).
 */
export function Media({
  image,
  sizes,
  priority = false,
  className,
  imgClassName,
  fill = false,
  caption = "overlay",
  notToScale,
  quality,
}: {
  image: ImageKey | SiteImage;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  fill?: boolean;
  caption?: "overlay" | "below" | "none";
  notToScale?: boolean;
  quality?: number;
}) {
  const img = typeof image === "string" ? images[image] : image;
  const note = captionFor(img, notToScale);
  const positioned = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className ?? "");
  return (
    <figure className={cn(positioned ? "overflow-hidden" : "relative overflow-hidden", className)}>
      <Image
        src={img.src}
        alt={img.alt}
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        placeholder={priority ? "empty" : "blur"}
        quality={quality ?? 80}
        className={cn(fill ? "absolute inset-0 h-full w-full object-cover" : "h-auto w-full", imgClassName)}
        {...(fill ? { fill: true } : {})}
      />
      {note && caption === "overlay" ? (
        <figcaption className="pointer-events-none absolute bottom-0 left-0 m-2 rounded-[2px] bg-forest/70 px-2 py-1 text-[12px] leading-4 text-shell backdrop-blur-[2px]">
          {note}
        </figcaption>
      ) : null}
      {note && caption === "below" ? <figcaption className="t-caption mt-2">{note}</figcaption> : null}
    </figure>
  );
}
