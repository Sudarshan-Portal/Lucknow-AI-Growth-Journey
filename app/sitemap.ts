import type { MetadataRoute } from "next";
import { categories, indexableArticles } from "@/lib/blogs";
import { siteUrl, SITE_UPDATED_AT } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITE_UPDATED_AT);
  return [
    { url: siteUrl("/"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: siteUrl("/blogs/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: siteUrl("/blogs/author/sheevum-goel/"), lastModified, changeFrequency: "monthly", priority: 0.7 },
    ...categories.map((category) => ({ url: siteUrl(`/blogs/${category.slug}/`), lastModified, changeFrequency: "weekly" as const, priority: 0.75 })),
    ...indexableArticles.map((article) => ({ url: article.canonical, lastModified, changeFrequency: "monthly" as const, priority: 0.65 })),
  ];
}
