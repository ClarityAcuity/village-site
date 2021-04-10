/**
 * p(t) = ​ A ​ + t* B
 */
class Ray {
  constructor(A, B) {
    this.A = A
    this.B = B
  }
  origin() {
    return this.A
  }
  direction() {
    return this.B
  }
  pointAtParameter(t) {
    return this.A.addVector(this.B.multiplyScalar(t))
  }
}

export default function ray(A, B) {
  return new Ray(A, B)
}
