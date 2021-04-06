import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Container, Heading, Text } from "@chakra-ui/react"
import Layout from "../components/layout"
import Image from "../components/image"

function IndexPage() {
  const {
    site: {
      siteMetadata: { username },
    },
    placeholderImage: {
      childImageSharp: { gatsbyImageData },
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
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `)
  return (
    <Layout>
      <Container>
        <Image image={gatsbyImageData} alt="" />
        <Heading as="h3">@{username}</Heading>
        <Text>a Taipei-based developer</Text>
      </Container>
    </Layout>
  )
}

export default IndexPage
