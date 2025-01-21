/*
const hitRecord = {
  t,
  p,
  normal,
  material,
};
*/
import { type IRay } from "./ray"
import { type IVec3 } from "./vec3"
import { type IMaterial } from "./material"

interface HitRecord {
  t: number
  p: IVec3
  normal: IVec3
  material: IMaterial
}

interface Hitable {
  hit(ray: IRay, tMin: number, tMax: number, hitRecord: IHitRecord): any
}

class Hitable {
  hit(ray: IRay, tMin: number, tMax: number, hitRecord: IHitRecord) {}
}

export default Hitable
export type IHitRecord = HitRecord
export type IHitable = Hitable
