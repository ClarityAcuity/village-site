import { Flex, Link } from "@chakra-ui/react"
import Layout from "../components/layout"
import { Provider } from "../components/ui/provider"

const SecondPage = () => {
  return (
    <Provider>
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
        {/* <Flex>
        <Link href="/weather">Go to weather page</Link>
      </Flex> */}
      </Layout>
    </Provider>
  )
}

export default SecondPage
