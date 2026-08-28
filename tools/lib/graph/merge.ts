import { oldGraphGone } from "./graph-gone.ts"
import type { EdgeTypeDef, Graph, NodeTypeDef, ProducerOutput } from "./types.ts"

export type MergeRegistry = {
  readonly nodeTypes: ReadonlyMap<string, NodeTypeDef>
  readonly edgeTypes: ReadonlyMap<string, EdgeTypeDef>
}
export const mergeProducerOutputs: (
  outputs: readonly ProducerOutput[],
  registry?: MergeRegistry
) => Graph = () => oldGraphGone("mergeProducerOutputs")
