import { oldGraphGone } from "../graph-gone.ts"
import type { Graph } from "../types.ts"
import type { SerializedGraph } from "./types.ts"

export const serializeGraph: (graph: Graph, commit: string) => SerializedGraph = () =>
  oldGraphGone("serializeGraph")
