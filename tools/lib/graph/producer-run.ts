import { oldGraphGone } from "./graph-gone.ts"
import type { MergeRegistry } from "./merge.ts"
import type { BuildContext, Graph, Producer } from "./types.ts"

export const runProducers: (
  producers: readonly Producer[],
  ctx: BuildContext,
  registry?: MergeRegistry
) => Promise<Graph> = () => oldGraphGone("runProducers")
export const validateProducers: (
  producers: readonly Producer[],
  nodeTypes: ReadonlyMap<string, unknown>,
  edgeTypes: ReadonlyMap<string, unknown>
) => undefined = () => oldGraphGone("validateProducers")
