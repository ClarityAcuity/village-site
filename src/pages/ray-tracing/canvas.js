import React, { useEffect, useRef } from "react"
import PureCanvas from "./pure-canvas"
import render from "../../lib/ray-tracing/render"

function Canvas({ width, height, image }) {
  const glRef = useRef()

  useEffect(() => {
    if (glRef.current) {
      render(glRef.current, image)
    }
  }, [glRef.current, image])

  function _saveContext(gl) {
    glRef.current = gl
  }

  return <PureCanvas contextRef={_saveContext} width={width} height={height} />
}

export default Canvas
