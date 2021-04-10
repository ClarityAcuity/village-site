/**
 * v(e) = e
 */
class Vec3 {
  constructor(e0, e1, e2) {
    this.e = [e0, e1, e2]
  }
  // vec3() {
  //   e[0] = e0;
  //   e[1] = e1;
  //   e[2] = e2;
  // }
  x() {
    return this.e[0]
  }
  y() {
    return this.e[1]
  }
  z() {
    return this.e[2]
  }
  r() {
    return this.e[0]
  }
  g() {
    return this.e[1]
  }
  b() {
    return this.e[2]
  }

  identical() {
    return new Vec3(this.e[0], this.e[1], this.e[2])
  }
  opposite() {
    return new Vec3(-this.e[0], -this.e[1], -this.e[2])
  }
  // operator[](i){
  //   return this.e[i]
  // }
  // operator[](i){
  //   return this.e[i]
  // }

  addVector(v) {
    const identical = this.identical()
    identical.e[0] += v.e[0]
    identical.e[1] += v.e[1]
    identical.e[2] += v.e[2]
    return identical
  }
  subtractVector(v) {
    const identical = this.identical()
    identical.e[0] -= v.e[0]
    identical.e[1] -= v.e[1]
    identical.e[2] -= v.e[2]
    return identical
  }
  multiplyVector(v) {
    const identical = this.identical()
    identical.e[0] *= v.e[0]
    identical.e[1] *= v.e[1]
    identical.e[2] *= v.e[2]
    return identical
  }
  // divideVector(v) {}

  multiplyScalar(t) {
    const identical = this.identical()
    identical.e[0] *= t
    identical.e[1] *= t
    identical.e[2] *= t
    return identical
  }
  divideScaler(t) {
    const identical = this.identical()
    const k = 1 / t
    identical.e[0] *= k
    identical.e[1] *= k
    identical.e[2] *= k
    return identical
  }

  length() {
    return Math.sqrt(
      this.e[0] * this.e[0] + this.e[1] * this.e[1] + this.e[2] * this.e[2]
    )
  }
  squaredLength() {
    return this.e[0] * this.e[0] + this.e[1] * this.e[1] + this.e[2] * this.e[2]
  }
  makeUnitVector() {
    const k =
      1 /
      Math.sqrt(
        this.e[0] * this.e[0] + this.e[1] * this.e[1] + this.e[2] * this.e[2]
      )
    const identical = this.identical()
    identical.e[0] *= k
    identical.e[1] *= k
    identical.e[2] *= k
    return identical
  }
}

// operator>>(is, vec3){
//   console.log(this.e[0],this.e[1],this.e[2])
//   return is
// }
// operator<<(os, vec3){
//   console.log(this.e[0],this.e[1],this.e[2])
//   return os
// }

export function dot(v1, v2) {
  return v1.e[0] * v2.e[0] + v1.e[1] * v2.e[1] + v1.e[2] * v2.e[2]
}

export function cross(v1, v2) {
  return new Vec3(
    v1.e[1] * v2.e[2] - v1.e[2] * v2.e[1],
    -(v1.e[0] * v2.e[2] - v1.e[2] * v2.e[0]),
    v1.e[0] * v2.e[1] - v1.e[1] * v2.e[0]
  )
}

export function unitVector(v) {
  return v.identical().divideScaler(v.length())
}

export function reflect(v, n) {
  return v.subtractVector(n.multiplyScalar(2 * dot(v, n)))
}

export function refract(v, n, niOverNt) {
  const uv = unitVector(v)
  const dt = dot(uv, n)
  const discriminant = 1.0 - niOverNt * niOverNt * (1 - dt * dt)
  let refracted
  if (discriminant > 0) {
    refracted = uv
      .subtractVector(n.multiplyScalar(dt))
      .multiplyScalar(niOverNt)
      .subtractVector(n.multiplyScalar(Math.sqrt(discriminant)))
  }
  return {
    isRefracted: discriminant > 0,
    refracted,
  }
}

export default function vec3(x, y, z) {
  return new Vec3(x, y, z)
}
