import Hitable from "./hitable"

class HitableList extends Hitable {
  constructor(l, n) {
    super()
    this.list = l
    this.listSize = n
  }
  hit(ray, tMin, tMax, hitRecord) {
    const { material } = hitRecord
    let tempRecord = { material }
    let hitAnything = false
    let closestSoFar = tMax
    for (let i = 0; i < this.listSize; i++) {
      const isHit = this.list[i].hit(ray, tMin, closestSoFar, tempRecord)
      if (isHit) {
        hitAnything = true
        closestSoFar = tempRecord.t
        hitRecord = tempRecord
      }
    }
    return { hitAnything, closestSoFar, hitRecord }
  }
}

export default function hitableList(list, listSize) {
  return new HitableList(list, listSize)
}
