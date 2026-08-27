import type { Graph, NodeId } from "../types.ts"

export type TransitiveClosureOpts = {
  readonly edgeTypes?: readonly string[]
}

const bfsForward = (
  graph: Graph,
  seeds: readonly NodeId[],
  edgeTypes: readonly string[] | undefined,
  excludeSeeds: ReadonlySet<NodeId>
): Set<NodeId> => {
  const reached = new Set<NodeId>()
  const queue: NodeId[] = []
  for (const seed of seeds) {
    for (const edge of graph.outEdges(seed, edgeTypes)) {
      const next = edge.to
      if (excludeSeeds.has(next)) continue
      if (reached.has(next)) continue
      reached.add(next)
      queue.push(next)
    }
  }
  while (queue.length > 0) {
    const node = queue.shift()
    if (node === undefined) break
    for (const edge of graph.outEdges(node, edgeTypes)) {
      const next = edge.to
      if (excludeSeeds.has(next)) continue
      if (reached.has(next)) continue
      reached.add(next)
      queue.push(next)
    }
  }
  return reached
}

export const transitiveClosure = (
  graph: Graph,
  from: NodeId,
  opts?: TransitiveClosureOpts
): ReadonlySet<NodeId> => {
  const exclude = new Set<NodeId>([from])
  return bfsForward(graph, [from], opts?.edgeTypes, exclude)
}

export const transitiveClosureMany = (
  graph: Graph,
  froms: readonly NodeId[],
  opts?: TransitiveClosureOpts
): ReadonlySet<NodeId> => {
  const exclude = new Set<NodeId>(froms)
  return bfsForward(graph, froms, opts?.edgeTypes, exclude)
}
