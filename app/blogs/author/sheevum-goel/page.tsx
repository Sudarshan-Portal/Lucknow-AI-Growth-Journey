import type { Metadata } from "next";
import Link from "next/link";
import { BlogArticleCard } from "@/components/BlogArticleCard";
import { BlogSiteFooter } from "@/components/BlogSiteFooter";
import { BlogSiteHeader } from "@/components/BlogSiteHeader";
import { articles, categories } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Sheevum Goel | Author at Sudarshan AI Labs",
  description: "Read articles by Sheevum Goel, founder of Sudarshan AI Labs, on AI adoption, digital marketing, MSMEs, Indian retail and Lucknow business growth.",
  alternates: { canonical: "/blogs/author/sheevum-goel/" },
};

export default function AuthorPage() {
  const latest = [...articles].filter((article) => article.indexable).sort((left, right) => (right.date ?? "").localeCompare(left.date ?? "")).slice(0, 12);
  const schema = { "@context": "https://schema.org", "@type": "Person", name: "Sheevum Goel", jobTitle: "Founder, Sudarshan AI Labs", url: "https://ai-digital-marketing-trends-india.sheevumgoel.chatgpt.site/blogs/author/sheevum-goel/", sameAs: ["https://www.linkedin.com/in/sheevumgoel", "https://medium.com/@sheevumgoel"], worksFor: { "@type": "Organization", name: "Sudarshan AI Labs", url: "https://vyapai.in/" }, knowsAbout: categories.map((category) => category.name) };
  return (
    <main className="library-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BlogSiteHeader />
      <header className="author-archive-hero">
        <nav className="library-breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/blogs/">Blogs &amp; Articles</Link><span>›</span><b>Author</b></nav>
        <div className="author-monogram">SG</div><span className="library-kicker">AUTHOR ARCHIVE</span><h1>SHEEVUM GOEL</h1>
        <p>Founder of Sudarshan AI Labs, writing from Lucknow about practical AI adoption, digital marketing, Indian MSMEs and the changing retail ecosystem.</p>
        <div><a href="https://www.linkedin.com/in/sheevumgoel" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="https://medium.com/@sheevumgoel" target="_blank" rel="noreferrer">MEDIUM ↗</a><a href="https://vyapai.in/" target="_blank" rel="noreferrer">SUDARSHAN AI LABS ↗</a></div>
      </header>
      <section className="author-article-list"><div className="library-section-heading"><span>LATEST BY SHEEVUM</span><h2>RECENT ARTICLES</h2></div><div className="library-card-grid">{latest.map((article) => <BlogArticleCard key={article.id} article={article} />)}</div><Link className="library-load-more" href="/blogs/">BROWSE ALL 140 ENTRIES →</Link></section>
      <BlogSiteFooter />
    </main>
  );
}
