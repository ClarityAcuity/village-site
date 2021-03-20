import React, { Component } from "react"
import { throttle } from "lodash"
import Layout from "../../components/layout"
import Canvas from "./canvas"
import Camera from "./camera"
import { outline, graticule, land110 } from "../../lib/geo/utils"

class GeoPage extends Component {
  constructor() {
    super()
    const scale = 400
    const FPS = 1000 / 60
    this.state = {
      lambda: 0,
      phi: 0,
      gamma: 0,
      rotate: [0, 0, 0],
      scale,
      tilt: 0,
      distance: 2,
    }
    this.width = scale + 100
    this.height = scale + 100
    this._handleChangeCamara = this._handleChangeCamara.bind(this)
    this._updateAnimationState = throttle(this._updateAnimationState, FPS).bind(
      this
    )
  }

  _updateAnimationState() {
    this.rAF = requestAnimationFrame(() => {
      const { lambda, phi, gamma } = this.state
      this.setState({
        rotate: [lambda, phi, gamma],
      })
    })
  }

  _handleChangeCamara(name, value) {
    this.setState({
      [name]: value,
    })
  }

  componentDidMount() {
    this._updateAnimationState()
  }

  componentDidUpdate(_, prevState) {
    const { lambda, phi, gamma } = this.state
    const isRotationChange =
      lambda !== prevState.lambda ||
      phi !== prevState.phi ||
      gamma !== prevState.gamma
    if (isRotationChange) {
      this._updateAnimationState()
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF)
  }

  render() {
    const { lambda, phi, gamma, rotate, distance, tilt, scale } = this.state
    const { width, height, _handleChangeCamara } = this
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
          rotate={rotate}
          camera={camera}
          outline={outline}
          graticule={graticule}
          land={land110}
        />
      </Layout>
    )
  }
}

export default GeoPage
