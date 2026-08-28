// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.

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
