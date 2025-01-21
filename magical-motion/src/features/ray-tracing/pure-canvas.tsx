import { memo } from "react"

interface PureCanvas {
  width: number
  height: number
  contextRef: (gl: WebGLRenderingContext) => void
}

function PureCanvas({ width, height, contextRef }: PureCanvas) {
  return (
    <canvas
      width={width}
      height={height}
      ref={(node) =>
        node
          ? contextRef(node.getContext("webgl") as WebGLRenderingContext)
          : null
      }
    />
  )
}

function areEqual() {
  return false
}

export default memo(PureCanvas, areEqual)
