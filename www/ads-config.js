// AdMob ayarları — Uzay Kaydırağı
// test: true  → Google'ın resmi TEST reklamları gösterilir (geliştirirken kendi reklamına tıklamamak için).
// test: false → Aşağıdaki gerçek reklam birimleri kullanılır. Mağazaya göndermeden önce false yap.
//
// DİKKAT: AdMob'da iki uygulaman var (~5917833167 ve ~9473934795). Hangisinin Android, hangisinin iOS
// olduğunu AdMob > Uygulamalar listesindeki platform simgesinden kontrol et. Tersi ise iki bloğun yerini değiştir
// ve android/app/src/main/res/values/strings.xml ile ios/App/App/Info.plist içindeki uygulama kimliklerini de değiştir.
window.CAMK_ADS = {
  test: false,
  android: {
    // AdMob uygulama: ca-app-pub-9017194698663463~5917833167
    banner:       'ca-app-pub-9017194698663463/6774870831',
    interstitial: 'ca-app-pub-9017194698663463/1120977062',
    rewarded:     'ca-app-pub-9017194698663463/4413179806'
  },
  ios: {
    // AdMob uygulama: ca-app-pub-9017194698663463~9473934795
    banner:       'ca-app-pub-9017194698663463/8289020648',
    interstitial: 'ca-app-pub-9017194698663463/4587691193',
    rewarded:     'ca-app-pub-9017194698663463/3274609529'
  }
};
