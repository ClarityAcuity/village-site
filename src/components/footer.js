import React from "react"
import { Box, Center } from "@chakra-ui/react"
import Landing from "./landing"
import IconLink from "./icon-link"
import { GatsbyIcon } from "../icons"
import { ColorEnums } from "../lib/style-utils"

const { BLACK, WHITE } = ColorEnums

const Footer = () => {
  return (
    <Center
      as="footer"
      background={BLACK}
      margin="0"
      color={WHITE}
      height="100px"
    >
      <Box as="footer">
        <Landing color={WHITE} />
        <Box>
          © {new Date().getFullYear()}, Built with Gatsby
          {` `}
          <IconLink
            href="https://www.gatsbyjs.org"
            icon={<GatsbyIcon color={WHITE} />}
          />
        </Box>
      </Box>
    </Center>
  )
}
export default Footer
