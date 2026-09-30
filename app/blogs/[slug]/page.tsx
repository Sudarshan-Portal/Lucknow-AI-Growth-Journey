import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticleCard } from "@/components/BlogArticleCard";
import { BlogSiteFooter } from "@/components/BlogSiteFooter";
import { BlogSiteHeader } from "@/components/BlogSiteHeader";
import {
  articleExcerpt,
  articleImage,
  articles,
  categories,
  categoryCount,
  formatArticleDate,
  getArticle,
  getArticleById,
  getCategory,
  getCategoryArticles,
  getCategoryName,
} from "@/lib/blogs";

export function generateStaticParams() {
  return [...articles.map((article) => ({ slug: article.slug })), ...categories.map((category) => ({ slug: category.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (category) {
    return {
      title: `${category.name} Articles | Sudarshan AI Labs`,
      description: category.description,
      alternates: { canonical: `/blogs/${category.slug}/` },
      openGraph: { title: `${category.name} Articles`, description: category.description, type: "website", url: `/blogs/${category.slug}/` },
    };
  }
  const article = getArticle(slug);
  if (!article) return {};
  const image = articleImage(article);
  return {
    title: article.seoTitle,
    description: article.metaDescription,
    keywords: [article.primaryKeyword, ...article.secondaryKeywords],
    authors: [{ name: article.author, url: "/blogs/author/sheevum-goel/" }],
    alternates: { canonical: `/blogs/${article.slug}/` },
    robots: article.indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      type: "article",
      url: `/blogs/${article.slug}/`,
      publishedTime: article.date ?? undefined,
      authors: ["Sheevum Goel"],
      section: getCategoryName(article.category),
      images: [{ url: image, alt: article.title }],
    },
    twitter: { card: "summary_large_image", title: article.seoTitle, description: article.metaDescription, images: [image] },
  };
}

function RichText({ text }: { text: string }) {
  const pieces = text.split(/(https?:\/\/[^\s]+)/g);
  return <>{pieces.map((piece, index) => piece.startsWith("http") ? <a key={index} href={piece.replace(/[),.;]+$/, "")} target="_blank" rel="nofollow noreferrer">{piece}</a> : piece)}</>;
}

function CategoryPage({ slug }: { slug: string }) {
  const category = getCategory(slug)!;
  const items = getCategoryArticles(slug).sort((left, right) => (right.date ?? "").localeCompare(left.date ?? ""));
  const schema = {
    "@context": "https://schema.org", "@type": "CollectionPage", name: category.name,
    url: `https://ai-digital-marketing-trends-india.sheevumgoel.chatgpt.site/blogs/${category.slug}/`,
    description: category.description,
    breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ai-digital-marketing-trends-india.sheevumgoel.chatgpt.site/" },
      { "@type": "ListItem", position: 2, name: "Blogs & Articles", item: "https://ai-digital-marketing-trends-india.sheevumgoel.chatgpt.site/blogs/" },
      { "@type": "ListItem", position: 3, name: category.name },
    ] },
  };
  return (
    <main className="library-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BlogSiteHeader />
      <header className="category-hero">
        <nav className="library-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/blogs/">Blogs &amp; Articles</Link><span>›</span><b>{category.name}</b></nav>
        <span className="library-kicker">CATEGORY · {items.length} ARTICLES</span>
        <h1>{category.name}</h1><p>{category.description}</p>
      </header>
      <section className="category-listing">
        <div className="library-card-grid">{items.map((article) => <BlogArticleCard key={article.id} article={article} />)}</div>
        <div className="related-category-links"><b>EXPLORE RELATED CATEGORIES</b>{categories.filter((item) => item.slug !== slug).slice(0, 5).map((item) => <Link key={item.slug} href={`/blogs/${item.slug}/`}>{item.name} · {categoryCount(item.slug)}</Link>)}</div>
      </section>
      <BlogSiteFooter />
    </main>
  );
}

