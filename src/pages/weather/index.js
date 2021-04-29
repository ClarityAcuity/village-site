import React, { useState, useEffect, useRef } from "react"
import { throttle } from "lodash"
import Layout from "../../components/layout"
import LocationInput from "./components/location-input"
import Weather from "./components/weather"
import TemperatureChart from "./components/temperature-chart"
import HumidityChart from "./components/humidity-chart"
import { locationDays } from "./api"
import "./style.css"

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
    <Layout>
      <div className="App">
        <header className="App-header">
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
        </header>
      </div>
    </Layout>
  )
}

export default App
