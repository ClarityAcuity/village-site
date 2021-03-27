import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default function Renderer({ children }) {
  return <MDXRenderer>{children}</MDXRenderer>
}
