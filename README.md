# Paweł Wielga - Portfolio & Blog

Personal portfolio and blog built with React 19, Vite, React Router, i18next, and react-helmet-async.

## Features

- **Portfolio**: Showcase of projects with categories and details
- **Blog**: Markdown-based blog with SEO optimization
- **Multi-language**: English and Polish support
- **Responsive**: Mobile-friendly design
- **SEO optimized**: React Helmet integration for meta tags

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **i18next** - Internationalization
- **react-helmet-async** - SEO meta tags
- **Font Awesome** - Icons
- **Inter Font** - Typography

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview Build

```bash
npm run preview
```

## Deploy

The project is deployed on GitHub Pages. The build process automatically generates the sitemap.

## Project Structure

### Configuration

- `src/config/site.js` - Site URL and author information
- `src/config/sections.js` - Section visibility configuration
- `src/config/skills.json` - Skills data
- `src/config/timeline.json` - Timeline data

### Data

- `src/data/projects/` - Project cards data (JSON files)
- `src/data/projects/index.js` - Project data index
- `src/content/blog/` - Blog posts (markdown with meta.json)
- `src/content/projects/` - Project details (markdown with meta.json)

### Components

- `src/components/` - Reusable UI components
- `src/components/projects/` - Project-related components

### Styles

- `src/index.css` - Main styles with CSS variables
- `src/App.css` - App-specific styles (currently empty)

## Content Management

### Adding a Blog Post

1. Create a new folder in `src/content/blog/` with a slug name
2. Add `index.md` with the post content (markdown)
3. Add `meta.json` with post metadata (id, title, date, etc.)
4. Add thumbnail and other images in the same folder

### Adding a Project

1. Create a new JSON file in `src/data/projects/` or `src/data/projects/home/`
2. Add the project data following the existing structure
3. Add to `src/data/projects/index.js` to make it visible

## SEO

- Meta tags are managed with react-helmet-async
- Sitemap is generated automatically during build
- Canonical URL is set to `https://pawelwielga.dihor.pl`

## License

MIT
