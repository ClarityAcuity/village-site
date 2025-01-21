import {
  Box,
  Badge,
  Link,
  defaultSystem,
  ChakraProvider,
} from "@chakra-ui/react"
// import { TimeIcon, ViewIcon } from "@chakra-ui/icons"
import { SizeEnums, ColorEnums, ColorSchemeEnums } from "../lib/style-utils"
import type { CollectionEntry } from "astro:content"
import { Provider } from "../components/ui/provider"

const { SMALL, LARGE, EXTRALARGE, XXL } = SizeEnums
const { GRAY } = ColorEnums
const { TEAL } = ColorSchemeEnums

export type Props = {
  posts: Array<
    CollectionEntry<"blog"> & { timeToRead: number; excerpt: string }
  >
}

function IndexPageQuery({ posts }: Props) {
  return (
    <Provider>
      {posts.map(
        ({ id, slug, timeToRead, excerpt, data: { title, date, author } }) => {
          return (
            <Box
              key={id}
              maxW={XXL}
              borderWidth="1px"
              borderRadius={LARGE}
              overflow="hidden"
              margin="5"
            >
              <Box padding="4">
                <Box display="flex" alignItems="baseline">
                  <Badge borderRadius="full" colorScheme={TEAL}>
                    {author || "No Author"}
                  </Badge>
                </Box>
                <Box as="h4" fontWeight="semibold" fontSize={EXTRALARGE}>
                  <Link href={`/blog/${slug}`} textDecor={"none"}>
                    {title}
                  </Link>
                </Box>
                <Box marginTop="1" as="p" fontSize={LARGE}>
                  {excerpt}
                </Box>
                <Box
                  display="flex"
                  mt="10"
                  alignItems="center"
                  position="relative"
                >
                  <Box as="span" color={GRAY} fontSize={SMALL}>
                    {/* <ViewIcon margin="2" /> */}
                    {timeToRead} min read
                  </Box>
                  <Box
                    as="span"
                    color={GRAY}
                    fontSize="sm"
                    position="absolute"
                    right="0"
                  >
                    {/* <TimeIcon margin="2" /> */}
                    {date.toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Box>
                </Box>
              </Box>
            </Box>
          )
        }
      )}
    </Provider>
  )
}

export default IndexPageQuery
