// script.js - Hava durumu uygulamasının ana JavaScript dosyası

// HTML elemanlarını seçiyoruz
const sehirInput = document.getElementById('sehirInput');
const getirBtn = document.getElementById('getirBtn');
const sonucDiv = document.getElementById('sonuc');

// Türkçe karakterleri İngilizce karşılıklarına çeviren fonksiyon
function turkceKarakterleriDonustur(str) {
    const harfler = {
        'ç': 'c', 'Ç': 'C',
        'ğ': 'g', 'Ğ': 'G',
        'ı': 'i', 'I': 'I',
        'İ': 'I',
        'ö': 'o', 'Ö': 'O',
        'ş': 's', 'Ş': 'S',
        'ü': 'u', 'Ü': 'U'
    };
    return str.replace(/[çÇğĞıİöÖşŞüÜ]/g, function(x) { return harfler[x] || x; });
}

// "Getir" butonuna tıklanınca çalışacak fonksiyon
getirBtn.addEventListener('click', async () => {
    let sehir = sehirInput.value.trim();
    if (!sehir) {
        sonucDiv.textContent = 'Lütfen bir şehir adı giriniz.';
        return;
    }
    const apiSehir = turkceKarakterleriDonustur(sehir).toLowerCase();
    sonucDiv.textContent = 'Yükleniyor...';

    try {
        // Yerel endpoint (FastAPI / Express vb. tarafından sunulan)
        const response = await fetch('http://localhost:8000/weather');
        if (!response.ok) {
            sonucDiv.textContent = 'Sunucudan veri alınamadı.';
            return;
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            sonucDiv.textContent = 'Beklenmeyen sunucu yanıtı.';
            return;
        }

        // DB'deki şehir adlarını da normalize edip eşleştiriyoruz
        const matched = data.find(item =>
            turkceKarakterleriDonustur(String(item.city || '')).toLowerCase() === apiSehir
        );

        if (!matched) {
            sonucDiv.textContent = 'Şehir bulunamadı.';
            return;
        }

        // matched.temperature integer, description string beklenir
        const temp = matched.temperature !== undefined ? `${matched.temperature}°C` : '—';
        const desc = matched.description || '—';

        sonucDiv.innerHTML = `<strong>${sehir}</strong><br>Sıcaklık: ${temp}<br>Açıklama: ${desc}`;
    } catch (error) {
        console.error(error);
        sonucDiv.textContent = 'Bir hata oluştu. Lütfen tekrar deneyiniz.';
    }
});

// Kodlar Türkçe yorumlarla açıklanmıştır.