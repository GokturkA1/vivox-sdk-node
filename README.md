# Vivox SDK Node.js Addon

Bu proje, Vivox SDK'sını Node.js projelerinde kullanabilmek için hazırlanmış bir C++ Addon'dur. Tüm Windows mimarilerini (x64, Win32, arm64) destekleyecek şekilde yapılandırılmıştır.

## Özellikler
- **Çoklu Mimari Desteği:** `binding.gyp` dosyası x64, Win32 ve arm64 mimarileri için doğru kütüphane ve DLL eşleştirmelerini otomatik yapar.
- **Asenkron Olay Döngüsü:** C++ tarafında çalışan bir arka plan iş parçacığı (background thread), Vivox SDK'sından gelen mesajları toplar ve Node.js tarafına `ThreadSafeFunction` kullanarak iletir.
- **Yüksek Performans:** N-API (Node-Addon-API) kullanılarak geliştirilmiştir.

## Kurulum ve Derleme

### Ön Gereksinimler
- Node.js (v14 veya üzeri önerilir)
- Python 3.x
- Visual Studio 2017 veya üzeri (C++ Masaüstü Geliştirme iş yükü yüklü olmalıdır)

### Adımlar
1. `node-addon` dizinine gidin:
   ```bash
   cd node-addon
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Addon'u derleyin:
   ```bash
   npm run build
   ```

## Kullanım

Yeni sürüm `EventEmitter` yapısını destekler:

```javascript
const vivox = require('./index');

// Olayları dinle
vivox.on('loginSuccess', (event) => {
    console.log('Başarıyla giriş yapıldı');
});

vivox.on('participantAdded', (event) => {
    console.log('Yeni katılımcı:', event.participant_uri);
});

vivox.on('message', (event) => {
    console.log(`${event.participant_uri} dedi ki: ${event.message}`);
});

// SDK'yı başlat
vivox.initialize();

// Test verileriyle bağlan (Otomatik Connector -> Login -> Join süreci)
vivox.connectWithTestData(require('./test_data.json'));
```

## Gelişmiş Özellikler
- **Cihaz Listeleme:** `vivox.getCaptureDevices()` ve `vivox.getRenderDevices()` çağrıları sonrası `captureDevices` ve `renderDevices` olayları tetiklenir.
- **Mesaj Gönderme:** `vivox.sendMessage(sessHandle, "Mesaj içeriği")`
- **Katılımcı Kontrolü:** `vivox.setParticipantMute(sessHandle, uri, true)` ve `vivox.setParticipantVolume(sessHandle, uri, 50)`
- **3D Ses:** `vivox.set3DPosition(acctHandle, x, y, z, channelUri)`
