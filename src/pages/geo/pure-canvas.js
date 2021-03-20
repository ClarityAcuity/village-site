import React, { memo } from "react"

function PureCanvas({ width, height, contextRef }) {
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
