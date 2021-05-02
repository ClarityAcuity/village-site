import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text, Img } from "@chakra-ui/react"
import { WeatherPropType, floatFormat } from "../../lib/weather";

const WeatherSvgBaseURL = "https://www.metaweather.com/static/img/weather/";

function Weather({ data }) {
  return (
    <Box margin="24px 0px">
      <Text margin="24px" fontSize="36px">Weather</Text>
      <Flex flexWrap="wrap" justifyContent="center">
        {data?.map(
          ({ applicable_date, weather_state_abbr, weather_state_name, min_temp, max_temp }) => {
            return (
              <Box key={applicable_date} minWidth="30%" padding="16px">
                <Text>{applicable_date}</Text>
                <Text>{`${floatFormat(min_temp)} ~ ${floatFormat(max_temp)} °C`}</Text>
                <Text>{weather_state_name}</Text>
                <Img
                  className="weather-icon"
                  src={`${WeatherSvgBaseURL}${weather_state_abbr}.svg`}
                  alt={weather_state_name}
                />
              </Box>
            );
          }
        )}
      </Flex>
    </Box>
  );
}

Weather.propTypes = {
  data: PropTypes.arrayOf(WeatherPropType),
};

export default Weather;
