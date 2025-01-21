import { Box, Center, ChakraProvider, defaultSystem } from "@chakra-ui/react"
import Landing from "./Landing"
import IconLink from "./IconLink"
import { AstroIcon } from "../icons/astro"
import { ColorEnums } from "../lib/style-utils"
import { Provider } from "./ui/provider"

const { BLACK, WHITE } = ColorEnums

const Footer = ({ username = "" }: { username?: string }) => {
  return (
    <Provider>
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
            © {new Date().getFullYear()}, Built with Astro
            {` `}
            <IconLink
              href="https://docs.astro.build"
              icon={<AstroIcon color={WHITE} />}
            />
          </Box>
        </Box>
      </Center>
    </Provider>
  )
}
export default Footer
