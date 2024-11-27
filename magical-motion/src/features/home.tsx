import { Container, Heading, Text } from "@chakra-ui/react"
// import Layout from "../components/layout"
import Image from "../components/Image"
import { siteMetadata } from "../data/siteMetadata"

function IndexPage() {
  const { username } = siteMetadata.siteMetadata
  return (
    <>
      <Container>
        <Image image={"/bird.jpeg"} alt="" />
        <Heading as="h3">@{username}</Heading>
        <Text>a web developer</Text>
      </Container>
    </>
  )
}

export default IndexPage
