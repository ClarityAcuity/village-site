import React, { useRef, useEffect, useCallback } from "react"
import PureCanvas from "./pure-canvas"
import { d3 } from "../../lib/geo/utils"
import { projection, outline, graticule } from "../../lib/geo/utils"

function Canvas({ width, height, rotate, camera, land }) {
  const canvasRef = useRef()
  const _map = useCallback(
    (projection, context) => {
      const path = d3.geoPath(projection, context)

      context.save()
      context.beginPath()
      path(outline)
      context.clip()
      context.fillStyle = "#fff"
      context.fillRect(0, 0, width, height)
      context.beginPath()
      path(graticule)
      context.strokeStyle = "#ccc"
      context.stroke()
      context.beginPath()
      path(land)
      context.fillStyle = "#000"
      context.fill()
      context.restore()
      context.beginPath()
      path(outline)
      context.strokeStyle = "#000"
      context.stroke()
    },
    [width, height, land]
  )
  const _updateCanvas = useCallback(
    () =>
      _map(
        projection(width, height, rotate, camera),
        canvasRef.current.getContext("2d")
      ),
    [width, height, rotate, camera, _map]
  )

  useEffect(() => {
    _updateCanvas()
  }, [_updateCanvas])

  function _saveContext(canvas) {
    canvasRef.current = canvas
  }

  return <PureCanvas contextRef={_saveContext} width={width} height={height} />
}

export default Canvas
