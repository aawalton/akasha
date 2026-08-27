import type { Graph, Node, NodeId } from "../types.ts"
import { closureFromSeeds, importGraphClosureFromSeeds } from "./closure.ts"

export type ScopedPopulation = {
  readonly kind: string
  readonly under: string
}

export type PopulationEntry = string | ScopedPopulation

export type ClosureSeeds = {
  readonly nodes?: readonly NodeId[]
  readonly nodeTypes?: readonly PopulationEntry[]
  readonly closurePolicy?: "import-graph"
}

export type ClosureMembership =
  | { readonly kind: "all" }
  | { readonly kind: "none" }
  | { readonly kind: "reached"; readonly reached: ReadonlySet<NodeId> }

export const MEMBERSHIP_ALL: ClosureMembership = { kind: "all" }
export const MEMBERSHIP_NONE: ClosureMembership = { kind: "none" }

export type Repo = NonNullable<Node["repo"]>

export const nodesAtKey = (graph: Graph, key: string, repo?: Repo): readonly Node[] =>
  graph.nodesByKey(key, repo)

const isScoped = (entry: PopulationEntry): entry is ScopedPopulation =>
  typeof entry === "object" && entry !== null

const pathIn = (attrs: unknown): string | undefined => {
  if (typeof attrs !== "object" || attrs === null) return undefined
  const held = attrs as Record<string, unknown>
  if (typeof held.path === "string") return held.path
  if (typeof held.sourcePath === "string") return held.sourcePath
  return undefined
}

export const populationOf = (graph: Graph, entry: PopulationEntry): readonly NodeId[] => {
  if (!isScoped(entry)) return graph.nodes(entry).map((node) => node.id)
  const prefix = `${entry.under}/`
  const ids: NodeId[] = []
  for (const node of graph.nodes(entry.kind)) {
    const path = pathIn(node.attrs)
    if (path === undefined) continue
    if (path === entry.under || path.startsWith(prefix)) ids.push(node.id)
  }
  return ids
}

export const resolveClosureMembership = (graph: Graph, seeds: ClosureSeeds): ClosureMembership => {
  const named = seeds.nodes !== undefined && seeds.nodes.length > 0
  const typed = seeds.nodeTypes !== undefined && seeds.nodeTypes.length > 0
  if (!named && !typed) return MEMBERSHIP_ALL

  const seedIds = new Set<NodeId>()
  for (const id of seeds.nodes ?? []) seedIds.add(id)
  for (const entry of seeds.nodeTypes ?? []) {
    for (const id of populationOf(graph, entry)) seedIds.add(id)
  }
  if (seedIds.size === 0) return MEMBERSHIP_ALL

  const reached =
    seeds.closurePolicy === "import-graph"
      ? importGraphClosureFromSeeds(graph, seedIds)
      : closureFromSeeds(graph, seedIds)
  if (reached.size === 0) return MEMBERSHIP_NONE

  return { kind: "reached", reached }
}

export const membershipCoversPath = (
  graph: Graph,
  membership: ClosureMembership,
  path: string,
  repo?: Repo
): boolean => {
  if (membership.kind === "all") return true
  if (membership.kind === "none") return false
  return nodesAtKey(graph, path, repo).some((node) => membership.reached.has(node.id))
}

export const GRAPH_EXEMPT_DIRS: ReadonlySet<string> = new Set(["__fixtures__", "generated"])

export const isOutsideGraphDomain = (path: string): boolean => {
  const segments = path.split("/")
  if (segments.includes("__fixtures__")) return true
  if (path.endsWith(".ts") || path.endsWith(".tsx")) return false
  return segments.includes("generated")
}

export const pathsStandingNowhere = (
  graph: Graph,
  paths: readonly string[],
  repo?: Repo
): readonly string[] =>
  paths.filter((path) => !isOutsideGraphDomain(path) && nodesAtKey(graph, path, repo).length === 0)
