// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import { oldGraphGone } from "../../../graph-gone.ts"

export const registerK8sNodeTypes = ((...a: readonly unknown[]) => oldGraphGone("registerK8sNodeTypes")) as never
export const registerK8sSynthEdgeTypes = ((...a: readonly unknown[]) => oldGraphGone("registerK8sSynthEdgeTypes")) as never
