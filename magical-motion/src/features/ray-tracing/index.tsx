import { Heading } from "@chakra-ui/react"
import Animation from "./animation"
import { SizeEnums } from "../../lib/style-utils"

const RayTracingPage = () => {
  return (
    <>
      <Heading as="h4" size={SizeEnums.MIDDLE} isTruncated>
        Ray Tracing in a Weekend
      </Heading>
      <Animation />
    </>
  )
}

export default RayTracingPage
