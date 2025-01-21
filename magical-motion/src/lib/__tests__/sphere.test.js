import ray from "../ray-tracing/ray"
import vec3 from "../ray-tracing/vec3"
import sphere from "../ray-tracing/sphere"

describe("hitable-list.js HitableList class", () => {
  const sphere1 = sphere(vec3(0, 0, -1), 0.5)
  const origin = vec3(0.0, 0.0, 0.0)
  const lowerLeftCorner = vec3(-2.0, -1.0, -1.0)
  const horizontal = vec3(4.0, 0.0, 0.0)
  const vertical = vec3(0.0, 2.0, 0.0)
  const ray1 = ray(
    origin,
    lowerLeftCorner
      .addVector(horizontal.multiplyScalar(0.5))
      .addVector(vertical.multiplyScalar(0.5))
  )
  const ray2 = ray(
    origin,
    lowerLeftCorner
      .addVector(horizontal.multiplyScalar(0))
      .addVector(vertical.multiplyScalar(1))
  )
  const tMin = 0.0
  const tMax = Infinity
  const ray1Record = {}
  const ray2Record = {}
  describe("sphere hit method test suits", () => {
    describe("ray1 should hit sphere1", () => {
      const isHit = sphere1.hit(ray1, tMin, tMax, ray1Record)
      const { t, p, normal } = ray1Record
      it("sphere1.hit() is true", () => {
        expect(isHit).toEqual(true)
      })
      it("sphere1.hit() hitRecord has record", () => {
        const { center, radius } = sphere1
        const expectT = 0.5
        const expectP = ray1.pointAtParameter(expectT)
        const expectNormal = expectP.subtractVector(center).divideScaler(radius)
        expect(t).toBe(expectT)
        expect(p).toEqual(expectP)
        expect(normal).toEqual(expectNormal)
      })
    })
    describe("ray2 should not hit sphere1", () => {
      const isHit = sphere1.hit(ray2, tMin, tMax, ray2Record)
      const { t, p, normal } = ray2Record
      it("sphere1.hit() is false", () => {
        expect(isHit).toEqual(false)
      })
      it("sphere1.hit() hitRecord has no record", () => {
        expect(t).toBeUndefined()
        expect(p).toBeUndefined()
        expect(normal).toBeUndefined()
      })
    })
  })
})
