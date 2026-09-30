"use client";

import { useMemo, useState } from "react";
import { BlogArticleCard } from "@/components/BlogArticleCard";
import type { BlogArticle, BlogCategory } from "@/lib/blogs";

export function BlogExplorer({ items, categories }: { items: BlogArticle[]; categories: BlogCategory[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [limit, setLimit] = useState(18);
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return items.filter((article) => {
      const categoryMatch = category === "all" || article.category === category;
      const textMatch = !term || `${article.title} ${article.metaDescription} ${article.primaryKeyword}`.toLowerCase().includes(term);
      return categoryMatch && textMatch;
    });
  }, [items, query, category]);

  function chooseCategory(value: string) {
    setCategory(value);
    setLimit(18);
  }

  return (
    <section className="library-explorer" aria-labelledby="all-articles-title">
      <div className="library-section-heading">
        <span>COMPLETE ARCHIVE</span>
        <h2 id="all-articles-title">ALL ARTICLES</h2>
        <p>Search the complete 140-entry archive or browse by topic.</p>
      </div>
      <div className="library-tools">
        <label>
          <span>SEARCH ARTICLES</span>
          <input value={query} onChange={(event) => { setQuery(event.target.value); setLimit(18); }} type="search" placeholder="Try AI, kirana, SEO, Lucknow…" />
        </label>
        <div className="library-filter-row" aria-label="Filter by category">
          <button className={category === "all" ? "active" : ""} onClick={() => chooseCategory("all")}>All · {items.length}</button>
          {categories.map((item) => {
            const count = items.filter((article) => article.category === item.slug).length;
            return <button key={item.slug} className={category === item.slug ? "active" : ""} onClick={() => chooseCategory(item.slug)}>{item.name} · {count}</button>;
          })}
        </div>
      </div>
      <p className="library-result-count" aria-live="polite">Showing {Math.min(limit, filtered.length)} of {filtered.length} matching articles</p>
      {filtered.length ? (
        <div className="library-card-grid">
          {filtered.slice(0, limit).map((article) => <BlogArticleCard key={article.id} article={article} />)}
        </div>
      ) : (
        <div className="library-empty"><b>NO MATCH FOUND</b><p>Try a broader keyword or choose another category.</p></div>
      )}
      {limit < filtered.length && <button className="library-load-more" onClick={() => setLimit((current) => current + 18)}>LOAD 18 MORE ARTICLES ↓</button>}
    </section>
  );
}
