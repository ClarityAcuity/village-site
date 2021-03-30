import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Container, Image, Heading, Text } from "@chakra-ui/react"
import Layout from "../components/layout"
import SEO from "../components/seo"

function IndexPage() {
  const {
    site: {
      siteMetadata: { username, url, image },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        id
        siteMetadata {
          username
          url
          image
        }
      }
    }
  `)
  return (
    <Layout m="5">
      <SEO title="Village Build By Gatsby" />
      <Container>
        <Image src={`${url}${image}`} />
        <Heading as="h3">@{username}</Heading>
        <Text>a Taipei-based developer</Text>
      </Container>
    </Layout>
  )
}

export default IndexPage
