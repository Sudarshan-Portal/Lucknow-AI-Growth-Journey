import blogData from "@/lib/blog-data.json";

type SeoSchemaProps = {
  type?: "website" | "article" | "breadcrumb";
  articleSlug?: string;
  categorySlug?: string;
};

const BASE = "https://blogs.vyapai.in";
const PUBLISHER_ID = `${BASE}/#publisher`;
const BLOG_ID = `${BASE}/#blog`;

const publisher = {
  "@type": "Organization",
  "@id": PUBLISHER_ID,
  "name": "Vyapai",
  "alternateName": "Lucknow AI Digital Journey",
  "url": `${BASE}/`,
  "telephone": "+91-7080842220",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lucknow",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "226016",
    "addressCountry": "IN",
  },
  "areaServed": {
    "@type": "Country",
    "name": "India",
  },
  "logo": {
    "@type": "ImageObject",
    "url": `${BASE}/logo.png`,
    "width": 512,
    "height": 512,
  },
};

const editorialAuthor = {
  "@type": "Organization",
  "name": "Lucknow AI Digital Journey Editorial Desk",
  "url": `${BASE}/`,
};

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SeoSchema({
  type = "website",
  articleSlug,
  categorySlug,
}: SeoSchemaProps) {
  if (type === "article" && articleSlug) {
    const article = (blogData.articles as Array<{
      slug: string;
      category: string;
      seoTitle?: string;
      title: string;
      metaDescription?: string;
      date?: string | null;
      dateModified?: string;
      updatedAt?: string;
      primaryKeyword?: string;
      secondaryKeywords?: string[];
      coverImage?: string;
    }>).find((item) => item.slug === articleSlug);
    if (!article) return null;

    const category = (blogData.categories as Array<{ slug: string; name: string }>).find(
      (item) => item.slug === article.category
    );

    const pageUrl = `${BASE}/blogs/${article.slug}/`;
    const modified =
      article.dateModified || article.updatedAt || article.date || undefined;

    const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${pageUrl}#article`,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": pageUrl,
      },
      "headline": article.seoTitle || article.title,
      "description": article.metaDescription || "",
      "url": pageUrl,
      "datePublished": article.date || undefined,
      "dateModified": modified,
      "author": editorialAuthor,
      "publisher": publisher,
      "isPartOf": {
        "@id": BLOG_ID,
      },
      "articleSection": category?.name || undefined,
      "keywords": [
        article.primaryKeyword,
        ...(article.secondaryKeywords || []),
      ]
        .filter(Boolean)
        .join(", "),
      "inLanguage": "en-IN",
      "image": article.coverImage
        ? article.coverImage.startsWith("http")
          ? article.coverImage
          : `${BASE}${article.coverImage}`
        : undefined,
      "audience": {
        "@type": "BusinessAudience",
        "audienceType": "MSMEs and small businesses in India",
      },
      "contentLocation": {
        "@type": "Place",
        "name": "Lucknow, Uttar Pradesh, India",
      },
    };

    return <JsonLd data={schema} />;
  }

  if (type === "breadcrumb" && (articleSlug || categorySlug)) {
    const items: Array<{ name: string; url: string }> = [
      { name: "Home", url: `${BASE}/` },
    ];

    if (categorySlug) {
      const category = (blogData.categories as Array<{ slug: string; name: string }>).find(
        (item) => item.slug === categorySlug
      );
      if (category) {
        items.push({
          name: category.name,
          url: `${BASE}/blogs/${category.slug}/`,
        });
      }
    }

    if (articleSlug) {
      const article = (blogData.articles as Array<{ slug: string; category: string; title: string }>).find(
        (item) => item.slug === articleSlug
      );

      if (article) {
        const category = (blogData.categories as Array<{ slug: string; name: string }>).find(
          (item) => item.slug === article.category
        );

        if (category && categorySlug !== article.category) {
          items.push({
            name: category.name,
            url: `${BASE}/blogs/${category.slug}/`,
          });
        }

        items.push({
          name: article.title,
          url: `${BASE}/blogs/${article.slug}/`,
        });
      }
    }

    return (
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url,
          })),
        }}
      />
    );
  }

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          publisher,
          {
            "@type": "Blog",
            "@id": BLOG_ID,
            "name": "Blogs and Articles for Lucknow AI Digital Journey",
            "alternateName": "Lucknow AI Digital Journey",
            "url": `${BASE}/`,
            "description":
              "Practical AI, digital marketing, SEO, automation, e-commerce, retail and growth guides created to help MSMEs and small businesses across India.",
            "inLanguage": "en-IN",
            "publisher": {
              "@id": PUBLISHER_ID,
            },
            "audience": {
              "@type": "BusinessAudience",
              "audienceType":
                "MSMEs, small businesses, retailers, founders and entrepreneurs in India",
            },
            "about": [
              { "@type": "Thing", "name": "MSME Growth in India" },
              {
                "@type": "Thing",
                "name": "Artificial Intelligence for Small Business",
              },
              { "@type": "Thing", "name": "Business Automation" },
              { "@type": "Thing", "name": "Digital Marketing" },
              { "@type": "Thing", "name": "SEO and Local Search" },
              { "@type": "Thing", "name": "Social Media and Content" },
              {
                "@type": "Thing",
                "name": "Retail, E-commerce and Quick Commerce",
              },
              {
                "@type": "Thing",
                "name": "Technology and Digital Security",
              },
              {
                "@type": "Thing",
                "name": "Sales, CRM and Customer Retention",
              },
            ],
          },
        ],
      }}
    />
  );
}
