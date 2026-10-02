import type { Route } from "./+types/sitemap.xml";
import blogData from "~/lib/blog-data.json";

const BASE = "https://blogs.vyapai.in";

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (char) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };
    return entities[char];
  });

const normalizeDate = (value?: string) => {
  if (!value) return undefined;
  const match = value.match(/^\d{4}-\d{2}-\d{2}/);
  return match?.[0];
};

const publishedArticles = blogData.articles.filter(
  (article) => article.status === "published" && article.indexable !== false
);

const articleLastmod = (article: (typeof publishedArticles)[number]) =>
  normalizeDate(
    article.dateModified ||
      article.updatedAt ||
      article.date
  );

const latestDate = (dates: Array<string | undefined>) =>
  dates.filter(Boolean).sort().at(-1);

export function loader({ request }: Route.LoaderArgs) {
  const rows: string[] = [];

  const addUrl = (loc: string, lastmod?: string) => {
    rows.push(
      [
        "  <url>",
        `    <loc>${escapeXml(loc)}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : "",
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n")
    );
  };

  const siteLastmod = latestDate(publishedArticles.map(articleLastmod));
  addUrl(`${BASE}/`, siteLastmod);

  for (const cat of blogData.categories) {
    const categoryLastmod = latestDate(
      publishedArticles
        .filter((article) => article.category === cat.slug)
        .map(articleLastmod)
    );
    addUrl(`${BASE}/category/${cat.slug}`, categoryLastmod || siteLastmod);
  }

  for (const article of publishedArticles) {
    addUrl(`${BASE}/blogs/${article.slug}`, articleLastmod(article));
  }

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...rows,
    "</urlset>",
  ].join("\n");

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
