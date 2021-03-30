import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"
import { styles, layerStyles, textStyles } from "./styles"

// Foundational style overrides
import borders from "./foundations/borders"
// Component style overrides
import Button from "./components/button"

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
}
const breakpoints = createBreakpoints({
  sm: "30em", // 480px
  md: "48em", // 768px
  lg: "62em", // 1860px
  xl: "80em", // 2400px
  "2xl": "96em", // 2880px
})
const overrides = {
  config,
  breakpoints,
  styles,
  layerStyles,
  textStyles,
  // Foundational style overrides go here
  borders,
  components: {
    // Components go here
    Button,
  },
}

export default extendTheme(overrides)
