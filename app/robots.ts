import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://ai-digital-marketing-trends-india.sheevumgoel.chatgpt.site/sitemap.xml",
    host: "https://ai-digital-marketing-trends-india.sheevumgoel.chatgpt.site",
  };
}
