import Link from "next/link";
import Image from "next/image";
import { images } from "@/content/images";
import { articlePath, formatDate, type ArticleMeta } from "@/lib/journal";

/** Journal card: image, category, title, excerpt, date, reading time (BRD P13). */
export function ArticleCard({ article, headingLevel = "h3" }: { article: ArticleMeta; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const img = images[article.hero];
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[6px] bg-shell ring-1 ring-line/70">
      <Link href={articlePath(article)} className="flex flex-1 flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-sage">
          <Image src={img.src} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" placeholder="blur" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="t-eyebrow !text-[11px] text-bronze">{article.category}</p>
          <H className="t-h4 mt-2 group-hover:underline group-hover:decoration-gold group-hover:decoration-2 group-hover:underline-offset-4">{article.title}</H>
          <p className="mt-2 text-[15px] leading-6 text-forest/80">{article.excerpt}</p>
          <p className="t-caption mt-auto pt-4">
            <time dateTime={article.date}>{formatDate(article.date)}</time> · {article.readingMinutes} min read
          </p>
        </div>
      </Link>
    </article>
  );
}
