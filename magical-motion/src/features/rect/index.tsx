import { Heading } from "@chakra-ui/react"
import Animation from "./animation"
import { SizeEnums } from "../../lib/style-utils"

const RectPage = () => {
  return (
    <>
      <Heading as="h4" size={SizeEnums.MIDDLE} isTruncated>
        2D Rotating Rectangle by Canvas
      </Heading>
      <Animation />
    </>
  )
}

export default RectPage
