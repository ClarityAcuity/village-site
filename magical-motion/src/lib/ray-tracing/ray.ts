/**
 * p(t) = ​ A ​ + t* B
 */
import { type IVec3 } from "./vec3"

interface Ray {
  A: IVec3
  B: IVec3
  origin(): IVec3
  direction(): IVec3
  pointAtParameter(t: number): IVec3
}

class Ray {
  constructor(A: IVec3, B: IVec3) {
    this.A = A
    this.B = B
  }
  origin() {
    return this.A
  }
  direction() {
    return this.B
  }
  pointAtParameter(t: number) {
    return this.A.addVector(this.B.multiplyScalar(t))
  }
}

export default function ray(A: IVec3, B: IVec3) {
  return new Ray(A, B)
}

export type IRay = Ray
