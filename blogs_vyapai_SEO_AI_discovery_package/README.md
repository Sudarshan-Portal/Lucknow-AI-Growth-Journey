# blogs.vyapai.in SEO / Discovery package

## Editorial identity
**Blogs and Articles for Lucknow AI Digital Journey**

Primary audience: MSMEs, small businesses, retailers, founders and entrepreneurs across India.

Contact:
- Lucknow, Uttar Pradesh 226016, India
- +91-7080842220
- https://blogs.vyapai.in/

## Recommended production structure

public/
  robots.txt
  schema.org.jsonld

app/
  routes/
    sitemap.xml.ts
  components/
    SeoSchema.tsx

## Important deployment note

Use ONE sitemap source at `/sitemap.xml`.

The recommended production setup is the dynamic `app/routes/sitemap.xml.ts`, because it automatically includes every published, indexable article from `blog-data.json`.

Do not deploy `public/sitemap.xml` at the same time as the dynamic route. The separately supplied `public_sitemap_enhanced.xml` is only a cleaned fallback based on the URLs visible in the uploaded sitemap.

## Personal-name removal

This package removes person-based author URLs and person-based schema authorship.

If `blog-data.json` or any article UI still contains a personal author name, replace that display value with:
`Lucknow AI Digital Journey Editorial Desk`

The revised schema no longer depends on `article.author` or `article.authorSlug`.

## Article data fields supported

Recommended fields per article:
- title
- slug
- status
- indexable
- date
- dateModified (preferred when content is materially updated)
- updatedAt (optional fallback)
- category
- seoTitle
- metaDescription
- primaryKeyword
- secondaryKeywords
- coverImage

## SEO / AI discovery intent

- Search engines are allowed.
- OAI-SearchBot is allowed for ChatGPT search discovery.
- GPTBot is blocked to keep automated OpenAI model-training crawling separate.
- Claude-SearchBot and Claude-User are allowed.
- ClaudeBot is blocked to keep Anthropic model-training crawling separate.
- PerplexityBot is allowed.
- Google-Extended is allowed for Gemini ecosystem visibility.
- Common dataset crawlers such as CCBot and Bytespider are blocked.

## Suggested editorial positioning

Homepage title:
Blogs & Articles for Lucknow AI Digital Journey | MSME India

Meta description:
Practical AI, digital marketing, SEO, automation, retail and growth guides for MSMEs and small businesses across India, published from Lucknow.

Suggested content pillars:
1. AI & Business Automation
2. MSME Growth in India
3. SEO & Local Search
4. Digital Marketing
5. Social Media & Content
6. Retail, E-commerce & Quick Commerce
7. Sales, CRM & Customer Retention
8. Technology & Digital Security
9. Government Schemes & Digital Enablement
10. India MSME Case Studies
