# TODO

## P0 (wysoki priorytet)

- [x] Zaktualizować podatne paczki z `npm audit`
  - `react-router-dom` (obecnie `6.30.1`, advisory dla `<6.30.2`)
  - `vite` (obecnie `7.0.4`, advisory dla `<=7.0.7`)
  - Cel: zejść do `0 high` w `npm audit`

- [x] Rozwiązać konflikt peer dependencies `react-helmet-async` vs React 19
  - Status: rozwiązane przez aktualizację zależności (w tym `react-helmet-async@^3.0.0`)
  - Wynik: `npm install` działa bez `--legacy-peer-deps`

- [x] Naprawić uszkodzone kodowanie znaków (mojibake) w plikach wejściowych SEO/UI
  - Dotyczy m.in. `index.html`, `src/components/Hero.jsx`, `src/components/Footer.jsx`
  - Objawy: `Paweł`, `—`, `…` itp.
  - Cel: spójne UTF-8 i poprawne polskie znaki w źródłach

- [x] Naprawić błędny import w `Timeline`
  - `src/components/Timeline.jsx` importuje `../timeline.json`, a plik jest w `src/config/timeline.json`
  - Nawet jeśli sekcja jest chwilowo ukryta, kod powinien być poprawny

## P1 (średni priorytet)

- [ ] Ujednolicić źródło danych domeny w plikach statycznych
  - Nadal hardcoded: `index.html`, `public/robots.txt`, `public/CNAME`
  - Cel: mieć jasno opisany single source of truth i proces aktualizacji domeny

- [ ] Usunąć/uspójnić odwołanie do nieistniejącego manifestu
  - `index.html` zawiera `<link rel="manifest" href="/manifest.webmanifest" />`
  - Obecnie `public/manifest.webmanifest` nie istnieje
  - Opcje:
    - dodać manifest, albo
    - usunąć link

- [x] Zaktualizować `README.md` (teraz to domyślny template Vite)
  - Dodać realny opis projektu, komendy, deploy (GitHub Pages), strukturę danych blog/projects

- [ ] Ujednolicić i18n dla głównych elementów UI
  - Zostały hardcoded fragmenty (np. część alt/title/etykiet, elementy nawigacji/komunikatów technicznych)
  - Blog ma pozostać po polsku (zgodnie z decyzją), ale UI powinno być konsekwentnie tłumaczalne

## P2 (niski priorytet / porządki)

- [ ] Usunąć pusty `src/App.css` albo zacząć go realnie używać
  - Aktualnie importowany w `src/App.jsx`, ale plik jest pusty

- [ ] Zweryfikować sens istnienia pliku roboczego `new-hero-background.html`
  - Jeśli to artefakt eksperymentu, przenieść do `docs/` albo usunąć

- [ ] Uporządkować UX scrollowania
  - Mamy kilka mechanizmów przewijania naraz (`ScrollToTopOnNavigate`, `ScrollToTop`, dodatkowe `window.scrollTo` w `BlogPost`)
  - Warto zostawić jeden spójny mechanizm nawigacyjny

- [ ] Uspójnić copy i daty stałe
  - `Footer` ma statyczny rok `2025`
  - Dobrze przejść na rok dynamiczny


