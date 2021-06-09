import { addCoords, divideCoordsByScalar, Coords } from './coords'
import { Segment } from './segment'
import { Point } from './point'

export interface PolylineData {
  vertices: [number, number, number][]
  isClosed: boolean
}

export interface LegacyPolylineData {
  vertices: [number, number, number][]
  is_closed: boolean // eslint-disable-line camelcase
}

/* Encapsulate the vertex indices of an edge of a polyline. */
export type Edge = [number, number]

/* Represent a polygonal chain in 3-space. */
export class Polyline {
  readonly vertices: Point[]
  readonly isClosed: boolean

  constructor({
    vertices,
    isClosed,
  }: {
    vertices: Point[]
    isClosed: boolean
  }) {
    if (vertices.length < 1) {
      throw Error('A polyline needs at least one vertex')
    }
    this.vertices = vertices
    this.isClosed = isClosed
  }

  static fromData({ vertices, isClosed }: PolylineData): Polyline {
    return new this({
      vertices: vertices.map(coords => new Point(coords)),
      isClosed,
    })
  }

  static fromLegacyData({
    vertices,
    is_closed: isClosed,
  }: LegacyPolylineData): Polyline {
    return this.fromData({ vertices, isClosed })
  }

  get edges(): Edge[] {
    const openEdges: Edge[] = Array.from(
      Array(this.vertices.length - 1).keys()
    ).map(first => [first, first + 1])

    if (this.isClosed) {
      return openEdges.concat([[this.vertices.length - 1, 0]])
    } else {
      return openEdges
    }
  }

  get segments(): Segment[] {
    return this.edges.map(
      ([firstIndex, secondIndex]) =>
        new Segment(this.vertices[firstIndex], this.vertices[secondIndex])
    )
  }

  get pathCentroid(): Point {
    if (this.vertices.length === 1) {
      return this.vertices[0]
    }

    // Computed the mean of the segment centroids, weighted by their length.
    const { sum, totalWeight } = this.segments.reduce(
      ({ sum, totalWeight }, thisSegment) => ({
        sum: addCoords(
          sum,
          thisSegment.centroid.timesScalar(thisSegment.length),
          Coords
        ),
        totalWeight: totalWeight + length,
      }),
      { sum: new Coords([0, 0, 0]), totalWeight: 0 }
    )
    return divideCoordsByScalar(sum, totalWeight, Point)
  }

  nearest(toPoint: Point): Point {
    if (this.vertices.length === 1) {
      return this.vertices[0]
    }

    return this.segments.reduce(
      ({ resultPoint, resultDistanceSquared }, thisSegment) => {
        const thisNearest = thisSegment.nearest(toPoint)
        const thisDistanceSquared =
          thisNearest.euclideanDistanceSquared(toPoint)

        if (thisDistanceSquared < resultDistanceSquared) {
          return {
            resultPoint: thisNearest,
            resultDistanceSquared: thisDistanceSquared,
          }
        } else {
          return { resultPoint, resultDistanceSquared }
        }
      },
      { resultPoint: Point.origin, resultDistanceSquared: Infinity }
    ).resultPoint
  }
}
