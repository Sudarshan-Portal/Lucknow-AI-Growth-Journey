import type { MetadataRoute } from "next";
import { categories, indexableArticles } from "@/lib/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ai-digital-marketing-trends-india.sheevumgoel.chatgpt.site";
  return [
    { url: `${base}/`, lastModified: new Date("2026-08-29"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blogs/`, lastModified: new Date("2026-08-29"), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blogs/author/sheevum-goel/`, lastModified: new Date("2026-08-29"), changeFrequency: "monthly", priority: 0.7 },
    ...categories.map((category) => ({ url: `${base}/blogs/${category.slug}/`, lastModified: new Date("2026-08-29"), changeFrequency: "weekly" as const, priority: 0.75 })),
    ...indexableArticles.map((article) => ({ url: article.canonical, lastModified: new Date(`${article.date}T00:00:00Z`), changeFrequency: "monthly" as const, priority: 0.65 })),
  ];
}
