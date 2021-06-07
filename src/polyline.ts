import { Segment } from './segment'
import { Vector3 } from './vector'

export interface LegacyPolylineData {
  vertices: Vector3[]
  is_closed: boolean // eslint-disable-line camelcase
}

export interface PolylineData {
  vertices: Vector3[]
  isClosed: boolean
}

export type Edge = [number, number]

export class Polyline {
  readonly vertices: Vector3[]
  readonly isClosed: boolean

  constructor(data: PolylineData | LegacyPolylineData) {
    this.vertices = data.vertices
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.isClosed = (data as any).isClosed ?? (data as any).is_closed
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

  get segments(): [Vector3, Vector3][] {
    return this.edges.map(([first, second]) => [
      this.vertices[first],
      this.vertices[second],
    ])
  }

  get pathCentroid(): Vector3 {
    const {
      sum: [x, y, z],
      totalWeight,
    } = this.segments
      .map(([first, second]) => new Segment(first, second))
      .reduce(
        (
          { sum: [x, y, z], totalWeight },
          { centroid: [centroidX, centroidY, centroidZ], length }
        ) => ({
          sum: [
            x + length * centroidX,
            y + length * centroidY,
            z + length * centroidZ,
          ],
          totalWeight: totalWeight + length,
        }),
        { sum: [0, 0, 0], totalWeight: 0 }
      )
    return [x / totalWeight, y / totalWeight, z / totalWeight]
  }
}
