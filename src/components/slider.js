import React, { useState } from "react"
import {
  Box,
  Slider as ChakraSlider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react"

const ColorSchemeEnums = {
  BLUE: "blue",
  CYAN: "cyan",
  GRAY: "gray",
  GREEN: "green",
  ORANGE: "orange",
  PINK: "pink",
  PURPLE: "purple",
  RED: "red",
  TEAL: "teal",
  YELLOW: "yellow",
  WHITE_ALPHA: "whiteAlpha",
  BLACK_ALPHA: "blackAlpha",
  LINKEDIN: "linkedin",
  FACEBOOK: "facebook",
  MESSAGER: "messenger",
  WHATSAPP: "whatsapp",
  TWITTER: "twitter",
  TELEGRAM: "telegram",
}

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
