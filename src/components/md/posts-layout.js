import React from "react"
import { graphql } from "gatsby"
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
