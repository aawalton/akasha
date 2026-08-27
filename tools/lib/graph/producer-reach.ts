// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import { oldGraphGone } from "./graph-gone.ts"

export type ReachTree = unknown

export const EDGE_PRODUCER_PAGE_DIR = "pages/old-graph-edge-producer"
export const PRODUCER_PAGE_DIR = "pages/old-graph-node-producer"
export const REACHED_REPO: Repo = "instructions"
export const narrowedTo = ((...a: readonly unknown[]) => oldGraphGone("narrowedTo")) as never
export const readProducerReach = ((...a: readonly unknown[]) => oldGraphGone("readProducerReach")) as never
export const withinReach = ((...a: readonly unknown[]) => oldGraphGone("withinReach")) as never
