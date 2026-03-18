# Jak naprawić polskie znaki w PowerShell? Koniec z "krzaczkami" podczas pracy z AI

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

```powershell
$PROFILE
```

Zwróci ona ścieżkę do pliku konfiguracyjnego Twojej konsoli. Zazwyczaj wygląda ona tak:  
`C:\Users\NazwaUżytkownika\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`

### 2. Utwórz plik (jeśli nie istnieje)
Jeżeli po przejściu do wskazanej lokalizacji nie widzisz pliku `Microsoft.PowerShell_profile.ps1`, musisz go stworzyć. Możesz to zrobić ręcznie lub szybciej – komendą w samym PowerShellu:

```powershell
if (!(Test-Path -Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }
```

### 3. Edytuj profil i wymuś UTF-8
Otwórz ten plik w dowolnym edytorze (Notatnik, VS Code) i wklej do niego poniższe linie:

```powershell
[Console]::InputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
chcp 65001 > $null
```

**Co to zmienia?**
* Ustawia kodowanie wejścia i wyjścia konsoli na standard **UTF-8**.
* Komenda `chcp 65001` zmienia stronę kodową aktywnej konsoli (flaga `> $null` sprawia, że proces dzieje się w tle).

### 4. Zapisz i zrestartuj
Zapisz zmiany w pliku, zamknij okno PowerShella i uruchom go ponownie.

### 5. Weryfikacja
Aby upewnić się, że wszystko działa poprawnie, wpisz kolejno:

```powershell
[Console]::InputEncoding
[Console]::OutputEncoding
```

W obu przypadkach w sekcji **EncodingName** powinieneś zobaczyć wartość **Unicode (UTF-8)**.

---

## Podsumowanie
Od teraz Twój PowerShell będzie natywnie rozumiał polskie znaki generowane przez AI i poprawnie przekazywał je dalej. To mała zmiana, która drastycznie poprawia komfort pracy z tekstami i kodem w systemie Windows.

**Masz problem z innym narzędziem dev? Daj znać w komentarzu na moim blogu!**

