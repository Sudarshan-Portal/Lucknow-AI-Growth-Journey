# Cloudflare deployment

Target: https://vyaparai.in/lucknow-ai-growth-journey/

This deploys a separate build of the complete site on the specified path. The domain homepage stays on its current origin. Cloudflare zone access and a proxied DNS record for `vyaparai.in` are required. No API tokens belong in this repository.

From the repository root:

```sh
npm ci
node cloudflare/prepare.mjs
npx wrangler deploy --config dist/server/wrangler.json
```

The preparation command configures the framework base path, canonical URLs, sitemap, image URLs, client API URL and Worker route. The normal Sites build continues to use `https://www.blogs.vyapai.in`.

The generated configuration deploys only the `vyaparai.in/lucknow-ai-growth-journey*` Worker route. Verify the homepage, a blog article, an image, the sitemap and client navigation after deployment. Add `Sitemap: https://vyaparai.in/lucknow-ai-growth-journey/sitemap.xml` to the domain's existing root robots.txt after deployment; preserve its existing rules and sitemap entries.

Cloudflare deployment is prepared but has not been executed until the authenticated deployment command succeeds. After confirming the new address, redirect the old blog domain to the matching new paths and submit the new sitemap in Search Console.
