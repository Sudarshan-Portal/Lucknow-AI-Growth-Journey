import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl("/")),
  title: "Lucknow’s AI Growth Journey | Sudarshan AI Labs",
  description: "An expert-led, source-checked 2026 field guide to AI digital marketing, local SEO and practical growth systems for Lucknow MSMEs.",
  keywords: [
    "digital marketing agency",
    "AI digital marketing",
    "social media marketing services",
    "SEO services in Lucknow",
    "business intelligence tools",
    "WhatsApp Business",
  ],
  authors: [{ name: "Sheevum Goel", url: "https://sheevum-goel-about.netlify.app/" }],
  creator: "Sheevum Goel",
  publisher: "Sudarshan AI Labs",
  alternates: {
    canonical: siteUrl("/"),
  },
  openGraph: {
    title: "Lucknow’s AI Growth Journey | Sheevum Goel",
    description: "An expert-led storyboard decoding AI, search signals and practical MSME growth in Lucknow.",
    type: "website",
    locale: "en_IN",
    url: siteUrl("/"),
    images: [{ url: siteUrl("/og.png"), width: 1200, height: 630, alt: "Lucknow AI Growth Storybook — expert-led field guide by Sheevum Goel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucknow’s AI Growth Journey | Sheevum Goel",
    description: "A source-checked comic field guide to AI digital marketing and Lucknow MSME growth.",
    images: [siteUrl("/og.png")],
  },
  icons: { icon: siteUrl("/favicon.svg"), shortcut: siteUrl("/favicon.svg") },
  other: { "codex-preview": "development" },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": siteUrl("/#website"), url: siteUrl("/"), name: "Lucknow’s AI Growth Journey", inLanguage: "en-IN", publisher: { "@id": "https://vyapai.in/#organization" } },
    { "@type": "Organization", "@id": "https://vyapai.in/#organization", name: "Sudarshan AI Labs", url: "https://vyapai.in/", founder: { "@type": "Person", name: "Sheevum Goel" }, areaServed: { "@type": "Country", name: "India" } },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />{children}</body>
    </html>
  );
}
