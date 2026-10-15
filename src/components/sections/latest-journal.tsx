import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { TextLink } from "@/components/ui/button-link";
import { ArticleCard } from "./article-card";
import { getArticles } from "@/lib/journal";

/** P01 §8: the three latest journal articles. Hidden until at least three exist. */
export function LatestJournal() {
  const latest = getArticles().slice(0, 3);
  if (latest.length < 3) return null;
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Journal" title="Stories from the coast" lead="Guides to Anilao, how we build and what is happening at our destinations." />
          <TextLink href="/journal" className="shrink-0">All articles</TextLink>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {latest.map((a) => (
            <li key={a.slug}><ArticleCard article={a} /></li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
