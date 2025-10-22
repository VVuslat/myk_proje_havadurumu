// script.js - Hava durumu uygulamasının ana JavaScript dosyası

// HTML elemanlarını seçiyoruz
const sehirInput = document.getElementById('sehirInput');
const getirBtn = document.getElementById('getirBtn');
const sonucDiv = document.getElementById('sonuc');

// Türkçe karakterleri İngilizce karşılıklarına çeviren fonksiyon (normalize + lowercase)
function turkceKarakterleriDonustur(str) {
    if (str == null) return '';
    const harfler = {
        'ç':'c','Ç':'c',
        'ğ':'g','Ğ':'g',
        'ı':'i','I':'i','İ':'i',
        'ö':'o','Ö':'o',
        'ş':'s','Ş':'s',
        'ü':'u','Ü':'u'
    };
    return String(str)
        .replace(/[çÇğĞıIİöÖşŞüÜ]/g, x => harfler[x] || x)
        .toLowerCase();
}

getirBtn.addEventListener('click', async () => {
    let sehir = sehirInput.value.trim();
    if (!sehir) {
        sonucDiv.textContent = 'Lütfen bir şehir adı giriniz.';
        return;
    }
    const apiSehir = turkceKarakterleriDonustur(sehir);
    sonucDiv.textContent = 'Yükleniyor...';

    try {
        // relative path önerilir (aynı origin)
        const response = await fetch('/weather', {cache: 'no-store'});
        console.log('Fetch /weather status:', response.status, response.statusText);

        if (!response.ok) {
            // sunucu HTML hata sayfası ya da 404 döndü
            const text = await response.text().catch(()=>'<no body>');
            console.error('Sunucu hatası:', response.status, text);
            sonucDiv.textContent = `Sunucudan veri alınamadı (HTTP ${response.status}).`;
            return;
        }

        const data = await response.json().catch(err => { throw new Error('JSON parse hatası: ' + err.message); });
        console.log('Weather data length:', Array.isArray(data) ? data.length : typeof data, data);

        if (!Array.isArray(data)) {
            sonucDiv.textContent = 'Beklenmeyen sunucu yanıtı.';
            return;
        }

        const matched = data.find(item =>
            turkceKarakterleriDonustur(String(item.city || '')) === apiSehir
        );

        if (!matched) {
            // debug: mevcut şehirleri göster (normalize edilmiş)
            const available = data.map(i => turkceKarakterleriDonustur(String(i.city || ''))).slice(0,20);
            console.warn('Şehir bulunamadı. Kullanılabilir (normalize):', available);
            sonucDiv.textContent = 'Şehir bulunamadı.';
            return;
        }

        const temp = matched.temperature !== undefined ? `${matched.temperature}°C` : '—';
        const desc = matched.description || '—';

        sonucDiv.innerHTML = `<strong>${sehir}</strong><br>Sıcaklık: ${temp}<br>Açıklama: ${desc}`;
    } catch (error) {
        console.error('İşlem hatası:', error);
        sonucDiv.textContent = 'Bir hata oluştu. Lütfen tekrar deneyiniz.';
    }
});

// Kodlar Türkçe yorumlarla açıklanmıştır.