import {
  Coords,
  divideCoordsByScalar,
  multiplyCoordsByScalar,
  subtractCoords,
} from './coords'

/* Represent a vector in 3-space. */
export class Vector extends Coords {
  static zero = new Vector([0, 0, 0])

  get lengthSquared(): number {
    const [x, y, z] = this.coords
    return x ** 2 + y ** 2 + z ** 2
  }

  get length(): number {
    return Math.sqrt(this.lengthSquared)
  }

  timesScalar(scalar: number): Vector {
    return multiplyCoordsByScalar(this, scalar, Vector)
  }

  dividedByScalar(scalar: number): Vector {
    return divideCoordsByScalar(this, scalar, Vector)
  }

  negated(): Vector {
    return this.timesScalar(-1)
  }

  normalized(): Vector {
    return divideCoordsByScalar(this, this.length, Vector)
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
