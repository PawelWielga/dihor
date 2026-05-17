Projekt **Dihor HA Components** to biblioteka własnych kart Lovelace dla Home Assistant. Powstała po to, żeby zebrać kilka spójnych wizualnie komponentów dashboardu w jednej paczce instalowanej przez HACS albo dodawanej ręcznie jako zasób typu `module`.

## Co zostało wykorzystane

### Home Assistant Lovelace

Projekt jest przygotowany jako zestaw custom cards dla widoku Lovelace. Każda karta działa jako niestandardowy element HTML rejestrowany w przeglądarce i może być użyta w konfiguracji dashboardu przez składnię `type: custom:<nazwa-karty>`.

Home Assistant dostarcza kartom kontekst aplikacji, stan encji oraz akcje użytkownika. Dzięki temu komponenty mogą odczytywać dane z encji, reagować na kliknięcia i otwierać standardowe widoki, takie jak `more-info`.

### Web Components

Karty są zbudowane jako Web Components, czyli niezależne komponenty działające bez frameworka aplikacyjnego po stronie Home Assistant. To ważne, bo frontend Home Assistant ładuje custom cards jako moduły JavaScript i oczekuje elementów zarejestrowanych przez `customElements`.

Każda karta definiuje własny tag, na przykład `dihor-clock-card` albo `dihor-person-card`, a rejestracja elementu jest wykonywana tylko wtedy, gdy dany tag nie istnieje jeszcze w przeglądarce.

### Lit

Do implementacji komponentów wykorzystany jest `Lit`. Biblioteka odpowiada za reaktywne właściwości, renderowanie HTML oraz integrację ze standardem Web Components.

W praktyce `Lit` upraszcza pisanie kart: zmiana konfiguracji albo stanu Home Assistant może automatycznie przełożyć się na ponowne wyrenderowanie widoku bez ręcznego manipulowania DOM.

### TypeScript

Kod źródłowy kart jest napisany w `TypeScript`. Typowanie pomaga utrzymać kontrakty konfiguracji kart, danych Home Assistant i wspólnych metod bazowych.

W projekcie wykorzystywane są też lokalne definicje typów dla Home Assistant oraz importów CSS jako string, dzięki czemu kod może być sprawdzany statycznie mimo pracy z API, które nie jest standardową częścią przeglądarki.

### BaseDihorCard

Wspólna baza kart znajduje się w `BaseDihorCard`. To warstwa, która porządkuje wspólne zachowania komponentów, dzięki czemu pojedyncze karty mogą skupiać się na własnej konfiguracji, danych i widoku.

Takie podejście ogranicza duplikację i ułatwia utrzymanie spójnego sposobu obsługi konfiguracji, renderowania oraz integracji z Home Assistant.

### Rollup

Do budowania paczki używany jest `Rollup`. Jego zadaniem jest zebranie kodu TypeScript, zależności i stylów w jeden artefakt runtime:

```text
dist/dihor-ha-components.js
```

Ten plik jest finalnym modułem JavaScript, który może zostać załadowany przez Home Assistant jako zasób frontendowy.

### CSS importowany jako string

Style kart są trzymane w osobnych plikach CSS i importowane do TypeScript jako string. Dzięki temu każda karta może mieć własny zestaw stylów, a wspólne style są utrzymywane w katalogu `src/shared/styles`.

Takie rozwiązanie pozwala zachować czytelny podział między logiką komponentu i warstwą wizualną, a jednocześnie nadal bundlować wszystko do jednego pliku dystrybucyjnego.

### HACS

Projekt jest przygotowany pod dystrybucję przez HACS. Manifest `hacs.json` opisuje paczkę dla Home Assistant Community Store, a użytkownik może dodać repozytorium jako custom repository typu `Dashboard`.

Dzięki temu instalacja i aktualizacje kart mogą odbywać się z poziomu Home Assistant, bez ręcznego kopiowania plików po każdej zmianie wersji.

### Preview i dokumentacja

Katalog `docs` pełni rolę statycznego preview oraz dokumentacji kart. Skrypt `prepare-docs` kopiuje do niego zbudowany plik runtime, manifest kart, style i pliki potrzebne do podglądu.

Manifest `cards-docs.json` opisuje karty widoczne w preview. Dzięki temu można sprawdzać wygląd i przykłady konfiguracji bez uruchamiania pełnego środowiska Home Assistant.

### Skrypty operacyjne

W projekcie znajdują się skrypty automatyzujące powtarzalne zadania:

- `npm run build` buduje finalny plik JavaScript,
- `npm run prepare-docs` odświeża pliki dokumentacji i preview,
- `npm run check-docs-manifest` sprawdza spójność assetów dokumentacji,
- `npm run lint` uruchamia kontrolę jakości kodu.

## Do czego służą karty

### Dihor Clock Card

Karta zegara cyfrowego pokazuje czas w prostym, konfigurowalnym widoku. Jest przeznaczona do dashboardów, w których czas ma być osobnym, czytelnym elementem interfejsu.

### Dihor Minecraft Card

Karta Minecraft służy do prezentowania statusu serwera Minecraft w Home Assistant. Może być użyta na dashboardzie domowym jako szybki podgląd dostępności serwera.

### Dihor Person Card

Karta osoby bazuje na encji `person` i rozszerza jej prezentację o informacje związane z telefonem, baterią, ładowaniem, zdjęciem encji i stanem obecności.

### Dihor Toggle Button Card

Karta przycisku pozwala sterować pojedynczą encją, na przykład światłem, przełącznikiem albo sceną. Jej zadaniem jest dać duży, wygodny element sterujący do najczęściej używanych akcji.

## Wnioski

Najważniejszą wartością projektu jest zamknięcie własnych komponentów Home Assistant w jednej, wersjonowanej bibliotece. Dzięki temu karty mają wspólną strukturę, spójny wygląd, osobny proces budowania i prostą ścieżkę dystrybucji przez HACS.
