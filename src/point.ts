import { Coords, addCoords, subtractCoords } from './coords'
import { Vector } from './vector'

/* Represent a point in 3-space. */
export class Point extends Coords {
  static origin = new Point([0, 0, 0])

  subtractPoint(otherPoint: Point): Vector {
    return subtractCoords(this, otherPoint, Vector)
  }

  addVector(vector: Vector): Point {
    return addCoords(this, vector, Point)
  }

  subtractVector(vector: Vector): Point {
    return subtractCoords(this, vector, Point)
  }

  euclideanDistanceSquared(otherPoint: Point): number {
    const [x1, y1, z1] = this.coords
    const [x2, y2, z2] = otherPoint.coords
    return (x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2
  }

  euclideanDistance(otherPoint: Point): number {
    return Math.sqrt(this.euclideanDistanceSquared(otherPoint))
  }
}
