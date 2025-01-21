import { Container, Heading, Text } from "@chakra-ui/react"
// import Layout from "../components/layout"
import Image from "../components/Image"
import { siteMetadata } from "../data/siteMetadata"
import { Provider } from "../components/ui/provider"

function IndexPage() {
  const { username } = siteMetadata.siteMetadata
  return (
    <Provider>
      <Container height="calc(100vh - 100px - 10.5em)">
        <Image image={"/bird.jpeg"} alt="" />
        <Heading as="h3">@{username}</Heading>
        <Text>a web developer</Text>
      </Container>
    </Provider>
  )
}

export default IndexPage
