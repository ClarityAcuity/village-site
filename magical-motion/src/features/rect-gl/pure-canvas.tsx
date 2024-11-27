import React from "react"

interface Props {
  width: number
  height: number
  contextRef: (context: WebGLRenderingContext) => void
}

class PureCanvas extends React.Component<Props> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const { width, height } = this.props
    return (
      <canvas
        width={width}
        height={height}
        ref={node => {
          return node ? this.props.contextRef(node.getContext("webgl") as WebGLRenderingContext) : null
        }}
      />
    )
  }
}

export default PureCanvas
