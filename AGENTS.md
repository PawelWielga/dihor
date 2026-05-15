# AGENTS.md

## Purpose

This file provides guidelines for AI coding agents working in this repository. All changes must pass lint and build before completion.

---

## Developer Commands

```bash
# Installation
npm install

# Development
npm run dev              # Start dev server (http://localhost:5173)

# Build & Test
npm run build            # Production build + sitemap generation
npm run preview          # Preview production build locally
npm run lint             # Run ESLint + encoding check

# Quality Checks
npm run check:encoding   # Detect mojibake/encoding issues
npm run format          # Format code with Prettier

# Git Hooks
npm run hooks:install    # Install pre-commit hooks
npm run hooks:status    # Check hook status

# Manual
npm run generate:sitemap   # Regenerate sitemap.xml
```

**Pre-commit hooks:** `.githooks/pre-commit` - runs lint automatically before commit.

---

## Code Style Guidelines

### General

- **ES Modules**: All files use ESM (`"type": "module"` in package.json)
- **File extensions**: `.jsx` for React components, `.js` for utilities, `.ts` for typed files
- **No default exports for utilities** - prefer named exports for better refactoring

### Naming Conventions

| Type        | Convention                  | Example                                  |
| ----------- | --------------------------- | ---------------------------------------- |
| Components  | PascalCase                  | `BlogCard.jsx`, `PageSection.jsx`        |
| Hooks       | camelCase with `use` prefix | `useScrollToTop.js`, `useSeoMetadata.js` |
| Utilities   | camelCase                   | `markdownParser.js`, `useDetailData.js`  |
| CSS classes | kebab-case                  | `.section-title`, `.card-image`          |
| Constants   | SCREAMING_SNAKE_CASE        | `SITE_URL`, `AUTHOR_NAME`                |
| i18n keys   | dot notation, lowercase     | `about.title`, `blog.empty`              |

### Imports Order

```jsx
// 1. React/framework
import { useState } from 'react';
import { Link } from 'react-router-dom';

// 2. Third-party libraries
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

// 3. Internal components (absolute paths)
import Card from '@/components/Card.jsx';
import useScrollToTop from '@/hooks/useScrollToTop.js';

// 4. Internal utils (relative paths)
import { projectList } from '../data/projects';

// 5. Config/constants
import { SITE_URL } from '../config/site.js';

// 6. Styles (only when needed)
import './Component.css';
```

### React Patterns

**Component structure:**

```jsx
// 1. Imports (alphabetical within groups)
// 2. Component definition
// 3. Export

function ComponentName({ prop1, prop2 }) {
  // 1. Hooks (always at top)
  const [state, setState] = useState();

  // 2. Derived state
  const derived = useMemo(() => ..., []);

  // 3. Handlers
  const handleClick = () => { ... };

  // 4. Early returns
  if (!data) return <NotFound />;

  // 5. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

export default ComponentName;
```

**Hooks rules:**

- Call hooks at the top level only
- Never call hooks conditionally
- Custom hooks must start with `use`

### CSS Guidelines

- Use CSS variables from `:root` in `src/index.css`
- Prefer existing variables over new hardcoded colors
- Use `composes:` for style inheritance when beneficial
- Section components should use `.section` and `.container` classes
- Use flexbox/grid over absolute positioning

### Error Handling

- Never swallow errors silently
- Use early returns for invalid states
- Log errors appropriately (not to console in production)
- Validate props with reasonable defaults

---

## Project Architecture

### Tech Stack

- **React 19** + Vite
- **React Router 7** for routing
- **i18next** for internationalization
- **react-helmet-async** for SEO meta

### Key Files

| File                     | Purpose                  |
| ------------------------ | ------------------------ |
| `src/App.jsx`            | Root with routing        |
| `src/main.jsx`           | Entry point              |
| `src/i18n.js`            | i18next configuration    |
| `src/config/site.js`     | SITE_URL, AUTHOR_NAME    |
| `src/config/sections.js` | Section visibility flags |

### Routes

| Path           | Component                          |
| -------------- | ---------------------------------- |
| `/`            | Home (Hero, About, Projects, Blog) |
| `/project/:id` | ProjectDetails                     |
| `/blog`        | Blog listing                       |
| `/blog/:id`    | BlogPost                           |

### Reusable Components

| Component       | Location                           | Purpose                        |
| --------------- | ---------------------------------- | ------------------------------ |
| `Card`          | `src/components/Card.jsx`          | Unified card for projects/blog |
| `PageSection`   | `src/components/PageSection.jsx`   | Section wrapper                |
| `SectionTitle`  | `src/components/SectionTitle.jsx`  | Title with underline           |
| `BackLink`      | `src/components/BackLink.jsx`      | Navigation back link           |
| `SocialLinks`   | `src/components/SocialLinks.jsx`   | Social media links             |
| `SkillsDisplay` | `src/components/SkillsDisplay.jsx` | Skills tags                    |
| `BlogCard`      | `src/components/BlogCard.jsx`      | Blog card (uses Card)          |

### Reusable Hooks

| Hook                   | Location                            | Purpose                         |
| ---------------------- | ----------------------------------- | ------------------------------- |
| `useSeoMetadata`       | `src/hooks/useSeoMetadata.js`       | SEO meta tags                   |
| `useScrollToTop`       | `src/hooks/useScrollToTop.js`       | Scroll management               |
| `useScrollAnimation`   | `src/hooks/useScrollAnimation.js`   | IntersectionObserver animations |
| `useCenteredHighlight` | `src/hooks/useCenteredHighlight.js` | Card highlighting               |
| `useDetailData`        | `src/hooks/useDetailData.js`        | Data lookup                     |

---

## Content System

### Blog Posts

Location: `src/content/blog/<slug>/`

- `index.md` - Content with frontmatter
- `meta.json` - Metadata (id, title, date, visible, etc.)

### Project Details

Location: `src/content/projects/<id>/`

- `index.md` - Content
- `meta.json` - Metadata

### Adding New Content

1. Create folder in `src/content/{blog,projects}/`
2. Add `index.md` and `meta.json`
3. For projects: register in `src/data/projects/index.js`
4. Run `npm run build` to regenerate sitemap

---

## i18n Guidelines

- Language files: `src/locales/en.json`, `src/locales/pl.json`
- Default language: English
- Add new keys to both files
- Use dot notation: `section.key`

---

## Pre-Commit Checklist

1. Run `npm run lint` - must pass
2. Run `npm run build` - must succeed
3. Check `public/sitemap.xml` if routes changed
4. Test navigation after refresh (SPA routing)

---

## Known Risks

- **Encoding issues**: Polish characters may have mojibake in old content
- **SITE_URL**: Single source is `src/config/site.js` - update here first
- **Content JSON errors**: Typo in `meta.json` may silently break UI
- **HeroBackground.jsx**: Contains inline classes (known ESLint warning)

---

## Decisions (Frozen)

- Hosting: GitHub Pages
- Blog posts: in Polish
- Language detection: `pl*` → Polish, others → English
- Timeline: code exists but not rendered
- Contact: mailto placeholder (no form)
