import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { Box, Text, Link, Code, Divider, Img } from "@chakra-ui/react"
import Heading from "./heading"
import MDLink from "./link"
import CodeBlock from "./code-block"
import BlockQuote from "./block-quote"
import MDList from "./list"
import MDTable from "./table"
import { ColorSchemeEnums } from "../../lib/style-utils"

const { GRAY } = ColorSchemeEnums

const shortcodes = { Link }
const { UnorderedList, OrderedList, ListItem } = MDList
const { Thead, Tbody, Tr, Th, Td } = MDTable

const components = {
  h1: (props) => <Heading as="h1" size="2xl" {...props} />,
  h2: (props) => <Heading as="h2" size="xl" {...props} />,
  h3: (props) => <Heading as="h3" size="lg" {...props} />,
  h4: (props) => <Heading as="h4" size="md" {...props} />,
  h5: (props) => <Heading as="h5" size="sm" {...props} />,
  h6: (props) => <Heading as="h6" size="xs" {...props} />,

  p: (props) => <Text margin=".5rem" {...props} />,

  // TODO Task List
  ol: (props) => {
    return <OrderedList styleType="decimal" {...props} />
  },
  ul: (props) => <UnorderedList styleType="disc" {...props} />,
  li: (props) => <ListItem {...props} />,

  a: (props) => <MDLink {...props} />,

  img: (props) => <Img {...props} />,

  pre: (preProps) => {
    const props = preToCodeBlock(preProps)
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <CodeBlock colorScheme={GRAY} {...props} />
    } else {
      // it's possible to have a pre without a code in it
      return (
        <Box
          as="pre"
          mb="1.45rem"
          backgroundColor="gray.100"
          overflow="auto"
          {...preProps}
        />
      )
    }
  },

  inlineCode: (props) => <Code colorScheme={GRAY} {...props} />,
  code: (props) => <CodeBlock colorScheme={GRAY} {...props} />,

  table: (props) => <MDTable {...props} />,
  thead: (props) => <Thead {...props} />,
  tr: (props) => <Tr {...props} />,
  th: (props) => <Th {...props} />,
  tbody: (props) => <Tbody {...props} />,
  td: (props) => <Td {...props} />,

  blockquote: (props) => <BlockQuote {...props} />,

  hr: () => (
    <Divider orientation="horizontal" variant="solid" margin="1rem 0" />
  ),

  ...shortcodes,
}

// taken from kent c. dodds blog source code
// lifted this from mdx-utils
// it doesn't compile it's code and this busted IE, so I'm just vendoring it.
function preToCodeBlock(preProps) {
  if (
    // children is code element
    preProps.children &&
    // code props
    preProps.children.props &&
    // if children is actually a <code>
    preProps.children.props.mdxType === "code"
  ) {
    // we have a <pre><code> situation
    const {
      children: codeString,
      className = "",
      ...props
    } = preProps.children.props

    const matches = className.match(/language-(?<lang>.*)/)

    return {
      children: codeString.trim(),
      className,
      language:
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : "",
      ...props,
    }
  }
}

export const Provider = ({ children }) => (
  <Box
    margin="0 auto"
    maxWidth="960px"
    padding="1.45rem 1.0875rem 1.45rem"
    flexDirection="column"
    minHeight={{ base: "75.7vh", lg: "76.3vh" }}
    p={{ base: 8, lg: 16 }}
  >
    <MDXProvider components={components}>{children}</MDXProvider>
  </Box>
)
