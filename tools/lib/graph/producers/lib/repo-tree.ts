import type { Repo } from "../../../../../page/document/types.ts"
import { oldGraphGone } from "../../graph-gone.ts"
import type { BuildContext } from "../../types.ts"

export type RepoTree = {
  readonly paths: readonly string[]
  readonly hasFile: (relPath: string) => boolean
  readonly hasDir: (relPath: string) => boolean
  readonly hasPath: (relPath: string) => boolean
}
export const repoTree: (ctx: BuildContext, repo: Repo) => RepoTree = () => oldGraphGone("repoTree")
