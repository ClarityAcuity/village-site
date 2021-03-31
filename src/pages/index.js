import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Container, Heading, Text } from "@chakra-ui/react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"

function IndexPage() {
  const {
    site: {
      siteMetadata: { username },
    },
    placeholderImage: {
      childImageSharp: { fluid },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        id
        siteMetadata {
          username
        }
      }
      placeholderImage: file(relativePath: { eq: "bird.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <Container>
        <Image fluid={fluid} alt="" />
        <Heading as="h3">@{username}</Heading>
        <Text>a Taipei-based developer</Text>
      </Container>
    </Layout>
  )
}

export default IndexPage
