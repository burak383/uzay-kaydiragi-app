# Uzay Kaydırağı — mobil uygulama (Capacitor 8 + AdMob)

Bu klasör oyunun Android ve iOS uygulama projesidir. Oyunun kendisi `www/` içinde, internetsiz çalışır.

## Klasörler

| Yol | Ne var |
|---|---|
| `www/index.html` | Oyun (Three.js ve fontlar `www/lib`, `www/fonts` içinde gömülü) |
| `www/ads-config.js` | AdMob reklam birimleri ve test/gerçek anahtarı |
| `android/` | Android Studio projesi (hedef API 36) |
| `ios/` | Xcode projesi (Swift Package Manager) |
| `assets/` | İkon ve açılış ekranı kaynak görselleri |

Uygulama kimliği: `com.burak383.uzaykaydiragi` · Uygulama adı: **Uzay Kaydırağı**
Kimliği değiştireceksen mağazaya ilk yüklemeden ÖNCE değiştir (sonra değiştirilemez): `capacitor.config.json`, `android/app/build.gradle` (applicationId, namespace) ve Xcode'da Bundle Identifier.

## Reklamlar

| Tür | Nerede |
|---|---|
| Banner | Sadece ana menünün altında. Oyun sırasında görünmez. |
| Geçiş reklamı | Her 3 turda bir, tur bittikten sonra "Tekrar kay" ya da "Menü"ye basınca. En az 90 sn arayla. Ödüllü reklam izlendiyse o tur atlanır. |
| Ödüllü reklam | 1) Kalkanlar bitince "Reklam izle, devam et" (turda bir kez). 2) Tur sonunda "Kristalleri 2 katına çıkar". |

İlk açılışta Avrupa (AB/Birleşik Krallık) kullanıcılarına Google'ın onay formu, iOS'ta ise izleme izni sorusu gösterilir.

### Test modundan çıkmak
`www/ads-config.js` içinde `test: true` iken Google'ın **test reklamları** görünür. Geliştirirken böyle kalsın: kendi gerçek reklamına tıklamak AdMob hesabının kapanmasına yol açabilir.
Mağazaya göndermeden önce `test: false` yap, sonra `npx cap sync` çalıştır.

### Android / iOS eşleşmesini kontrol et
AdMob'daki iki uygulamayı şöyle eşleştirdim:
- Android → `ca-app-pub-9017194698663463~5917833167`
- iOS → `ca-app-pub-9017194698663463~9473934795`

AdMob > Uygulamalar listesinde platform simgelerine bak. Tersiyse:
1. `www/ads-config.js` içinde `android` ve `ios` bloklarının yerini değiştir.
2. `android/app/src/main/res/values/strings.xml` → `admob_app_id` değerini değiştir.
3. `ios/App/App/Info.plist` → `GADApplicationIdentifier` değerini değiştir.

Not: Android uygulamasındaki banner biriminin adı AdMob'da "gecis" görünüyor ama AdMob onu banner olarak tanımlamış. Karışmaması için AdMob'da adını düzeltebilirsin, kod etkilenmez.

## Android (Windows, PowerShell)

1. Node.js LTS ve Android Studio'yu kur.
2. Proje klasöründe:
   ```powershell
   npm install
   npx cap sync android
   npx cap open android
   ```
3. Android Studio'da: **Build > Generate Signed App Bundle or APK > Android App Bundle**. Yeni bir keystore oluştur ve **dosyayı + şifreleri yedekle** (kaybedersen güncelleme yükleyemezsin).
4. Çıkan `.aab` dosyasını Play Console'da **Test > Kapalı test** kanalına yükle. Kişisel hesaplarda 12 test kullanıcısıyla 14 gün kapalı test gerekir.
5. Play Console formları: Veri güvenliği (Reklam kimliği toplanıyor, reklam amaçlı), "Uygulamanda reklam var mı? → Evet", içerik derecelendirmesi, gizlilik politikası linki.

Telefonda hızlı deneme: USB hata ayıklamayı aç, Android Studio'da ▶ Run.

## iOS

Xcode sadece Mac'te çalışır. İki yol:
- **Mac varsa:** `npm install`, `npx cap sync ios`, `npx cap open ios` → Xcode'da Signing & Capabilities'ten ekibini seç → Product > Archive → App Store Connect'e yükle.
- **Mac yoksa:** Projeyi GitHub'a (burak383) yükle ve **Codemagic**'e bağla. Codemagic'te "Capacitor" iş akışını seç, App Store Connect API anahtarını ekle; derleyip TestFlight'a yükler.

App Store Connect'te: App Privacy formunda "Kimlik bilgileri > Cihaz kimliği, üçüncü taraf reklam" işaretle. `Info.plist` içinde şifreleme beyanı (`ITSAppUsesNonExemptEncryption = false`) hazır.

`Info.plist` içindeki `SKAdNetworkItems` listesinde şimdilik sadece Google'ın kimliği var. Google'ın AdMob iOS "Get started" sayfasındaki tam listeyi eklemen iOS'ta reklam gelirini artırır.

## app-ads.txt
AdMob, reklam gelirini tam almak için geliştirici web sitende `app-ads.txt` ister. Mağaza kayıtlarındaki "geliştirici web sitesi" alanına bir site gir ve kök dizine AdMob > Uygulamalar > app-ads.txt'deki satırı koy (ücretsiz: GitHub Pages).

## Oyunu güncellemek
Oyun kodu değişince `www/index.html` dosyasını yenisiyle değiştir ve:
```powershell
npx cap sync
```
Ardından Android Studio / Xcode'dan yeni sürüm üret. Her yüklemede `android/app/build.gradle` içindeki `versionCode` sayısını 1 artır.

## Bilinen eksikler
- Ortak skor tablosu uygulamada yok (Claude sayfasına özeldi). Skorlar ve kristaller cihazda saklanır. İleride Google Play Games / Game Center ya da Firebase eklenebilir.
- İkon ve açılış ekranı basit bir başlangıç tasarımı. `assets/` içindeki PNG'leri değiştirip `npm run assets` ile yeniden üretebilirsin.
