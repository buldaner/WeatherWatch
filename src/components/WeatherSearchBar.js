import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import WeatherSearchBarDisplay from './WeatherSearchBarDisplay';
import { fetchWeatherData } from '../services/weatherService';
import { format } from 'date-fns';
import { getDateFromUTCSecondsOffset } from '../util/dates';

export const wsbActionType = {
    SET_ZIPCODE: 'zipCode',
    SET_LASTSEARCHTIME: 'lastSearchTime',
    SET_LASTSEARCHSUCCESS: 'lastSearchSuccess',
    SET_SUBMITTED: 'submitted'
}

const wsbReducer = (state, action) => {
    let newState = {...state};

    switch (action.type) {
        case wsbActionType.SET_ZIPCODE: {
            newState[wsbActionType.SET_ZIPCODE] = action.value;
            break;
        }
        case wsbActionType.SET_LASTSEARCHTIME: {
            let formattedTime = format(action.value, 'hh:mm aa');
            newState[wsbActionType.SET_LASTSEARCHTIME] = formattedTime;
            break;
        }
        case wsbActionType.SET_LASTSEARCHSUCCESS: {
            newState[wsbActionType.SET_LASTSEARCHSUCCESS] = action.value;
            break;
        }
        case wsbActionType.SET_SUBMITTED: {
            newState[wsbActionType.SET_SUBMITTED] = action.value;
            break;
        }
        default:
    }

    return newState;
};

const WeatherSearchBar = (props) => {
    const [state, dispatch] = useReducer(wsbReducer, {
        zipCode: null,
        lastSearchTime: null,
        lastSearchSuccess: true,
        submitted: false
    });

    const zipSearch = async (zipCode) => {
        try {
            let weatherData = await fetchWeatherData(zipCode, 'c208becd7984158798a75c82a88c79a2');
            handleChange(
                wsbActionType.SET_LASTSEARCHTIME, 
                getDateFromUTCSecondsOffset(weatherData.data.timezone)
            );
            handleChange(wsbActionType.SET_LASTSEARCHSUCCESS, true);
            handleChange(wsbActionType.SET_SUBMITTED, true);
            props.setWeatherData(weatherData.data);
        } catch(err) {
            console.clear(); // Chrome really doesn't like 404s
            handleChange(wsbActionType.SET_LASTSEARCHSUCCESS, false);
            handleChange(wsbActionType.SET_SUBMITTED, true);
        }
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();

        zipSearch(state.zipCode);
    };

    const handleChange = (type, value) => {
        dispatch({ type: type, value: value });
    }

    return (
        <WeatherSearchBarDisplay
            weatherData={props.weatherData} 
            lastSearchTime={state.lastSearchTime}
            zipCode={state.zipCode}
            onSubmit={handleSubmit}
            onChange={ev => handleChange(wsbActionType.SET_ZIPCODE, ev.target.value)}
            lastSearchSuccess={state.lastSearchSuccess}
            submitted={state.submitted}                                       
        />
    );
}

WeatherSearchBar.propTypes = {
    weatherData: PropTypes.object,
    setWeatherData: PropTypes.func
};

export default WeatherSearchBar;