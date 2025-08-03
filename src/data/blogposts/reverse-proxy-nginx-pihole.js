import imgReverseProxyNginxPihole from './reverse-proxy-nginx-pihole.png';

const reverseProxyNginxPihole = {
  id: 'reverse-proxy-nginx-pihole',
  visible: true,
  title: 'Lokalne domeny bez portów: Reverse Proxy z Nginx i Pi-hole (Docker, Debian)',
  date: '2025-06-14',
  tags: ['reverse-proxy', 'nginx', 'docker', 'pi-hole', 'self-hosting', 'debian', 'dns'],
  image: imgReverseProxyNginxPihole,
  content: [
    {
      type: 'paragraph',
      text:
        'Ten setup to jedna z tych rzeczy, które po zrobieniu raz, zostają na stałe. Zamiast „:8111” czy „:9000” w pasku adresu, masz zwykłe http://tc.local czy http://portainer.local. Zero kombinacji z portami, jeden reverse proxy (Nginx), jedna sieć Dockera i Pi-hole jako wewnętrzny DNS. Proste, czytelne, bez ceregieli.',
    },

    { type: 'header', level: 2, text: 'Co tu się dzieje i po co?' },
    {
      type: 'list',
      elements: [
        'Reverse Proxy (Nginx): przyjmuje ruch na porcie 80 i przekazuje go do właściwego kontenera po nazwie (np. teamcity:8111).',
        'Pi-hole: serwer DNS w Twojej sieci, który tłumaczy tc.local i spółkę na IP Twojej maszyny z Nginxem.',
        'Docker network: kontenery w tej samej sieci widzą się po nazwie — dzięki temu proxy_pass może wskazywać „http://teamcity:8111”.',
      ],
    },

    { type: 'header', level: 2, text: 'Założenia (środowisko i gotowce)' },
    {
      type: 'list',
      elements: [
        'Debian z zainstalowanym Dockerem.',
        'Działające kontenery: teamcity (8111), n8n (5678), portainer (9000).',
        'Pi-hole jako DNS w sieci LAN (np. 192.168.0.95).',
      ],
    },

    { type: 'header', level: 2, text: 'Kroki (krótko, konkretnie, z komentarzem)' },

    { type: 'header', level: 3, text: '1) Zaloguj się na Debian (SSH)' },
    {
      type: 'paragraph',
      text:
        'Standard — łączysz się na serwer, na którym działa Docker. Wszystko dalej wykonujesz na nim.',
    },

    { type: 'header', level: 3, text: '2) Sieć dla reverse proxy' },
    {
      type: 'code',
      lang: 'bash',
      text: `docker network create proxy-net`,
    },
    {
      type: 'paragraph',
      text:
        'Dedykowana sieć ułatwia izolację i czytelną komunikację kontenerów po nazwach.',
    },

    { type: 'header', level: 3, text: '3) Katalog na konfiguracje Nginx' },
    {
      type: 'code',
      lang: 'bash',
      text: `sudo mkdir -p /opt/nginx-proxy/conf.d`,
    },

    { type: 'header', level: 3, text: '4) Konfiguracja tc.local' },
    {
      type: 'code',
      lang: 'bash',
      text: `sudo nano /opt/nginx-proxy/conf.d/tc.local.conf`,
    },
    {
      type: 'code',
      lang: 'nginx',
      text: `server {
  listen 80;
  server_name tc.local;

  location / {
    proxy_pass http://teamcity:8111;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}`,
    },
    {
      type: 'paragraph',
      text:
        'Zapis w nano: CTRL+O, Enter, wyjście: CTRL+X. Analogicznie możesz przygotować n8n.local.conf i portainer.local.conf.',
    },

    { type: 'header', level: 3, text: '5) Uruchom Nginx jako reverse proxy' },
    {
      type: 'code',
      lang: 'bash',
      text: `docker run -d \\
  --name nginx-reverse-proxy \\
  --restart=always \\
  -p 80:80 \\
  -v /opt/nginx-proxy/conf.d:/etc/nginx/conf.d \\
  --network proxy-net \\
  nginx`,
    },

    { type: 'header', level: 3, text: '6) Podłącz serwisy do sieci proxy-net' },
    {
      type: 'code',
      lang: 'bash',
      text: `docker network connect proxy-net teamcity
docker network connect proxy-net n8n
docker network connect proxy-net portainer`,
    },
    {
      type: 'paragraph',
      text:
        'Dzięki temu Nginx zobaczy kontenery pod ich nazwami (teamcity, n8n, portainer).',
    },

    { type: 'header', level: 3, text: '7) Rekordy DNS w Pi-hole' },
    {
      type: 'paragraph',
      text:
        'Wejdź na panel Pi-hole (np. http://192.168.0.95/admin), przejdź do Local DNS → DNS Records i dodaj:',
    },
    {
      type: 'list',
      elements: [
        'tc.local → IP Debiana (na którym działa Nginx)',
        'n8n.local → IP Debiana',
        'portainer.local → IP Debiana',
      ],
    },

    { type: 'header', level: 3, text: '8) Test z innego komputera w sieci' },
    {
      type: 'list',
      elements: ['http://tc.local', 'http://n8n.local', 'http://portainer.local'],
    },

    { type: 'header', level: 2, text: 'Gdy nie działa — szybka diagnostyka' },
    {
      type: 'list',
      elements: [
        'Odśwież cache DNS na kliencie: ipconfig /flushdns (Windows) lub sudo systemd-resolve --flush-caches (Linux).',
        'Sprawdź, czy kontenery są podłączone do proxy-net: docker network inspect proxy-net.',
        'Podejrzyj logi Nginxa: docker logs -f nginx-reverse-proxy.',
        'Zweryfikuj, że Pi-hole zwraca właściwe IP dla *.local (narzędzia: nslookup, dig).',
      ],
    },

    { type: 'header', level: 2, text: 'Kilka moich tipów z praktyki' },
    {
      type: 'list',
      elements: [
        'Konwencja plików: trzymaj każdy host w osobnym conf.d/*.conf — łatwiej wersjonować i wyłączać.',
        'Nazwy kontenerów: ustaw nazwę (--name) z sensem, to potem jest Twoja „domena wewnętrzna” dla proxy_pass.',
        'Konflikty portów: jeden reverse proxy na 80 porządkuje bałagan z portami — mniej wyjątków w firewallu.',
        'HTTPS: lokalnie często wystarcza HTTP, ale jeśli potrzebujesz TLS, rozważ wariant z certami i osobnym vhostem na 443.',
      ],
    },

    { type: 'header', level: 2, text: 'Podsumowanie' },
    {
      type: 'paragraph',
      text:
        'Reverse proxy z Nginx + Pi-hole to szybka droga do czytelnych, lokalnych nazw serwisów — bez sztormu portów w URL. Jedno miejsce na trasowanie, jedna sieć Dockera, przewidywalny DNS. Po wdrożeniu naprawdę trudno wrócić do starych nawyków.',
    },
  ],
};

export default reverseProxyNginxPihole;