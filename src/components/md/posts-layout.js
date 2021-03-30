import React from "react"
import { Link, graphql } from "gatsby"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { Flex, Text } from "@chakra-ui/react"
import Header from "../header"
import Footer from "../footer"
import SEO from "../seo"
import { Provider } from "./provider"
import Renderer from "./renderer"

export default function PostsLayout({ data }) {
  const post = data.mdx
  const image = post.frontmatter.image
    ? post.frontmatter.image.childImageSharp.resize
    : null
  return (
    <>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={image}
        pathname={post.slug}
        keywords={post.keywords}
      />
      <Header siteTitle="Village" />
      <Provider>
        <Renderer>{post.body}</Renderer>
        <Link to="/blog">
          <Flex alignItems="center">
            <ArrowBackIcon boxSize="1.5rem" />
            <Text fontSize="1.5rem">Back to posts</Text>
          </Flex>
        </Link>
      </Provider>
      <Footer />
    </>
  )
}

export const query = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        date
        author
        keywords
      }
      slug
      excerpt
    }
  }
`
