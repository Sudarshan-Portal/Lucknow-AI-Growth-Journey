export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://www.blogs.vyapai.in").replace(/\/$/, "");
export const SITE_BASE_PATH = (process.env.NEXT_PUBLIC_SITE_BASE_PATH || "").replace(/\/$/, "");
export const SITE_UPDATED_AT = "2026-09-30T17:14:44Z";

export function sitePath(path = "/") {
  return `${SITE_BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

export function siteUrl(path = "/") {
  return `${SITE_ORIGIN}${sitePath(path)}`;
}
