# AGENTS.md

## Cel
Ten plik opisuje zasady pracy dla agentów (AI/deweloperskich) w repozytorium `dihor`, tak aby zmiany były spójne z aktualną architekturą i sposobem publikacji strony.

## Szybki kontekst projektu
- Typ projektu: statyczne portfolio + blog (SPA).
- Stack: React 19 + Vite 7 + React Router + i18next + react-helmet-async.
- Główna rola aplikacji: prezentacja profilu, projektów i wpisów blogowych.
- Aktualna domena/canonical: `https://pawelwielga.dihor.pl`.
- Publiczne assety i routing SPA wspierane przez `public/404.html` (redirect do `/` i restore path przez `sessionStorage`).

## Komendy developerskie
- Instalacja: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview builda: `npm run preview`
- Lint: `npm run lint`
- Format: `npm run format`
- Sitemap ręcznie: `npm run generate:sitemap`

Uwaga:
- `build` już uruchamia generator sitemap (`scripts/generate-sitemap.mjs`).
- `postbuild` również uruchamia sitemapę, więc nie duplikuj własnych skryptów bez potrzeby.

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

### Projekty
- Źródło: `src/data/projects/**.json`
- Rejestracja: `src/data/projects/index.js` (`projectMap`, `projectList`)
- Minimalny kontrakt pojedynczego projektu:
  - `id` (musi być unikalne, używane w URL)
  - `category` (`commercial` albo `home`)
  - `type`, `title`, `description`
  - `tech` (tablica stringów)
  - `links` (tablica `{ label, icon }`)
  - `hasDetails` (boolean)

Zasada:
- Po dodaniu nowego pliku projektu trzeba go dodać do `src/data/projects/index.js`, inaczej nie pojawi się na stronie.

### Blog
- Rejestr wpisów: `src/data/blogposts/blogposts.js`
- Każdy wpis to osobny moduł JS w `src/data/blogposts/`
- Praktycznie wymagane pola:
  - `id`, `visible`, `title`, `date`
  - `content` (string albo tablica bloków)
  - opcjonalnie: `tags`, `image`, `dateISO`
- Bloki `content` obsługiwane w UI:
  - `header` (`level`, `text`)
  - `paragraph` (`text`)
  - `list` (`elements`)
  - `code` (`lang`, `text`)

Zasady:
- Jeśli wpis ma być publiczny, ustaw `visible: true`.
- `id` jest używane w trasie `/blog/:id` i sitemapie.
- Po dodaniu wpisu do `blogposts.js` sitemap wygeneruje wpis automatycznie (dla `visible: true`).

## i18n i treści
- i18n init: `src/i18n.js`
- Słowniki: `src/locales/en.json`, `src/locales/pl.json`
- Obecnie język startowy ustawiony na `en` (`lng: 'en'`, `fallbackLng: 'en'`).

Zasady:
- Dodając nowy klucz tłumaczenia, uzupełnij oba pliki locale.
- Nie mieszaj kluczy dynamicznych i hardcodowanych stringów bez uzasadnienia.

## SEO i metadane
- Meta/OG/Twitter są ustawiane per widok przez `react-helmet-async`.
- Główne URL-e i canonical są budowane na bazie `SITE_URL = https://pawelwielga.dihor.pl`.
- `scripts/generate-sitemap.mjs` tworzy `public/sitemap.xml`.

Zasady:
- Przy dodaniu nowej publicznej trasy:
  - zaktualizuj routing,
  - dodaj metadata w komponencie strony,
  - rozszerz generator sitemap (jeśli trasa nie wynika z istniejących danych).

## Styl i UI
- Główne style: `src/index.css`
- Używane są CSS variables (`:root`) i efekt glass/gradient.
- Karty projektów i bloga mają wspólne zachowania hover/animacje scroll.

Zasady:
- Preferuj używanie istniejących zmiennych CSS zamiast nowych kolorów “na sztywno”.
- Jeśli dodajesz nowe komponenty-sekcje, trzymaj klasę `section` i `container` dla spójności layoutu.

## Konwencje kodu
- Prettier: single quotes, `printWidth: 100`, semicolons.
- ESLint: konfiguracja flat (`eslint.config.js`), reguła `no-unused-vars`.
- Moduły ESM (`"type": "module"` w `package.json`).

## Checklist przed zakończeniem pracy
1. Uruchom `npm run lint`.
2. Uruchom `npm run build`.
3. Jeśli zmieniałeś treści bloga lub trasy, sprawdź `public/sitemap.xml`.
4. Zweryfikuj, że nowe linki/route działają po odświeżeniu (scenariusz SPA + 404 fallback).

## Znane ryzyka do ostrożnej edycji
- W repo widać problemy z kodowaniem polskich znaków (mojibake w części tekstów). Nie wykonuj masowych podmian znaków bez uzgodnienia strategii i testu produkcyjnego.
- `SITE_URL` jest wpisany ręcznie w wielu miejscach. Przy zmianie domeny trzeba zaktualizować wszystkie wystąpienia oraz `public/CNAME`.
- Dane projektów i bloga są “content as code”; małe literówki w polach obiektu mogą wyciąć element z UI bez błędu builda.


## Ustalone decyzje (potwierdzone przez właściciela projektu)
- Hosting: GitHub Pages pozostaje docelowym hostingiem.
- Język: aplikacja ma wykrywać język przeglądarki; `pl*` -> polski, pozostałe -> angielski.
- Blog: wpisy pozostają po polsku; to osobisty notatnik autora.
- Latest posts: sortowanie malejące po `dateISO/date`.
- `SITE_URL`: utrzymywany w jednym współdzielonym miejscu (`src/config/site.js`).
- Kontakt: placeholder `mailto` zostaje bez zmian.
- Timeline: kod zostaje w repo, ale nadal ukryty (bez renderowania na stronie).
- Szczegóły projektów: `hasDetails: false` pozostaje poprawnym stanem dla części kart.
- Kodowanie znaków: unikamy masowych zmian „w ciemno”; poprawki robimy tylko kontrolowanie i weryfikujemy w przeglądarce.
