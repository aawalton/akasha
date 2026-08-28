import { oldGraphGone } from "../graph-gone.ts"
import type { Graph, NodeId } from "../types.ts"

export const attrText: (attrs: unknown, name: string) => string | undefined = () =>
  oldGraphGone("attrText")
export const closureFromSeeds: (graph: Graph, seedIds: Iterable<NodeId>) => Set<NodeId> = () =>
  oldGraphGone("closureFromSeeds")
export const importGraphClosureFromSeeds: (graph: Graph, seedIds: Iterable<NodeId>) => Set<NodeId> =
  () => oldGraphGone("importGraphClosureFromSeeds")
