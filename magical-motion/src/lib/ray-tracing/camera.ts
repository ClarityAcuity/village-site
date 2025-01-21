import vec3, { type IVec3, cross, dot, unitVector } from "./vec3"
import ray, { type IRay } from "./ray"

interface Camara {
  origin: IVec3
  lowerLeftCorner: IVec3
  horizontal: IVec3
  vertical: IVec3
  u: IVec3
  v: IVec3
  lensRadius: number
  getRay(s: number, t: number): IRay
}

class Camara {
  constructor({
    lookFrom = vec3(0.0, 0.0, 0.0),
    lookAt = vec3(0.0, 0.0, -1.0),
    vUp = vec3(0.0, 1.0, 0.0),
    vFov = 20,
    aspect = 2,
    aperture = 0,
    focusDist = 1,
  }) {
    this.lensRadius = aperture / 2
    const theta = (vFov * Math.PI) / 180
    const halfHeight = Math.tan(theta / 2)
    const halfWidth = aspect * halfHeight
    this.origin = lookFrom
    const w = unitVector(lookFrom.subtractVector(lookAt))
    this.u = unitVector(cross(vUp, w))
    this.v = cross(w, this.u)
    // let lowerLeftCorner = vec3(-halfWidth, -halfHeight, -1.0)
    this.lowerLeftCorner = this.origin
      .subtractVector(this.u.multiplyScalar(halfWidth * focusDist))
      .subtractVector(this.v.multiplyScalar(halfHeight * focusDist))
      .subtractVector(w.multiplyScalar(focusDist))
    this.horizontal = this.u.multiplyScalar(2 * halfWidth * focusDist)
    this.vertical = this.v.multiplyScalar(2 * halfHeight * focusDist)
  }
  getRay(s: number, t: number) {
    const rd = randomInUnitDisk().multiplyScalar(this.lensRadius)
    const offset = this.u
      .multiplyScalar(rd.x())
      .addVector(this.v.multiplyScalar(rd.y()))
    return ray(
      this.origin.addVector(offset),
      this.lowerLeftCorner
        .addVector(this.horizontal.multiplyScalar(s))
        .addVector(this.vertical.multiplyScalar(t))
        .subtractVector(this.origin)
        .subtractVector(offset)
    )
  }
}

function randomInUnitDisk() {
  let p
  do {
    p = vec3(Math.random(), Math.random(), 0)
      .multiplyScalar(2)
      .subtractVector(vec3(1, 1, 0))
  } while (dot(p, p) >= 1.0)
  return p
}

export default function camara({
  lookFrom,
  lookAt,
  vUp,
  vFov,
  aspect,
  aperture,
  focusDist,
}: {
  lookFrom: IVec3
  lookAt: IVec3
  vUp: IVec3
  vFov: number
  aspect: number
  aperture: number
  focusDist: number
}) {
  return new Camara({
    lookFrom,
    lookAt,
    vUp,
    vFov,
    aspect,
    aperture,
    focusDist,
  })
}
