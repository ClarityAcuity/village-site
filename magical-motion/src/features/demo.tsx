import { Flex, Link } from "@chakra-ui/react"
import Layout from "../components/layout"

const SecondPage = () => {
  return (
    <Layout>
      <Flex>
        <Link href="/geo">Go to geo page</Link>
      </Flex>
      <Flex>
        <Link href="/rect">Go to rect page</Link>
      </Flex>
      <Flex>
        <Link href="/rect-gl">Go to rect GL page</Link>
      </Flex>
      <Flex>
        <Link href="/ray-tracing">Go to ray tracing page</Link>
      </Flex>
      <Flex>
        <Link href="/weather">Go to weather page</Link>
      </Flex>
    </Layout>
  )
}

export default SecondPage
