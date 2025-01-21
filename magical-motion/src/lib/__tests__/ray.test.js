import ray from "../ray-tracing/ray"
import vec3 from "../ray-tracing/vec3"

describe("ray.js Ray class", () => {
  const A = vec3(1.0, 2.0, 3.0)
  const B = vec3(2.0, 0, -2)
  const t = 1.1
  const rayR = ray(A, B)
  describe("ray method test suits", () => {
    it("rayR.origin() is rayR.A", () => {
      expect(rayR.origin()).toEqual(rayR.A)
    })
    it("rayR.direction() is rayR.B", () => {
      expect(rayR.direction()).toEqual(rayR.B)
    })
    it("rayR.pointAtParameter(t) is rayR.A.addVector(rayR.B.multiplyScalar(t))", () => {
      expect(rayR.pointAtParameter(t)).toEqual(
        rayR.A.addVector(rayR.B.multiplyScalar(t))
      )
    })
  })
})
