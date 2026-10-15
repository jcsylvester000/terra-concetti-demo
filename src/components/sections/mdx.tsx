import Link from "next/link";
import type { ComponentProps } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { Media } from "@/components/ui/media";
import { images, type ImageKey } from "@/content/images";
import { slugify } from "@/lib/journal";

function Figure({ image, caption }: { image: ImageKey; caption?: string }) {
  if (!(image in images)) throw new Error(`MDX <Figure>: unknown image "${image}"`);
  return (
    <figure className="not-prose my-8">
      <Media image={image} sizes="(min-width: 768px) 720px, 100vw" className="rounded-[6px]" />
      {caption ? <figcaption className="t-caption mt-2">{caption}</figcaption> : null}
    </figure>
  );
}

function A({ href = "", children, ...rest }: ComponentProps<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) return <Link href={href}>{children}</Link>;
  return (
    <a href={href} rel="noopener" target="_blank" {...rest}>
      {children}
    </a>
  );
}

function H2({ children }: { children?: React.ReactNode }) {
  const text = typeof children === "string" ? children : String(children ?? "");
  return (
    <h2 id={slugify(text)} className="scroll-mt-24">
      {children}
    </h2>
  );
}

export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true, blockJS: true },
    components: { Figure, a: A, h2: H2 },
  });
  return content;
}
