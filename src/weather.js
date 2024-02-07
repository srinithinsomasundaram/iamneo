import React, { useState, useEffect } from 'react';
import './App.css';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const API_KEY = '1b8cb294267facfb6d88db48a578cd2c';

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`weather-app ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="app-title">☁️ Weather App ☀️</h1>
      <label>
        <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
        Dark Mode 🌙
      </label>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="city-input"
      />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country} 🌎</h2>
          <p>{weatherData.weather[0].description} {weatherData.weather[0].icon && <img alt="weather-icon" src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} />}</p>
          <p>Temperature: {weatherData.main.temp}°C 🌡️</p>
          <p>Humidity: {weatherData.main.humidity}% 💧</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s 🌬️</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
