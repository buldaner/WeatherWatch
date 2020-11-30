import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { k2f, mps2mph, visPct } from '../services/weatherService';
import '../assets/css/WeatherDisplay.css';

const WeatherDisplay = (props) => {
    return (
        <div className="weather-display">
            <Row>
                <Col>
                    <Row className="side-box">
                        <Col className="text-center">
                            <div><h5>Visibility</h5></div>
                            <div>{`${visPct(props.weatherData.visibility)}%`}</div>
                        </Col>
                    </Row>
                    <Row className="side-box">
                        <Col className="text-center">
                            <div><h5>Wind Speed</h5></div>
                            <div>{`${mps2mph(parseInt(props.weatherData.wind.speed))} mph`}</div>
                        </Col>
                    </Row>
                </Col>
                <Col className="text-center pt-5 pb-5">
                    <h1>{`${k2f(parseInt(props.weatherData.main.temp))}\u{00B0}`}</h1>
                    <div className="text-muted"><h3>{props.weatherData.weather[0].description}</h3></div>
                </Col>
                <Col>
                    <Row className="side-box">
                        <Col className="text-center">
                            <div><h5>Humidity</h5></div>
                            <div>{`${props.weatherData.main.humidity}%`}</div>
                        </Col>
                    </Row>
                    <Row className="side-box">
                        <Col className="text-center">
                            <div><h5>Feels Like</h5></div>
                            <div>{`${k2f(parseInt(props.weatherData.main.feels_like))}\u{00B0}`}</div>
                        </Col>
                    </Row>            
                </Col>
            </Row>
        </div>
    );
}

WeatherDisplay.propTypes = {
    weatherData: PropTypes.object
}

export default WeatherDisplay;