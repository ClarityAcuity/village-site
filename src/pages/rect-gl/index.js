import React from "react"
import { Heading } from "@chakra-ui/react"
import Animation from "./animation"
import Layout from "../../components/layout"
import { SizeEnums } from "../../lib/style-utils"

const RectGLPage = () => {
  return (
    <Layout>
      <Heading as="h4" size={SizeEnums.MIDDLE} isTruncated>
        3D Rotating Rectangle by WebGL
      </Heading>
      <Animation />
    </Layout>
  )
}

export default RectGLPage
