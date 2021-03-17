import React, { memo } from "react"

function PureCanvas({ width, height, contextRef }) {
  return (
    <canvas
      width={width}
      height={height}
      ref={node => (node ? contextRef(node.getContext("webgl")) : null)}
    />
  )
}

function areEqual() {
  return false
}

export default memo(PureCanvas, areEqual)
