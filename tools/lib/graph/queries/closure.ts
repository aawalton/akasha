// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import { oldGraphGone } from "../graph-gone.ts"

export const attrText = ((...a: readonly unknown[]) => oldGraphGone("attrText")) as never
export const closureFromSeeds = ((...a: readonly unknown[]) => oldGraphGone("closureFromSeeds")) as never
export const importGraphClosureFromSeeds = ((...a: readonly unknown[]) => oldGraphGone("importGraphClosureFromSeeds")) as never
