// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.

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
