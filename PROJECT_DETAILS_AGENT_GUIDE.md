# Instrukcja dla Agentów: dodawanie opisów projektów

Ten plik dołączaj Agentowi, gdy chcesz dodać szczegółowy opis projektu na stronie `dihor`.

## Cel

Dodać stronę szczegółów projektu dostępną pod adresem:

```text
/project/<id-projektu>
```

Opis projektu jest ładowany z katalogu:

```text
src/content/projects/<id-projektu>/
```

## Ważne pliki

- Lista projektów na stronie głównej:
  - `src/data/projects/index.js`
  - `src/data/projects/home/*.json`
  - `src/data/projects/mbank/*.json`
  - `src/data/projects/zortrax/*.json`
- Szczegóły projektów:
  - `src/content/projects/<id>/meta.json`
  - `src/content/projects/<id>/index.md`
- Loader treści:
  - `src/content/index.js`
- Widok szczegółów:
  - `src/components/projects/ProjectDetails.jsx`

## Jak dodać opis dla istniejącego projektu

1. Znajdź `id` projektu w plikach `src/data/projects/**/*.json`.

2. Utwórz katalog:

```text
src/content/projects/<id>/
```

3. Dodaj plik `meta.json`:

```json
{
  "id": "<id>",
  "title": "Nazwa projektu - szczegóły projektu",
  "summary": "Krótki opis projektu.",
  "seoDescription": "Opis SEO strony szczegółów projektu."
}
```

4. Dodaj plik `index.md` z opisem projektu.

Zalecana struktura:

```md
Projekt **Nazwa projektu** ...

## Zakres projektu

- ...
- ...

## Najważniejsze moduły

### Moduł 1

Opis.

### Moduł 2

Opis.

## Aspekty techniczne

- ...
- ...

## Wnioski

Podsumowanie wartości projektu.
```

5. W pliku danych projektu ustaw:

```json
"hasDetails": true
```

Bez tego karta projektu nie pokaże przycisku prowadzącego do szczegółów.

## Jak dodać opis dla nowego projektu

1. Dodaj plik projektu w odpowiednim katalogu `src/data/projects/<kategoria>/`.

2. Zaimportuj go w:

```text
src/data/projects/index.js
```

3. Dopisz projekt do tablicy `rawProjects`.

4. Ustaw w danych projektu:

```json
"hasDetails": true
```

5. Dodaj katalog i pliki:

```text
src/content/projects/<id>/meta.json
src/content/projects/<id>/index.md
```

## Zasady treści

- Pisz konkretnie i technicznie.
- Opisy projektów mogą być po polsku.
- Używaj istniejącego stylu z `src/content/projects/niemanudy/`.
- Nie dodawaj frontmatter do `index.md`, jeśli wystarcza `meta.json`.
- Nie zmieniaj routera: szczegóły są obsługiwane przez istniejącą trasę `/project/:id`.
- Nie edytuj ręcznie plików w `dist`, jeśli zmiana wynika z builda.

## Weryfikacja

Po zmianach uruchom:

```bash
npm run lint
npm run build
```

`npm run build` może zaktualizować `public/sitemap.xml`. Jeśli zmieniają się tylko timestampy i nie jest to potrzebne do zadania, nie zostawiaj tego jako szumu w diffie.

## Minimalny przykład

Struktura:

```text
src/content/projects/hacomponents/
  meta.json
  index.md
```

`meta.json`:

```json
{
  "id": "hacomponents",
  "title": "Dihor HA Components - szczegóły projektu",
  "summary": "Biblioteka custom cards dla Home Assistant.",
  "seoDescription": "Szczegóły projektu Dihor HA Components."
}
```

W danych projektu:

```json
"hasDetails": true
```
