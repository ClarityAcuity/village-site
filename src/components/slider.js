import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Box,
  Slider as ChakraSlider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react"
import { ColorSchemeEnums } from "../lib/style-utils"

const Slider = ({
  name,
  min,
  max,
  step,
  value,
  defaultValue,
  ariaLabel,
  colorScheme = ColorSchemeEnums.BLUE,
  isDisabled,
  isReadOnly,
  onChange,
}) => {
  const [valueState, setValue] = useState(value || defaultValue)
  const _onChangeValue = value => {
    setValue(value)
    onChange(value)
  }

  return (
    <Box>
      <Box as="label">{`${name} = ${value}`}</Box>
      <ChakraSlider
        aria-label={ariaLabel}
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        value={valueState}
        colorScheme={colorScheme}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        onChange={_onChangeValue}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </ChakraSlider>
    </Box>
  )
}

Slider.ColorSchemeEnums = ColorSchemeEnums

Slider.propTypes = {
  name: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  ariaLabel: PropTypes.string,
  colorScheme: PropTypes.oneOf(Object.values(ColorSchemeEnums)),
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  onChange: PropTypes.func,
}

export default Slider
