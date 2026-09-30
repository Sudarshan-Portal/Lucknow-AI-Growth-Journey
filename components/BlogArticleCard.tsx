import Link from "next/link";
import { articleExcerpt, articleImage, formatArticleDate, getCategoryName, type BlogArticle } from "@/lib/blogs";

export function BlogArticleCard({ article, compact = false }: { article: BlogArticle; compact?: boolean }) {
  const excerpt = articleExcerpt(article);
  return (
    <article className={`library-card${compact ? " library-card-compact" : ""}`}>
      <Link className="library-card-image" href={`/blogs/${article.slug}/`} aria-label={`Read ${article.title}`}>
        <img src={articleImage(article)} alt="" loading="lazy" decoding="async" />
        <span>{getCategoryName(article.category)}</span>
      </Link>
      <div className="library-card-body">
        <div className="library-card-meta">
          <time>{formatArticleDate(article.date)}</time>
          <span>{article.readingMinutes} min read</span>
          {!article.indexable && <b>{article.status === "draft" ? "DRAFT" : "REVIEW"}</b>}
        </div>
        <h3><Link href={`/blogs/${article.slug}/`}>{article.title}</Link></h3>
        {!compact && <p>{excerpt.length > 175 ? `${excerpt.slice(0, 172).trim()}…` : excerpt}</p>}
        <Link className="library-card-cta" href={`/blogs/${article.slug}/`}>READ ARTICLE <i>↗</i></Link>
      </div>
    </article>
  );
}
