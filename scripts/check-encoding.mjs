import { readdirSync, readFileSync, statSync } from 'fs';
import { extname, join, relative } from 'path';

const root = process.cwd();
const includeRoots = ['src', 'scripts', 'public'];
const includeFiles = ['AGENTS.md', 'README.md', 'index.html'];
const textExtensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.md', '.mjs', '.html', '.txt']);
const ignoredPaths = new Set(['scripts/check-encoding.mjs']);

const suspiciousPattern = /(Ã|Â|â€|â„|â€™|â€œ|â€�|â€“|â€”|Ä…|Ä‡|Ä™|ÄŁ|ÄŻ|Å‚|Å„|Å›|Åº|Å¼|Ĺ‚|Ĺ„|Ĺ›|Ĺş|Ĺź|Ă|�)/u;

function walk(dirPath, output) {
  const entries = readdirSync(dirPath);
  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      walk(fullPath, output);
      continue;
    }

    if (!textExtensions.has(extname(entry))) {
      continue;
    }

    output.push(fullPath);
  }
}

function collectFiles() {
  const files = [];

  for (const dir of includeRoots) {
    walk(join(root, dir), files);
  }

  for (const file of includeFiles) {
    files.push(join(root, file));
  }

  return files;
}

function scanFile(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const issues = [];

  if (content.charCodeAt(0) === 0xfeff) {
    issues.push({
      line: 1,
      preview: 'BOM (U+FEFF) detected at file start',
    });
  }

  for (let i = 0; i < lines.length; i += 1) {
    if (suspiciousPattern.test(lines[i])) {
      issues.push({
        line: i + 1,
        preview: lines[i].trim().slice(0, 180),
      });
    }
  }

  return issues;
}

const files = collectFiles();
const allIssues = [];

for (const filePath of files) {
  const relPath = relative(root, filePath).replace(/\\/g, '/');
  if (ignoredPaths.has(relPath)) {
    continue;
  }

  const issues = scanFile(filePath);
  if (issues.length > 0) {
    allIssues.push({
      file: relative(root, filePath),
      issues,
    });
  }
}

if (allIssues.length > 0) {
  console.error('Detected potential mojibake / broken encoding in source files:');
  for (const entry of allIssues) {
    for (const issue of entry.issues) {
      console.error(`- ${entry.file}:${issue.line} -> ${issue.preview}`);
    }
  }
  process.exit(1);
}

console.log('Encoding check passed. No suspicious mojibake patterns found.');
