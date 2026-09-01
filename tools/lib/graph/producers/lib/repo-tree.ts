import type { Repo } from "@akasha/pages-system/markdown-document"
import { oldGraphGone } from "../../graph-gone.ts"
import type { BuildContext } from "../../types.ts"

export type RepoTree = {
  readonly paths: readonly string[]
  readonly hasFile: (relPath: string) => boolean
  readonly hasDir: (relPath: string) => boolean
  readonly hasPath: (relPath: string) => boolean
}
export const repoTree: (ctx: BuildContext, repo: Repo) => RepoTree = () => oldGraphGone("repoTree")
