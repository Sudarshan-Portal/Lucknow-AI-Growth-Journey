export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://blogs.vyapai.in").replace(/\/$/, "");
export const SITE_BASE_PATH = (process.env.NEXT_PUBLIC_SITE_BASE_PATH || "").replace(/\/$/, "");
export const SITE_UPDATED_AT = "2026-10-02T00:00:00Z";

export function sitePath(path = "/") {
  return `${SITE_BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

export function siteUrl(path = "/") {
  return `${SITE_ORIGIN}${sitePath(path)}`;
}
