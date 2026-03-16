# AGENTS.md

## Cel
Ten plik opisuje aktualne zasady pracy agentów (AI/deweloperskich) w repozytorium `dihor`, tak aby zmiany były spójne z architekturą i procesem publikacji.

## Szybki kontekst projektu
- Typ projektu: statyczne portfolio + blog (SPA).
- Stack: React 19 + Vite + React Router + i18next + react-helmet-async.
- Główna rola aplikacji: prezentacja profilu, projektów i wpisów blogowych.
- Aktualna domena/canonical: `https://pawelwielga.dihor.pl`.
- Publiczne assety i routing SPA wspierane przez `public/404.html` (redirect do `/` i restore path przez `sessionStorage`).

## Komendy developerskie
- Instalacja: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview builda: `npm run preview`
- Encoding check: `npm run check:encoding`
- Lint: `npm run lint`
- Hooks install: `npm run hooks:install`
- Hooks status: `npm run hooks:status`
- Format: `npm run format`
- Sitemap ręcznie: `npm run generate:sitemap`

Uwaga:
- `build` uruchamia generator sitemap (`scripts/generate-sitemap.mjs`).
- `postbuild` również uruchamia sitemapę.
- `lint` i `build` uruchamiają automatycznie `check:encoding`, który wykrywa mojibake.
- Pre-commit hook jest w `.githooks/pre-commit` (instalacja przez `npm run hooks:install`).

## Architektura aplikacji
- Entry: `src/main.jsx`
- Routing i layout globalny: `src/App.jsx`
  - `/` -> Home
  - `/project/:id` -> szczegóły projektu
  - `/blog` -> listing bloga
  - `/blog/:id` -> wpis blogowy
- Główne sekcje home:
  - `Hero`, `About`, `Projects`, `Blog`
  - widoczność sekcji sterowana przez `src/config/sections.js`

## Dane i kontrakty

### Projekty (karty)
- Źródło: `src/data/projects/**.json`
- Rejestracja: `src/data/projects/index.js` (`projectMap`, `projectList`)
- Minimalny kontrakt pojedynczego projektu:
  - `id` (unikalne, używane w URL)
  - `category` (`commercial` albo `home`)
  - `type`, `title`, `description`
  - `tech` (tablica stringów)
  - `links` (tablica `{ label, icon }`)
  - `hasDetails` (boolean; ustawiany też automatycznie na podstawie `src/content/projects/<id>/`)

Zasada:
- Po dodaniu nowego pliku projektu trzeba go dodać do `src/data/projects/index.js`, inaczej nie pojawi się na stronie.

### Content V2 (blog + project details)
Od teraz content jest w modelu: 1 wpis/projekt = 1 dedykowany folder.

Źródło prawdy:
- `src/content/index.js`

Parser:
- `src/content/markdownParser.js`

Foldery contentu:
- blog: `src/content/blog/<post-slug>/`
- szczegóły projektów: `src/content/projects/<project-id>/`

Wewnątrz folderu wpisu/projektu:
- `index.md` (treść)
- `meta.json` (konfiguracja)
- assety lokalne (np. `thumbnail.png`, obrazki używane w markdown)

#### Blog `meta.json` (zalecane pola)
- `id`
- `visible`
- `title`
- `date`
- opcjonalnie: `dateISO`, `tags`, `thumbnail`, `excerpt`

#### Project details `meta.json` (zalecane pola)
- `id`
- `title`
- `summary`
- `seoDescription`

#### Mechanizm ładowania
Loader:
- czyta markdown z:
  - `./blog/*/index.md`
  - `./projects/*/index.md`
- czyta konfigurację z:
  - `./blog/*/meta.json`
  - `./projects/*/meta.json`
- scala dane: `meta.json` + frontmatter z `index.md` (frontmatter może nadpisać `meta.json`)
- rozwiązuje względne ścieżki do assetów lokalnych
- parsuje markdown do bloków UI (`MarkdownRenderer`)
- sortuje blog malejąco po `dateISO/date`
- buduje `blogPostMap` i `projectDetailsMap`

#### Assety i markdown
Przykład obrazka w `index.md`:

```md
![Diagram](diagram.png)
```

Ścieżki względne są mapowane przez loader do finalnych URL-i bundlera (Vite), więc nie trzeba ręcznych importów w JSX.

#### Sitemap
`scripts/generate-sitemap.mjs` czyta foldery `src/content/blog/<slug>/` i uwzględnia `meta.json` oraz frontmatter z `index.md`.
Do sitemapy trafiają tylko wpisy z `visible !== false`.

## i18n i treści
- i18n init: `src/i18n.js`
- Słowniki: `src/locales/en.json`, `src/locales/pl.json`
- Język startowy: `en` (`lng: 'en'`, `fallbackLng: 'en'`)

Zasady:
- Dodając nowy klucz tłumaczenia, uzupełnij oba pliki locale.
- Nie mieszaj kluczy dynamicznych i hardcodowanych stringów bez uzasadnienia.

## SEO i metadane
- Meta/OG/Twitter ustawiane per widok przez `react-helmet-async`.
- Główne URL-e i canonical na bazie `SITE_URL` z `src/config/site.js`.

## Styl i UI
- Główne style: `src/index.css`
- Preferuj istniejące CSS variables zamiast nowych kolorów na sztywno.
- Dla nowych sekcji zachowuj klasę `section` i `container`.

