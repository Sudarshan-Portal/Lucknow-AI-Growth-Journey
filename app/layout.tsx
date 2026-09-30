import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-digital-marketing-trends-india.sheevumgoel.chatgpt.site"),
  title: "Lucknow AI Growth Storybook by Sheevum Goel",
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
    canonical: "/",
  },
  openGraph: {
    title: "Lucknow AI Growth Storybook — By Sheevum Goel",
    description: "An expert-led storyboard decoding AI, search signals and practical MSME growth in Lucknow.",
    type: "article",
    locale: "en_IN",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Lucknow AI Growth Storybook — expert-led field guide by Sheevum Goel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucknow AI Growth Storybook — By Sheevum Goel",
    description: "A source-checked comic field guide to AI digital marketing and Lucknow MSME growth.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
