import vec3, { dot, cross, unitVector } from "../ray-tracing/vec3"

describe("vec3.js", () => {
  const x1 = 1.0
  const y1 = 2.0
  const z1 = 3.0
  const x2 = 2
  const y2 = 0
  const z2 = -2
  let vectorA = vec3(x1, y1, z1)
  const vectorB = vec3(x2, y2, z2)
  const c = 3

  beforeEach(() => {
    vectorA = vec3(x1, y1, z1)
  })

  describe("Vec3 class", () => {
    describe("vec3 method test suits", () => {
      it("vector.x() is x1", () => {
        expect(vectorA.x()).toBe(x1)
      })
      it("vectorA.y() is y1", () => {
        expect(vectorA.y()).toBe(y1)
      })
      it("vectorA.z() is z1", () => {
        expect(vectorA.z()).toBe(z1)
      })
      it("vectorA.r() is x1", () => {
        expect(vectorA.r()).toBe(x1)
      })
      it("vectorA.g() is y1", () => {
        expect(vectorA.g()).toBe(y1)
      })
      it("vectorA.b() is z1", () => {
        expect(vectorA.b()).toBe(z1)
      })
      it("vectorA.identical() is vectorA", () => {
        expect(vectorA.identical()).toEqual(vectorA)
      })
      it("vectorA.opposite() is vec3(-x1, -y1, -z1)", () => {
        expect(vectorA.opposite()).toEqual(vec3(-x1, -y1, -z1))
      })
      it("vectorA.addVector(vectorB) is vec3(x1 + x2, y1 + y2, z1 + z2)", () => {
        expect(vectorA.addVector(vectorB)).toEqual(
          vec3(x1 + x2, y1 + y2, z1 + z2)
        )
      })
      it("vectorA.subtractVector(vectorB) is vec3(x1 - x2, y1 - y2, z1 - z2)", () => {
        expect(vectorA.subtractVector(vectorB)).toEqual(
          vec3(x1 - x2, y1 - y2, z1 - z2)
        )
      })
      it("vectorA.multiplyVector(vectorB) is vec3(x1 * x2, y1 * y2, z1 * z2)", () => {
        expect(vectorA.multiplyVector(vectorB)).toEqual(
          vec3(x1 * x2, y1 * y2, z1 * z2)
        )
      })
      // it("vectorA.divideVector(vectorB) is vec3(0.5, NAN, -1.5)", () => {
      //   expect(vectorA.divideVector(vectorB)).toEqual(
      //     vec3(0.5, NAN, -1.5)
      //   )
      // })
      it("vectorA.multiplyScalar(c)) is vec3(c * x1, c * y1, c * z1)", () => {
        expect(vectorA.multiplyScalar(c)).toEqual(vec3(c * x1, c * y1, c * z1))
      })
      it("vectorA.divideScaler() is vec3(x1 / c, y1 / c, z1 / c)", () => {
        expect(vectorA.divideScaler(c)).toEqual(vec3(x1 / c, y1 / c, z1 / c))
      })
      it("vectorA.length() is Math.sqrt(x1 * x1 + y1 * y1 + z1 * z1)", () => {
        expect(vectorA.length()).toBe(Math.sqrt(x1 * x1 + y1 * y1 + z1 * z1))
      })
      it("vectorA.squaredLength() is x1 * x1 + y1 * y1 + z1 * z1", () => {
        expect(vectorA.squaredLength()).toBe(x1 * x1 + y1 * y1 + z1 * z1)
      })
      it("vectorA.makeUnitVector() is vec3(k * x1, k * y1, k * z1), while k = 1 / Math.sqrt(x1 * x1 + y1 * y1 + z1 * z1)", () => {
        const k = 1 / Math.sqrt(x1 * x1 + y1 * y1 + z1 * z1)
        expect(vectorA.makeUnitVector()).toEqual(vec3(k * x1, k * y1, k * z1))
      })
    })
  })

  describe("Vec3 function", () => {
    it("verify dot(vectorA, vectorB)", () => {
      expect(dot(vectorA, vectorB)).toBe(
        vectorA.x() * vectorB.x() +
          vectorA.y() * vectorB.y() +
          vectorA.z() * vectorB.z()
      )
    })
    it("verify cross(vectorA, vectorB)", () => {
      expect(cross(vectorA, vectorB)).toEqual(
        vec3(
          vectorA.y() * vectorB.z() - vectorA.z() * vectorB.y(),
          -(vectorA.x() * vectorB.z() - vectorA.z() * vectorB.x()),
          vectorA.x() * vectorB.y() - vectorA.y() * vectorB.x()
        )
      )
    })
    it("verify unitVector(vectorA)", () => {
      expect(unitVector(vectorA)).toEqual(
        vectorA.divideScaler(vectorA.length())
      )
    })
  })
})
