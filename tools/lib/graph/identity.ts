import type { Repo } from "@akasha/pages-system/markdown-document"
import { oldGraphGone } from "./graph-gone.ts"
import type { BuildContext } from "./types.ts"

export type SnapshotIdentity = {
  readonly commit: string
  readonly repos: Readonly<Partial<Record<Repo, string>>>
}
export const identityKey: (identity: SnapshotIdentity) => string = () => oldGraphGone("identityKey")
export const identityOf: (ctx: BuildContext) => SnapshotIdentity = () => oldGraphGone("identityOf")
