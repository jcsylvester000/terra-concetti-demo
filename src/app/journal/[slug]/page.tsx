import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Section } from "@/components/ui/layout";
import { Media } from "@/components/ui/media";
import { ContactBlock } from "@/components/ui/contact";
import { Monogram } from "@/components/ui/monogram";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProjectCard } from "@/components/sections/project-card";
import { ArticleCard } from "@/components/sections/article-card";
import { renderMdx } from "@/components/sections/mdx";
import { articlePath, formatDate, getArticle, getArticles, pillarFor } from "@/lib/journal";
import { getAuthor } from "@/content/team";
import { getProject } from "@/content/projects";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, orgId } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/env";

export const dynamicParams = false;
export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({
    title: a.seoTitle ?? a.title,
    absoluteTitle: !!a.seoTitle,
    description: a.description,
    path: articlePath(a),
    type: "article",
    publishedTime: a.date,
    modifiedTime: a.updated ?? a.date,
    image: images[a.hero].src.src,
    imageAlt: images[a.hero].alt,
  });
}

/** P14 Journal article template. */
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const author = getAuthor(a.author)!;
  const project = getProject(a.relatedProject)!;
  const pillar = pillarFor[a.category];
  const content = await renderMdx(a.body);
  const related = getArticles().filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="py-10 md:py-14">
          <Container>
            <Breadcrumbs items={[{ name: "Journal", path: "/journal" }, { name: a.title, path: articlePath(a) }]} />
            <div className="mt-10 max-w-3xl">
              <p className="t-eyebrow text-bronze">
                <Link href={pillar.path} className="hover:text-forest">{a.category}</Link>
              </p>
              <h1 className="t-display-xl mt-4">{a.title}</h1>
              <p className="t-lead mt-5 text-forest/85">{a.excerpt}</p>
              <p className="t-caption mt-6">
                By {author.name} · <time dateTime={a.date}>{formatDate(a.date)}</time>
                {a.updated && a.updated !== a.date ? <> · Updated <time dateTime={a.updated}>{formatDate(a.updated)}</time></> : null} · {a.readingMinutes} min read
              </p>
            </div>
          </Container>
        </header>
        <Container>
          <Media image={a.hero} sizes="(min-width: 1280px) 1216px, 100vw" priority className="max-h-[70vh] rounded-[6px]" imgClassName="max-h-[70vh] object-cover" />
        </Container>
        <Section className="pt-12 md:pt-16">
          <Container className="grid gap-12 lg:grid-cols-[1fr_280px]">
            <div className="prose-tc min-w-0 text-[17px] leading-[1.75] text-forest/90 md:text-[18px]">{content}</div>
            <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
              {a.headings.length >= 3 ? (
                <nav aria-label="In this article" className="rounded-[6px] bg-shell p-5 ring-1 ring-line/70">
                  <p className="t-eyebrow !text-[11px] text-bronze">In this article</p>
                  <ol className="mt-3 space-y-1.5 text-[15px]">
                    {a.headings.map((h) => (
                      <li key={h.id}><a href={`#${h.id}`} className="text-forest/80 hover:text-forest hover:underline">{h.text}</a></li>
                    ))}
                  </ol>
                </nav>
              ) : null}
              <div className="rounded-[6px] bg-sage p-5">
                <p className="t-eyebrow !text-[11px] text-bronze">About the author</p>
                <div className="mt-3 flex items-center gap-3">
                  <span aria-hidden className="grid size-11 place-items-center rounded-full bg-moss text-shell"><Monogram className="w-3" /></span>
                  <div>
                    <p className="font-semibold">{author.name}</p>
                    <p className="t-caption">{author.role}</p>
                  </div>
                </div>
                <p className="mt-3 text-[15px] leading-6 text-forest/80">{author.short}</p>
              </div>
            </aside>
          </Container>
        </Section>
      </article>

      <Section tone="shell">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div>
            <p className="t-eyebrow text-bronze">Related destination</p>
            <h2 className="t-display mt-3">See it for yourself</h2>
            <p className="mt-4 text-forest/80">Explore the homes, the masterplan and the views, or read our <Link href={pillar.path} className="underline decoration-gold decoration-2 underline-offset-4">{pillar.label}</Link> guide.</p>
          </div>
          <div className="max-w-md"><ProjectCard project={project} /></div>
        </Container>
      </Section>

      {related.length ? (
        <Section>
          <Container>
            <h2 className="t-display">More from the Journal</h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((r) => <li key={r.slug}><ArticleCard article={r} /></li>)}
            </ul>
          </Container>
        </Section>
      ) : null}

      <ContactBlock />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.description,
          image: [absoluteUrl(images[a.hero].src.src)],
          datePublished: a.date,
          dateModified: a.updated ?? a.date,
          author: author.isPerson ? { "@type": "Person", name: author.name, jobTitle: author.role } : { "@type": "Organization", name: author.name, url: absoluteUrl("/journal") },
          publisher: { "@type": "Organization", "@id": orgId(), name: site.legalName, logo: { "@type": "ImageObject", url: absoluteUrl("/brand/logo-square.png") } },
          mainEntityOfPage: absoluteUrl(articlePath(a)),
          articleSection: a.category,
          wordCount: a.words,
        }}
      />
    </>
  );
}
