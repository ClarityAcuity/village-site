import { Heading } from "@chakra-ui/react"
import Animation from "./animation"
import { SizeEnums } from "../../lib/style-utils"

const RectGLPage = () => {
  return (
    <>
      <Heading as="h4" size={SizeEnums.MIDDLE} isTruncated>
        3D Rotating Rectangle by WebGL
      </Heading>
      <Animation />
    </>
  )
}

export default RectGLPage
