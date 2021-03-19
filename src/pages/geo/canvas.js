import React from "react"
import { d3 } from "../../lib/geo/utils"
import { outline, graticule } from "../../lib/geo/utils"

class Canvas extends React.Component {
  constructor() {
    super()

    this.canvas = React.createRef()
    this._map = this._map.bind(this)
    this._updateCanvas = this._updateCanvas.bind(this)
  }

  _map(projection, context) {
    const { width, height, /* outline, graticule,*/ land } = this.props
    const path = d3.geoPath(projection, context)
    console.log("_map", this.props)

    context.save()
    context.beginPath()
    path(outline)
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
    path(outline)
    context.strokeStyle = "#000"
    context.stroke()
  }

  _updateCanvas() {
    const { projection /*outline, graticule, land*/ } = this.props
    const ctx = this.canvas.current.getContext("2d")
    this._map(projection, ctx)
  }

  render() {
    const { width, height } = this.props
    return <canvas ref={this.canvas} width={width} height={height} />
  }
  componentDidMount() {
    this._updateCanvas()
  }
  componentDidUpdate() {
    this._updateCanvas()
  }
}

export default Canvas
