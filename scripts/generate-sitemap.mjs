/**
 * Simple sitemap generator for static gh-pages site.
 * - Includes core routes and visible blog posts from src/content/blog/<slug>/
 * - Supports metadata in meta.json and optional frontmatter in index.md
 * - Writes to public/sitemap.xml
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, statSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { SITE_URL } from '../src/config/site.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const routes = ['/', '/blog'];

function parseFrontmatter(rawContent) {
  const normalized = String(rawContent || '').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    return { frontmatter: {}, body: normalized.trim() };
  }

  const end = normalized.indexOf('\n---\n', 4);
  if (end === -1) {
    return { frontmatter: {}, body: normalized.trim() };
  }

  const frontmatterText = normalized.slice(4, end);
  const body = normalized.slice(end + 5).trim();
  const frontmatter = {};

  for (const line of frontmatterText.split('\n')) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;
    const value = rawValue.trim().replace(/^['"]|['"]$/g, '');

    if (value === 'true') {
      frontmatter[key] = true;
    } else if (value === 'false') {
      frontmatter[key] = false;
    } else {
      frontmatter[key] = value;
    }
  }

  return { frontmatter, body };
}

function readJsonIfExists(path) {
  if (!existsSync(path)) {
    return {};
  }

  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return {};
  }
}

function loadBlogPosts() {
  const blogDir = resolve(__dirname, '../src/content/blog');
  const entries = readdirSync(blogDir)
    .map((name) => resolve(blogDir, name))
    .filter((entryPath) => statSync(entryPath).isDirectory());

  return entries
    .map((entryPath) => {
      const slug = entryPath.split(/[/\\]/).at(-1);
      const markdownPath = resolve(entryPath, 'index.md');
      if (!existsSync(markdownPath)) {
        return null;
      }

      const metaPath = resolve(entryPath, 'meta.json');
      const meta = readJsonIfExists(metaPath);
      const rawMarkdown = readFileSync(markdownPath, 'utf8');
      const { frontmatter } = parseFrontmatter(rawMarkdown);
      const metadata = { ...meta, ...frontmatter };

      return {
        id: String(metadata.id || slug || ''),
        visible: metadata.visible !== false,
        dateISO: metadata.dateISO || metadata.date || '',
        date: metadata.date || '',
      };
    })
    .filter(Boolean);
}

function iso(dateStr) {
  try {
    const d = new Date(dateStr);
    if (!Number.isNaN(d.getTime())) {
      return d.toISOString();
    }
  } catch {
    // fallback below
  }
  return new Date().toISOString();
}

function generate() {
  const posts = loadBlogPosts().filter((post) => post.visible && post.id);
  const urls = new Set(routes);

  posts.forEach((post) => {
    urls.add(`/blog/${post.id}`);
  });

  const urlset = Array.from(urls).map((path) => {
    const loc = `${SITE_URL}${path}`;
    const post = posts.find((entry) => `/blog/${entry.id}` === path);
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
