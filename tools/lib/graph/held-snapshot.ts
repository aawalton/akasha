// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import { oldGraphGone } from "./graph-gone.ts"

export type HeldSnapshot = unknown
export type SnapshotReading = unknown

export const HELD_AT_ONCE = 4
export const buildFrom = ((...a: readonly unknown[]) => oldGraphGone("buildFrom")) as never
export const createSnapshotHolder = ((...a: readonly unknown[]) => oldGraphGone("createSnapshotHolder")) as never
export const readAt = ((...a: readonly unknown[]) => oldGraphGone("readAt")) as never
