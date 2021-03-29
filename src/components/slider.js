import React, { useState } from "react"
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

export default Slider
