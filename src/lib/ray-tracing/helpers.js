import vec3, { unitVector, dot, cross } from "./vec3"
import sphere from "./sphere"
import hitableList from "./hitable-list"
import camara from "./camera"
import { lambertian, metal, dielectric } from "./material"

export function setRectangle(x, y, width, height) {
  const x1 = x
  const x2 = x + width
  const y1 = y
  const y2 = y + height
  return [x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]
}

function hitSphere(center, radius, ray) {
  const oc = ray.origin().subtractVector(center)
  const a = dot(ray.direction(), ray.direction())
  const b = 2.0 * dot(oc, ray.direction())
  const c = dot(oc, oc) - radius * radius
  const discriminant = b * b - 4 * a * c
  if (discriminant < 0) {
    return -1.0
  } else {
    return (-b - Math.sqrt(discriminant)) / (2.0 * a)
  }
}

export function randomInUnitSphere() {
  let p = vec3()
  do {
    p = vec3(Math.random(), Math.random(), Math.random()).subtractVector(
      vec3(1, 1, 1)
    )
  } while (p.squaredLength() >= 1.0)
  return p
}

function color(r, world, depth) {
  const { hitAnything, closestSoFar, hitRecord } = world.hit(
    r,
    0.0,
    Infinity,
    {}
  )
  if (hitAnything) {
    const { material } = hitRecord
    const { isScatter, scattered, attenuation } = material.scatter(r, hitRecord)
    if (depth < 50 && isScatter) {
      return attenuation.multiplyVector(color(scattered, world, depth + 1))
    } else {
      return vec3(0, 0, 0)
    }
  } else {
    const unitDirection = unitVector(r.direction())
    const t = 0.5 * (unitDirection.y() + 1.0)
    return vec3(1.0, 1.0, 1.0)
      .multiplyScalar(1.0 - t)
      .addVector(vec3(0.5, 0.7, 1.0).multiplyScalar(t))
  }
}

export function getImage(width, height, ns = 100) {
  const image = []
  const list1 = sphere(vec3(0, 0, -1), 0.5, lambertian(vec3(0.1, 0.2, 0.5)))
  const list2 = sphere(
    vec3(0, -100.5, -1),
    100,
    lambertian(vec3(0.8, 0.8, 0.0))
  )
  const list3 = sphere(vec3(1, 0, -1), 0.5, metal(vec3(0.8, 0.6, 0.2), 1.0))
  const list4 = sphere(vec3(-1, 0, -1), 0.5, dielectric(1.5))
  const list5 = sphere(vec3(-1, 0, -1), -0.45, dielectric(1.5))
  const hitable = [list1, list2, list3, list4, list5]
  const world = hitableList(hitable, hitable.length)
  const eye = camara(
    vec3(-2, 2, 1),
    vec3(0, 0, -1),
    vec3(0, 1, 0),
    20,
    width / height
  )
  for (let j = height - 1; j >= 0; j--) {
    for (let i = 0; i < width; i++) {
      let col = vec3(0, 0, 0)
      for (let s = 0; s < ns; s++) {
        const u = (i + Math.random()) / width
        const v = (j + Math.random()) / height
        const r = eye.getRay(u, v)
        // const p = r.pointAtParameter(2.0)
        col = col.addVector(color(r, world, 0))
      }
      col = col.divideScaler(ns)
      const ir = 255.99 * Math.sqrt(col.e[0])
      const ig = 255.99 * Math.sqrt(col.e[1])
      const ib = 255.99 * Math.sqrt(col.e[2])
      image.push(ir)
      image.push(ig)
      image.push(ib)
      image.push(255)
    }
  }
  return image
}
