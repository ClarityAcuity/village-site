import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { StaticQuery, graphql } from "gatsby"
import SEO from "../seo"

export default function MyPageLayout() {
  return (
    <StaticQuery
      query={graphql`
        query MDXQuery($id: String!) {
          site {
            siteMetadata {
              title
              author
            }
          }
          mdx(id: { eq: $id }) {
            id
            body
            slug
            timeToRead
            excerpt(pruneLength: 160)
            frontmatter {
              title
              date
              author
              image: featured {
                childImageSharp {
                  resize(width: 1200) {
                    src
                    height
                    width
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const post = props.data
        const image = post.frontmatter.image
          ? post.frontmatter.image.childImageSharp.resize
          : null
        return (
          <MDXRenderer>
            <SEO
              title={post.frontmatter.title}
              description={post.frontmatter.description || post.excerpt}
              image={image}
              pathname={this.props.location.pathname}
            />
            {data.mdx.body}
          </MDXRenderer>
        )
      }}
    />
  )
}
