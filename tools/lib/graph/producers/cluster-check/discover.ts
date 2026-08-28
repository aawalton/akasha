import { oldGraphGone } from "../../graph-gone.ts"
import type { ClusterCheckAttrs } from "./types.ts"

export type PageTree = {
  readonly files: readonly string[]
  readonly read: (path: string) => string | null
}
export const readClusterCheckPages: (tree: PageTree) => readonly ClusterCheckAttrs[] = () =>
  oldGraphGone("readClusterCheckPages")
