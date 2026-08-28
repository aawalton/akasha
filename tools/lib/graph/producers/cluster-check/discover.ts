// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.

import { oldGraphGone } from "../../graph-gone.ts"
import type { ClusterCheckAttrs } from "./types.ts"

export type PageTree = {
  readonly files: readonly string[]
  readonly read: (path: string) => string | null
}
export const readClusterCheckPages: (tree: PageTree) => readonly ClusterCheckAttrs[] = () =>
  oldGraphGone("readClusterCheckPages")
