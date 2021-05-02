import React from "react";
import PropTypes from "prop-types";
import DateHumidity from "./date-humidity";
import { WeatherPropType, color } from "../../lib/weather";
import "./style.css";

function HumidityChart({ data }) {
  return (
    <div className="humidity-chart">
      <p>Humidity</p>
      <div className="date-humidity-container">
        {data?.map((dateData, index) => {
          return (
            <DateHumidity
              key={dateData.applicable_date}
              data={dateData}
              color={color[index]}
            />
          );
        })}
      </div>
    </div>
  );
}

HumidityChart.propTypes = {
  data: PropTypes.arrayOf(WeatherPropType),
};

export default HumidityChart;
