import React, { useState, useEffect } from 'react';

const WeatherDashboard = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API Key

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                setError(error);
            }
        };

        fetchWeather();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Weather Dashboard</h1>
            <h2>{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Condition: {weatherData.weather[0].description}</p>
        </div>
    );
};

export default WeatherDashboard;