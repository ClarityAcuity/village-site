import { useEffect, useRef } from "react"
import PureCanvas from "./pure-canvas"
import render from "../../lib/ray-tracing/render"

function Canvas({
  width,
  height,
  image,
}: {
  width: number
  height: number
  image: Iterable<number>
}) {
  const glRef = useRef<WebGLRenderingContext>()

  useEffect(() => {
    if (glRef.current) {
      render(glRef.current, image)
    }
  }, [image])

  function _saveContext(gl: WebGLRenderingContext) {
    if (gl) glRef.current = gl
  }

  return <PureCanvas contextRef={_saveContext} width={width} height={height} />
}

export default Canvas
