import{t as e}from"./jsx-runtime-BkDbGW51.js";var t=`# Jak naprawić polskie znaki w PowerShell? Koniec z "krzaczkami" podczas pracy z AI

Praca z modelami AI (jak ChatGPT czy Claude) bezpośrednio w terminalu to ogromna wygoda, dopóki nie zderzymy się z murem w postaci błędnego kodowania znaków. Jeśli zamiast polskich liter widzisz dziwne symbole (tzw. krzaczki), problem leży w domyślnym kodowaniu Twojego PowerShella.

W tym krótkim poradniku pokonamy ten problem raz a dobrze, ustawiając **UTF-8** jako standard dla Twojej konsoli.

---

## Dlaczego to się dzieje?
Większość modeli AI i nowoczesnych skryptów generuje tekst w standardzie **UTF-8**. Tymczasem starsze wersje PowerShella w systemie Windows często domyślnie korzystają z kodowania **Windows-1250** lub **CP852**. Ta rozbieżność sprawia, że polskie "ą, ę, ś, ż" zamieniają się w nieczytelny ciąg znaków.

Oto jak to naprawić w kilku prostych krokach.

---

## Instrukcja krok po kroku

### 1. Sprawdź lokalizację swojego profilu
Otwórz PowerShell i wpisz poniższą komendę:

\`\`\`powershell
$PROFILE
\`\`\`

Zwróci ona ścieżkę do pliku konfiguracyjnego Twojej konsoli. Zazwyczaj wygląda ona tak:  
\`C:\\Users\\NazwaUżytkownika\\Documents\\WindowsPowerShell\\Microsoft.PowerShell_profile.ps1\`

### 2. Utwórz plik (jeśli nie istnieje)
Jeżeli po przejściu do wskazanej lokalizacji nie widzisz pliku \`Microsoft.PowerShell_profile.ps1\`, musisz go stworzyć. Możesz to zrobić ręcznie lub szybciej – komendą w samym PowerShellu:

\`\`\`powershell
if (!(Test-Path -Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }
\`\`\`

### 3. Edytuj profil i wymuś UTF-8
Otwórz ten plik w dowolnym edytorze (Notatnik, VS Code) i wklej do niego poniższe linie:

\`\`\`powershell
[Console]::InputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
chcp 65001 > $null
\`\`\`

**Co to zmienia?**
* Ustawia kodowanie wejścia i wyjścia konsoli na standard **UTF-8**.
* Komenda \`chcp 65001\` zmienia stronę kodową aktywnej konsoli (flaga \`> $null\` sprawia, że proces dzieje się w tle).

### 4. Zapisz i zrestartuj
Zapisz zmiany w pliku, zamknij okno PowerShella i uruchom go ponownie.

### 5. Weryfikacja
Aby upewnić się, że wszystko działa poprawnie, wpisz kolejno:

\`\`\`powershell
[Console]::InputEncoding
[Console]::OutputEncoding
\`\`\`

W obu przypadkach w sekcji **EncodingName** powinieneś zobaczyć wartość **Unicode (UTF-8)**.

---

## Podsumowanie
Od teraz Twój PowerShell będzie natywnie rozumiał polskie znaki generowane przez AI i poprawnie przekazywał je dalej. To mała zmiana, która drastycznie poprawia komfort pracy z tekstami i kodem w systemie Windows.

**Masz problem z innym narzędziem dev? Daj znać w komentarzu na moim blogu!**

`,n=`Cloudflare Tunnel pozwala wystawić Nextcloud bez publicznego IP i bez przekierowań portów na routerze. Dla domowego labu to często najszybsza droga do działającego środowiska.

## Kiedy to podejście ma sens?

- Nie chcesz otwierać portów 80/443 na routerze.
- Chcesz uruchomić usługę szybko i bez dodatkowego reverse proxy na start.
- Potrzebujesz prostego wejścia z internetu do zasobu w LAN.

## 1. Instalacja cloudflared

\`\`\`bash
curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb
sudo dpkg -i cloudflared.deb
\`\`\`

## 2. Logowanie

\`\`\`bash
cloudflared login
\`\`\`

## 3. Tunnel jako usługa systemd

\`\`\`ini
[Unit]
Description=Cloudflare Tunnel
After=network.target

[Service]
TimeoutStartSec=0
Type=simple
Restart=always
ExecStart=/usr/bin/cloudflared tunnel run --no-autoupdate --token TWOJ_TOKEN

[Install]
WantedBy=multi-user.target
\`\`\`

\`\`\`bash
sudo systemctl daemon-reload
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
\`\`\`

## 4. Nextcloud w Dockerze

\`\`\`bash
docker run -d \\
  --name nextcloud-app \\
  -p 8080:80 \\
  -v nextcloud_data:/var/www/html \\
  nextcloud
\`\`\`

## 5. trusted_domains

\`\`\`bash
docker exec -it nextcloud-app bash
vi /var/www/html/config/config.php
\`\`\`

Dodaj host publiczny do \`trusted_domains\`, np. \`nc.twojadomena.pl\`.

## Moje uwagi praktyczne

- W labie możesz terminować TLS na Cloudflare i zostawić HTTP w LAN.
- Dla krytycznych usług warto dodać Cloudflare Access (MFA/OTP).
- Aktualizacje \`cloudflared\` rób świadomie w oknie serwisowym.

## Podsumowanie

To podejście daje bardzo szybki efekt i niski próg wejścia. W większości domowych scenariuszy działa stabilnie i ogranicza konfigurację sieciową do minimum.
`,r=`Ten setup to jedna z tych rzeczy, które po zrobieniu raz, zostają na stałe. Zamiast \`:8111\` czy \`:9000\` w pasku adresu, masz zwykłe adresy lokalne jak \`http://tc.local\` czy \`http://portainer.local\`.

## Co się tu dzieje i po co?

- Reverse proxy (Nginx) przyjmuje ruch na porcie 80 i kieruje go do właściwego kontenera po nazwie.
- Pi-hole działa jako lokalny DNS i tłumaczy \`*.local\` na adres serwera z Nginxem.
- Kontenery w jednej sieci Dockera widzą się po nazwach, więc \`proxy_pass\` jest czytelny i przewidywalny.

## Kroki

### 1. Utwórz sieć dla reverse proxy

\`\`\`bash
docker network create proxy-net
\`\`\`

### 2. Przygotuj katalog konfiguracji Nginx

\`\`\`bash
sudo mkdir -p /opt/nginx-proxy/conf.d
\`\`\`

### 3. Konfiguracja hosta \`tc.local\`

\`\`\`nginx
server {
  listen 80;
  server_name tc.local;

  location / {
    proxy_pass http://teamcity:8111;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
\`\`\`

### 4. Uruchom Nginx w Dockerze

\`\`\`bash
docker run -d \\
  --name nginx-reverse-proxy \\
  --restart=always \\
  -p 80:80 \\
  -v /opt/nginx-proxy/conf.d:/etc/nginx/conf.d \\
  --network proxy-net \\
  nginx
\`\`\`

### 5. Podłącz usługi do \`proxy-net\`

\`\`\`bash
docker network connect proxy-net teamcity
docker network connect proxy-net n8n
docker network connect proxy-net portainer
\`\`\`

### 6. Rekordy DNS w Pi-hole

- \`tc.local\` -> IP serwera z Nginx
- \`n8n.local\` -> IP serwera z Nginx
- \`portainer.local\` -> IP serwera z Nginx

## Diagnostyka

- Odśwież cache DNS na kliencie.
- Sprawdź sieć: \`docker network inspect proxy-net\`.
- Sprawdź logi Nginxa: \`docker logs -f nginx-reverse-proxy\`.

## Podsumowanie

Nginx + Pi-hole to prosty i czytelny sposób na lokalne domeny bez pamiętania o portach. Jeden punkt wejścia, spójny DNS i dużo mniej chaosu w adresach.
`,i={id:`jak-naprawic-polskie-znaki-w-powershell`,visible:!0,title:`Jak naprawić polskie znaki w PowerShell? Koniec z "krzaczkami" podczas pracy z AI`,date:`2024-03-18`,dateISO:`2024-03-18T00:00:00.000Z`,tags:[`powershell`,`utf-8`,`windows`,`ai`],excerpt:`Praca z modelami AI bezpośrednio w terminalu to wygoda, dopóki nie zderzymy się z błędnym kodowaniem polskich znaków w PowerShellu. Dowiedz się, jak ustawić UTF-8 jako standard.`,thumbnail:`thumbnail.png`},a={id:`nextcloud-przez-cloudflare-tunnel`,visible:!0,title:`Nextcloud przez Cloudflare Tunnel - szybki przewodnik`,date:`2025-07-05`,dateISO:`2025-07-05`,tags:[`self-hosting`,`cloudflare`,`nextcloud`,`tunnel`,`docker`,`linux`],thumbnail:`thumbnail.png`},o={id:`reverse-proxy-nginx-pihole`,visible:!0,title:`Lokalne domeny bez portów: Reverse Proxy z Nginx i Pi-hole (Docker, Debian)`,date:`2025-06-14`,dateISO:`2025-06-14`,tags:[`reverse-proxy`,`nginx`,`docker`,`pi-hole`,`self-hosting`,`debian`,`dns`],thumbnail:`thumbnail.png`},s=`/assets/thumbnail-CsMfXpIF.png`,c=`/assets/thumbnail-Bb5AM5Gy.png`,l=`/assets/thumbnail-DINugHb5.png`,u=`Projekt **Dihor HA Components** to biblioteka własnych kart Lovelace dla Home Assistant. Powstała po to, żeby zebrać kilka spójnych wizualnie komponentów dashboardu w jednej paczce instalowanej przez HACS albo dodawanej ręcznie jako zasób typu \`module\`.

## Co zostało wykorzystane

### Home Assistant Lovelace

Projekt jest przygotowany jako zestaw custom cards dla widoku Lovelace. Każda karta działa jako niestandardowy element HTML rejestrowany w przeglądarce i może być użyta w konfiguracji dashboardu przez składnię \`type: custom:<nazwa-karty>\`.

Home Assistant dostarcza kartom kontekst aplikacji, stan encji oraz akcje użytkownika. Dzięki temu komponenty mogą odczytywać dane z encji, reagować na kliknięcia i otwierać standardowe widoki, takie jak \`more-info\`.

### Web Components

Karty są zbudowane jako Web Components, czyli niezależne komponenty działające bez frameworka aplikacyjnego po stronie Home Assistant. To ważne, bo frontend Home Assistant ładuje custom cards jako moduły JavaScript i oczekuje elementów zarejestrowanych przez \`customElements\`.

Każda karta definiuje własny tag, na przykład \`dihor-clock-card\` albo \`dihor-person-card\`, a rejestracja elementu jest wykonywana tylko wtedy, gdy dany tag nie istnieje jeszcze w przeglądarce.

### Lit

Do implementacji komponentów wykorzystany jest \`Lit\`. Biblioteka odpowiada za reaktywne właściwości, renderowanie HTML oraz integrację ze standardem Web Components.

W praktyce \`Lit\` upraszcza pisanie kart: zmiana konfiguracji albo stanu Home Assistant może automatycznie przełożyć się na ponowne wyrenderowanie widoku bez ręcznego manipulowania DOM.

### TypeScript

Kod źródłowy kart jest napisany w \`TypeScript\`. Typowanie pomaga utrzymać kontrakty konfiguracji kart, danych Home Assistant i wspólnych metod bazowych.

W projekcie wykorzystywane są też lokalne definicje typów dla Home Assistant oraz importów CSS jako string, dzięki czemu kod może być sprawdzany statycznie mimo pracy z API, które nie jest standardową częścią przeglądarki.

### BaseDihorCard

Wspólna baza kart znajduje się w \`BaseDihorCard\`. To warstwa, która porządkuje wspólne zachowania komponentów, dzięki czemu pojedyncze karty mogą skupiać się na własnej konfiguracji, danych i widoku.

Takie podejście ogranicza duplikację i ułatwia utrzymanie spójnego sposobu obsługi konfiguracji, renderowania oraz integracji z Home Assistant.

### Rollup

Do budowania paczki używany jest \`Rollup\`. Jego zadaniem jest zebranie kodu TypeScript, zależności i stylów w jeden artefakt runtime:

\`\`\`text
dist/dihor-ha-components.js
\`\`\`

Ten plik jest finalnym modułem JavaScript, który może zostać załadowany przez Home Assistant jako zasób frontendowy.

### CSS importowany jako string

Style kart są trzymane w osobnych plikach CSS i importowane do TypeScript jako string. Dzięki temu każda karta może mieć własny zestaw stylów, a wspólne style są utrzymywane w katalogu \`src/shared/styles\`.

Takie rozwiązanie pozwala zachować czytelny podział między logiką komponentu i warstwą wizualną, a jednocześnie nadal bundlować wszystko do jednego pliku dystrybucyjnego.

### HACS

Projekt jest przygotowany pod dystrybucję przez HACS. Manifest \`hacs.json\` opisuje paczkę dla Home Assistant Community Store, a użytkownik może dodać repozytorium jako custom repository typu \`Dashboard\`.

Dzięki temu instalacja i aktualizacje kart mogą odbywać się z poziomu Home Assistant, bez ręcznego kopiowania plików po każdej zmianie wersji.

### Preview i dokumentacja

Katalog \`docs\` pełni rolę statycznego preview oraz dokumentacji kart. Skrypt \`prepare-docs\` kopiuje do niego zbudowany plik runtime, manifest kart, style i pliki potrzebne do podglądu.

Manifest \`cards-docs.json\` opisuje karty widoczne w preview. Dzięki temu można sprawdzać wygląd i przykłady konfiguracji bez uruchamiania pełnego środowiska Home Assistant.

### Skrypty operacyjne

W projekcie znajdują się skrypty automatyzujące powtarzalne zadania:

- \`npm run build\` buduje finalny plik JavaScript,
- \`npm run prepare-docs\` odświeża pliki dokumentacji i preview,
- \`npm run check-docs-manifest\` sprawdza spójność assetów dokumentacji,
- \`npm run lint\` uruchamia kontrolę jakości kodu.

## Do czego służą karty

### Dihor Clock Card

Karta zegara cyfrowego pokazuje czas w prostym, konfigurowalnym widoku. Jest przeznaczona do dashboardów, w których czas ma być osobnym, czytelnym elementem interfejsu.

### Dihor Minecraft Card

Karta Minecraft służy do prezentowania statusu serwera Minecraft w Home Assistant. Może być użyta na dashboardzie domowym jako szybki podgląd dostępności serwera.

### Dihor Person Card

Karta osoby bazuje na encji \`person\` i rozszerza jej prezentację o informacje związane z telefonem, baterią, ładowaniem, zdjęciem encji i stanem obecności.

### Dihor Toggle Button Card

Karta przycisku pozwala sterować pojedynczą encją, na przykład światłem, przełącznikiem albo sceną. Jej zadaniem jest dać duży, wygodny element sterujący do najczęściej używanych akcji.

## Wnioski

Najważniejszą wartością projektu jest zamknięcie własnych komponentów Home Assistant w jednej, wersjonowanej bibliotece. Dzięki temu karty mają wspólną strukturę, spójny wygląd, osobny proces budowania i prostą ścieżkę dystrybucji przez HACS.
`,d=`Projekt **Nie Ma Nudy** powstał jako odpowiedź na realny problem: trudne wyszukiwanie sprawdzonych atrakcji rodzinnych w jednym miejscu.

## Zakres produktu

- aplikacja mobilna dla użytkowników końcowych,
- panel administracyjny do moderacji i zarządzania treścią,
- API łączące warstwę mobilną, webową i dane lokalizacyjne.

## Najważniejsze moduły

### Wyszukiwanie lokalizacji

Użytkownik może filtrować atrakcje po regionie i odległości, z naciskiem na szybkie działanie i prostotę interfejsu.

### Profile atrakcji

Każda atrakcja ma dedykowany widok z opisem, zdjęciami, kategoriami i praktycznymi informacjami.

### Lista ulubionych

Użytkownik zapisuje interesujące miejsca i wraca do nich w późniejszym czasie.

## Aspekty techniczne

- backend oparty o \`.NET\` i \`Web API\`,
- warstwa danych z \`Entity Framework\` i \`MySQL\`,
- frontend i panel admina rozwijane iteracyjnie z naciskiem na czytelność i utrzymanie.

## Wnioski

Największą wartością projektu było połączenie produktu konsumenckiego z narzędziami administracyjnymi, dzięki czemu treść może być stale rozwijana i kontrolowana.
`,f={id:`hacomponents`,title:`Dihor HA Components - szczegóły projektu`,summary:`Biblioteka custom cards dla Home Assistant, rozwijana jako moduł ES dystrybuowany przez HACS.`,seoDescription:`Szczegóły projektu Dihor HA Components: architektura kart Lovelace, TypeScript, Lit, Rollup, HACS i preview dokumentacji.`},p={id:`niemanudy`,title:`Nie Ma Nudy - szczegóły projektu`,summary:`Aplikacja mobilna i panel administracyjny do wyszukiwania atrakcji rodzinnych w Polsce.`,seoDescription:`Szczegóły projektu Nie Ma Nudy: architektura, moduły i decyzje techniczne.`};function m(e){let t=String(e||``).replace(/^\uFEFF/,``).replace(/\r\n/g,`
`);if(!t.startsWith(`---
`))return{frontmatter:{},body:t.trim()};let n=t.indexOf(`
---
`,4);if(n===-1)return{frontmatter:{},body:t.trim()};let r=t.slice(4,n),i=t.slice(n+5).trim(),a=r.split(`
`),o={};for(let e=0;e<a.length;e+=1){let t=a[e];if(!t||/^\s*#/.test(t))continue;let n=t.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);if(!n)continue;let[,r,i]=n;if(i===``){let t=[],n=e+1;for(;n<a.length;){let e=a[n].match(/^\s*-\s+(.*)$/);if(!e)break;t.push(h(e[1])),n+=1}t.length>0?(o[r]=t,e=n-1):o[r]=``;continue}o[r]=h(i)}return{frontmatter:o,body:i}}function h(e){let t=e.trim();if(t.startsWith(`[`)&&t.endsWith(`]`)){let e=t.slice(1,-1).trim();return e?e.split(`,`).map(e=>g(e.trim())):[]}return t===`true`?!0:t===`false`?!1:/^-?\d+(\.\d+)?$/.test(t)?Number(t):g(t)}function g(e){return e.startsWith(`"`)&&e.endsWith(`"`)||e.startsWith(`'`)&&e.endsWith(`'`)?e.slice(1,-1):e}function _(e){let t=String(e||``).replace(/\r\n/g,`
`).split(`
`),n=[],r=[],i=!1,a=`plaintext`,o=[],s=()=>{if(r.length===0)return;let e=r.join(` `).replace(/\s+/g,` `).trim();e&&n.push({type:`paragraph`,text:e}),r=[]};for(let e=0;e<t.length;e+=1){let c=t[e];if(i){c.trim().startsWith("```")?(n.push({type:`code`,lang:a,text:o.join(`
`)}),i=!1,a=`plaintext`,o=[]):o.push(c);continue}let l=c.match(/^```\s*([a-zA-Z0-9_-]+)?\s*$/);if(l){s(),i=!0,a=(l[1]||`plaintext`).toLowerCase(),o=[];continue}if(!c.trim()){s();continue}let u=c.match(/^(#{1,6})\s+(.+)$/);if(u){s(),n.push({type:`heading`,level:Math.min(4,Math.max(2,u[1].length)),text:u[2].trim()});continue}if(/^>\s+/.test(c)){s(),n.push({type:`blockquote`,text:c.replace(/^>\s+/,``).trim()});continue}let d=c.match(/^\s*[-*]\s+(.+)$/);if(d){s();let r=[d[1].trim()];for(;e+1<t.length;){let n=t[e+1].match(/^\s*[-*]\s+(.+)$/);if(!n)break;r.push(n[1].trim()),e+=1}n.push({type:`ul`,items:r});continue}let f=c.match(/^\s*\d+\.\s+(.+)$/);if(f){s();let r=[f[1].trim()];for(;e+1<t.length;){let n=t[e+1].match(/^\s*\d+\.\s+(.+)$/);if(!n)break;r.push(n[1].trim()),e+=1}n.push({type:`ol`,items:r});continue}let p=c.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);if(p){s(),n.push({type:`image`,alt:p[1].trim(),src:p[2].trim()});continue}r.push(c.trim())}return s(),i&&n.push({type:`code`,lang:a,text:o.join(`
`)}),n}function v(e,t=180){let n=e.find(e=>e.type===`paragraph`)?.text||``;return n?n.length>t?`${n.slice(0,t)}...`:n:``}function y(e){return Date.parse(e?.dateISO||e?.date||0)||0}var b=Object.assign({"./blog/jak-naprawic-polskie-znaki-w-powershell/index.md":t,"./blog/nextcloud-przez-cloudflare-tunnel/index.md":n,"./blog/reverse-proxy-nginx-pihole/index.md":r}),x=Object.assign({"./blog/jak-naprawic-polskie-znaki-w-powershell/meta.json":i,"./blog/nextcloud-przez-cloudflare-tunnel/meta.json":a,"./blog/reverse-proxy-nginx-pihole/meta.json":o}),S=Object.assign({"./blog/jak-naprawic-polskie-znaki-w-powershell/thumbnail.png":s,"./blog/nextcloud-przez-cloudflare-tunnel/thumbnail.png":c,"./blog/reverse-proxy-nginx-pihole/thumbnail.png":l}),C=Object.assign({"./projects/hacomponents/index.md":u,"./projects/niemanudy/index.md":d}),w=Object.assign({"./projects/hacomponents/meta.json":f,"./projects/niemanudy/meta.json":p}),T=Object.assign({});function E(e,t){return e.match(RegExp(`^\\.\\/${t}\\/([^/]+)\\/`))?.[1]||``}function D(e){return e.replace(/^\.\//,``)}function O(e,t){let n=e.split(`/`).filter(Boolean);for(let e of t.split(`/`))if(!(!e||e===`.`)){if(e===`..`){n.pop();continue}n.push(e)}return n.join(`/`)}function k(e){return Object.fromEntries(Object.entries(e).map(([e,t])=>[D(e),t]))}function A(e,t){return Object.fromEntries(Object.entries(e).map(([e,n])=>[E(e,t),n||{}]))}function j(e){return/^(https?:\/\/|mailto:|#|\/)/i.test(e)}function M(e,t,n){if(!e||typeof e!=`string`)return``;let r=e.trim();return r?j(r)?r:n[O(t,r.replace(/^\.\//,``))]||r:``}function N(e,t,n){return String(e||``).replace(/(!?\[[^\]]*\]\()([^)]+)(\))/g,(e,r,i,a)=>`${r}${M(i.trim(),t,n)}${a}`)}function P(e){return Array.isArray(e)?e.map(e=>String(e).trim()).filter(Boolean):[]}var F=k(S),I=k(T),L=A(x,`blog`),R=A(w,`projects`),z=Object.entries(b).map(([e,t])=>{let n=E(e,`blog`),r=`blog/${n}`,{frontmatter:i,body:a}=m(t),o={...L[n]||{},...i},s=String(o.id||n),c=N(a,r,F),l=_(c);return{id:s,visible:o.visible!==!1,title:String(o.title||s),date:String(o.date||``),dateISO:String(o.dateISO||o.date||``),tags:P(o.tags),image:M(o.thumbnail||o.image||``,r,F),contentMarkdown:c,contentBlocks:l,excerpt:String(o.excerpt||v(l))}}).sort((e,t)=>y(t)-y(e)),B=Object.fromEntries(z.map(e=>[e.id,e])),V=Object.entries(C).map(([e,t])=>{let n=E(e,`projects`),r=`projects/${n}`,{frontmatter:i,body:a}=m(t),o={...R[n]||{},...i},s=String(o.id||n),c=N(a,r,I);return{id:s,title:String(o.title||``),summary:String(o.summary||``),seoDescription:String(o.seoDescription||o.summary||``),contentMarkdown:c,contentBlocks:_(c)}}),H=Object.fromEntries(V.map(e=>[e.id,e])),U=e();function W({id:e,children:t,className:n=``}){return(0,U.jsx)(`section`,{id:e,className:n?`section ${n}`:`section`,children:(0,U.jsx)(`div`,{className:`container`,children:t})})}var G={".net core":`languages`,".net maui":`frontend`,angular:`frontend`,angularjs:`frontend`,android:`frontend`,"background service":`backend`,blazor:`frontend`,"c#":`languages`,"c# .net":`languages`,"c# .net core":`languages`,cefsharp:`frontend`,css:`frontend`,"docker compose":`infrastructure`,docker:`infrastructure`,"entity framework":`backend`,"file processing":`backend`,"github actions":`devops`,hacs:`infrastructure`,javascript:`languages`,jql:`backend`,json:`backend`,"jira rest api":`backend`,mariadb:`database`,mongodb:`database`,mudblazor:`frontend`,mvc:`patterns`,mvvm:`patterns`,mysql:`database`,"octopus deploy":`devops`,proxmox:`infrastructure`,python:`languages`,rabbitmq:`infrastructure`,react:`frontend`,rollup:`frontend`,signalr:`backend`,skiasharp:`frontend`,spa:`patterns`,"sql server":`database`,"t-sql":`languages`,teamcity:`devops`,"three.js":`frontend`,typescript:`languages`,"web api":`backend`,"windows forms":`frontend`,wpf:`frontend`,"xamarin.forms":`frontend`};function K(e){return G[String(e).trim().toLowerCase()]||`tech-other`}export{H as a,z as i,W as n,B as r,K as t};