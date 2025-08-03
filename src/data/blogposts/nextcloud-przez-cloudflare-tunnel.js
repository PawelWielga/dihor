import imgNextcloudPrzezCloudflareTunnel from './nextcloud-przez-cloudflare-tunnel.png';

const nextcloudPrzezCloudflareTunnel = {
  id: 'nextcloud-przez-cloudflare-tunnel',
  visible: true,
  title: 'Nextcloud przez Cloudflare Tunnel — szybki przewodnik (bez config.yml i .json)',
  date: '2025-07-05',
  tags: ['self-hosting', 'cloudflare', 'nextcloud', 'tunnel', 'docker', 'linux'],
  image: imgNextcloudPrzezCloudflareTunnel,
  content: [
    {
      type: 'paragraph',
      text:
        'Przez lata stawiałem Nextclouda na wszystkim — od Raspberry Pi po serwery w szafie. Największa bariera? Publiczny IP i przekierowania portów. Cloudflare Tunnel rozwiązuje to w kilka minut. Poniżej dzielę się przepisem, ale też kilkoma praktycznymi uwagami z życia admina.',
    },
    { type: 'header', level: 2, text: 'Środowisko uruchomieniowe (proxmox → VM → Docker)' },
    {
      type: 'paragraph',
      text:
        'Całość działa u mnie na Proxmox VE jako hypervisor. W nim mam lekką maszynę wirtualną (VM) z Linuxem, na której uruchamiam Dockera. Nextcloud to pojedynczy kontener (jak poniżej), a cloudflared działa bezpośrednio w tej samej VM jako usługa systemd. Dzięki temu mam prosty podział odpowiedzialności: Proxmox odpowiada za HA/snapshots hosta, VM za system i usługi, Docker za aplikacje.',
    },
    { type: 'list',
      elements: [
        'Hypervisor: Proxmox VE (KVM)',
        'VM: Debian/Ubuntu minimal (2 vCPU, 4–8 GB RAM, dysk na szybkim storage)',
        'Sieć: VM w tej samej podsieci co host (mostek Proxmoxa, np. vmbr0)',
        'Aplikacje: Docker (Nextcloud jako kontener), cloudflared jako systemd service',
        'Dane: wolumen Docker „nextcloud_data” na storage z snapshotami (ZFS/Thin LVM)',
      ],
    },
    { type: 'paragraph',
      text:
        'Taki układ jest elastyczny: mogę szybko migrować VM między węzłami Proxmoxa, robić snapshoty całej maszyny przed aktualizacją Nextclouda, a jednocześnie utrzymuję prostotę (brak dodatkowego orkiestratora).',
    },

    { type: 'header', level: 2, text: 'Dlaczego Tunnel, a nie klasyczne port forwarding?' },
    {
      type: 'paragraph',
      text:
        'Nie prosisz ISP o publiczny IPv4, nie bawisz się w NAT, nie wystawiasz paneli administracyjnych na świat. Ruch idzie po szyfrowanym tunelu do Cloudflare, a Ty kontrolujesz wejście z jednego miejsca. Dla domowych/labowych wdrożeń to zwykle „just works”.',
    },

    { type: 'header', level: 2, text: 'Założenia (krótko i konkretnie):' },
    {
      type: 'paragraph',
      text:
        '• Linux z dostępem do terminala (LXC/VM) • Domeny obsługiwane w Cloudflare (np. twojadomena.pl) • Chcesz wystawić Nextclouda bez publicznego IP.',
    },

    { type: 'header', level: 3, text: 'Krok 1 — Instalacja cloudflared' },
    {
      type: 'code',
      lang: 'bash',
      text: `curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb
sudo dpkg -i cloudflared.deb`,
    },

    { type: 'header', level: 3, text: 'Krok 2 — Logowanie do Cloudflare' },
    {
      type: 'code',
      lang: 'bash',
      text: `cloudflared login
# Otwórz link w przeglądarce i wybierz właściwą domenę`,
    },

    { type: 'header', level: 3, text: 'Krok 3 — Tunel w Cloudflare Dashboard' },
    {
      type: 'paragraph',
      text:
        'Wejdź na https://one.dash.cloudflare.com → Access → Tunnels → Create Tunnel. Nazwij go np. nextcloud-tunel, wybierz Linux → Debian/Ubuntu, skopiuj komendę cloudflared tunnel run --token … i uruchom na serwerze.',
    },

    { type: 'header', level: 3, text: 'Krok 4 — Usługa systemd (żeby po restarcie dalej działało)' },
    {
      type: 'code',
      lang: 'bash',
      text: `sudo nano /etc/systemd/system/cloudflared.service`,
    },
    {
      type: 'code',
      lang: 'ini',
      text: `[Unit]
Description=Cloudflare Tunnel
After=network.target

[Service]
TimeoutStartSec=0
Type=simple
Restart=always
ExecStart=/usr/bin/cloudflared tunnel run --no-autoupdate --token TWÓJ_TOKEN

[Install]
WantedBy=multi-user.target`,
    },
    {
      type: 'code',
      lang: 'bash',
      text: `sudo systemctl daemon-reload
sudo systemctl enable cloudflared
sudo systemctl start cloudflared`,
    },

    { type: 'header', level: 3, text: 'Krok 5 — Publiczny adres Nextclouda w Cloudflare' },
    {
      type: 'paragraph',
      text:
        'Access → Tunnels → nextcloud-tunel → Add public hostname: Subdomain: nc, Domain: twojadomena.pl, Service type: HTTP, URL: http://192.168.1.123:8080 (podmień na swoje IP/port).',
    },

    { type: 'header', level: 3, text: 'Krok 6 — Nextcloud w Dockerze (minimum do startu)' },
    {
      type: 'code',
      lang: 'bash',
      text: `# Na VM (Proxmox → VM z Debian/Ubuntu), w Dockerze:
docker run -d \\
  --name nextcloud-app \\
  -p 8080:80 \\
  -v nextcloud_data:/var/www/html \\
  nextcloud`,
    },

    { type: 'header', level: 3, text: 'Krok 7 — trusted_domains (żeby host działał poprawnie)' },
    {
      type: 'code',
      lang: 'bash',
      text: `docker exec -it nextcloud-app bash
vi /var/www/html/config/config.php`,
    },
    {
      type: 'paragraph',
      text:
        'Dodaj do tablicy trusted_domains (nie usuwaj istniejących wpisów):',
    },
    {
      type: 'code',
      lang: 'php',
      text: `  1 => 'nc.twojadomena.pl',`,
    },
    { type: 'paragraph', text: 'Zapis w vi: ESC → :wq' },

    {
      type: 'paragraph',
      text:
        'W tym momencie Nextcloud powinien być dostępny pod https://nc.twojadomena.pl (lub Twoim hostem). Jeżeli nie — sprawdź logi usługi cloudflared i kontenera. W Proxmoxie masz dodatkowy komfort: snapshot VM przed większymi aktualizacjami potrafi uratować dzień.',
    },

    { type: 'header', level: 2, text: 'Moje tipy z praktyki (to robi różnicę):' },
    {
      type: 'list',
      elements: [
        'TLS i prostota: pozwól Cloudflare terminować TLS na brzegu; backend w LAN może mówić HTTP (OK w labie).',
        'Access / Zero Trust: dodaj reguły Access do wrażliwych usług — MFA/OTP robi dużą różnicę.',
        'Aktualizacje: używaj --no-autoupdate w systemd i aktualizuj cloudflared w oknie serwisowym.',
        'Backup: snapshot wolumenu/dysku i regularny export bazy. Dane Nextclouda to nie tylko pliki.',
      ],
    },

    { type: 'header', level: 2, text: 'Kiedy nie używać Tunnela?' },
    {
      type: 'paragraph',
      text:
        'Jeśli masz wymagania typu end-to-end TLS aż do backendu, z własnymi certami w sieci lokalnej, złożony ruch WebDAV/CalDAV pod reverse proxy, albo strict compliance — rozważ klasyczne reverse proxy (np. Traefik/Nginx) i pełną kontrolę ścieżki ruchu. Tunnel dalej zadziała, ale konfiguracja robi się bardziej świadoma.',
    },

    { type: 'header', level: 2, text: 'Podsumowanie' },
    {
      type: 'paragraph',
      text:
        'Cloudflare Tunnel to skrót do działającego Nextclouda w domu czy labie. Minimalny nakład, przewidywalny efekt i mniej tarcia z NAT-em. Dla mnie — must-have w szybkim POC i w środowiskach, gdzie nie chcę otwierać portów na routerze.',
    },
  ],
};

export default nextcloudPrzezCloudflareTunnel;