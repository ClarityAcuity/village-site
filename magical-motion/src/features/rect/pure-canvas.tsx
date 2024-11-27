import React from "react"

interface Props {
  contextRef: (context: CanvasRenderingContext2D) => void
}

class PureCanvas extends React.Component<Props> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <canvas
        width="300"
        height="300"
        ref={node =>
          node !== null ? this.props.contextRef(node.getContext("2d") as CanvasRenderingContext2D) : null
        }
      />
    )
  }
}

export default PureCanvas
