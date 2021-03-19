import React from "react"
import { Box } from "@chakra-ui/react"
import Slider from "../../components/slider"

const {
  ColorSchemeEnums: { RED, GREEN, BLUE },
} = Slider
const CameraEnums = {
  LAMBDA: "lambda",
  PHI: "phi",
  GAMMA: "gamma",
}
const { LAMBDA, PHI, GAMMA } = CameraEnums

/*
function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x)
}
*/

const Camera = ({
  lambda,
  phi,
  gamma,
  onChange,
  /*
  width,
  distance,
  tilt,
  scale,
  */
}) => {
  const _handleChnage = (name, value) => {
    return onChange(name, value)
  }
  /* TODO manipulate scale
  const distanceScale = getBaseLog(2, distance)
  const theta = Math.acos(1 / distance)
  const size = ((distance - 1) / (distance - Math.cos(theta))) * Math.sin(theta)
  const scaleScale = ((Math.SQRT2 / (width - 2)) * size) / getBaseLog(2, scale)

  const _getDistance = value => Math.pow(2, value)
  const _getScale = value => {
    const thetas = Math.acos(1 / distance)
    const size =
      ((distance - 1) / (distance - Math.cos(thetas))) * Math.sin(thetas)
    return ((Math.pow(2, value) / size) * (width - 2)) / Math.SQRT2
  }
  */
  return (
    <Box>
      <Slider
        name={LAMBDA}
        ariaLabel={`slider-${LAMBDA}`}
        min={-180}
        max={180}
        value={lambda}
        defaultValue={0}
        colorScheme={RED}
        onChange={value => _handleChnage(LAMBDA, value)}
      />
      <Slider
        name={PHI}
        ariaLabel={`slider-${PHI}`}
        min={-90}
        max={90}
        value={phi}
        defaultValue={0}
        colorScheme={GREEN}
        onChange={value => {
          onChange(PHI, value)
        }}
      />
      <Slider
        name={GAMMA}
        ariaLabel={`slider-${GAMMA}`}
        min={-180}
        max={180}
        value={gamma}
        defaultValue={0}
        colorScheme={BLUE}
        onChange={value => onChange(GAMMA, value)}
      />
    </Box>
  )
}

export default Camera
