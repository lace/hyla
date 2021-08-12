import chai, { expect } from 'chai'
import { Vector } from './vector'

import chaiRoughly from 'chai-roughly'
chai.use(chaiRoughly)

describe('Vector', () => {
  it(`normalized()`, () => {
    expect(
      new Vector([1.0, 1.0, 0.0]).normalized().coords
    ).to.roughly.deep.equal([Math.sqrt(2) / 2.0, Math.sqrt(2) / 2.0, 0])
  })
})
