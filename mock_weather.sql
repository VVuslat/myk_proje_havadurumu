-- MOCK HAVA DURUMU VERİ TABANI
-- Oluşturma ve örnek veriler

DROP TABLE IF EXISTS weather;

CREATE TABLE weather (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city TEXT NOT NULL,
    temperature INTEGER NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO weather (city, temperature, description) VALUES
('İstanbul', 22, 'Parçalı Bulutlu'),
('Ankara', 18, 'Güneşli'),
('İzmir', 25, 'Güneşli'),
('Antalya', 28, 'Açık'),
('Trabzon', 17, 'Yağmurlu'),
('Bursa', 20, 'Rüzgarlı'),
('Samsun', 19, 'Bulutlu'),
('Gaziantep', 27, 'Açık ve Sıcak'),
('Konya', 23, 'Hafif Rüzgarlı'),
('Erzurum', 12, 'Soğuk ve Kapalı');
