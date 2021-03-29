import React from "react"
import { Link } from "@chakra-ui/react"

export default props => {
  const { href, ...rest } = props
  // comment out for now
  if (href.includes("village-site") || href[0] === "/") {
    return <Link href={href} {...rest} />
  }
  return (
    <Link
      color="#0366d6"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    />
  )
}
