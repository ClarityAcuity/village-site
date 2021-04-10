import { dot } from "./vec3"
import Hitable from "./hitable"

function recordHit(sphere, ray, t, record) {
  const { center, radius, material } = sphere
  const p = ray.pointAtParameter(t)
  record.t = t
  record.p = p
  record.normal = p.subtractVector(center).divideScaler(radius)
  record.material = material
}

class Sphere extends Hitable {
  constructor(c, r, material) {
    super()
    this.center = c
    this.radius = r
    this.material = material
  }
  hit(ray, tMin, tMax, hitRecord) {
    const oc = ray.origin().subtractVector(this.center)
    const a = dot(ray.direction(), ray.direction())
    const b = dot(oc, ray.direction())
    const c = dot(oc, oc) - this.radius * this.radius
    const discriminant = b * b - a * c
    if (discriminant > 0) {
      const t1 = (-b - Math.sqrt(discriminant)) / a
      if (t1 < tMax && t1 > tMin) {
        recordHit(this, ray, t1, hitRecord)
        return true
      }
      const t2 = (-b + Math.sqrt(discriminant)) / a
      if (t2 < tMax && t2 > tMin) {
        recordHit(this, ray, t2, hitRecord)
        return true
      }
    }
    return false
  }
}

export default function sphere(center, radius, material) {
  return new Sphere(center, radius, material)
}
