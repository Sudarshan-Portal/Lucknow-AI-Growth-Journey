import type { MetadataRoute } from "next";
import { categories, indexableArticles, type BlogArticle } from "@/lib/blogs";
import { siteUrl, SITE_UPDATED_AT } from "@/lib/site";

const normalizeDate = (value?: string | null) => {
  if (!value) return undefined;
  const match = value.match(/^\d{4}-\d{2}-\d{2}/);
  return match?.[0];
};

const articleLastmod = (article: BlogArticle) =>
  normalizeDate(article.dateModified || article.updatedAt || article.date);

const latestDate = (dates: Array<string | undefined>) =>
  dates.filter((d): d is string => Boolean(d)).sort().at(-1);

export default function sitemap(): MetadataRoute.Sitemap {
  const defaultDate = normalizeDate(SITE_UPDATED_AT) || "2026-10-02";
  const siteLastmod = latestDate(indexableArticles.map(articleLastmod)) || defaultDate;

  const siteEntries: MetadataRoute.Sitemap = [
    { url: siteUrl("/"), lastModified: new Date(siteLastmod), changeFrequency: "weekly", priority: 1.0 },
    { url: siteUrl("/blogs/"), lastModified: new Date(siteLastmod), changeFrequency: "weekly", priority: 0.9 },
  ];

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => {
    const catLastmod = latestDate(
      indexableArticles
        .filter((article) => article.category === category.slug)
        .map(articleLastmod)
    ) || siteLastmod;
    return {
      url: siteUrl(`/blogs/${category.slug}/`),
      lastModified: new Date(catLastmod),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  const articleEntries: MetadataRoute.Sitemap = indexableArticles.map((article) => {
    const artLastmod = articleLastmod(article) || siteLastmod;
    return {
      url: article.canonical,
      lastModified: new Date(artLastmod),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  return [...siteEntries, ...categoryEntries, ...articleEntries];
}
