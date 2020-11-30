import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { FaCloudSun } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import '../assets/css/weatherSearchBarDisplay.css';

const defaultText = `Enter a US zipcode to watch the weather!`;

const WeatherSearchBarDisplay = (props) => {
    const hasWeatherData = Object.keys(props.weatherData).length > 0;

    return (
        <div className="pt-3 pl-4 pr-4 weather-gradient">
            <Row>
                <Col><h2>WeatherWatch</h2></Col>
            </Row>
            <Row className="bottom-row">
                <Col className={`${hasWeatherData && 'col-3'} pt-md-2`}>
                    <h5 className={`${!hasWeatherData && 'text-muted'}`}>
                        {hasWeatherData ? props.weatherData.name : defaultText}
                    </h5>
                </Col>
                {hasWeatherData &&
                    <>
                        <Col className="col-3 pt-md-2">
                            <h5>{props.lastSearchTime}</h5>
                        </Col>
                        <Col></Col>
                    </>
                }
                <Col className="col-5 col-md-4">
                    <Form onSubmit={props.onSubmit} validated={props.submitted && props.lastSearchSuccess} noValidate>
                        <Form.Group controlId="validationZip">
                            <InputGroup>
                                <Form.Control type="text" 
                                    value={props.zipCode || ''}
                                    onChange={props.onChange}       
                                    isInvalid={props.submitted && !props.lastSearchSuccess}
                                    maxLength="5">
                                </Form.Control>
                                <InputGroup.Append>
                                    <IconContext.Provider value={{ size: "1.5em" }}>
                                        <Button className="btn-dark" type="submit"><FaCloudSun/></Button>                        
                                    </IconContext.Provider>
                                </InputGroup.Append>
                                <Form.Control.Feedback type="invalid">No results found!</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

WeatherSearchBarDisplay.propTypes = {
    weatherData: PropTypes.object,
    lastSearchTime: PropTypes.string,
    zipCode: PropTypes.string,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    lastSearchSuccess: PropTypes.bool,
    submitted: PropTypes.bool
}

export default WeatherSearchBarDisplay;