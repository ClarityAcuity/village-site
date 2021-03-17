import React, { useEffect, useState, useRef } from "react"
import Canvas from "./canvas"
import { initImage, getImage } from "../../lib/ray-tracing/helpers"

const width = 400
const height = 200
const { image: defaultImage, colorMap: defaultColorMap, scene } = initImage(
  width,
  height
)

function Animation() {
  const rAF = useRef()
  const [image, setImage] = useState(defaultImage)
  const [colorMap, setColorMap] = useState(defaultColorMap)
  const [iteration, setIteration] = useState(1)

  useEffect(() => {
    rAF.current = requestAnimationFrame(updateAnimationState)
    return cancelAnimationFrame(rAF.current - 1)
  }, [iteration])

  function updateAnimationState() {
    const {
      value: { image: nextImage, colorMap: nextColorMap },
    } = getImage({ scene, width, height, colorMap, iteration }).next()

    setImage(nextImage)
    setColorMap(nextColorMap)
    setIteration(iteration + 1)
  }

  return (
    <div>
      {iteration} iteration
      <Canvas image={image} width={width} height={height} />
    </div>
  )
}

export default Animation
