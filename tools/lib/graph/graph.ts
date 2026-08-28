// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.

import { oldGraphGone } from "./graph-gone.ts"
import type { Edge, Graph, Node } from "./types.ts"

export const createGraph: (nodes: readonly Node[], edges: readonly Edge[]) => Graph = () =>
  oldGraphGone("createGraph")
