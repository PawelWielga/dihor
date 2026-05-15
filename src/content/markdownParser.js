export function parseFrontmatter(rawContent) {
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
  const lines = frontmatterText.split('\n');
  const frontmatter = {};

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line || /^\s*#/.test(line)) {
      continue;
    }

    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;

    if (rawValue === '') {
      const listItems = [];
      let j = i + 1;
      while (j < lines.length) {
        const itemMatch = lines[j].match(/^\s*-\s+(.*)$/);
        if (!itemMatch) {
          break;
        }
        listItems.push(parseScalar(itemMatch[1]));
        j += 1;
      }
      if (listItems.length > 0) {
        frontmatter[key] = listItems;
        i = j - 1;
      } else {
        frontmatter[key] = '';
      }
      continue;
    }

    frontmatter[key] = parseScalar(rawValue);
  }

  return { frontmatter, body };
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const inner = trimmed.slice(1, -1).trim();
    if (!inner) {
      return [];
    }
    return inner.split(',').map((part) => stripQuotes(part.trim()));
  }

  if (trimmed === 'true') {
    return true;
  }

  if (trimmed === 'false') {
    return false;
  }

  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }

  return stripQuotes(trimmed);
}

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

export function parseMarkdownToBlocks(markdown) {
  const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n');
  const blocks = [];

  let paragraphLines = [];
  let inCode = false;
  let codeLang = 'plaintext';
  let codeLines = [];

  const flushParagraph = () => {
    if (paragraphLines.length === 0) {
      return;
    }
    const text = paragraphLines.join(' ').replace(/\s+/g, ' ').trim();
    if (text) {
      blocks.push({ type: 'paragraph', text });
    }
    paragraphLines = [];
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    if (inCode) {
      if (line.trim().startsWith('```')) {
        blocks.push({ type: 'code', lang: codeLang, text: codeLines.join('\n') });
        inCode = false;
        codeLang = 'plaintext';
        codeLines = [];
      } else {
        codeLines.push(line);
      }
      continue;
    }

    const fence = line.match(/^```\s*([a-zA-Z0-9_-]+)?\s*$/);
    if (fence) {
      flushParagraph();
      inCode = true;
      codeLang = (fence[1] || 'plaintext').toLowerCase();
      codeLines = [];
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      blocks.push({
        type: 'heading',
        level: Math.min(4, Math.max(2, heading[1].length)),
        text: heading[2].trim(),
      });
      continue;
    }

    if (/^>\s+/.test(line)) {
      flushParagraph();
      blocks.push({ type: 'blockquote', text: line.replace(/^>\s+/, '').trim() });
      continue;
    }

    const unordered = line.match(/^\s*[-*]\s+(.+)$/);
    if (unordered) {
      flushParagraph();
      const items = [unordered[1].trim()];
      while (i + 1 < lines.length) {
        const next = lines[i + 1].match(/^\s*[-*]\s+(.+)$/);
        if (!next) {
          break;
        }
        items.push(next[1].trim());
        i += 1;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph();
      const items = [ordered[1].trim()];
      while (i + 1 < lines.length) {
        const next = lines[i + 1].match(/^\s*\d+\.\s+(.+)$/);
        if (!next) {
          break;
        }
        items.push(next[1].trim());
        i += 1;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    const markdownImage = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (markdownImage) {
      flushParagraph();
      blocks.push({
        type: 'image',
        alt: markdownImage[1].trim(),
        src: markdownImage[2].trim(),
      });
      continue;
    }

    paragraphLines.push(line.trim());
  }

  flushParagraph();

  if (inCode) {
    blocks.push({ type: 'code', lang: codeLang, text: codeLines.join('\n') });
  }

  return blocks;
}

export function extractExcerptFromBlocks(blocks, maxLength = 180) {
  const paragraph = blocks.find((block) => block.type === 'paragraph')?.text || '';
  if (!paragraph) {
    return '';
  }
  return paragraph.length > maxLength ? `${paragraph.slice(0, maxLength)}...` : paragraph;
}

export function getPostTimestamp(entry) {
  return Date.parse(entry?.dateISO || entry?.date || 0) || 0;
}


