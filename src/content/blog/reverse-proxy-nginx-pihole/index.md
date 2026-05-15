Ten setup to jedna z tych rzeczy, które po zrobieniu raz, zostają na stałe. Zamiast `:8111` czy `:9000` w pasku adresu, masz zwykłe adresy lokalne jak `http://tc.local` czy `http://portainer.local`.

## Co się tu dzieje i po co?

- Reverse proxy (Nginx) przyjmuje ruch na porcie 80 i kieruje go do właściwego kontenera po nazwie.
- Pi-hole działa jako lokalny DNS i tłumaczy `*.local` na adres serwera z Nginxem.
- Kontenery w jednej sieci Dockera widzą się po nazwach, więc `proxy_pass` jest czytelny i przewidywalny.

## Kroki

### 1. Utwórz sieć dla reverse proxy

```bash
docker network create proxy-net
```

### 2. Przygotuj katalog konfiguracji Nginx

```bash
sudo mkdir -p /opt/nginx-proxy/conf.d
```

### 3. Konfiguracja hosta `tc.local`

```nginx
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
```

### 4. Uruchom Nginx w Dockerze

```bash
docker run -d \
  --name nginx-reverse-proxy \
  --restart=always \
  -p 80:80 \
  -v /opt/nginx-proxy/conf.d:/etc/nginx/conf.d \
  --network proxy-net \
  nginx
```

### 5. Podłącz usługi do `proxy-net`

```bash
docker network connect proxy-net teamcity
docker network connect proxy-net n8n
docker network connect proxy-net portainer
```

### 6. Rekordy DNS w Pi-hole

- `tc.local` -> IP serwera z Nginx
- `n8n.local` -> IP serwera z Nginx
- `portainer.local` -> IP serwera z Nginx

## Diagnostyka

- Odśwież cache DNS na kliencie.
- Sprawdź sieć: `docker network inspect proxy-net`.
- Sprawdź logi Nginxa: `docker logs -f nginx-reverse-proxy`.

## Podsumowanie

Nginx + Pi-hole to prosty i czytelny sposób na lokalne domeny bez pamiętania o portach. Jeden punkt wejścia, spójny DNS i dużo mniej chaosu w adresach.
