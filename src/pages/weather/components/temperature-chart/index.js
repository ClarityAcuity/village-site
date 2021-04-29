import React, { useMemo } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { WeatherPropType, color, intFormat, floatFormat } from "../utils";
import "./style.css";

const height = 500;
const width = 500;
const margin = { top: 30, right: 10, bottom: 30, left: 50 };

const ChartTypeEnums = {
  MAX_TEMP: "max_temp",
  MIN_TEMP: "min_temp",
};
const { MAX_TEMP, MIN_TEMP } = ChartTypeEnums;
const ChartNameMap = {
  [MAX_TEMP]: "Max Temperature",
  [MIN_TEMP]: "Min Temperature",
};

function TemperatureChart({ data, field }) {
  const format = "°C";
  const { xScale, yScale } = useMemo(() => {
    if (data) {
      const x = d3
        .scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, width - margin.right])
        .padding(0.1);
      const maxTemp = d3.max(data, (d) => d[field]);
      const minTemp = d3.min(data, (d) => d[field]);
      const y = d3
        .scaleLinear()
        .domain([minTemp, maxTemp])
        .nice()
        .range([height - margin.bottom, margin.top]);

      return { xScale: x, yScale: y };
    }
    return {};
  }, [data, field]);

  function _renderXAxis() {
    if (xScale) {
      return data.map(({ id, applicable_date }, index) => {
        return (
          <g
            key={id}
            opacity={1}
            transform={`translate(${xScale(index) + xScale.bandwidth() / 2},0)`}
          >
            <line stroke="currentColor" y2={6} />
            <text fill="currentColor" y={9} dy="0.71em">
              {applicable_date}
            </text>
          </g>
        );
      });
    }
  }

  function _renderYAxis() {
    if (yScale) {
      const maxTemp = d3.max(data, (d) => d[field]);
      const minTemp = d3.min(data, (d) => d[field]);
      const diffTemp = maxTemp - minTemp;
      const increment = diffTemp > 2 ? 1 : Number(floatFormat(diffTemp / 3));
      const start = Number(intFormat(minTemp)) - increment;
      let ticks = [];
      for (let i = start; yScale(i) > 0; i += increment) {
        if (i >= 0) {
          ticks.push(parseFloat(floatFormat(i)));
        } else {
          ticks.push(-parseFloat(floatFormat(-i)));
        }
      }
      return ticks.map((tick, index) => {
        const y = yScale(tick);

        return (
          y <= height && (
            <g key={index} opacity={1} transform={`translate(0,${y})`}>
              <line stroke="currentColor" x2={-6} />
              <text fill="currentColor" x={-9} dy="0.32em">
                {tick}
                {format}
              </text>
            </g>
          )
        );
      });
    }
  }

  function _renderBars() {
    if (xScale && yScale) {
      return data.map((bar, index) => {
        const y = yScale(bar[field]);

        return (
          <rect
            key={bar.id}
            x={xScale(index)}
            y={y}
            height={height - margin.bottom - y}
            width={xScale.bandwidth()}
            fill={color[index]}
          />
        );
      });
    }
  }

  return (
    <div className="temperature-chart">
      <p>{ChartNameMap[field]}</p>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <g>{_renderBars()}</g>
        <g
          transform={`translate(0,${height - margin.bottom})`}
          fill="none"
          fontSize={12}
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          <path stroke="currentColor" d={`M40,0H${width - margin.right}`} />
          {_renderXAxis()}
        </g>
        <g
          transform={`translate(${margin.left},0)`}
          fill="none"
          fontSize={12}
          fontFamily="sans-serif"
          textAnchor="end"
        >
          {_renderYAxis()}
        </g>
      </svg>
    </div>
  );
}

TemperatureChart.propTypes = {
  data: PropTypes.arrayOf(WeatherPropType),
  field: PropTypes.string,
};

TemperatureChart.defaultProps = {
  field: "max_temp",
};

TemperatureChart.ChartTypeEnums = ChartTypeEnums;

export default TemperatureChart;
