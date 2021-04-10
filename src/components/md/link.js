import React from "react"
import { Link as ChakraLink } from "@chakra-ui/react"

const Link = (props) => {
  const { href, ...rest } = props
  // comment out for now
  if (href.includes("village-site") || href[0] === "/") {
    return <ChakraLink href={href} {...rest} />
  }
  return (
    <ChakraLink
      color="#0366d6"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    />
  )
}

export default Link
