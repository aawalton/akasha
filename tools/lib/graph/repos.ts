// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import { oldGraphGone } from "./graph-gone.ts"

export const GRAPH_REPOS: readonly Repo[] = ["code", "instructions"]
export const readRepoFile = ((...a: readonly unknown[]) => oldGraphGone("readRepoFile")) as never
export const readRepos = ((...a: readonly unknown[]) => oldGraphGone("readRepos")) as never
