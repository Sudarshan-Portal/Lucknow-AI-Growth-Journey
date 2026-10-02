import Link from "next/link";
import { FooterLocationMap } from "@/components/FooterLocationMap";

export function BlogSiteFooter() {
  return (
    <footer className="library-footer">
      <FooterLocationMap />
      <div>
        <small>LUCKNOW AI DIGITAL JOURNEY</small>
        <h2>BUILD. AUTOMATE. TRANSFER.</h2>
        <p>Practical AI, digital marketing and business-growth thinking for Indian MSMEs.</p>
      </div>
      <div className="library-footer-links">
        <Link href="/blogs/">Blogs &amp; Articles</Link>
        <a href="https://blogs.vyapai.in/" target="_blank" rel="noreferrer">Vyapai.in ↗</a>
        <a href="tel:+917080842220">+91-7080842220</a>
        <a href="https://vyapai.in/" target="_blank" rel="noreferrer">Digital Growth Services ↗</a>
      </div>
      <p className="library-footer-bottom">© 2026 Vyapai · Lucknow, Uttar Pradesh 226016, India</p>
    </footer>
  );
}
