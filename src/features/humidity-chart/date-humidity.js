import React, { useMemo } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"
import { Box } from "@chakra-ui/react"
import { WeatherPropType } from "../../lib/weather"

const height = 400
const width = 400
const radius = 160

function DateHumidity({ data, color }) {
  const format = "%"
  const field = "humidity"
  const fontSize = 36
  const labelHeight = 36
  const arc = d3.arc().innerRadius(0).outerRadius(radius)
  const { pieData } = useMemo(() => {
    if (data) {
      const pie = d3.pie().value((d) => d[field])

      return {
        pieData: pie([data, { ...data, humidity: 100 - data.humidity }]),
      }
    }
    return {}
  }, [data])

  function _renderArcs() {
    return pieData?.map((arcData) => {
      const { index, startAngle, endAngle } = arcData
      return (
        <g key={index}>
          <path
            fill={index === 0 ? color : "rgba(0,0,0,0)"}
            stroke={color}
            strokeWidth="1"
            d={arc.startAngle(startAngle).endAngle(endAngle)()}
          />
        </g>
      )
    })
  }

  return (
    <Box as="svg" maxWidth="33%" viewBox={`0 0 ${width} ${height}`}>
      <text
        x={width / 2}
        y={labelHeight}
        textAnchor="middle"
        fontSize={fontSize}
        fill="currentColor"
      >
        {data?.applicable_date}
      </text>
      <g transform={`translate(${width / 2},${(height + labelHeight) / 2})`}>
        {_renderArcs()}
      </g>
      <text
        x={width / 2}
        y={height / 2 + labelHeight}
        textAnchor="middle"
        fontSize={fontSize}
        fill="currentColor"
      >{`${data?.humidity} ${format}`}</text>
    </Box>
  )
}

DateHumidity.propTypes = {
  data: WeatherPropType,
  color: PropTypes.string,
}

export default DateHumidity
