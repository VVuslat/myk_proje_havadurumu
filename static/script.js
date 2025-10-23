// script.js - Hava durumu uygulamasının ana JavaScript dosyası

// API base configurasyonu:
// window.API_BASE ile override edilebilir. Eğer boşsa aynı origin kullanılır.
const __API_BASE_RAW = (window.API_BASE || '').trim();
// remove trailing slash for consistency
const API_BASE = __API_BASE_RAW ? __API_BASE_RAW.replace(/\/$/, '') : '';

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
        // build URL according to API_BASE (supports same-origin when empty)
        const weatherUrl = API_BASE ? `${API_BASE}/weather` : '/weather';
        // relative path önerilir (aynı origin) if API_BASE === ''
        let response = null;
        try {
            response = await fetch(weatherUrl, {cache: 'no-store'});
            console.log('Fetch /weather status:', response.status, response.statusText);
        } catch (netErr) {
            console.warn('Network error fetching weather:', netErr);
            response = null;
        }

        // Eğer API çağrısı başarısız veya 404 döndüyse static fallback deneyelim
        if (!response || !response.ok) {
            try {
                const fallback = await fetch('static/weather.json', {cache: 'no-store'});
                if (fallback && fallback.ok) {
                    const data = await fallback.json();
                    handleWeatherData(data, apiSehir, sehir);
                    return;
                }
            } catch (fbErr) {
                console.error('Fallback fetch error:', fbErr);
            }

            const status = response ? response.status : 'network-error';
            sonucDiv.textContent = `Sunucudan veri alınamadı (HTTP ${status}).`;
            return;
        }

        const data = await response.json().catch(err => { throw new Error('JSON parse hatası: ' + err.message); });
        handleWeatherData(data, apiSehir, sehir);
    } catch (error) {
        console.error('İşlem hatası:', error);
        sonucDiv.textContent = 'Bir hata oluştu. Lütfen tekrar deneyiniz.';
    }
});

// Ortak veri işleme fonksiyonu (hem API hem fallback için)
function handleWeatherData(data, apiSehir, sehir) {
    console.log('Weather data length:', Array.isArray(data) ? data.length : typeof data, data);

    if (!Array.isArray(data)) {
        sonucDiv.textContent = 'Beklenmeyen sunucu yanıtı.';
        return;
    }

    const matched = data.find(item =>
        turkceKarakterleriDonustur(String(item.city || '')) === apiSehir
    );

    if (!matched) {
        const available = data.map(i => turkceKarakterleriDonustur(String(i.city || ''))).slice(0,20);
        console.warn('Şehir bulunamadı. Kullanılabilir (normalize):', available);
        sonucDiv.textContent = 'Şehir bulunamadı.';
        return;
    }

    const temp = matched.temperature !== undefined ? `${matched.temperature}°C` : '—';
    const desc = matched.description || '—';

    sonucDiv.innerHTML = `<strong>${sehir}</strong><br>Sıcaklık: ${temp}<br>Açıklama: ${desc}`;
}

// Kodlar Türkçe yorumlarla açıklanmıştır.