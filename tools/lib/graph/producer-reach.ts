import type { Repo } from "../../../page/document/types.ts"
import { oldGraphGone } from "./graph-gone.ts"

export type Reach = ReadonlyMap<Repo, readonly string[]>
export type ReachTree = {
  readonly files: readonly string[]
  readonly read: (path: string) => string | null
}
export const EDGE_PRODUCER_PAGE_DIR = "pages/old-graph-edge-producer"
export const PRODUCER_PAGE_DIR = "pages/old-graph-node-producer"
export const REACHED_REPO: Repo = "instructions"
export const narrowedTo: (
  files: readonly string[],
  globs: readonly string[] | undefined
) => readonly string[] = () => oldGraphGone("narrowedTo")
export const readProducerReach: (tree: ReachTree) => Reach = () => oldGraphGone("readProducerReach")
export const withinReach: (path: string, globs: readonly string[]) => boolean = () =>
  oldGraphGone("withinReach")
