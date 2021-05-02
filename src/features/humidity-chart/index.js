import React from "react"
import PropTypes from "prop-types"
import { Box, Flex, Text } from "@chakra-ui/react"
import DateHumidity from "./date-humidity"
import { WeatherPropType, color } from "../../lib/weather"

function HumidityChart({ data }) {
  return (
    <Box width="100%" maxWidth="1024px" margin="24px 0px">
      <Text margin="24px" fontSize="36px">
        Humidity
      </Text>
      <Flex flexWrap="wrap" justifyContent="center">
        {data?.map((dateData, index) => {
          return (
            <DateHumidity
              key={dateData.applicable_date}
              data={dateData}
              color={color[index]}
            />
          )
        })}
      </Flex>
    </Box>
  )
}

HumidityChart.propTypes = {
  data: PropTypes.arrayOf(WeatherPropType),
}

export default HumidityChart
