import Hitable, { type IHitable, type IHitRecord } from "./hitable"
import type { IRay } from "./ray"

interface HitableList extends IHitable {
  list: IHitable[]
  listSize: number
  hit(ray: IRay, tMin: number, tMax: number, hitRecord: IHitRecord): {
    hitAnything: boolean
    closestSoFar: number
    hitRecord: IHitRecord
  }
}

class HitableList extends Hitable {
  constructor(l: IHitable[], n: number) {
    super()
    this.list = l
    this.listSize = n
  }
  hit(ray: IRay, tMin: number, tMax: number, hitRecord: IHitRecord) {
    const { material } = hitRecord
    let tempRecord = { material } as IHitRecord
    let hitAnything = false
    let closestSoFar = tMax
    for (let i = 0; i < this.listSize; i++) {
      const isHit = this.list[i].hit(ray, tMin, closestSoFar, tempRecord)
      if (tempRecord.t) {
        hitAnything = true
        closestSoFar = tempRecord.t
        hitRecord = tempRecord
      }
    }
    return { hitAnything, closestSoFar, hitRecord }
  }
}

export default function hitableList(list: IHitable[], listSize: number) {
  return new HitableList(list, listSize)
}

export type IHitableList = HitableList
