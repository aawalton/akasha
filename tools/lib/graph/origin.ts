// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import { oldGraphGone } from "./graph-gone.ts"

export const askingAt = ((...a: readonly unknown[]) => oldGraphGone("askingAt")) as never
export const graphOrigin = ((...a: readonly unknown[]) => oldGraphGone("graphOrigin")) as never
