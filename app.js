// API anahtarı - OpenWeatherMap ücretsiz API kullanılmaktadır
const API_KEY = '8c4f6b5a8e4a9a0b6c2d1e3f4a5b6c7d'; // Demo anahtar - gerçek kullanım için kendi anahtarınızı alın
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM elementlerini seç
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const errorMsg = document.getElementById('errorMsg');
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const weatherDesc = document.getElementById('weatherDesc');
const weatherIcon = document.getElementById('weatherIcon');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const pressure = document.getElementById('pressure');

// Enter tuşu ile arama yapabilme
cityInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchWeather();
    }
});

// Arama butonuna tıklama olayı
searchBtn.addEventListener('click', searchWeather);

// Hava durumu verilerini getir
async function searchWeather() {
    const city = cityInput.value.trim();
    
    // Şehir adı kontrolü
    if (city === '') {
        showError('Lütfen bir şehir adı giriniz.');
        return;
    }
    
    try {
        // API'ye istek gönder
        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=tr`);
        
        // Hata kontrolü
        if (!response.ok) {
            if (response.status === 404) {
                showError('Şehir bulunamadı. Lütfen geçerli bir şehir adı giriniz.');
            } else if (response.status === 401) {
                showError('API anahtarı geçersiz. Lütfen geçerli bir API anahtarı kullanınız.');
            } else {
                showError('Hava durumu bilgisi alınamadı. Lütfen tekrar deneyiniz.');
            }
            return;
        }
        
        // Veriyi JSON formatına çevir
        const data = await response.json();
        
        // Hava durumu bilgilerini göster
        displayWeather(data);
        
    } catch (error) {
        showError('Bir hata oluştu. İnternet bağlantınızı kontrol ediniz.');
        console.error('Hata:', error);
    }
}

// Hava durumu bilgilerini ekrana yazdır
function displayWeather(data) {
    // Hata mesajını gizle
    errorMsg.style.display = 'none';
    
    // Şehir adı
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    
    // Sıcaklık (yuvarla)
    temp.textContent = Math.round(data.main.temp);
    
    // Hava durumu açıklaması
    weatherDesc.textContent = data.weather[0].description;
    
    // Hava durumu ikonu
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    
    // Nem
    humidity.textContent = data.main.humidity;
    
    // Rüzgar hızı
    wind.textContent = data.wind.speed.toFixed(1);
    
    // Basınç
    pressure.textContent = data.main.pressure;
    
    // Hava durumu bilgilerini göster
    weatherInfo.style.display = 'block';
}

// Hata mesajını göster
function showError(message) {
    weatherInfo.style.display = 'none';
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
}
