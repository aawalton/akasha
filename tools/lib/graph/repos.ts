// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import type { Repo } from "../../../page/document/types.ts"
import { oldGraphGone } from "./graph-gone.ts"
import type { BuildContext } from "./types.ts"

export const GRAPH_REPOS: readonly Repo[] = ["code", "instructions"]
export const readRepoFile: (ctx: BuildContext, repo: Repo, path: string) => string | null = () =>
  oldGraphGone("readRepoFile")
export const readRepos: (commit: string, repos?: readonly Repo[]) => BuildContext = () =>
  oldGraphGone("readRepos")
