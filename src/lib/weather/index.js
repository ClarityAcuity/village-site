import PropTypes from "prop-types";
import * as d3 from "d3";

const AbbreviationEnums = {
  SNOW: "sn",
  SLEET: "sl",
  HAIL: "h",
  THUNDERSTORM: "t",
  HEAVY_RAIN: "hr",
  LIGHT_RAIN: "lr",
  SHOWERS: "s",
  HEAVY_CLOUD: "hc",
  LIGHT_CLOUD: "lc",
  CLEAR: "c",
};

export const WeatherPropType = PropTypes.shape({
  id: PropTypes.number,
  applicable_date: PropTypes.string,
  humidity: PropTypes.number,
  max_temp: PropTypes.number,
  min_temp: PropTypes.number,
  weather_state_abbr: PropTypes.oneOf(Object.values(AbbreviationEnums)),
});

export const color = d3.schemeCategory10;

export const intFormat = d3.format("d");

export const floatFormat = d3.format(".1f");
