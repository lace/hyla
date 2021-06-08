// Internal class to represent Euclidean coordinates. Externally, use `Point`
// and `Vector` which expose appropriate high-level methods for their types.
export class Coords {
  readonly coords: [number, number, number]

  constructor(coords: [number, number, number]) {
    this.coords = coords
  }
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = unknown, Arguments extends any[] = any[]> = new (
  ...args: Arguments
) => T

// Helper functions which:
// - Avoid repeating similar code to produce points.
// - Avoid creating any extra copies.
export function addCoords<T extends Coords>(
  first: Coords,
  second: Coords,
  Constructor: Constructor<T>
): T {
  const [x1, y1, z1] = first.coords
  const [x2, y2, z2] = second.coords
  return new Constructor([x1 + x2, y1 + y2, z1 + z2])
}

export function subtractCoords<T extends Coords>(
  first: Coords,
  second: Coords,
  Constructor: Constructor<T>
): T {
  const [x1, y1, z1] = first.coords
  const [x2, y2, z2] = second.coords
  return new Constructor([x1 - x2, y1 - y2, z1 - z2])
}

export function multiplyCoordsByScalar<T extends Coords>(
  first: Coords,
  scalar: number,
  Constructor: Constructor<T>
): T {
  const [x, y, z] = first.coords
  return new Constructor([scalar * x, scalar * y, scalar * z])
}

export function divideCoordsByScalar<T extends Coords>(
  first: Coords,
  scalar: number,
  Constructor: Constructor<T>
): T {
  const [x, y, z] = first.coords
  return new Constructor([x / scalar, y / scalar, z / scalar])
}
