import React, { useState } from 'react';
import WeatherSearchBar from './WeatherSearchBar';
import WeatherDisplay from './WeatherDisplay';
import Container from 'react-bootstrap/Container';
import '../assets/css/weatherWatch.css';

const WeatherWatch = () => {
    const [weatherData, setWeatherData] = useState({});
    const hasWeatherData = Object.keys(weatherData).length > 0;

    return (
        <Container className="weather-watch">
            <WeatherSearchBar weatherData={weatherData} setWeatherData={setWeatherData} />
            {hasWeatherData && 
                <WeatherDisplay weatherData={weatherData} />}
        </Container>
    );
}

export default WeatherWatch;