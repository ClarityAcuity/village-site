import vec3, { type IVec3, dot, unitVector, reflect, refract } from "./vec3"
import ray, { type IRay } from "./ray"
import type { IHitRecord } from "./hitable"
import { randomInUnitSphere } from "./helpers"

interface Material {
  scatter(rayIn: IRay, hitRecord: IHitRecord): {
    isScatter?: boolean
    scattered?: IRay
    attenuation?: IVec3
  }
}

class Material { }

export type IMaterial = Material

interface Lambertian extends Material {
  albedo: IVec3
}

class Lambertian extends Material {
  constructor(a: IVec3) {
    super()
    this.albedo = a
  }
  scatter(rayIn: IRay, hitRecord: IHitRecord) {
    const { p, normal } = hitRecord
    const target = p.addVector(normal).addVector(randomInUnitSphere())
    const scattered = ray(p, target.subtractVector(p))
    const attenuation = this.albedo
    return {
      isScatter: true,
      scattered,
      attenuation,
    }
  }
}

interface Metal extends Material {
  albedo: IVec3
  fuzz: number
}

class Metal extends Material {
  constructor(a: IVec3, f: number) {
    super()
    this.albedo = a
    this.fuzz = f < 1 ? f : 1
  }
  scatter(rayIn: IRay, hitRecord: IHitRecord) {
    const { p, normal } = hitRecord
    const reflected = reflect(unitVector(rayIn.direction()), normal)
    const scattered = ray(
      p,
      reflected.addVector(randomInUnitSphere().multiplyScalar(this.fuzz))
    )
    const attenuation = this.albedo
    return {
      isScatter: dot(scattered.direction(), normal) > 0,
      scattered,
      attenuation,
    }
  }
}

interface Dielectric extends Material {
  refIndex: number
}

class Dielectric extends Material {
  constructor(ri: number = 1.0) {
    super()
    this.refIndex = ri
  }
  scatter(rayIn: IRay, hitRecord: IHitRecord) {
    const { p, normal } = hitRecord
    let outwardNormal
    const reflected = reflect(unitVector(rayIn.direction()), normal)
    let niOverNt
    const attenuation = vec3(1.0, 1.0, 1.0)
    let scattered
    let reflectProb
    let cosine
    if (dot(rayIn.direction(), normal) > 0) {
      outwardNormal = normal.opposite()
      niOverNt = this.refIndex
      cosine =
        (this.refIndex * dot(rayIn.direction(), normal)) /
        rayIn.direction().length()
    } else {
      outwardNormal = normal
      niOverNt = 1.0 / this.refIndex
      cosine = -dot(rayIn.direction(), normal) / rayIn.direction().length()
    }
    const { isRefracted, refracted } = refract(
      rayIn.direction(),
      outwardNormal,
      niOverNt
    )
    if (isRefracted) {
      reflectProb = schlick(cosine, this.refIndex)
    } else {
      scattered = ray(p, reflected)
      reflectProb = 1.0
    }
    if (Math.random() < reflectProb) {
      scattered = ray(p, reflected)
    } else {
      scattered = ray(p, refracted)
    }
    return {
      isScatter: true,
      scattered,
      attenuation,
    }
  }
}

function schlick(cosine: number, refIndex: number) {
  let r0 = (1 - refIndex) / (1 + refIndex)
  r0 = r0 * r0
  return r0 + (1 - r0) * Math.pow(1 - cosine, 5)
}

export const lambertian = (a: IVec3) => new Lambertian(a)
export const metal = (a: IVec3, f: number) => new Metal(a, f)
export const dielectric = (ri: number) => new Dielectric(ri)
