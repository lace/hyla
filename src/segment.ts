import { Vector3 } from './vector'

export class Segment {
  readonly first: Vector3
  readonly second: Vector3

  constructor(first: Vector3, second: Vector3) {
    this.first = first
    this.second = second
  }

  get length(): number {
    const [x1, y1, z1] = this.first
    const [x2, y2, z2] = this.second
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2)
  }

  get centroid(): Vector3 {
    const [x1, y1, z1] = this.first
    const [x2, y2, z2] = this.second
    return [0.5 * (x1 + x2), 0.5 * (y1 + y2), 0.5 * (z1 + z2)]
  }
}
