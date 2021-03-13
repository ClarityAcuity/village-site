import vec3, { cross, unitVector } from "./vec3"
import ray from "./ray"

class Camara {
  constructor(
    lookFrom = vec3(0.0, 0.0, 0.0),
    lookAt = vec3(0.0, 0.0, -1.0),
    vUp = vec3(0.0, 1.0, 0.0),
    vFov = 90,
    aspect = 2
  ) {
    let u, v, w
    const theta = (vFov * Math.PI) / 180
    const halfHeight = Math.tan(theta / 2)
    const halfWidth = aspect * halfHeight
    this.origin = lookFrom
    w = unitVector(lookFrom.subtractVector(lookAt))
    u = unitVector(cross(vUp, w))
    v = cross(w, u)
    // let lowerLeftCorner = vec3(-halfWidth, -halfHeight, -1.0)
    this.lowerLeftCorner = this.origin
      .subtractVector(u.multiplyScalar(halfWidth))
      .subtractVector(v.multiplyScalar(halfHeight))
      .subtractVector(w)
    this.horizontal = u.multiplyScalar(2 * halfWidth)
    this.vertical = v.multiplyScalar(2 * halfHeight)
  }
  getRay(u, v) {
    return ray(
      this.origin,
      this.lowerLeftCorner
        .addVector(this.horizontal.multiplyScalar(u))
        .addVector(this.vertical.multiplyScalar(v))
        .subtractVector(this.origin)
    )
  }
}

export default function(lookFrom, lookAt, vUp, vFov, aspect) {
  return new Camara(lookFrom, lookAt, vUp, vFov, aspect)
}
