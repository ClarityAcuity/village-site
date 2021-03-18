import React from "react"
import { Heading } from "@chakra-ui/react"
import Animation from "./animation"
import Layout from "../../components/layout"
import { SizeEnums } from "../../lib/style-utils"

const RayTracingPage = () => {
  return (
    <Layout>
      <Heading as="h4" size={SizeEnums.MIDDLE} isTruncated>
        Ray Tracing in a Weekend
      </Heading>
      <Animation />
    </Layout>
  )
}

export default RayTracingPage
