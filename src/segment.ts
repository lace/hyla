import { addCoords, subtractCoords } from './coords'
import { Point } from './point'
import { clamp } from './scalar'
import { Vector } from './vector'

export class Segment {
  readonly first: Point
  readonly second: Point

  constructor(first: Point, second: Point) {
    this.first = first
    this.second = second
  }

  get length(): number {
    return this.first.euclideanDistance(this.second)
  }

  get vector(): Vector {
    return subtractCoords(this.second, this.first, Vector)
  }

  get centroid(): Vector {
    const [x1, y1, z1] = this.first.coords
    const [x2, y2, z2] = this.second.coords
    return new Vector([0.5 * (x1 + x2), 0.5 * (y1 + y2), 0.5 * (z1 + z2)])
  }

  nearest(toPoint: Point): Point {
    // Adapted from polliwog implementation of public domain algorithm.
    // https://github.com/lace/polliwog/blob/8f0fb65757bcb03e0a428716c4769082d0bdee80/polliwog/segment/_segment_functions.py#L72-L106
    // https://gdbooks.gitbooks.io/3dcollisions/content/Chapter1/closest_point_on_line.html

    const { first, second, vector } = this

    // Compute t such that `result = toPoint + t * this.vector`.
    const t =
      subtractCoords(toPoint, first, Vector).dot(vector) /
      first.euclideanDistanceSquared(second)

    // When `0 <= t <= 1`, the point is on the segment. When `t < 0`, the
    // closest point is the segment start. When `t > 1`, the closest point is
    // the segment end.
    const clamped = clamp(t, { min: 0, max: 1 })

    return addCoords(first, vector.timesScalar(clamped), Point)
  }
}
