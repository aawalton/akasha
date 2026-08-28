import { oldGraphGone } from "../graph-gone.ts"
import type { Graph } from "../types.ts"

export const parseSerializedGraph: (raw: unknown) => Graph = () =>
  oldGraphGone("parseSerializedGraph")
