import React, { Component } from "react"
import Layout from "../../components/layout"
import Canvas from "./canvas"
import Camera from "./camera"
import { projection, outline, graticule, land110 } from "../../lib/geo/utils"

class GeoPage extends Component {
  constructor() {
    super()
    this.state = {
      lambda: 0,
      phi: 0,
      gamma: 0,
      rotate: [0, 0, 0],
      scale: 500,
      tilt: 0,
      distance: 2,
    }
    this._handleChangeCamara = this._handleChangeCamara.bind(this)
    this._update = this._update.bind(this)
  }
  _handleChangeCamara(name, value) {
    this.setState({
      [name]: value,
    })
  }
  _update() {
    const { lambda, phi, gamma } = this.state
    this.setState({
      rotate: [lambda, phi, gamma],
    })
  }
  render() {
    const { lambda, phi, gamma, rotate, distance, tilt, scale } = this.state
    const { _handleChangeCamara } = this
    const width = 954
    const height = width
    const camera = {
      scale,
      tilt,
      distance,
    }
    return (
      <Layout>
        <Camera
          lambda={lambda}
          phi={phi}
          gamma={gamma}
          width={width}
          distance={distance}
          tilt={tilt}
          scale={scale}
          onChange={_handleChangeCamara}
        />
        <Canvas
          width={width}
          height={height}
          projection={projection(width, height, rotate, camera)}
          outline={outline}
          graticule={graticule}
          land={land110}
        />
      </Layout>
    )
  }
  componentDidUpdate(_, prevState) {
    const { lambda, phi, gamma } = this.state
    const { _update } = this
    const isRotationChange =
      lambda !== prevState.lambda ||
      phi !== prevState.phi ||
      gamma !== prevState.gamma
    if (isRotationChange) {
      _update()
    }
  }
}

export default GeoPage