function ArticlePage({ slug }: { slug: string }) {
  const article = getArticle(slug)!;
  const related = article.relatedIds.map(getArticleById).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const categoryName = getCategoryName(article.category);
  const firstParagraph = articleExcerpt(article);
  const articleSchema = {
    "@context": "https://schema.org", "@type": "BlogPosting", headline: article.title,
    description: article.metaDescription, url: article.canonical, mainEntityOfPage: article.canonical,
    datePublished: article.date ?? undefined, dateModified: article.date ?? undefined, inLanguage: "en-IN",
    image: `https://ai-digital-marketing-trends-india.sheevumgoel.chatgpt.site${articleImage(article)}`,
    articleSection: categoryName, wordCount: article.wordCount,
    author: { "@type": "Person", name: "Sheevum Goel", url: "https://ai-digital-marketing-trends-india.sheevumgoel.chatgpt.site/blogs/author/sheevum-goel/", sameAs: ["https://www.linkedin.com/in/sheevumgoel", "https://medium.com/@sheevumgoel"] },
    publisher: { "@type": "Organization", name: "Sudarshan AI Labs", url: "https://vyapai.in/" },
  };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ai-digital-marketing-trends-india.sheevumgoel.chatgpt.site/" },
    { "@type": "ListItem", position: 2, name: "Blogs & Articles", item: "https://ai-digital-marketing-trends-india.sheevumgoel.chatgpt.site/blogs/" },
    { "@type": "ListItem", position: 3, name: categoryName, item: `https://ai-digital-marketing-trends-india.sheevumgoel.chatgpt.site/blogs/${article.category}/` },
    { "@type": "ListItem", position: 4, name: article.title },
  ] };

  return (
    <main className="library-shell article-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BlogSiteHeader />
      <header className="article-hero">
        <nav className="library-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/blogs/">Blogs &amp; Articles</Link><span>›</span><Link href={`/blogs/${article.category}/`}>{categoryName}</Link><span>›</span><b>Article</b></nav>
        <div className="article-hero-grid">
          <div>
            <div className="article-labels"><Link href={`/blogs/${article.category}/`}>{categoryName}</Link><span>POST #{article.id}</span>{!article.indexable && <b>{article.status === "draft" ? "DRAFT · NOINDEX" : "MANUAL REVIEW · NOINDEX"}</b>}</div>
            <h1>{article.title}</h1>
            <p className="article-deck">{firstParagraph}</p>
            <div className="article-byline"><Link href="/blogs/author/sheevum-goel/"><span>SG</span><b>Sheevum Goel<small>Founder, Sudarshan AI Labs</small></b></Link><p><time>{formatArticleDate(article.date)}</time><span>{article.readingMinutes} min read</span><span>{article.wordCount.toLocaleString("en-IN")} words</span></p></div>
          </div>
          <figure><img src={articleImage(article)} alt={article.coverAlt ?? article.title} fetchPriority="high" decoding="async" /><figcaption>{categoryName} · Archive story</figcaption></figure>
        </div>
      </header>

      <div className="article-layout">
        <aside className="article-sidebar">
          <span>ARTICLE MAP</span><h2>IN THIS STORY</h2>
          <p><b>Primary keyword</b>{article.primaryKeyword}</p>
          <p><b>Category</b><Link href={`/blogs/${article.category}/`}>{categoryName}</Link></p>
          <p><b>Original status</b>{article.status === "draft" ? "Draft in archive" : `Published ${formatArticleDate(article.date)}`}</p>
          {article.mediumUrl && <a className="sidebar-link" href={article.mediumUrl} target="_blank" rel="noreferrer">View original Medium post ↗</a>}
          <a className="sidebar-cta" href="https://vyapai.in/" target="_blank" rel="noreferrer">GROW YOUR BUSINESS ↗</a>
        </aside>
        <article className="article-content">
          {!article.indexable && <div className="review-notice"><b>ARCHIVE REVIEW NOTE</b><p>This entry is preserved for completeness but excluded from search indexing because the source marks it as a draft, placeholder, empty item or very short post. It needs an editorial review before canonical publication.</p></div>}
          {article.blocks.length ? article.blocks.map((block, index) => {
            if (block.type === "heading") return <h2 key={index}>{block.text}</h2>;
            if (block.type === "quote") return <blockquote key={index}>{block.text}</blockquote>;
            if (block.type === "list") return <ul key={index}>{block.items.map((item, itemIndex) => <li key={itemIndex}><RichText text={item} /></li>)}</ul>;
            return <p key={index}><RichText text={block.text} /></p>;
          }) : <div className="empty-article"><h2>Source content unavailable</h2><p>The PDF archive contains a record for this entry but no extractable article body. The URL is reserved so the article is not silently lost.</p></div>}

          <section className="article-author-box">
            <span>SG</span><div><small>ABOUT THE AUTHOR</small><h2>Sheevum Goel</h2><p>Founder of Sudarshan AI Labs, writing about practical AI adoption, digital growth, Indian MSMEs and the changing retail ecosystem from Lucknow.</p><Link href="/blogs/author/sheevum-goel/">VIEW AUTHOR ARCHIVE ↗</Link></div>
          </section>
          <section className="article-pathways"><small>CONTINUE THE TOPIC</small><h2>Useful next reads</h2>{related.slice(0, 5).map((item) => <Link key={item.id} href={`/blogs/${item.slug}/`}><span>{getCategoryName(item.category)}</span><b>{item.title}</b><i>↗</i></Link>)}</section>
        </article>
      </div>

      <section className="related-articles"><div className="library-section-heading"><span>RELATED ARTICLES</span><h2>KEEP EXPLORING</h2></div><div className="library-card-grid">{related.slice(0, 3).map((item) => <BlogArticleCard key={item.id} article={item} compact />)}</div></section>
      <BlogSiteFooter />
    </main>
  );
}

export default async function BlogOrCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (getCategory(slug)) return <CategoryPage slug={slug} />;
  if (getArticle(slug)) return <ArticlePage slug={slug} />;
  notFound();
}
