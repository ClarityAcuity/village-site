import ray from "../ray-tracing/ray"
import vec3 from "../ray-tracing/vec3"
import sphere from "../ray-tracing/sphere"
import hitableList from "../ray-tracing/hitable-list"

describe("hitable-list.js HitableList class", () => {
  const world0 = []
  const list1 = sphere(vec3(0, 0, -1), 0.5)
  const list2 = sphere(vec3(0, -100.5, -1), 100)
  const hitable = [list1, list2]
  const world = hitableList(hitable, hitable.length)
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
  const record = {}
  describe("hitableList hit method test suits", () => {
    describe("ray1 should hit something", () => {
      const { hitAnything, closestSoFar, hitRecord } = world.hit(
        ray1,
        tMin,
        tMax,
        record
      )
      it("world.hit().hitAnything is true", () => {
        expect(hitAnything).toEqual(true)
      })
      it("world.hit().closestSoFar is between tMin and tMax", () => {
        expect(closestSoFar).toBeGreaterThanOrEqual(tMin)
        expect(closestSoFar).toBeLessThan(tMax)
      })
      it("world.hit().hitRecord has record", () => {
        const { t, p, normal } = hitRecord
        expect(t).toBeDefined()
        expect(p).toBeDefined()
        expect(normal).toBeDefined()
      })
    })
    describe("ray2 should not hit anything", () => {
      const { hitAnything, closestSoFar, hitRecord } = world.hit(
        ray2,
        tMin,
        tMax,
        record
      )
      it("world.hit().hitAnything is false", () => {
        expect(hitAnything).toEqual(false)
      })
      it("world.hit().closestSoFar is tMax", () => {
        expect(closestSoFar).toBe(tMax)
      })
      it("world.hit().hitRecord has no record", () => {
        const { t, p, normal } = hitRecord
        expect(t).toBeUndefined()
        expect(p).toBeUndefined()
        expect(normal).toBeUndefined()
      })
    })
  })
})
