const MEDIUM_FEED_URL = "https://medium.com/feed/@sheevumgoel";
const MAX_ARTICLES = 5;

function decodeXml(value: string) {
  return value
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function tagValue(block: string, tag: string) {
  const escapedTag = tag.replace(":", "\\:");
  const cdata = new RegExp(`<${escapedTag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${escapedTag}>`, "i").exec(block)?.[1];
  if (cdata !== undefined) return decodeXml(cdata);
  const plain = new RegExp(`<${escapedTag}>([\\s\\S]*?)<\\/${escapedTag}>`, "i").exec(block)?.[1] ?? "";
  return decodeXml(plain.replace(/<[^>]+>/g, " "));
}

function safeMediumUrl(value: string) {
  try {
    const url = new URL(decodeXml(value));
    if (url.protocol !== "https:" || (url.hostname !== "medium.com" && !url.hostname.endsWith(".medium.com"))) return "";
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return "";
  }
}

function safeImageUrl(value: string) {
  try {
    const url = new URL(decodeXml(value));
    if (url.protocol !== "https:" || !url.hostname.endsWith("medium.com")) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

function titleCase(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently published";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" }).format(date);
}

function truncate(value: string, length = 220) {
  if (value.length <= length) return value;
  return `${value.slice(0, length).replace(/\s+\S*$/, "")}…`;
}

function parseFeed(xml: string) {
  const articles = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0, MAX_ARTICLES).map((match) => {
    const block = match[1];
    const content = /<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/i.exec(block)?.[1] ?? "";
    const firstParagraph = /<p>([\s\S]*?)<\/p>/i.exec(content)?.[1] ?? "";
    const firstImage = /<img\b[^>]*\bsrc=["']([^"']+)["']/i.exec(content)?.[1] ?? "";
    const category = /<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/i.exec(block)?.[1] ?? "Medium story";
    const link = safeMediumUrl(tagValue(block, "link"));

    return {
      title: tagValue(block, "title"),
      date: formatDate(tagValue(block, "pubDate")),
      topic: titleCase(decodeXml(category)),
      summary: truncate(decodeXml(firstParagraph.replace(/<[^>]+>/g, " "))),
      url: link,
      image: safeImageUrl(firstImage),
    };
  }).filter((article) => article.title && article.url);

  return {
    articles,
    lastBuildDate: tagValue(xml, "lastBuildDate") || null,
  };
}

export async function GET() {
  try {
    const response = await fetch(MEDIUM_FEED_URL, {
      headers: {
        Accept: "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8",
        "User-Agent": "Sudarshan-AI-Labs-RSS-Widget/1.0",
      },
      redirect: "follow",
    });

    if (!response.ok) throw new Error(`Medium responded with ${response.status}`);
    const feed = parseFeed(await response.text());
    if (feed.articles.length === 0) throw new Error("Medium feed returned no articles");

    return Response.json(feed, {
      headers: {
        "Cache-Control": "public, max-age=900, s-maxage=3600, stale-while-revalidate=86400",
        "Content-Type": "application/json; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return Response.json(
      { articles: [], lastBuildDate: null, error: "Medium feed is temporarily unavailable." },
      { status: 502, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } },
    );
  }
}
