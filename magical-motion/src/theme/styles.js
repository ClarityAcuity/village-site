// import { mode } from "@chakra-ui/theme-tools"

// export const styles = {
//   global: (props) => ({
//     fontFamily: "body",
//     color: mode("gray.800", "whiteAlpha.900")(props),
//     bg: mode("white", "gray.800")(props),
//     lineHeight: "base",
//     "*::placeholder": {
//       color: mode("gray.400", "whiteAlpha.400")(props),
//     },
//     "*, *::before, &::after": {
//       borderColor: mode("gray.200", "whiteAlpha.300")(props),
//       wordWrap: "break-word",
//     },
//     fontFeatureSettings: `"pnum"`,
//     fontVariantNumeric: "proportional-nums",
//   }),
// }

export const layerStyles = {
  base: {
    bg: "gray.50",
    border: "2px solid",
    borderColor: "gray.500",
  },
  selected: {
    bg: "teal.500",
    color: "teal.700",
    borderColor: "orange.500",
  },
}

export const textStyles = {
  h1: {
    // you can also use responsive styles
    fontSize: ["48px", "72px"],
    fontWeight: "bold",
    lineHeight: "110%",
    letterSpacing: "-2%",
  },
  h2: {
    fontSize: ["36px", "48px"],
    fontWeight: "semibold",
    lineHeight: "110%",
    letterSpacing: "-1%",
  },
}
