import React from "react"
import Canvas, { type Props } from "./canvas"

interface Animation {
  state: Props
  angle: number;
  rAF: number;
}

class Animation extends React.Component {
  constructor(props: object) {
    super(props)
    this.state = { angle: 0 }
    this.updateAnimationState = this.updateAnimationState.bind(this)
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState)
  }

  updateAnimationState() {
    this.setState((prevState: Props) => ({ angle: prevState.angle + 1 }))
    this.rAF = requestAnimationFrame(this.updateAnimationState)
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF)
  }

  render() {
    return <Canvas angle={this.state.angle} />
  }
}

export default Animation
