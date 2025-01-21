import { createSystem, defaultBaseConfig, defineConfig } from "@chakra-ui/react"
import { layerStyles, textStyles } from "./styles"
// import { defineConfig } from "@pandacss/dev"

// Foundational style overrides
// import borders from "./foundations/borders"
// Component style overrides
// import Button from "./components/button"

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
}
const breakpoints = {
  sm: "30em", // 480px
  md: "48em", // 768px
  lg: "62em", // 1860px
  xl: "80em", // 2400px
  "2xl": "96em", // 2880px
}
const customConfig = defineConfig({
  config,
  // Foundational style overrides go here
  // borders,
  // components: {
  //   // Components go here
  // Button,
  // },
  theme: {
    breakpoints,
    // styles,
    layerStyles,
    textStyles,
    tokens: {
      colors: {
        red: "#EE0F0F",
      },
    },
    semanticTokens: {
      colors: {
        danger: { value: "{colors.red}" },
      },
    },
    keyframes: {
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
  },
})

export const system = createSystem(defaultBaseConfig, customConfig)
