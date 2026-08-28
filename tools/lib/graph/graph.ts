import { oldGraphGone } from "./graph-gone.ts"
import type { Edge, Graph, Node } from "./types.ts"

export const createGraph: (nodes: readonly Node[], edges: readonly Edge[]) => Graph = () =>
  oldGraphGone("createGraph")
