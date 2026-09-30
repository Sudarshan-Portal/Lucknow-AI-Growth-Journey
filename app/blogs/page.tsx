import type { Metadata } from "next";
import Link from "next/link";
import { BlogArticleCard } from "@/components/BlogArticleCard";
import { BlogSiteFooter } from "@/components/BlogSiteFooter";
import { BlogSiteHeader } from "@/components/BlogSiteHeader";
import { articles, categories, categoryCount, indexableArticles } from "@/lib/blogs";
import { BlogExplorer } from "./BlogExplorer";

export const metadata: Metadata = {
  title: "Blogs & Articles | Sudarshan AI Labs",
  description: "Explore 140 articles by Sheevum Goel on AI, digital marketing, SEO, MSME growth, kirana retail, quick commerce and technology in India.",
  alternates: { canonical: "/blogs/" },
  openGraph: {
    title: "Blogs & Articles | Sudarshan AI Labs",
    description: "A 140-article knowledge library for Indian businesses, founders and MSMEs.",
    type: "website",
    url: "/blogs/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Sudarshan AI Labs knowledge library" }],
  },
  twitter: { card: "summary_large_image", title: "Blogs & Articles | Sudarshan AI Labs", description: "A 140-article knowledge library for Indian businesses, founders and MSMEs.", images: ["/og.png"] },
};

export default function BlogsPage() {
  const latest = [...indexableArticles].sort((left, right) => (right.date ?? "").localeCompare(left.date ?? "")).slice(0, 6);
  const featured = [135, 134, 127].map((id) => articles.find((article) => article.id === id)).filter((article): article is NonNullable<typeof article> => Boolean(article));
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blogs & Articles",
    url: "https://ai-digital-marketing-trends-india.sheevumgoel.chatgpt.site/blogs/",
    description: "A structured archive of 140 articles by Sheevum Goel.",
    isPartOf: { "@type": "WebSite", name: "Sudarshan AI Labs", url: "https://ai-digital-marketing-trends-india.sheevumgoel.chatgpt.site" },
    author: { "@type": "Person", name: "Sheevum Goel", url: "https://ai-digital-marketing-trends-india.sheevumgoel.chatgpt.site/blogs/author/sheevum-goel/" },
    mainEntity: { "@type": "ItemList", numberOfItems: indexableArticles.length, itemListElement: latest.map((article, index) => ({ "@type": "ListItem", position: index + 1, name: article.title, url: article.canonical })) },
  };

  return (
    <main className="library-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <BlogSiteHeader />
      <header className="library-hero">
        <div className="library-hero-copy">
          <span className="library-kicker">FIELD NOTES · COMPLETE ARCHIVE</span>
          <h1>BLOGS <em>&amp;</em><br />ARTICLES</h1>
          <p>Ideas, investigations and practical playbooks spanning AI, marketing, local business, Indian retail and MSME growth.</p>
          <div className="library-hero-actions"><a href="#all-articles-title">EXPLORE THE ARCHIVE ↓</a><Link href="/blogs/author/sheevum-goel/">MEET THE AUTHOR ↗</Link></div>
        </div>
        <div className="library-hero-board" aria-label="Archive overview">
          <span>ISSUE</span><b>140</b><strong>ENTRIES</strong>
          <p>2024—2026</p>
          <i>LUCKNOW / INDIA</i>
        </div>
      </header>

      <section className="library-featured" id="featured">
        <div className="library-section-heading inverse"><span>EDITOR&apos;S BOARD</span><h2>FEATURED STORIES</h2><p>Three useful starting points from the complete archive.</p></div>
        <div className="library-card-grid library-featured-grid">{featured.map((article) => <BlogArticleCard key={article.id} article={article} />)}</div>
      </section>

      <section className="library-categories" id="categories">
        <div className="library-section-heading"><span>TOPIC MAP</span><h2>10 STRONG CATEGORIES</h2><p>The complete archive has been grouped by primary search intent, without creating dozens of thin categories.</p></div>
        <div className="category-board">
          {categories.map((category, index) => (
            <Link key={category.slug} href={`/blogs/${category.slug}/`}>
              <small>{String(index + 1).padStart(2, "0")}</small><h3>{category.name}</h3><p>{category.description}</p><b>{categoryCount(category.slug)} ARTICLES <i>↗</i></b>
            </Link>
          ))}
        </div>
      </section>

      <section className="library-latest" id="latest">
        <div className="library-section-heading"><span>RECENTLY PUBLISHED</span><h2>LATEST ARTICLES</h2></div>
        <div className="library-card-grid">{latest.map((article) => <BlogArticleCard key={article.id} article={article} compact />)}</div>
      </section>

      <BlogExplorer items={articles} categories={categories} />
      <BlogSiteFooter />
    </main>
  );
}
