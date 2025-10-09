# Hava Durumu Web Uygulaması

Bu proje, MYK Seviye 5 Yazılım Geliştirici standardında belirtilen kullanıcı arayüzü tasarımı, temel veri işleme ve kodlama becerilerini göstermek amacıyla hazırlanmış basit bir hava durumu web uygulamasıdır.

## Özellikler

- Kullanıcı şehir adı girişi
- Gerçek zamanlı hava durumu bilgisi (OpenWeatherMap API)
- Sıcaklık, nem, rüzgar hızı ve basınç bilgileri
- Hava durumu ikonu gösterimi
- Responsive tasarım
- Türkçe dil desteği
- Hata yönetimi

## Kullanılan Teknolojiler

- HTML5
- CSS3
- JavaScript (ES6+)
- OpenWeatherMap API

## Kullanım

1. Projeyi bilgisayarınıza indirin veya klonlayın
2. `index.html` dosyasını bir web tarayıcısında açın
3. Şehir adını giriş kutusuna yazın (örn: Istanbul, Ankara, Izmir)
4. "Ara" butonuna tıklayın veya Enter tuşuna basın
5. Hava durumu bilgileri ekranda görüntülenecektir

## API Anahtarı Hakkında

Uygulama, OpenWeatherMap API'sini kullanmaktadır. Mevcut API anahtarı demo amaçlıdır. Kendi API anahtarınızı almak için:

1. [OpenWeatherMap](https://openweathermap.org/api) sitesine gidin
2. Ücretsiz hesap oluşturun
3. API anahtarınızı alın
4. `app.js` dosyasındaki `API_KEY` değişkenine kendi anahtarınızı yazın

## Proje Yapısı

```
myk_proje_havadurumu/
├── index.html      # Ana HTML dosyası
├── style.css       # CSS stil dosyası
├── app.js          # JavaScript uygulama dosyası
└── README.md       # Proje dokümantasyonu
```

## MYK Seviye 5 Standart Uyumu

Bu proje aşağıdaki MYK Seviye 5 yeterliliklerini karşılamaktadır:

- Kullanıcı arayüzü tasarımı (HTML/CSS)
- Temel veri işleme (API'den veri çekme ve işleme)
- Kodlama becerileri (JavaScript kullanımı)
- Hata yönetimi ve kullanıcı deneyimi
- Responsive web tasarımı

## Lisans

Bu proje eğitim amaçlı hazırlanmıştır.
