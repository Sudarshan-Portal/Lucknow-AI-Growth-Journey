import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const expected = process.env.EXPECTED_SITE_URL || 'https://www.blogs.vyapai.in';
const basePath = new URL(expected).pathname.replace(/\/$/, '');
const data = JSON.parse(readFileSync(new URL('../lib/blog-data.json', import.meta.url), 'utf8'));
const published = data.articles.filter(a => a.status === 'published' && a.indexable);
const {default: worker} = await import(new URL('../dist/server/index.js', import.meta.url));
const ctx = {waitUntil() {}, passThroughOnException() {}};
const env = {ASSETS: {fetch: async request => {
  try { return new Response(readFileSync(resolve('dist/client', '.' + new URL(request.url).pathname))); }
  catch { return new Response('Not found', {status:404}); }
}}};
async function request(path) {
  return worker.fetch(new Request(expected + path, {headers:{accept:'text/html'}}), env, ctx);
}
test('canonical URLs, article schema and sharing previews match the deployment address', async () => {
  for (const path of ['/', '/blogs/', '/blogs/' + published[0].slug + '/', '/blogs/author/sheevum-goel/']) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, new RegExp('<link rel="canonical" href="' + (expected + path).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"'));
    assert.ok(!html.includes('https://ai-digital-marketing-trends-india.sheevumgoel.chatgpt.site'), path);
    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
  }
});
test('sitemap includes only indexable published articles and uses canonical URLs', async () => {
  const response = await request('/sitemap.xml');
  assert.equal(response.status, 200);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  assert.equal(urls.length, published.length + data.categories.length + 3);
  assert.ok(urls.every(url => url.startsWith(expected + '/')));
  assert.ok(!xml.includes('Invalid Date'));
});
test('robots points to the deployment sitemap', async () => {
  const response = await request('/robots.txt');
  assert.equal(response.status, 200);
  assert.ok((await response.text()).includes(expected + '/sitemap.xml'));
});
test('the prefix deployment serves cover images without requiring domain-root routes', async () => {
  if (!basePath) return;
  const response = await request('/box-covers/avatar-01.webp');
  assert.equal(response.status, 200);
  assert.ok((await response.arrayBuffer()).byteLength > 1000);
});
