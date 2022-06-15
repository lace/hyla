import chai, { expect } from 'chai'
import { rotationFromUpAndLook } from './transform'

import chaiRoughly from 'chai-roughly'
import { Vector } from './vector'
chai.use(chaiRoughly)

describe('Transforms', () => {
  it(`rotationFromUpAndLook()`, () => {
    // Identity.
    expect(rotationFromUpAndLook(Vector.BASIS.Y, Vector.BASIS.Z)).to.deep.equal(
      [new Vector([1, 0, 0]), new Vector([0, 1, 0]), new Vector([0, 0, 1])]
    )

    // Parity with polliwog.
    expect(
      rotationFromUpAndLook(Vector.BASIS.Y, new Vector([1, 0, 1]))
    ).to.roughly.deep.equal([
      new Vector([Math.SQRT1_2, 0, -Math.SQRT1_2]),
      new Vector([0, 1, 0]),
      new Vector([Math.SQRT1_2, 0, Math.SQRT1_2]),
    ])
    expect(
      rotationFromUpAndLook(new Vector([-1, 1, 0]), Vector.BASIS.Z)
    ).to.roughly.deep.equal([
      new Vector([Math.SQRT1_2, Math.SQRT1_2, 0]),
      new Vector([-Math.SQRT1_2, Math.SQRT1_2, 0]),
      Vector.BASIS.Z,
    ])
  })
})
