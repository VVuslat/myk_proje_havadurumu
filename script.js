// script.js - Hava durumu uygulamasının ana JavaScript dosyası

// HTML elemanlarını seçiyoruz
const sehirInput = document.getElementById('sehirInput');
const getirBtn = document.getElementById('getirBtn');
const sonucDiv = document.getElementById('sonuc');

// Türkçe karakterleri İngilizce karşılıklarına çeviren fonksiyon
function turkceKarakterleriDonustur(str) {
    // Küçük ve büyük harfler için eşleştirme
    const harfler = {
        'ç': 'c', 'Ç': 'C',
        'ğ': 'g', 'Ğ': 'G',
        'ı': 'i', 'I': 'I',
        'İ': 'I',
        'ö': 'o', 'Ö': 'O',
        'ş': 's', 'Ş': 'S',
        'ü': 'u', 'Ü': 'U'
    };
    // Her karakteri kontrol edip gerekirse değiştiriyoruz
    return str.replace(/[çÇğĞıİöÖşŞüÜ]/g, function(x) { return harfler[x] || x; });
}

// "Getir" butonuna tıklanınca çalışacak fonksiyon
getirBtn.addEventListener('click', async () => {
    // Kullanıcının girdiği şehir adını alıyoruz
    let sehir = sehirInput.value.trim();
    // Eğer input boşsa uyarı veriyoruz
    if (!sehir) {
        sonucDiv.textContent = 'Lütfen bir şehir adı giriniz.';
        return;
    }
    // Türkçe karakterleri dönüştürüyoruz
    const apiSehir = turkceKarakterleriDonustur(sehir);
    // Sonucu temizliyoruz
    sonucDiv.textContent = 'Yükleniyor...';
    try {
        // API isteğini yapıyoruz (HTTPS ile)
        const response = await fetch(`https://goweather.xyz/weather/${apiSehir}`);
        // Gelen veriyi JSON olarak alıyoruz
        const data = await response.json();
        // API "temperature" alanı boşsa şehir bulunamadı demektir
        if (!data.temperature) {
            sonucDiv.textContent = 'Şehir bulunamadı.';
            return;
        }
        // Sonucu ekrana yazdırıyoruz
        sonucDiv.innerHTML = `<strong>${sehir}</strong><br>Sıcaklık: ${data.temperature}<br>Açıklama: ${data.description}`;
    } catch (error) {
        // Hata olursa uyarı veriyoruz
        sonucDiv.textContent = 'Bir hata oluştu. Lütfen tekrar deneyiniz.';
    }
});

// Kodlar Türkçe yorumlarla açıklanmıştır.