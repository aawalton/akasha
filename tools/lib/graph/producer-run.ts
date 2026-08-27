// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import { oldGraphGone } from "./graph-gone.ts"

export const runProducers = ((...a: readonly unknown[]) => oldGraphGone("runProducers")) as never
export const validateProducers = ((...a: readonly unknown[]) => oldGraphGone("validateProducers")) as never
