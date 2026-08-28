// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.

import { oldGraphGone } from "../../graph-gone.ts"
import type { Engine } from "../../types.ts"

export const registerK8sNodeTypes: (engine: Engine) => undefined = () =>
  oldGraphGone("registerK8sNodeTypes")
export const registerK8sSynthEdgeTypes: (engine: Engine) => undefined = () =>
  oldGraphGone("registerK8sSynthEdgeTypes")
