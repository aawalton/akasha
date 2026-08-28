import { oldGraphGone } from "../graph-gone.ts"
import type { Graph, Node, NodeId } from "../types.ts"
import type { PopulationEntry } from "./membership.ts"

export type Repo = NonNullable<Node["repo"]>
export type SeedFiles = {
  readonly name: string
  readonly files: readonly SeedFile[]
}
export type SeedFile = {
  readonly repo: Repo
  readonly path: string
}
export type SeedSet = {
  readonly nodes?: readonly NodeId[]
  readonly nodeTypes?: readonly PopulationEntry[]
}
export type SeedSource = SeedSet & {
  readonly name: string
  readonly package?: string
  readonly steps?: readonly SeedSet[]
  readonly policy?: "import-graph"
}
export const seedFilesFor: (graph: Graph, sources: readonly SeedSource[]) => readonly SeedFiles[] =
  () => oldGraphGone("seedFilesFor")
