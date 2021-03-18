import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { Box, List, ListItem, Link, Image } from "@chakra-ui/react"
import CustomHeading from "./custom-heading"
import CodeBlock from "./code-block"

const shortcodes = { Link }

export default props => (
  <MDXProvider components={components}>
    <main {...props}></main>
  </MDXProvider>
)
const components = {
  h1: props => <CustomHeading as="h1" size="2xl" {...props} />,
  h2: props => <CustomHeading as="h2" size="xl" {...props} />,
  h3: props => <CustomHeading as="h3" size="lg" {...props} />,
  h4: props => <CustomHeading as="h4" size="md" {...props} />,
  h5: props => <CustomHeading as="h5" size="sm" {...props} />,
  h6: props => <CustomHeading as="h6" size="xs" {...props} />,

  p: props => <p style={{ fontSize: "18px", lineHeight: 1.6 }} {...props} />,

  ol: props => <List as="ol" styleType="decimal" {...props} />,
  ul: props => <List as="ul" {...props} styleType="disc" />,
  li: props => <ListItem {...props} />,

  a: props => <Link color="#0366d6" {...props} />,

  img: props => <Image {...props} />,

  // ``` ``` => <pre><code></code></pre>, ` ` => <code></code>
  pre: props => (
    <Box as="pre" mb="1.45rem" backgroundColor="gray.100" {...props} />
  ),
  code: props => <CodeBlock colorScheme="gray.100" {...props} />,

  table: props => <Box as="table" {...props} />,
  thead: props => <Box as="thead" {...props} />,
  tr: props => <Box as="tr" {...props} />,
  th: props => <Box as="th" {...props} />,
  tbody: props => <Box as="tbody" {...props} />,
  td: props => <Box as="td" {...props} />,

  blockquote: props => (
    <Box
      as="blockquote"
      p={[0, 4]}
      color="gray.200"
      borderLeft=".25em solid gray.100"
      // css={css`
      //   padding: 0 1em;
      //   color: #6a737d;
      //   border-left: 0.25em solid #dfe2e5;
      // `}
      {...props}
    />
  ),

  ...shortcodes,
}

export const Provider = ({ children }) => (
  <Box
    margin="0 auto"
    maxWidth="960px"
    padding="1.45rem 1.0875rem 1.45rem"
    flexDirection="column"
    minHeight={{base: "75.7vh",lg: "76.3vh"}}
    p={{ base: 8, lg: 16 }}
  >
    <MDXProvider components={components}>{children}</MDXProvider>
  </Box>
)
