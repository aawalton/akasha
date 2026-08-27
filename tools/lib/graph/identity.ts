// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import { oldGraphGone } from "./graph-gone.ts"

export const identityKey = ((...a: readonly unknown[]) => oldGraphGone("identityKey")) as never
export const identityOf = ((...a: readonly unknown[]) => oldGraphGone("identityOf")) as never
