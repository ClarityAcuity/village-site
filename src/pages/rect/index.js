import React from "react"
import { Heading } from "@chakra-ui/react"
import Animation from "./animation"
import Layout from "../../components/layout"
import { SizeEnums } from "../../lib/style-utils"

const RectPage = () => {
  return (
    <Layout>
      <Heading as="h4" size={SizeEnums.MIDDLE} isTruncated>
        2D Rotating Rectangle by Canvas
      </Heading>
      <Animation />
    </Layout>
  )
}

export default RectPage
