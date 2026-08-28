import { oldGraphGone } from "../graph-gone.ts"
import type { Graph, NodeId } from "../types.ts"

export type TransitiveClosureOpts = {
  readonly edgeTypes?: readonly string[]
}
export const transitiveClosure: (
  graph: Graph,
  from: NodeId,
  opts?: TransitiveClosureOpts
) => ReadonlySet<NodeId> = () => oldGraphGone("transitiveClosure")
