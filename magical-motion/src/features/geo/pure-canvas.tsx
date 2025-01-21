import { memo } from "react"

function PureCanvas({ width, height, contextRef }: {
  width: number
  height: number
  contextRef: (canvas: HTMLCanvasElement | null) => void
}) {
  return (
    <canvas
      width={width}
      height={height}
      ref={node => {
        return contextRef(node)
      }}
    />
  )
}

function areEqual() {
  return false
}

export default memo(PureCanvas, areEqual)
