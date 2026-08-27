import type { EdgeTypeDef, Graph } from "../lib/graph/types.ts"

export type Misplacement = {
  readonly edgeType: string
  readonly side: "from" | "to"
  readonly nodeId: string
  readonly declared: string
  readonly found: string
}

export type Reading = {
  readonly resolved: number
  readonly misplaced: readonly Misplacement[]
}

export const endpointsOf = (
  graph: Graph,
  declared: ReadonlyMap<string, EdgeTypeDef>
): Reading => {
  const misplaced: Misplacement[] = []
  let resolved = 0
  for (const edge of graph.edges()) {
    const def = declared.get(edge.type)
    if (def === undefined) continue
    for (const side of ["from", "to"] as const) {
      const nodeId = side === "from" ? edge.from : edge.to
      const node = graph.node(nodeId)
      if (node === undefined) continue
      resolved += 1
      const wanted = side === "from" ? def.from : def.to
      if (node.type === wanted) continue
      misplaced.push({ edgeType: edge.type, side, nodeId, declared: wanted, found: node.type })
    }
  }
  return { resolved, misplaced }
}
