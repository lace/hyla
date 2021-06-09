import {
  Coords,
  divideCoordsByScalar,
  multiplyCoordsByScalar,
  subtractCoords,
} from './coords'

/* Represent a vector in 3-space. */
export class Vector extends Coords {
  static zero = new Vector([0, 0, 0])

  timesScalar(scalar: number): Vector {
    return multiplyCoordsByScalar(this, scalar, Vector)
  }

  dividedByScalar(scalar: number): Vector {
    return divideCoordsByScalar(this, scalar, Vector)
  }

  negate(): Vector {
    return this.timesScalar(-1)
  }

  dot(other: Vector): number {
    const [x1, y1, z1] = this.coords
    const [x2, y2, z2] = other.coords
    return x1 * x2 + y1 * y2 + z1 * z2
  }

  subtract(otherVector: Vector): Vector {
    return subtractCoords(this, otherVector, Vector)
  }
}
