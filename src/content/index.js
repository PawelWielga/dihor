import {
  parseFrontmatter,
  parseMarkdownToBlocks,
  extractExcerptFromBlocks,
  getPostTimestamp,
} from './markdownParser.js';

const blogMarkdownModules = import.meta.glob('./blog/*/index.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const blogMetaModules = import.meta.glob('./blog/*/meta.json', {
  eager: true,
  import: 'default',
});

const blogAssetModules = import.meta.glob('./blog/**/*.{png,jpg,jpeg,webp,avif,svg,gif}', {
  eager: true,
  import: 'default',
});

const projectMarkdownModules = import.meta.glob('./projects/*/index.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const projectMetaModules = import.meta.glob('./projects/*/meta.json', {
  eager: true,
  import: 'default',
});

const projectAssetModules = import.meta.glob('./projects/**/*.{png,jpg,jpeg,webp,avif,svg,gif,pdf}', {
  eager: true,
  import: 'default',
});

function getSlug(path, rootDir) {
  const match = path.match(new RegExp(`^\\.\\/${rootDir}\\/([^/]+)\\/`));
  return match?.[1] || '';
}

function normalizeModulePath(path) {
  return path.replace(/^\.\//, '');
}

function joinRelativePath(baseDir, relPath) {
  const stack = baseDir.split('/').filter(Boolean);
  for (const part of relPath.split('/')) {
    if (!part || part === '.') {
      continue;
    }
    if (part === '..') {
      stack.pop();
      continue;
    }
    stack.push(part);
  }
  return stack.join('/');
}

function createAssetLookup(modules) {
  return Object.fromEntries(
    Object.entries(modules).map(([modulePath, assetUrl]) => [normalizeModulePath(modulePath), assetUrl]),
  );
}

function createMetaLookup(modules, rootDir) {
  return Object.fromEntries(
    Object.entries(modules).map(([path, meta]) => [getSlug(path, rootDir), meta || {}]),
  );
}

function isExternalReference(value) {
  return /^(https?:\/\/|mailto:|#|\/)/i.test(value);
}

function resolveLocalReference(value, baseDir, assetLookup) {
  if (!value || typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  if (isExternalReference(trimmed)) {
    return trimmed;
  }

  const normalized = trimmed.replace(/^\.\//, '');
  const resolvedPath = joinRelativePath(baseDir, normalized);
  return assetLookup[resolvedPath] || trimmed;
}

function rewriteRelativeMarkdownReferences(markdown, baseDir, assetLookup) {
  const source = String(markdown || '');
  const tokenRegex = /(!?\[[^\]]*\]\()([^)]+)(\))/g;

  return source.replace(tokenRegex, (_, prefix, rawTarget, suffix) => {
    const target = rawTarget.trim();
    const resolved = resolveLocalReference(target, baseDir, assetLookup);
    return `${prefix}${resolved}${suffix}`;
  });
}

function normalizeTags(value) {
  return Array.isArray(value)
    ? value.map((tag) => String(tag).trim()).filter(Boolean)
    : [];
}

const blogAssetLookup = createAssetLookup(blogAssetModules);
const projectAssetLookup = createAssetLookup(projectAssetModules);
const blogMetaLookup = createMetaLookup(blogMetaModules, 'blog');
const projectMetaLookup = createMetaLookup(projectMetaModules, 'projects');

export const blogPosts = Object.entries(blogMarkdownModules)
  .map(([path, raw]) => {
    const slug = getSlug(path, 'blog');
    const baseDir = `blog/${slug}`;
    const { frontmatter, body } = parseFrontmatter(raw);
    const metadata = { ...(blogMetaLookup[slug] || {}), ...frontmatter };
    const id = String(metadata.id || slug);

    const markdownBody = rewriteRelativeMarkdownReferences(body, baseDir, blogAssetLookup);
    const contentBlocks = parseMarkdownToBlocks(markdownBody);

    return {
      id,
      visible: metadata.visible !== false,
      title: String(metadata.title || id),
      date: String(metadata.date || ''),
      dateISO: String(metadata.dateISO || metadata.date || ''),
      tags: normalizeTags(metadata.tags),
      image: resolveLocalReference(metadata.thumbnail || metadata.image || '', baseDir, blogAssetLookup),
      contentMarkdown: markdownBody,
      contentBlocks,
      excerpt: String(metadata.excerpt || extractExcerptFromBlocks(contentBlocks)),
    };
  })
  .sort((a, b) => getPostTimestamp(b) - getPostTimestamp(a));

export const blogPostMap = Object.fromEntries(blogPosts.map((post) => [post.id, post]));

export const projectDetails = Object.entries(projectMarkdownModules).map(([path, raw]) => {
  const slug = getSlug(path, 'projects');
  const baseDir = `projects/${slug}`;
  const { frontmatter, body } = parseFrontmatter(raw);
  const metadata = { ...(projectMetaLookup[slug] || {}), ...frontmatter };
  const id = String(metadata.id || slug);

  const markdownBody = rewriteRelativeMarkdownReferences(body, baseDir, projectAssetLookup);

  return {
    id,
    title: String(metadata.title || ''),
    summary: String(metadata.summary || ''),
    seoDescription: String(metadata.seoDescription || metadata.summary || ''),
    contentMarkdown: markdownBody,
    contentBlocks: parseMarkdownToBlocks(markdownBody),
  };
});

export const projectDetailsMap = Object.fromEntries(projectDetails.map((entry) => [entry.id, entry]));
