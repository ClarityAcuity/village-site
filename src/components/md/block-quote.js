import React from "react"
import { Box } from "@chakra-ui/react"

const BlockQuote = ({ children, ...props }) => (
  <Box
    as="blockquote"
    margin="1rem 0"
    padding="0 1rem"
    borderLeft=".25rem"
    borderStyle="solid"
    borderColor="gray.200"
    {...props}
  >
    {children}
  </Box>
)

export default BlockQuote
