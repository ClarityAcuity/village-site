import { useRef, useEffect, useCallback } from "react"
import PureCanvas from "./pure-canvas"
import { d3 } from "../../lib/geo/utils"
import { projection, outline, graticule } from "../../lib/geo/utils"
import type { GeoPermissibleObjects } from "d3-geo"

function Canvas({ width, height, rotate, camera, land }: {
  width: number
  height: number
  rotate: number[]
  camera: {
    scale: number
    tilt: number
    distance: number
  }
  outline?: GeoPermissibleObjects
  graticule?: GeoJSON.MultiLineString
  land: any
}) {
  const canvasRef = useRef<HTMLCanvasElement>()
  const _map = useCallback(
    (projection: any, context: CanvasRenderingContext2D) => {
      const path = d3.geoPath(projection, context)

      context.save()
      context.beginPath()
      path(outline as GeoPermissibleObjects)
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
      path(outline as GeoPermissibleObjects)
      context.strokeStyle = "#000"
      context.stroke()
    },
    [width, height, land]
  )
  const _updateCanvas = useCallback(
    () =>
      canvasRef.current && _map(
        projection(width, height, rotate, camera),
        canvasRef.current.getContext("2d") as CanvasRenderingContext2D
      ),
    [width, height, rotate, camera, _map]
  )

  useEffect(() => {
    _updateCanvas()
  }, [_updateCanvas])

  function _saveContext(canvas: HTMLCanvasElement | null) {
    if (canvas) canvasRef.current = canvas
  }

  return <PureCanvas contextRef={_saveContext} width={width} height={height} />
}

export default Canvas
