Cloudflare Tunnel pozwala wystawić Nextcloud bez publicznego IP i bez przekierowań portów na routerze. Dla domowego labu to często najszybsza droga do działającego środowiska.

## Kiedy to podejście ma sens?

- Nie chcesz otwierać portów 80/443 na routerze.
- Chcesz uruchomić usługę szybko i bez dodatkowego reverse proxy na start.
- Potrzebujesz prostego wejścia z internetu do zasobu w LAN.

## 1. Instalacja cloudflared

```bash
curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb
sudo dpkg -i cloudflared.deb
```

## 2. Logowanie

```bash
cloudflared login
```

## 3. Tunnel jako usługa systemd

```ini
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
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

## 4. Nextcloud w Dockerze

```bash
docker run -d \
  --name nextcloud-app \
  -p 8080:80 \
  -v nextcloud_data:/var/www/html \
  nextcloud
```

## 5. trusted_domains

```bash
docker exec -it nextcloud-app bash
vi /var/www/html/config/config.php
```

Dodaj host publiczny do `trusted_domains`, np. `nc.twojadomena.pl`.

## Moje uwagi praktyczne

- W labie możesz terminować TLS na Cloudflare i zostawić HTTP w LAN.
- Dla krytycznych usług warto dodać Cloudflare Access (MFA/OTP).
- Aktualizacje `cloudflared` rób świadomie w oknie serwisowym.

## Podsumowanie

To podejście daje bardzo szybki efekt i niski próg wejścia. W większości domowych scenariuszy działa stabilnie i ogranicza konfigurację sieciową do minimum.
