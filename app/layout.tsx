import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl("/")),
  title: "Blogs & Articles for Lucknow AI Digital Journey | MSME India",
  description: "Practical AI, digital marketing, SEO, automation, retail and growth guides for MSMEs and small businesses across India, published from Lucknow.",
  keywords: [
    "MSME Growth in India",
    "Artificial Intelligence for Small Business",
    "Business Automation",
    "Digital Marketing",
    "SEO and Local Search",
    "Social Media and Content",
    "Retail, E-commerce and Quick Commerce",
    "Technology and Digital Security",
    "Sales, CRM and Customer Retention",
    "Lucknow MSMEs",
  ],
  authors: [{ name: "Lucknow AI Digital Journey Editorial Desk", url: siteUrl("/") }],
  creator: "Lucknow AI Digital Journey Editorial Desk",
  publisher: "Vyapai",
  alternates: {
    canonical: siteUrl("/"),
  },
  openGraph: {
    title: "Blogs & Articles for Lucknow AI Digital Journey | MSME India",
    description: "Practical AI, digital marketing, SEO, automation, retail and growth guides for MSMEs and small businesses across India, published from Lucknow.",
    type: "website",
    locale: "en_IN",
    url: siteUrl("/"),
    siteName: "Blogs and Articles for Lucknow AI Digital Journey",
    images: [{ url: siteUrl("/og.png"), width: 1200, height: 630, alt: "Blogs and Articles for Lucknow AI Digital Journey" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs & Articles for Lucknow AI Digital Journey | MSME India",
    description: "Practical AI, digital marketing, SEO, automation, retail and growth guides for MSMEs and small businesses across India, published from Lucknow.",
    images: [siteUrl("/og.png")],
  },
  icons: { icon: siteUrl("/favicon.svg"), shortcut: siteUrl("/favicon.svg") },
  other: { "codex-preview": "development" },
};

const BASE = "https://blogs.vyapai.in";
const PUBLISHER_ID = `${BASE}/#publisher`;
const BLOG_ID = `${BASE}/#blog`;

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": PUBLISHER_ID,
      name: "Vyapai",
      alternateName: "Lucknow AI Digital Journey",
      url: `${BASE}/`,
      telephone: "+91-7080842220",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lucknow",
        addressRegion: "Uttar Pradesh",
        postalCode: "226016",
        addressCountry: "IN",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/logo.png`,
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "Blog",
      "@id": BLOG_ID,
      name: "Blogs and Articles for Lucknow AI Digital Journey",
      alternateName: "Lucknow AI Digital Journey",
      url: `${BASE}/`,
      description: "Practical AI, digital marketing, SEO, automation, e-commerce, retail and growth guides created to help MSMEs and small businesses across India.",
      inLanguage: "en-IN",
      publisher: {
        "@id": PUBLISHER_ID,
      },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "MSMEs, small businesses, retailers, founders and entrepreneurs in India",
      },
      about: [
        { "@type": "Thing", name: "MSME Growth in India" },
        { "@type": "Thing", name: "Artificial Intelligence for Small Business" },
        { "@type": "Thing", name: "Business Automation" },
        { "@type": "Thing", name: "Digital Marketing" },
        { "@type": "Thing", name: "SEO and Local Search" },
        { "@type": "Thing", name: "Social Media and Content" },
        { "@type": "Thing", name: "Retail, E-commerce and Quick Commerce" },
        { "@type": "Thing", name: "Technology and Digital Security" },
        { "@type": "Thing", name: "Sales, CRM and Customer Retention" },
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
        {children}
        {/* Cloudflare Web Analytics */}
        <script
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "7e6fa3b1fd3a4f1b9e6946a1f15eac4d"}'
        />
        {/* End Cloudflare Web Analytics */}
      </body>
    </html>
  );
}
