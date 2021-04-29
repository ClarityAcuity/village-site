import React from "react";
import PropTypes from "prop-types";
import { WeatherPropType, floatFormat } from "../utils";
import "./style.css";

const WeatherSvgBaseURL = "https://www.metaweather.com/static/img/weather/";

function Weather({ data }) {
  return (
    <div>
      <p>Weather</p>
      <div className="weather">
        {data.map(
          ({ applicable_date, weather_state_abbr, weather_state_name, min_temp, max_temp }) => {
            return (
              <div key={applicable_date} className="date-weather">
                <p>{applicable_date}</p>
                <p>{`${floatFormat(min_temp)} ~ ${floatFormat(max_temp)} °C`}</p>
                <p>{weather_state_name}</p>
                <img
                  className="weather-icon"
                  src={`${WeatherSvgBaseURL}${weather_state_abbr}.svg`}
                  alt={weather_state_name}
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

Weather.propTypes = {
  data: PropTypes.arrayOf(WeatherPropType),
};

export default Weather;
