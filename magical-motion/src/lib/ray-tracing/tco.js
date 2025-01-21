// chrome did not support tco
class Tco {
  constructor(func) {
    this.func = func
  }
  execute() {
    let value = this
    while (value instanceof Tco) value = value.func()
    return value
  }
}

export default function tco(f) {
  return new Tco(f)
}
