/// <reference path="../.astro/types.d.ts" />

declare module "d3" {
  import { geoSatellite, schemeCategory10, format, arc, pie } from "d3"
  export function geoSatellite(): GeoSatellite
  export function schemeCategory10(): string[]
  export function format(s: string): string
  export function arc(): GeoArc
  export function pie(): GeoPie
}

declare module "d3-geo-projection" {
  import { GeoProjection } from "d3-geo"
  export function geoPatterson(): GeoProjection
}
