// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import type { Repo } from "../../../page/document/types.ts"
import { oldGraphGone } from "./graph-gone.ts"
import type { BuildContext } from "./types.ts"

export type SnapshotIdentity = {
  readonly commit: string
  readonly repos: Readonly<Partial<Record<Repo, string>>>
}
export const identityKey: (identity: SnapshotIdentity) => string = () => oldGraphGone("identityKey")
export const identityOf: (ctx: BuildContext) => SnapshotIdentity = () => oldGraphGone("identityOf")
