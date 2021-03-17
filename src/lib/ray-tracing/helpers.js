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

export function initImage(width, height) {
  const scene = randomScene()
  let image = []
  let colorMap = []
  for (let j = height - 1; j >= 0; j--) {
    let arr = []
    for (let i = 0; i < width; i++) {
      image.push(-1)
      image.push(-1)
      image.push(-1)
      image.push(255)
      arr.push(vec3(0, 0, 0))
    }
    colorMap.push(arr)
  }
  return { image, colorMap, scene }
}

export function* getImage({ scene, width, height, colorMap, iteration }) {
  const lookFrom = vec3(12, 2, 4)
  const lookAt = vec3(0, 0, 0)
  const focusDist = lookFrom.subtractVector(lookAt).length()
  const aperture = 0.1
  const eye = camara({
    lookFrom,
    lookAt,
    vUp: vec3(0, 1, 0),
    vFov: 20,
    aspect: width / height,
    aperture,
    focusDist,
  })
  function next() {
    const image = []
    for (let j = height - 1; j >= 0; j--) {
      for (let i = 0; i < width; i++) {
        const u = (i + Math.random()) / width
        const v = (j + Math.random()) / height
        const r = eye.getRay(u, v)
        colorMap[j][i] = colorMap[j][i]
          .identical()
          .addVector(color(r, scene, 0))
        const avgCol = colorMap[j][i].divideScaler(iteration)
        const ir = 255.99 * Math.sqrt(avgCol.e[0])
        const ig = 255.99 * Math.sqrt(avgCol.e[1])
        const ib = 255.99 * Math.sqrt(avgCol.e[2])
        image.push(ir)
        image.push(ig)
        image.push(ib)
        image.push(255)
      }
    }
    return { image, colorMap }
  }

  yield next()
}

function randomScene() {
  const list = []
  list.push(sphere(vec3(0, -1000, 0), 1000, lambertian(vec3(0.5, 0.5, 0.5))))
  let i = 1
  for (let a = -9; a < 9; a += 3) {
    for (let b = -9; b < 9; b += 3) {
      const chooseMat = Math.random()
      const center = vec3(a + 2 * Math.random(), 0.3, b + 2 * Math.random())
      if (center.subtractVector(vec3(4, 0.2, 0)).length() > 0.9) {
        if (chooseMat < 0.8) {
          // diffuse
          list.push(
            sphere(
              center,
              0.3,
              lambertian(
                vec3(
                  Math.random() * Math.random(),
                  Math.random() * Math.random(),
                  Math.random() * Math.random()
                )
              )
            )
          )
        } else if (chooseMat < 0.95) {
          // metal
          list.push(
            sphere(
              center,
              0.3,
              metal(
                vec3(
                  0.5 * (1 + Math.random()),
                  0.5 * (1 + Math.random()),
                  0.5 * (1 + Math.random())
                ),
                0.5 * Math.random()
              )
            )
          )
        } else {
          // glass
          list.push(sphere(center, 0.3, dielectric(1.5)))
        }
      }
    }
  }

  list.push(sphere(vec3(0, 1, 0), 1.0, dielectric(1.5)))
  list.push(sphere(vec3(-4, 1, 0), 1.0, lambertian(vec3(0.4, 0.2, 0.1))))
  list.push(sphere(vec3(4, 1, 0), 1.0, metal(vec3(0.7, 0.6, 0.5), 0.0)))

  return hitableList(list, list.length)
}
