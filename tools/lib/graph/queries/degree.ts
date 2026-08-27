import type { Graph, NodeId } from "../types.ts"

export type DegreeOpts = {
  readonly edgeTypes?: readonly string[]
}

export type Degree = {
  readonly in: number
  readonly out: number
}

export const degree = (graph: Graph, node: NodeId, opts?: DegreeOpts): Degree => {
  const edgeTypes = opts?.edgeTypes
  return {
    in: graph.inEdges(node, edgeTypes).length,
    out: graph.outEdges(node, edgeTypes).length,
  }
}
