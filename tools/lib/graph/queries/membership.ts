import { oldGraphGone } from "../graph-gone.ts"
import type { Graph, Node, NodeId } from "../types.ts"

export type Repo = NonNullable<Node["repo"]>
export type ClosureMembership =
  | { readonly kind: "all" }
  | { readonly kind: "none" }
  | { readonly kind: "reached"; readonly reached: ReadonlySet<NodeId> }
export type ClosureSeeds = {
  readonly nodes?: readonly NodeId[]
  readonly nodeTypes?: readonly PopulationEntry[]
  readonly closurePolicy?: "import-graph"
}
export type PopulationEntry = string | ScopedPopulation
export type ScopedPopulation = {
  readonly kind: string
  readonly under: string
}
export const GRAPH_EXEMPT_DIRS: ReadonlySet<string> = new Set(["__fixtures__", "generated"])
export const MEMBERSHIP_ALL: ClosureMembership = { kind: "all" }
export const membershipCoversPath: (
  graph: Graph,
  membership: ClosureMembership,
  path: string,
  repo?: Repo
) => boolean = () => oldGraphGone("membershipCoversPath")
export const pathsStandingNowhere: (
  graph: Graph,
  paths: readonly string[],
  repo?: Repo
) => readonly string[] = () => oldGraphGone("pathsStandingNowhere")
export const resolveClosureMembership: (graph: Graph, seeds: ClosureSeeds) => ClosureMembership =
  () => oldGraphGone("resolveClosureMembership")
