import Link from "next/link";
import { FooterLocationMap } from "@/components/FooterLocationMap";

export function BlogSiteFooter() {
  return (
    <footer className="library-footer">
      <FooterLocationMap />
      <div>
        <small>SUDARSHAN AI LABS · LUCKNOW</small>
        <h2>BUILD. AUTOMATE. TRANSFER.</h2>
        <p>Practical AI, digital marketing and business-growth thinking for Indian MSMEs.</p>
      </div>
      <div className="library-footer-links">
        <Link href="/blogs/">Blogs &amp; Articles</Link>
        <Link href="/blogs/author/sheevum-goel/">Sheevum Goel</Link>
        <a href="https://medium.com/@sheevumgoel" target="_blank" rel="noreferrer">Medium Archive ↗</a>
        <a href="https://www.linkedin.com/in/sheevumgoel" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href="https://vyapai.in/" target="_blank" rel="noreferrer">Digital Growth Services ↗</a>
      </div>
      <p className="library-footer-bottom">© 2026 Sudarshan AI Labs · Lucknow, Uttar Pradesh, India</p>
    </footer>
  );
}
