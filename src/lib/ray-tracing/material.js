import vec3, { dot, unitVector, reflect, refract } from "./vec3"
import ray from "./ray"
import { randomInUnitSphere } from "./helpers"

class Material {}

class Lambertian extends Material {
  constructor(a) {
    super()
    this.albedo = a
  }
  scatter(rayIn, hitRecord) {
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

class Metal extends Material {
  constructor(a, f) {
    super()
    this.albedo = a
    this.fuzz = f < 1 ? f : 1
  }
  scatter(rayIn, hitRecord) {
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

class Dielectric extends Material {
  constructor(ri) {
    super()
    this.refIndex = ri
  }
  scatter(rayIn, hitRecord) {
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
      isScatter: isRefracted,
      scattered,
      attenuation,
    }
  }
}

function schlick(cosine, refIndex) {
  let r0 = (1 - refIndex) / (1 + refIndex)
  r0 = r0 * r0
  return r0 + (1 - r0) * Math.pow(1 - cosine, 5)
}

export const lambertian = a => new Lambertian(a)
export const metal = (a, f) => new Metal(a, f)
export const dielectric = ri => new Dielectric(ri)
