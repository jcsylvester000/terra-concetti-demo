import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/layout";
import { ContactBlock } from "@/components/ui/contact";
import { SimpleHero } from "@/components/sections/simple-hero";
import { ArticleCard } from "@/components/sections/article-card";
import { categories, getArticles, slugify, articlePath } from "@/lib/journal";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/env";

export const metadata: Metadata = pageMetadata({
  title: "Journal | Anilao Living, Diving & Ownership | Terra Concetti",
  description: "Guides to Anilao and its dive sites, how we build sustainably, ownership explained and updates from Terra Concetti's destinations.",
  path: "/journal",
  absoluteTitle: true,
});

/** P13 Journal index: category links (in-page), cards, newest first. Pagination added past 12 articles. */
export default function JournalPage() {
  const articles = getArticles();
  const used = categories.filter((c) => articles.some((a) => a.category === c));
  return (
    <>
      <SimpleHero
        crumbs={[{ name: "Journal", path: "/journal" }]}
        eyebrow="Journal"
        title="Stories from the coast"
        lead="Guides to Anilao and its reefs, how we build, how ownership works, and updates from our destinations."
      />
      <nav aria-label="Categories" className="border-y border-line bg-shell">
        <Container>
          <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 py-2">
            {used.map((c) => (
              <li key={c} className="shrink-0">
                <a href={`#${slugify(c)}`} className="inline-flex min-h-11 items-center px-3 text-[15px] font-medium text-forest/80 hover:text-forest">{c}</a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
      <Section>
        <Container>
          <h2 className="sr-only">Latest articles</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug}><ArticleCard article={a} /></li>
            ))}
          </ul>
        </Container>
      </Section>
      {used.map((c) => (
        <section key={c} id={slugify(c)} aria-labelledby={`cat-${slugify(c)}`} className="scroll-mt-24 border-t border-line py-12">
          <Container>
            <h2 id={`cat-${slugify(c)}`} className="t-display">{c}</h2>
            <ul className="mt-6 space-y-2">
              {articles.filter((a) => a.category === c).map((a) => (
                <li key={a.slug}>
                  <a href={articlePath(a)} className="inline-flex min-h-11 items-center font-medium text-moss underline decoration-gold decoration-2 underline-offset-4 hover:text-forest">{a.title}</a>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ))}
      <ContactBlock />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Terra Concetti Journal",
          url: absoluteUrl("/journal"),
          blogPost: articles.map((a) => ({ "@type": "BlogPosting", headline: a.title, url: absoluteUrl(articlePath(a)), datePublished: a.date })),
        }}
      />
    </>
  );
}
