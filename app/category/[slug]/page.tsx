import { permanentRedirect } from "next/navigation";
import { categories } from "@/lib/blogs";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  permanentRedirect(`/blogs/${slug}/`);
}
