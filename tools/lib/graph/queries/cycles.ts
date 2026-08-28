import { oldGraphGone } from "../graph-gone.ts"
import type { Graph, NodeId } from "../types.ts"

export type FindCyclesOpts = {
  readonly edgeTypes?: readonly string[]
}
export const findCycles: (graph: Graph, opts?: FindCyclesOpts) => readonly (readonly NodeId[])[] =
  () => oldGraphGone("findCycles")
