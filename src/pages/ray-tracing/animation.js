import React, { useEffect, useState, useRef, useMemo, useCallback } from "react"
import { Box } from "@chakra-ui/react"
import Canvas from "./canvas"
import { initImage, getImage } from "../../lib/ray-tracing/helpers"
import { useClickOutside } from "../../lib/hooks/use-click-outside"

function Animation() {
  const width = 400
  const height = 200
  const rAF = useRef()
  const clickRef = useRef()
  const { image: defaultImage, colorMap: defaultColorMap, scene } = useMemo(
    () => initImage(width, height),
    []
  )
  const [image, setImage] = useState(defaultImage)
  const [colorMap, setColorMap] = useState(defaultColorMap)
  const [iteration, setIteration] = useState(1)
  const [isFocus, setIsFocus] = useState(false)
  const _updateAnimationState = useCallback(() => {
    const {
      value: { image: nextImage, colorMap: nextColorMap },
    } = getImage({ scene, width, height, colorMap, iteration }).next()

    setImage(nextImage)
    setColorMap(nextColorMap)
    setIteration(iteration + 1)
  }, [scene, colorMap, iteration])

  useClickOutside(clickRef, () => setIsFocus(false))

  useEffect(() => {
    return cancelAnimationFrame(rAF.current)
  }, [])

  useEffect(() => {
    if (isFocus) {
      rAF.current = requestAnimationFrame(_updateAnimationState)
    }
  }, [iteration, isFocus, _updateAnimationState])

  return (
    <Box ref={clickRef} onClick={() => setIsFocus(true)}>
      {iteration} iteration
      <Canvas image={image} width={width} height={height} />
    </Box>
  )
}

export default Animation
