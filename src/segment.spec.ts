import { forCases, given, test } from 'sazerac'
import { Segment } from './segment'
import { Point } from './point'

describe('Segment', () => {
  describe('`nearest()`', () => {
    // Adapted from polliwog implementation of public domain algorithm.
    // https://github.com/lace/polliwog/blob/8f0fb65757bcb03e0a428716c4769082d0bdee80/polliwog/segment/_segment_functions.py#L72-L106
    // https://gdbooks.gitbooks.io/3dcollisions/content/Chapter1/closest_point_on_line.html
    const first = new Point([-3.0, -2.0, -1.0])
    const second = new Point([1.0, 2.0, 3.0])
    const segment = new Segment(first, second)

    const nearest = (toCoords: [number, number, number]) =>
      segment.nearest(new Point(toCoords)).coords

    test(nearest, () => {
      given([7, -2, -1]).expect(
        first.addVector(segment.vector.timesScalar(10.0 / 12.0)).coords
      )
      given([1, 5, -5]).expect(
        first.addVector(segment.vector.timesScalar(7.0 / 12.0)).coords
      )
      forCases([given([-7, -10, -4]), given([-4, -7, -8])]).expect(first.coords)
      forCases([
        given([-6, 5, 7]),
        given([1, 6, 8]),
        given([7, 8, 5]),
        given([5, 5, 3]),
      ]).expect(second.coords)
    })
  })
})
