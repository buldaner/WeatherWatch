import axios from 'axios';

export const fetchWeatherData = (zipcode, apiKey) => {
    //TODO: prevent injection
    return axios({
        method: 'get',
        url: `http://api.openweathermap.org/data/2.5/weather?appId=${apiKey}&zip=${zipcode}`,
        responseType: 'json'
    });
};

export const k2f = (degreesKelvin) => {
    return (((degreesKelvin - 273.15) * 1.8) + 32).toFixed(1);
}

export const mps2mph = (metersPerSecond) => {
    return (metersPerSecond * 2.23694).toFixed(1);
}

export const visPct = (vis) => {
    return Math.round(vis / 10000) * 100;
}

export const openWeatherIconUrl = (code) => {
    return `http://openweathermap.org/img/wn/${code}@4x.png`;
}