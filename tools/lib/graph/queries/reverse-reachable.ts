import type { Graph, NodeId } from "../types.ts"

export type ReverseReachableOpts = {
  readonly edgeTypes?: readonly string[]
}

export const reverseReachable = (
  graph: Graph,
  from: NodeId,
  opts?: ReverseReachableOpts
): ReadonlySet<NodeId> => {
  const edgeTypes = opts?.edgeTypes
  const reached = new Set<NodeId>()
  const queue: NodeId[] = []
  for (const edge of graph.inEdges(from, edgeTypes)) {
    const prev = edge.from
    if (prev === from) continue
    if (reached.has(prev)) continue
    reached.add(prev)
    queue.push(prev)
  }
  while (queue.length > 0) {
    const node = queue.shift()
    if (node === undefined) break
    for (const edge of graph.inEdges(node, edgeTypes)) {
      const prev = edge.from
      if (prev === from) continue
      if (reached.has(prev)) continue
      reached.add(prev)
      queue.push(prev)
    }
  }
  return reached
}
