import {
  Box,
  Button,
  Flex,
  Heading,
  MenuRoot, // astro not support zag.js yet ?
  MenuTrigger,
  MenuContent,
  MenuItem,
  IconButton,
  Link,
  type ButtonProps,
  type HeadingProps,
} from "@chakra-ui/react"
import { LuAlignJustify } from "react-icons/lu"
import { SizeEnums, ColorEnums } from "../lib/style-utils"
import { Provider } from "./ui/provider"

const links = [
  { name: "Blog", path: "/blog" },
  { name: "Demo", path: "/demo" },
  { name: "Repo", path: "/repo" },
]

const { LARGE, EXTRALARGE } = SizeEnums
const { BLACK, WHITE } = ColorEnums

// TODO : use in header.astro
const Header = ({ siteTitle = "" }: { siteTitle: string }) => {
  return (
    <Provider>
      <header>
        <Box
          as="nav"
          display="flex"
          alignContent={{ lg: "center" }}
          justifyContent={{ lg: "space-between" }}
          // wrap="wrap"
          height="100px"
          padding="1rem"
          background={BLACK}
          color={WHITE}
        >
          <Flex alignItems="center" width="960px" margin="0 auto">
            <Heading
              as="h2"
              size={EXTRALARGE as HeadingProps}
              marginLeft="1rem"
            >
              <Box margin="1rem">
                <Link
                  href="/"
                  width={{ base: "240px", sm: "300px", lg: "390px" }}
                >
                  {siteTitle}
                </Link>
              </Box>
            </Heading>
            <Box display={{ base: "none", lg: "flex" }} marginTop="5px">
              {links.map(({ path, name }, i) => (
                <Box key={`key-${i}`} marginLeft="2rem">
                  <Link href={path}>{name}</Link>
                </Box>
              ))}
            </Box>
            <MenuRoot
              closeOnSelect={false}
              positioning={{ placement: "right-start" }}
              // open
            >
              <MenuTrigger asChild>
                <IconButton
                  // display={{ base: "block", lg: "none" }}
                  margin="1rem"
                  position="absolute"
                  right="5"
                  // as={IconButton}
                  aria-label="Menu"
                  size={LARGE as ButtonProps}
                  variant="outline"
                  background="black"
                  _hover={{
                    background: "white",
                    color: "black",
                  }}
                  _active={{ background: "white", color: "black" }}
                >
                  <LuAlignJustify />
                </IconButton>
              </MenuTrigger>
              <MenuContent color="black">
                {links.map(({ path, name }, i) => (
                  <MenuItem
                    key={`key-${i}`}
                    justifyContent="center"
                    _hover={{
                      background: "black",
                      color: "white",
                    }}
                    value={name}
                  >
                    <Link href={path}>{name}</Link>
                  </MenuItem>
                ))}
              </MenuContent>
            </MenuRoot>
          </Flex>
        </Box>
      </header>
    </Provider>
  )
}

export default Header
