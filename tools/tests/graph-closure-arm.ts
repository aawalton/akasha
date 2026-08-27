import { createGraph } from "../lib/graph/graph.ts"
import {
  type ClosureSeeds,
  membershipCoversPath,
  resolveClosureMembership,
} from "../lib/graph/queries/membership.ts"
import type { Edge, Graph, Node } from "../lib/graph/types.ts"

export type NodeSpec = { readonly id: string; readonly type: string }

export type EdgeSpec = {
  readonly from: string
  readonly to: string
  readonly type: string
  readonly attrs?: Record<string, unknown>
}

const afterFirstColon = (id: string): string => id.substring(id.indexOf(":") + 1)

const keyOf = (id: string): string => afterFirstColon(afterFirstColon(id))

const repoIn = (id: string): Node["repo"] => {
  const [, repo] = id.split(":")
  return repo as Node["repo"]
}

const nodeOf = (id: string, type: string): Node => ({
  id,
  type,
  repo: repoIn(id),
  key: keyOf(id),
  attrs: { path: afterFirstColon(id) },
  derived: {},
})

const edgeOf = (from: string, to: string, type: string, attrs?: Record<string, unknown>): Edge => ({
  type,
  from,
  to,
  attrs: attrs ?? (type === "pkg-depends" ? { kind: "dependencies" } : {}),
  derived: {},
})

export const graphOf = (nodes: readonly NodeSpec[], edges: readonly EdgeSpec[]): Graph =>
  createGraph(
    nodes.map((one) => nodeOf(one.id, one.type)),
    edges.map((one) => edgeOf(one.from, one.to, one.type, one.attrs))
  )

export const intersects = (
  graph: Graph,
  seeds: ClosureSeeds,
  paths: readonly string[]
): boolean => {
  const held = resolveClosureMembership(graph, seeds)
  if (held.kind === "all") return true
  return paths.some((path) => membershipCoversPath(graph, held, path))
}

export const tsFile = (path: string): Node => ({
  id: `ts-file:code:${path}`,
  type: "ts-file",
  repo: "code",
  key: path,
  attrs: { path },
  derived: {},
})

export const importEdge = (from: string, to: string, typeOnly = false): Edge => ({
  type: "import-static",
  from,
  to,
  attrs: { typeOnly },
  derived: {},
})
