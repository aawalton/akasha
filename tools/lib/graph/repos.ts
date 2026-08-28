import type { Repo } from "../../../page/document/types.ts"
import { oldGraphGone } from "./graph-gone.ts"
import type { BuildContext } from "./types.ts"

export const GRAPH_REPOS: readonly Repo[] = ["code", "instructions"]
export const readRepoFile: (ctx: BuildContext, repo: Repo, path: string) => string | null = () =>
  oldGraphGone("readRepoFile")
export const readRepos: (commit: string, repos?: readonly Repo[]) => BuildContext = () =>
  oldGraphGone("readRepos")
