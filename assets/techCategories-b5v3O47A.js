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
`,i={id:`jak-naprawic-polskie-znaki-w-powershell`,visible:!0,title:`Jak naprawić polskie znaki w PowerShell? Koniec z "krzaczkami" podczas pracy z AI`,date:`2024-03-18`,dateISO:`2024-03-18T00:00:00.000Z`,tags:[`powershell`,`utf-8`,`windows`,`ai`],excerpt:`Praca z modelami AI bezpośrednio w terminalu to wygoda, dopóki nie zderzymy się z błędnym kodowaniem polskich znaków w PowerShellu. Dowiedz się, jak ustawić UTF-8 jako standard.`,thumbnail:`thumbnail.png`},a={id:`nextcloud-przez-cloudflare-tunnel`,visible:!0,title:`Nextcloud przez Cloudflare Tunnel - szybki przewodnik`,date:`2025-07-05`,dateISO:`2025-07-05`,tags:[`self-hosting`,`cloudflare`,`nextcloud`,`tunnel`,`docker`,`linux`],thumbnail:`thumbnail.png`},o={id:`reverse-proxy-nginx-pihole`,visible:!0,title:`Lokalne domeny bez portów: Reverse Proxy z Nginx i Pi-hole (Docker, Debian)`,date:`2025-06-14`,dateISO:`2025-06-14`,tags:[`reverse-proxy`,`nginx`,`docker`,`pi-hole`,`self-hosting`,`debian`,`dns`],thumbnail:`thumbnail.png`},s=`/assets/thumbnail-CsMfXpIF.png`,c=`/assets/thumbnail-Bb5AM5Gy.png`,l=`/assets/thumbnail-DINugHb5.png`,u=`Projekt **Nie Ma Nudy** powstał jako odpowiedź na realny problem: trudne wyszukiwanie sprawdzonych atrakcji rodzinnych w jednym miejscu.

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
`,d={id:`niemanudy`,title:`Nie Ma Nudy - szczegóły projektu`,summary:`Aplikacja mobilna i panel administracyjny do wyszukiwania atrakcji rodzinnych w Polsce.`,seoDescription:`Szczegóły projektu Nie Ma Nudy: architektura, moduły i decyzje techniczne.`};function f(e){let t=String(e||``).replace(/^\uFEFF/,``).replace(/\r\n/g,`
`);if(!t.startsWith(`---
`))return{frontmatter:{},body:t.trim()};let n=t.indexOf(`
---
`,4);if(n===-1)return{frontmatter:{},body:t.trim()};let r=t.slice(4,n),i=t.slice(n+5).trim(),a=r.split(`
`),o={};for(let e=0;e<a.length;e+=1){let t=a[e];if(!t||/^\s*#/.test(t))continue;let n=t.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);if(!n)continue;let[,r,i]=n;if(i===``){let t=[],n=e+1;for(;n<a.length;){let e=a[n].match(/^\s*-\s+(.*)$/);if(!e)break;t.push(p(e[1])),n+=1}t.length>0?(o[r]=t,e=n-1):o[r]=``;continue}o[r]=p(i)}return{frontmatter:o,body:i}}function p(e){let t=e.trim();if(t.startsWith(`[`)&&t.endsWith(`]`)){let e=t.slice(1,-1).trim();return e?e.split(`,`).map(e=>m(e.trim())):[]}return t===`true`?!0:t===`false`?!1:/^-?\d+(\.\d+)?$/.test(t)?Number(t):m(t)}function m(e){return e.startsWith(`"`)&&e.endsWith(`"`)||e.startsWith(`'`)&&e.endsWith(`'`)?e.slice(1,-1):e}function h(e){let t=String(e||``).replace(/\r\n/g,`
`).split(`
`),n=[],r=[],i=!1,a=`plaintext`,o=[],s=()=>{if(r.length===0)return;let e=r.join(` `).replace(/\s+/g,` `).trim();e&&n.push({type:`paragraph`,text:e}),r=[]};for(let e=0;e<t.length;e+=1){let c=t[e];if(i){c.trim().startsWith("```")?(n.push({type:`code`,lang:a,text:o.join(`
`)}),i=!1,a=`plaintext`,o=[]):o.push(c);continue}let l=c.match(/^```\s*([a-zA-Z0-9_-]+)?\s*$/);if(l){s(),i=!0,a=(l[1]||`plaintext`).toLowerCase(),o=[];continue}if(!c.trim()){s();continue}let u=c.match(/^(#{1,6})\s+(.+)$/);if(u){s(),n.push({type:`heading`,level:Math.min(4,Math.max(2,u[1].length)),text:u[2].trim()});continue}if(/^>\s+/.test(c)){s(),n.push({type:`blockquote`,text:c.replace(/^>\s+/,``).trim()});continue}let d=c.match(/^\s*[-*]\s+(.+)$/);if(d){s();let r=[d[1].trim()];for(;e+1<t.length;){let n=t[e+1].match(/^\s*[-*]\s+(.+)$/);if(!n)break;r.push(n[1].trim()),e+=1}n.push({type:`ul`,items:r});continue}let f=c.match(/^\s*\d+\.\s+(.+)$/);if(f){s();let r=[f[1].trim()];for(;e+1<t.length;){let n=t[e+1].match(/^\s*\d+\.\s+(.+)$/);if(!n)break;r.push(n[1].trim()),e+=1}n.push({type:`ol`,items:r});continue}let p=c.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);if(p){s(),n.push({type:`image`,alt:p[1].trim(),src:p[2].trim()});continue}r.push(c.trim())}return s(),i&&n.push({type:`code`,lang:a,text:o.join(`
`)}),n}function g(e,t=180){let n=e.find(e=>e.type===`paragraph`)?.text||``;return n?n.length>t?`${n.slice(0,t)}...`:n:``}function _(e){return Date.parse(e?.dateISO||e?.date||0)||0}var v=Object.assign({"./blog/jak-naprawic-polskie-znaki-w-powershell/index.md":t,"./blog/nextcloud-przez-cloudflare-tunnel/index.md":n,"./blog/reverse-proxy-nginx-pihole/index.md":r}),y=Object.assign({"./blog/jak-naprawic-polskie-znaki-w-powershell/meta.json":i,"./blog/nextcloud-przez-cloudflare-tunnel/meta.json":a,"./blog/reverse-proxy-nginx-pihole/meta.json":o}),b=Object.assign({"./blog/jak-naprawic-polskie-znaki-w-powershell/thumbnail.png":s,"./blog/nextcloud-przez-cloudflare-tunnel/thumbnail.png":c,"./blog/reverse-proxy-nginx-pihole/thumbnail.png":l}),x=Object.assign({"./projects/niemanudy/index.md":u}),S=Object.assign({"./projects/niemanudy/meta.json":d}),C=Object.assign({});function w(e,t){return e.match(RegExp(`^\\.\\/${t}\\/([^/]+)\\/`))?.[1]||``}function T(e){return e.replace(/^\.\//,``)}function E(e,t){let n=e.split(`/`).filter(Boolean);for(let e of t.split(`/`))if(!(!e||e===`.`)){if(e===`..`){n.pop();continue}n.push(e)}return n.join(`/`)}function D(e){return Object.fromEntries(Object.entries(e).map(([e,t])=>[T(e),t]))}function O(e,t){return Object.fromEntries(Object.entries(e).map(([e,n])=>[w(e,t),n||{}]))}function k(e){return/^(https?:\/\/|mailto:|#|\/)/i.test(e)}function A(e,t,n){if(!e||typeof e!=`string`)return``;let r=e.trim();return r?k(r)?r:n[E(t,r.replace(/^\.\//,``))]||r:``}function j(e,t,n){return String(e||``).replace(/(!?\[[^\]]*\]\()([^)]+)(\))/g,(e,r,i,a)=>`${r}${A(i.trim(),t,n)}${a}`)}function M(e){return Array.isArray(e)?e.map(e=>String(e).trim()).filter(Boolean):[]}var N=D(b),P=D(C),F=O(y,`blog`),I=O(S,`projects`),L=Object.entries(v).map(([e,t])=>{let n=w(e,`blog`),r=`blog/${n}`,{frontmatter:i,body:a}=f(t),o={...F[n]||{},...i},s=String(o.id||n),c=j(a,r,N),l=h(c);return{id:s,visible:o.visible!==!1,title:String(o.title||s),date:String(o.date||``),dateISO:String(o.dateISO||o.date||``),tags:M(o.tags),image:A(o.thumbnail||o.image||``,r,N),contentMarkdown:c,contentBlocks:l,excerpt:String(o.excerpt||g(l))}}).sort((e,t)=>_(t)-_(e)),R=Object.fromEntries(L.map(e=>[e.id,e])),z=Object.entries(x).map(([e,t])=>{let n=w(e,`projects`),r=`projects/${n}`,{frontmatter:i,body:a}=f(t),o={...I[n]||{},...i},s=String(o.id||n),c=j(a,r,P);return{id:s,title:String(o.title||``),summary:String(o.summary||``),seoDescription:String(o.seoDescription||o.summary||``),contentMarkdown:c,contentBlocks:h(c)}}),B=Object.fromEntries(z.map(e=>[e.id,e])),V=e();function H({id:e,children:t,className:n=``}){return(0,V.jsx)(`section`,{id:e,className:n?`section ${n}`:`section`,children:(0,V.jsx)(`div`,{className:`container`,children:t})})}var U={".net core":`languages`,".net maui":`frontend`,angular:`frontend`,angularjs:`frontend`,android:`frontend`,"background service":`backend`,blazor:`frontend`,"c#":`languages`,"c# .net":`languages`,"c# .net core":`languages`,cefsharp:`frontend`,css:`frontend`,"docker compose":`infrastructure`,docker:`infrastructure`,"entity framework":`backend`,"file processing":`backend`,"github actions":`devops`,hacs:`infrastructure`,javascript:`languages`,jql:`backend`,json:`backend`,"jira rest api":`backend`,mariadb:`database`,mongodb:`database`,mudblazor:`frontend`,mvc:`patterns`,mvvm:`patterns`,mysql:`database`,"octopus deploy":`devops`,proxmox:`infrastructure`,python:`languages`,rabbitmq:`infrastructure`,react:`frontend`,rollup:`frontend`,signalr:`backend`,skiasharp:`frontend`,spa:`patterns`,"sql server":`database`,"t-sql":`languages`,teamcity:`devops`,"three.js":`frontend`,typescript:`languages`,"web api":`backend`,"windows forms":`frontend`,wpf:`frontend`,"xamarin.forms":`frontend`};function W(e){return U[String(e).trim().toLowerCase()]||`tech-other`}export{B as a,L as i,H as n,R as r,W as t};