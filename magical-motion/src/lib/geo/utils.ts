import * as d3js from "d3"
import * as d3geo from "d3-geo"
import * as geoprojection from "d3-geo-projection"
import * as topojson from "topojson"
import land50m from "../../features/geo/land-50m.json"
import land110m from "../../features/geo/land-110m.json"

export const d3 = Object.assign({}, d3js, d3geo, geoprojection)

export const outline = { type: "Sphere" }

function geoRotatePhi(deltaPhi: number) {
  const cosDeltaPhi = Math.cos(deltaPhi)
  const sinDeltaPhi = Math.sin(deltaPhi)
  return (sink: any) => ({
    point(lambda: number, phi: number) {
      const cosPhi = Math.cos(phi)
      const x = Math.cos(lambda) * cosPhi
      const y = Math.sin(lambda) * cosPhi
      const z = Math.sin(phi)
      const k = z * cosDeltaPhi + x * sinDeltaPhi
      sink.point(Math.atan2(y, x * cosDeltaPhi - z * sinDeltaPhi), Math.asin(k))
      console.log(lambda)
    },
    lineStart() {
      sink.lineStart()
    },
    lineEnd() {
      sink.lineEnd()
    },
    polygonStart() {
      sink.polygonStart()
    },
    polygonEnd() {
      sink.polygonEnd()
    },
    sphere() {
      sink.sphere()
    },
  })
}

function geoPipeline(...transforms: any) {
  return (sink: any) => {
    for (let i = transforms.length - 1; i >= 0; --i) {
      sink = transforms[i](sink)
    }
    return sink
  }
}

const geoClipCircle = d3.geoClipCircle

const preclip = (camera: { distance: number; tilt: number; scale: number }) => {
  const distance = camera.distance
  const tilt = (camera.tilt * Math.PI) / 180
  const alpha = Math.acos(distance * Math.cos(tilt) * 0.999)
  const clipDistance = geoClipCircle(Math.acos(1 / distance) - 1e-6)
  return alpha
    ? geoPipeline(
        clipDistance,
        geoRotatePhi(Math.PI + tilt),
        geoClipCircle(Math.PI - alpha),
        geoRotatePhi(-Math.PI - tilt)
      )
    : clipDistance
}

export const projection = (
  width: number,
  height: number,
  rotate: number[],
  camera: { distance: number; tilt: number; scale: number }
) =>
  d3
    .geoSatellite()
    .scale(camera.scale)
    .tilt(camera.tilt)
    .distance(camera.distance)
    .preclip(preclip(camera))
    .precision(0.1)
    .translate([width / 2, height / 2])
    .rotate(rotate)

export const graticule = d3.geoGraticule10()

export const land50 = topojson.feature(
  land50m as unknown as TopoJSON.Topology,
  land50m.objects.land as unknown as TopoJSON.GeometryObject
)

export const land110 = topojson.feature(
  land110m as unknown as TopoJSON.Topology,
  land110m.objects.land as unknown as TopoJSON.GeometryObject
)
