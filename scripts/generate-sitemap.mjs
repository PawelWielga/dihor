/**
 * Simple sitemap generator for static gh-pages site.
 * - Includes core routes and visible blog posts from src/data/blogposts/blogposts.js
 * - Writes to public/sitemap.xml
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITE_URL = 'https://pawelwielga.dihor.pl';

// Known static routes of the SPA
const routes = ['/', '/blog'];

function loadBlogPosts() {
  const dir = resolve(__dirname, '../src/data/blogposts');
  const blogFile = resolve(dir, 'blogposts.js');
  const code = readFileSync(blogFile, 'utf8');
  const importRegex = /import\s+\w+\s+from\s+'\.\/([\w-]+\.js)';/g;
  const posts = [];
  let match;
  while ((match = importRegex.exec(code))) {
    const file = resolve(dir, match[1]);
    let postCode = readFileSync(file, 'utf8')
      .replace(/import[^;]+;\s*/g, '')
      .replace(/export\s+default\s+/, 'module.exports = ')
      .replace(/\s*image:\s*[^,]+,/, '');
    const moduleShim = { exports: {} };
    const fn = new Function('module', 'exports', postCode);
    fn(moduleShim, moduleShim.exports);
    const post = moduleShim.exports.default || moduleShim.exports;
    if (post) posts.push(post);
  }
  return posts;
}

function iso(dateStr) {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d.toISOString();
  } catch {}
  return new Date().toISOString();
}

function generate() {
  const posts = loadBlogPosts().filter((p) => p && p.visible);
  const urls = new Set(routes);

  posts.forEach((p) => {
    if (p.id) {
      urls.add(`/blog/${p.id}`);
    }
  });

  const urlset = Array.from(urls).map((path) => {
    const loc = `${SITE_URL}${path}`;
    const post = posts.find((p) => `/blog/${p.id}` === path);
    const last = post?.dateISO || post?.date || new Date().toISOString();

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${iso(last)}</lastmod>
    <changefreq>${path.startsWith('/blog') ? 'monthly' : 'weekly'}</changefreq>
    <priority>${path === '/' ? '1.0' : path.startsWith('/blog') ? '0.7' : '0.8'}</priority>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset.join('\n')}
</urlset>
`;

  const outPath = resolve(__dirname, '../public/sitemap.xml');
  mkdirSync(resolve(__dirname, '../public'), { recursive: true });
  writeFileSync(outPath, xml, 'utf8');
  console.log('Sitemap generated at', outPath);
}

generate();