## Konwencje kodu
- Prettier: single quotes, `printWidth: 100`, semicolons.
- ESLint: flat config (`eslint.config.js`), `no-unused-vars`.
- Moduły ESM (`"type": "module"` w `package.json`).

## Checklist przed zakończeniem pracy
1. Uruchom `npm run lint`.
2. Uruchom `npm run build`.
3. Jeśli zmieniałeś blog/routes, sprawdź `public/sitemap.xml`.
4. Zweryfikuj działanie tras po odświeżeniu (SPA + 404 fallback).

## Znane ryzyka do ostrożnej edycji
- W repo występują problemy kodowania polskich znaków (mojibake w części starszych treści). Nie rób masowych podmian bez uzgodnienia i testu.
- `SITE_URL` i domenowe dane statyczne wymagają spójnej aktualizacji (w tym `public/CNAME`).
- Content-as-code: literówki w polach `meta.json`/JSON projektu mogą wyciąć element z UI bez błędu builda.

## Ustalone decyzje
- Hosting: GitHub Pages.
- Język: wykrywanie języka przeglądarki; `pl*` -> polski, reszta -> angielski.
- Blog: wpisy po polsku.
- Latest posts: sortowanie malejące po `dateISO/date`.
- `SITE_URL`: jedno współdzielone miejsce: `src/config/site.js`.
- Kontakt: placeholder `mailto` zostaje.
- Timeline: kod zostaje w repo, ale bez renderowania na stronie.
- Szczegóły projektów: część kart może mieć brak dedykowanych szczegółów.
- `new-hero-background.html`: plik potrzebny, nie usuwać.

## Aktualna struktura katalogów
Poniżej aktualne foldery i podfoldery repozytorium, z pominięciem katalogów generowanych (`.git`, `node_modules`, `dist`).

```text
.github
.github/skills
.github/skills/bmad-advanced-elicitation
.github/skills/bmad-agent-wds-freya-ux
.github/skills/bmad-agent-wds-saga-analyst
.github/skills/bmad-brainstorming
.github/skills/bmad-brainstorming/steps
.github/skills/bmad-editorial-review-prose
.github/skills/bmad-editorial-review-structure
.github/skills/bmad-help
.github/skills/bmad-index-docs
.github/skills/bmad-master
.github/skills/bmad-party-mode
.github/skills/bmad-party-mode/steps
.github/skills/bmad-review-adversarial-general
.github/skills/bmad-review-edge-case-hunter
.github/skills/bmad-shard-doc
.github/skills/bmad-wds-acceptance-test
.github/skills/bmad-wds-acceptance-testing
.github/skills/bmad-wds-agentic-development
.github/skills/bmad-wds-alignment-signoff
.github/skills/bmad-wds-analysis
.github/skills/bmad-wds-analyze-product
.github/skills/bmad-wds-asset-generation
.github/skills/bmad-wds-browse-design-system
.github/skills/bmad-wds-bugfixing
.github/skills/bmad-wds-content-creation
.github/skills/bmad-wds-create-design-system
.github/skills/bmad-wds-deploy
.github/skills/bmad-wds-design-solution
.github/skills/bmad-wds-design-system
.github/skills/bmad-wds-development
.github/skills/bmad-wds-edit-components
.github/skills/bmad-wds-evolution
.github/skills/bmad-wds-figma-integration
.github/skills/bmad-wds-handover
.github/skills/bmad-wds-icons
.github/skills/bmad-wds-images
.github/skills/bmad-wds-implement
.github/skills/bmad-wds-import-design-system
.github/skills/bmad-wds-Modular Component Architecture
.github/skills/bmad-wds-Object Type Router
.github/skills/bmad-wds-page-designs
.github/skills/bmad-wds-product-evolution
.github/skills/bmad-wds-project-brief
.github/skills/bmad-wds-project-setup
.github/skills/bmad-wds-prototyping
.github/skills/bmad-wds-reverse-engineering
.github/skills/bmad-wds-scenarios
.github/skills/bmad-wds-scenarios-validate
.github/skills/bmad-wds-scope-improvement
.github/skills/bmad-wds-stitch-generation
.github/skills/bmad-wds-trigger-mapping
.github/skills/bmad-wds-trigger-mapping-validate
.github/skills/bmad-wds-ui-elements
.github/skills/bmad-wds-ux-design
.github/skills/bmad-wds-videos
.github/skills/bmad-wds-view-components
.github/skills/bmad-wds-wireframes
.github/skills/bmad-wds-workflow-design-system
.github/skills/bmad-wds-workflow-discuss
.github/skills/bmad-wds-workflow-dream
.github/skills/bmad-wds-workflow-sketch
.github/skills/bmad-wds-workflow-specify
.github/skills/bmad-wds-workflow-suggest
.github/skills/bmad-wds-workflow-validate
.github/skills/bmad-wds-workflow-visual
.github/workflows
public
public/img
scripts
src
src/assets
src/components
src/components/projects
src/config
src/content
src/content/blog
src/content/blog/nextcloud-przez-cloudflare-tunnel
src/content/blog/reverse-proxy-nginx-pihole
src/content/projects
src/content/projects/niemanudy
src/data
src/data/projects
src/data/projects/home
src/data/projects/mbank
src/data/projects/zortrax
src/hooks
src/locales
```
