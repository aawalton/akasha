import { nodeKey } from "../key.ts"
import type { Edge, Graph, NodeId } from "../types.ts"

const CODE = "code"

export const codeNodeId = (type: string, key: string): NodeId =>
  nodeKey({ type, repo: CODE, key })

export const CLOSURE_EDGE_TYPES: readonly string[] = [
  "pkg-depends",
  "pkg-contains-file",
  "k8s-uses-config",
  "k8s-uses-secret",
  "k8s-uses-service-account",
  "k8s-uses-pvc",
  "workflow-depends-on",
  "synth-generated-by",
  "rbac-applies",
  "sops-secret",
  "applyrbac-uses",
  "dockerfile-recipe-input",
  "tunnel-config-recipe-input",
]

const PKG_DEPENDS_EDGE = "pkg-depends"
const PKG_DEPENDS_KINDS: ReadonlySet<string> = new Set(["dependencies", "devDependencies"])
const SYNTH_GENERATED_BY_EDGE = "synth-generated-by"
const PKG_CONTAINS_FILE_EDGE = "pkg-contains-file"

export const TS_FILE_NODE = "ts-file"
const TSX_FILE_NODE = "tsx-file"
const PACKAGE_NODE = "package"
const WORKFLOW_NODE = "workflow"
const NAMESPACE_ROLE_NODE = "namespace-role"

const IMPORT_DYNAMIC_EDGE = "import-dynamic"
const IMPORT_EDGES: readonly string[] = ["import-static", IMPORT_DYNAMIC_EDGE, "re-export"]

const fieldIn = (attrs: unknown, name: string): unknown =>
  typeof attrs === "object" && attrs !== null ? (attrs as Record<string, unknown>)[name] : undefined

export const attrText = (attrs: unknown, name: string): string | undefined => {
  const held = fieldIn(attrs, name)
  return typeof held === "string" ? held : undefined
}

const sourcePathIn = (attrs: unknown): string | undefined => attrText(attrs, "sourcePath")

const declaredSourcePaths = (attrs: unknown): readonly string[] => {
  const held = fieldIn(attrs, "declarations")
  if (!Array.isArray(held)) return []
  const paths: string[] = []
  for (const one of held) {
    const path = sourcePathIn(one)
    if (path === undefined) return []
    paths.push(path)
  }
  return paths
}

const importEdgeCarries = (edge: Edge): boolean => {
  if (edge.type === IMPORT_DYNAMIC_EDGE) return true
  return fieldIn(edge.attrs, "typeOnly") !== true
}

export const importGraphClosureFromSeeds = (
  graph: Graph,
  seedIds: Iterable<NodeId>
): Set<NodeId> => {
  const reached = new Set<NodeId>()
  const queue: NodeId[] = []

  const enqueue = (id: NodeId): undefined => {
    if (reached.has(id)) return
    if (graph.node(id) === undefined) return
    reached.add(id)
    queue.push(id)
  }

  for (const id of seedIds) enqueue(id)

  while (queue.length > 0) {
    const current = queue.shift()
    if (current === undefined) break
    const node = graph.node(current)
    if (node === undefined) continue

    if (node.type === PACKAGE_NODE) {
      for (const edge of graph.outEdges(current, [PKG_CONTAINS_FILE_EDGE])) enqueue(edge.to)
      continue
    }

    if (node.type === WORKFLOW_NODE) {
      const sourcePath = sourcePathIn(node.attrs)
      if (sourcePath !== undefined) {
        enqueue(nodeKey({ type: TS_FILE_NODE, repo: node.repo, key: sourcePath }))
      }
      continue
    }

    if (node.type === TS_FILE_NODE || node.type === TSX_FILE_NODE) {
      for (const edge of graph.outEdges(current, IMPORT_EDGES)) {
        if (!importEdgeCarries(edge)) continue
        enqueue(edge.to)
      }
    }
  }

  return reached
}

export const closureFromSeeds = (graph: Graph, seedIds: Iterable<NodeId>): Set<NodeId> => {
  const reached = new Set<NodeId>()
  const synthModuleIds = new Set<NodeId>()
  const queue: NodeId[] = []

  for (const id of seedIds) {
    if (reached.has(id)) continue
    if (graph.node(id) === undefined) continue
    reached.add(id)
    queue.push(id)
  }

  while (queue.length > 0) {
    const current = queue.shift()
    if (current === undefined) break
    for (const edge of graph.outEdges(current, CLOSURE_EDGE_TYPES)) {
      if (edge.type === PKG_DEPENDS_EDGE) {
        const kind = attrText(edge.attrs, "kind")
        if (kind === undefined || !PKG_DEPENDS_KINDS.has(kind)) continue
      }
      if (edge.type === SYNTH_GENERATED_BY_EDGE) synthModuleIds.add(edge.to)
      if (reached.has(edge.to)) continue
      if (graph.node(edge.to) === undefined) continue
      reached.add(edge.to)
      queue.push(edge.to)
    }
  }

  const folded: NodeId[] = []
  for (const id of reached) {
    const node = graph.node(id)
    if (node === undefined) continue
    if (node.type === WORKFLOW_NODE) {
      const sourcePath = sourcePathIn(node.attrs)
      if (sourcePath !== undefined) {
        folded.push(nodeKey({ type: TS_FILE_NODE, repo: node.repo, key: sourcePath }))
      }
      continue
    }
    if (node.type === NAMESPACE_ROLE_NODE) {
      for (const sourcePath of declaredSourcePaths(node.attrs)) {
        folded.push(codeNodeId(TS_FILE_NODE, sourcePath))
      }
    }
  }
  for (const id of folded) reached.add(id)

  for (const id of importGraphClosureFromSeeds(graph, synthModuleIds)) reached.add(id)

  return reached
}
