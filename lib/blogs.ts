import rawData from "./blog-data.json";

export type BlogBlock =
  | { type: "paragraph" | "heading" | "quote"; text: string }
  | { type: "list"; items: string[] };

export type BlogCategory = {
  slug: string;
  name: string;
  description: string;
};

export type BlogArticle = {
  id: number;
  title: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  slug: string;
  category: string;
  date: string | null;
  status: "published" | "draft";
  indexable: boolean;
  author: string;
  authorSlug: string;
  originalFile: string;
  mediumUrl: string | null;
  canonical: string;
  readingMinutes: number;
  wordCount: number;
  blocks: BlogBlock[];
  relatedIds: number[];
};

const data = rawData as unknown as { categories: BlogCategory[]; articles: BlogArticle[] };

export const categories = data.categories;
export const articles = data.articles;
export const publishedArticles = articles.filter((article) => article.status === "published");
export const indexableArticles = articles.filter((article) => article.indexable);

export const categoryImages: Record<string, string> = {
  "retail-fmcg-quick-commerce": "/library/marketing-collage.webp",
  "seo-local-search": "/storyboard/google-ads-concept.webp",
  "digital-marketing": "/storyboard/services-board.webp",
  "social-media-content": "/blog-visuals/startup-team-collaboration.png",
  "ai-business-automation": "/storyboard/local-automation.webp",
  "artificial-intelligence": "/storyboard/ai-creativity.webp",
  "msme-startup-growth": "/storyboard/connected-intelligence.webp",
  "technology-security": "/blog-visuals/instruct-your-ai-app.png",
  "society-opinion": "/library/lucknow-digital-nawab.webp",
  "personal-stories-culture": "/blog-visuals/local-business-networking.png",
};

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticleById(id: number) {
  return articles.find((article) => article.id === id);
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryName(slug: string) {
  return getCategory(slug)?.name ?? "Articles";
}

export function getCategoryArticles(slug: string) {
  return articles.filter((article) => article.category === slug);
}

export function formatArticleDate(date: string | null) {
  if (!date) return "Draft";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

export function articleExcerpt(article: BlogArticle) {
  const paragraph = article.blocks.find((block): block is Extract<BlogBlock, { type: "paragraph" }> => block.type === "paragraph");
  return paragraph?.text ?? article.metaDescription;
}

export function articleImage(article: BlogArticle) {
  return categoryImages[article.category] ?? "/storyboard/ai-creativity.webp";
}

export function categoryCount(slug: string) {
  return articles.filter((article) => article.category === slug).length;
}
