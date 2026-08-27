// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import { oldGraphGone } from "../../graph-gone.ts"

export type ClosureMembership = unknown
export type ClosureSeeds = unknown
export type PopulationEntry = unknown
export type ScopedPopulation = unknown

export const GRAPH_EXEMPT_DIRS: ReadonlySet<string> = new Set(["__fixtures__", "generated"])
export const MEMBERSHIP_ALL: ClosureMembership = { kind: "all" }
export const membershipCoversPath = ((...a: readonly unknown[]) => oldGraphGone("membershipCoversPath")) as never
export const pathsStandingNowhere = ((...a: readonly unknown[]) => oldGraphGone("pathsStandingNowhere")) as never
export const resolveClosureMembership = ((...a: readonly unknown[]) => oldGraphGone("resolveClosureMembership")) as never
