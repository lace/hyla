import { Vector } from './vector'

export type RotationMatrix = [Vector, Vector, Vector]

/*
Rotation matrix to rotate a mesh into a canonical reference frame. The result is
a rotation matrix that will make up along +y and look along +z (i.e. facing
towards a default opengl camera).

Adapted from polliwog.
*/
export function rotationFromUpAndLook(
  up: Vector,
  look: Vector
): RotationMatrix {
  if (up.length === 0) {
    throw Error('Singular up')
  }
  if (look.length === 0) {
    throw Error('Singular look')
  }

  const y = up.normalized()
  let z
  try {
    z = look.subtract(y.timesScalar(look.dot(y))).normalized()
  } catch (e) {
    if ((e as Error).message === "Can't normalize the zero vector") {
      throw Error('Up and look are collinear')
    } else {
      throw e
    }
  }
  const x = y.cross(z)
  return [x, y, z]
}
