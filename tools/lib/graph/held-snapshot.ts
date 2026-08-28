import { oldGraphGone } from "./graph-gone.ts"
import type { SnapshotIdentity } from "./identity.ts"
import type { BuildContext, Graph } from "./types.ts"

export type SnapshotHolder = {
  readonly at: (commit: string) => Promise<HeldSnapshot>
  readonly held: () => readonly string[]
}
export type HeldSnapshot = {
  readonly identity: SnapshotIdentity
  readonly graph: Graph
}
export type SnapshotReading = {
  readonly identity: SnapshotIdentity
  readonly ctx: BuildContext
}
export const HELD_AT_ONCE = 4
export const buildFrom: (ctx: BuildContext) => Promise<Graph> = () => oldGraphGone("buildFrom")
export const createSnapshotHolder: (
  read?: (commit: string) => SnapshotReading,
  build?: (ctx: BuildContext) => Promise<Graph>
) => SnapshotHolder = () => oldGraphGone("createSnapshotHolder")
export const readAt: (commit: string) => SnapshotReading = () => oldGraphGone("readAt")
