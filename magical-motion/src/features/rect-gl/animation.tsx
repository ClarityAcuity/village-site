import React from "react"
import Canvas, { type Props } from "./canvas"

interface Animation {
  state: Props
  cubeRotation: number
  rAF: number
}

class Animation extends React.Component {
  constructor(props: Props) {
    super(props)
    this.state = { cubeRotation: 0 }
    this.updateAnimationState = this.updateAnimationState.bind(this)
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState)
  }

  updateAnimationState() {
    this.setState((prevState: Props) => ({
      cubeRotation: prevState.cubeRotation + 0.01,
    }))
    this.rAF = requestAnimationFrame(this.updateAnimationState)
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF)
  }

  render() {
    return <Canvas cubeRotation={this.state.cubeRotation} />
  }
}

export default Animation
