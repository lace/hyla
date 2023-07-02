import {
  Coords,
  addCoords,
  divideCoordsByScalar,
  multiplyCoordsByScalar,
  subtractCoords,
} from './coords'

/* Represent a vector in 3-space. */
export class Vector extends Coords {
  static ZERO = new Vector([0, 0, 0])
  static BASIS = {
    X: new Vector([1, 0, 0]),
    Y: new Vector([0, 1, 0]),
    Z: new Vector([0, 0, 1]),
  }

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
    if (this.length === 0) {
      throw Error("Can't normalize the zero vector")
    }
    return divideCoordsByScalar(this, this.length, Vector)
  }

  dot(other: Vector): number {
    const [x1, y1, z1] = this.coords
    const [x2, y2, z2] = other.coords
    return x1 * x2 + y1 * y2 + z1 * z2
  }

  cross(other: Vector): Vector {
    const [x1, y1, z1] = this.coords
    const [x2, y2, z2] = other.coords
    return new Vector([y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - y1 * x2])
  }

  add(otherVector: Vector): Vector {
    return addCoords(this, otherVector, Vector)
  }

  subtract(otherVector: Vector): Vector {
    return subtractCoords(this, otherVector, Vector)
  }
}
