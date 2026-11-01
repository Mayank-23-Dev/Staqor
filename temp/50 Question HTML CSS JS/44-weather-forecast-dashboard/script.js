const cities = {
    'san francisco': { temp: '19°C', cond: 'Partly Cloudy', icon: '⛅', hum: '68%', wind: '14 km/h', name: 'San Francisco, US' },
    'tokyo': { temp: '26°C', cond: 'Sunny & Clear', icon: '☀️', hum: '52%', wind: '8 km/h', name: 'Tokyo, JP' },
    'london': { temp: '14°C', cond: 'Light Rain', icon: '🌧️', hum: '84%', wind: '22 km/h', name: 'London, UK' }
};

document.getElementById('searchCityBtn').addEventListener('click', () => {
    const q = document.getElementById('cityInput').value.trim().toLowerCase();
    if (cities[q]) {
        const c = cities[q];
        document.getElementById('cityName').textContent = c.name;
        document.getElementById('tempVal').textContent = c.temp;
        document.getElementById('condVal').textContent = c.cond;
        document.getElementById('weatherIcon').textContent = c.icon;
        document.getElementById('humVal').textContent = c.hum;
        document.getElementById('windVal').textContent = c.wind;
    } else {
        alert('City not found in mock database. Try "Tokyo", "London", or "San Francisco".');
    }
});