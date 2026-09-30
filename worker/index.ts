/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { SITE_BASE_PATH } from "../lib/site";
import sitemap from "../app/sitemap";
import robots from "../app/robots";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (SITE_BASE_PATH && url.pathname === SITE_BASE_PATH) {
      url.pathname += "/";
      return Response.redirect(url.toString(), 308);
    }
    const localPath = SITE_BASE_PATH && url.pathname.startsWith(`${SITE_BASE_PATH}/`)
      ? url.pathname.slice(SITE_BASE_PATH.length) : url.pathname;
    // Serve metadata files before framework slash normalization.
    if (localPath === "/sitemap.xml" || localPath === "/sitemap.xml/") {
      const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
      const entries = sitemap().map((entry) => `<url><loc>${escape(entry.url)}</loc>${entry.lastModified ? `<lastmod>${new Date(entry.lastModified).toISOString()}</lastmod>` : ""}${entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ""}${entry.priority !== undefined ? `<priority>${entry.priority}</priority>` : ""}</url>`).join("");
      return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
    }
    if (localPath === "/robots.txt" || localPath === "/robots.txt/") {
      const config = robots();
      return new Response(`User-agent: *\nAllow: /\nSitemap: ${config.sitemap}\nHost: ${config.host}\n`, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
    }
    if (SITE_BASE_PATH && env.ASSETS && /^\/(?:assets|box-covers|storyboard|blog-visuals|library|trends)\/|^\/(?:favicon\.svg|og\.png|file\.svg|globe\.svg|window\.svg)$/.test(localPath)) {
      const assetUrl = new URL(request.url);
      assetUrl.pathname = localPath;
      return env.ASSETS.fetch(new Request(assetUrl, request));
    }

    if (localPath === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
