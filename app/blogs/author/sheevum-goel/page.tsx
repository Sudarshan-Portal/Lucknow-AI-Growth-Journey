import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { BlogArticleCard } from "@/components/BlogArticleCard";
import { BlogSiteFooter } from "@/components/BlogSiteFooter";
import { BlogSiteHeader } from "@/components/BlogSiteHeader";
import { articles } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Editorial Desk | Blogs and Articles for Lucknow AI Digital Journey",
  description: "Articles published by the Lucknow AI Digital Journey Editorial Desk on AI adoption, digital marketing, MSMEs, Indian retail and business growth.",
  alternates: { canonical: siteUrl("/blogs/") },
  robots: { index: false, follow: true },
};

export default function AuthorPage() {
  const latest = [...articles].filter((article) => article.indexable).sort((left, right) => (right.date ?? "").localeCompare(left.date ?? "")).slice(0, 12);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Lucknow AI Digital Journey Editorial Desk",
    url: siteUrl("/blogs/"),
    publisher: {
      "@type": "Organization",
      "@id": "https://blogs.vyapai.in/#publisher",
      name: "Vyapai",
    },
  };
  return (
    <main className="library-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BlogSiteHeader />
      <header className="author-archive-hero">
        <nav className="library-breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/blogs/">Blogs &amp; Articles</Link><span>›</span><b>Editorial Desk</b></nav>
        <div className="author-monogram">ED</div><span className="library-kicker">EDITORIAL DESK</span><h1>LUCKNOW AI DIGITAL JOURNEY</h1>
        <p>Published from Lucknow, Uttar Pradesh by Vyapai, focusing on practical AI adoption, local SEO, retail modernisation, and measurable growth systems for MSMEs and small businesses across India.</p>
        <div><Link href="/blogs/">ALL ARTICLES ↗</Link><a href="https://blogs.vyapai.in/" target="_blank" rel="noreferrer">VYAPAI.IN ↗</a></div>
      </header>
      <section className="author-article-list"><div className="library-section-heading"><span>LATEST ARTICLES</span><h2>RECENT CONTRIBUTIONS</h2></div><div className="library-card-grid">{latest.map((article) => <BlogArticleCard key={article.id} article={article} />)}</div><Link className="library-load-more" href="/blogs/">BROWSE ALL 140 ENTRIES →</Link></section>
      <BlogSiteFooter />
    </main>
  );
}
