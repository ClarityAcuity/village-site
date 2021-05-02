import React, { useState, useEffect, useRef } from "react"
import { throttle } from "lodash"
import { Link, Box, Flex } from "@chakra-ui/react"
import LocationInput from "../location-input"
import Weather from "../weather"
import TemperatureChart from "../temperature-chart"
import HumidityChart from "../humidity-chart"
import { locationDays } from "../../api"

const initLocation = {
  latt_long: "25.085960,121.561478",
  location_type: "City",
  title: "Taipei",
  woeid: 2306179,
}

function App() {
  const [location, setLocation] = useState(initLocation)
  const [days, setDays] = useState()
  const getDays = useRef(throttle(locationDays, 100))
  const { consolidated_weather: weather = [] } = days || {}

  useEffect(() => {
    if (location) {
      getDays.current({ location: location.woeid }, setDays)
    }
  }, [location])

  return (
    <Box textAlign="center">
      <Flex
        backgroundColor="#282c34"
        minHeight="100vh"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        fontSize="calc(10px + 2vmin)"
        color="white"
      >
        <Link
          href="https://cors-anywhere.herokuapp.com/corsdemo"
          target="_blank"
          rel="noopener noreferrer"
          fontSize="36px"
        >
          Activate cors proxy there
        </Link>
        <LocationInput
          name="Location"
          location={location.title}
          onChange={setLocation}
        />
        {weather && (
          <>
            <Weather data={weather} />
            <TemperatureChart
              data={weather}
              field={TemperatureChart.ChartTypeEnums.MAX_TEMP}
            />
            <TemperatureChart
              data={weather}
              field={TemperatureChart.ChartTypeEnums.MIN_TEMP}
            />
            <HumidityChart data={weather} />
          </>
        )}
      </Flex>
    </Box>
  )
}

export default App
