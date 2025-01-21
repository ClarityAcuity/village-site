import { useEffect, useState, useRef, useMemo, useCallback } from "react"
import { Box } from "@chakra-ui/react"
import Canvas from "./canvas"
import { initImage, getImage } from "../../lib/ray-tracing/helpers"
import { useClickOutside } from "../../lib/hooks/use-click-outside"
import type { IVec3 } from "../../lib/ray-tracing/vec3"

function Animation() {
  const width = 400
  const height = 200
  const rAF = useRef<number>()
  const clickRef = useRef<HTMLDivElement>(null)
  const {
    image: defaultImage,
    colorMap: defaultColorMap,
    scene,
  } = useMemo(() => initImage(width, height), [])
  const [image, setImage] = useState(defaultImage)
  const [colorMap, setColorMap] = useState(defaultColorMap)
  const [iteration, setIteration] = useState(1)
  const [isFocus, setIsFocus] = useState(true)
  const _updateAnimationState = useCallback(() => {
    const {
      value: { image: nextImage, colorMap: nextColorMap },
    } = getImage({
      scene,
      width,
      height,
      colorMap,
      iteration,
    }).next() as IteratorResult<{
      image: number[]
      colorMap: IVec3[][]
    }>
    setImage(nextImage)
    setColorMap(nextColorMap)
    setIteration(iteration + 1)
  }, [scene, colorMap, iteration])

  useClickOutside(clickRef, () => {
    setIsFocus(false)
    cancelAnimation()
  })

  useEffect(() => {
    return () => cancelAnimation()
  }, [])

  useEffect(() => {
    if (isFocus) {
      rAF.current = requestAnimationFrame(_updateAnimationState)
    }
  }, [iteration, isFocus, _updateAnimationState])

  function cancelAnimation() {
    if (rAF.current) cancelAnimationFrame(rAF.current)
  }

  return (
    <Box ref={clickRef} onClick={() => setIsFocus(true)}>
      {`${iteration} iteration, ${
        isFocus ? "playing..." : "pausing, click image to resume"
      }`}
      <Canvas image={image} width={width} height={height} />
    </Box>
  )
}

export default Animation
