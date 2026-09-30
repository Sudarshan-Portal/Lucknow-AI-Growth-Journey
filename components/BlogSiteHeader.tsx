import Link from "next/link";

export function BlogSiteHeader() {
  return (
    <>
      <nav className="library-nav" aria-label="Primary navigation">
        <Link className="comic-brand" href="/">
          <span>S</span>
          <span className="brand-copy"><b>SUDARSHAN AI LABS</b><small>KNOWLEDGE LIBRARY</small></span>
        </Link>
        <div className="library-nav-links">
          <Link href="/">Home</Link>
          <Link href="/blogs/">All Articles</Link>
          <Link href="/blogs/#categories">Categories</Link>
          <Link href="/blogs/#latest">Latest</Link>
          <a className="nav-pop" href="https://vyapai.in/" target="_blank" rel="noreferrer">LET&apos;S GROW ↗</a>
        </div>
      </nav>
      <nav className="library-mobile-nav" aria-label="Blog navigation">
        <Link href="/blogs/">All Articles</Link>
        <Link href="/blogs/#categories">Categories</Link>
        <Link href="/blogs/#featured">Featured</Link>
        <Link href="/blogs/author/sheevum-goel/">Author</Link>
      </nav>
    </>
  );
}
