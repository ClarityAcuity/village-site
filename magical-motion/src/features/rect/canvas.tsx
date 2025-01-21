import React from "react"
import PureCanvas from "./pure-canvas"

export interface Props {
  angle: number
}

interface Canvas extends Props {
  ctx: CanvasRenderingContext2D
}

class Canvas extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.saveContext = this.saveContext.bind(this)
  }

  saveContext(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  componentDidUpdate() {
    const { angle } = this.props
    const width = this.ctx.canvas.width
    const height = this.ctx.canvas.height
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.clearRect(0, 0, width, height)
    this.ctx.translate(width / 2, height / 2)
    this.ctx.rotate((angle * Math.PI) / 180)
    this.ctx.fillStyle = "#4397AC"
    this.ctx.fillRect(-width / 4, -height / 4, width / 2, height / 2)
    this.ctx.restore()
  }

  render() {
    return <PureCanvas contextRef={this.saveContext}></PureCanvas>
  }
}

export default Canvas
