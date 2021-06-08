import { given, test } from 'sazerac'
import { Polyline } from './polyline'
import { Point } from './point'

describe('Polyline', () => {
  describe('`nearest()`', () => {
    const Z = -2.5
    const chomper = Polyline.fromData({
      vertices: [
        [2, 4, Z],
        [4, 3, Z],
        [7, 2, Z],
        [6, 6, Z],
        [9, 5, Z],
        [10, 9, Z],
        [7, 7, Z],
        [7, 8, Z],
        [10, 9, Z],
        [7, 10, Z],
        [4, 10, Z],
        [1, 8, Z],
        [3, 8, Z],
        [2, 9, Z],
        [1, 8, Z],
      ],
      isClosed: true,
    })

    const nearest = (toCoords: [number, number, number]) =>
      chomper.nearest(new Point(toCoords)).coords

    test(nearest, () => {
      given([2.5, 7.5, Z]).expect([2.5, 8, Z])
      given([6, -7, Z]).expect([7, 2, Z])
      given([7, 3, Z]).expect([115.0 / 17.0, 50.0 / 17.0, Z])
      given([17, 8, Z]).expect([10, 9, Z])
    })
  })
})
