import { createGraph } from "./graph.ts"
import type {
  Deriver,
  DeriverEdgePatch,
  DeriverNodePatch,
  DeriverOutput,
  Edge,
  Graph,
  Node,
  NodeId,
} from "./types.ts"

const KEY_JOIN = "\u0000"

const fieldKey = (typeName: string, field: string): string =>
  `${typeName}${KEY_JOIN}${field}`

const collectFieldClaims = (
  derivers: readonly Deriver[]
): { node: Map<string, string>; edge: Map<string, string> } => {
  const node = new Map<string, string>()
  const edge = new Map<string, string>()
  for (const deriver of derivers) {
    for (const write of deriver.nodeFieldWrites) {
      for (const field of write.fields) node.set(fieldKey(write.typeName, field), deriver.name)
    }
    for (const write of deriver.edgeFieldWrites) {
      for (const field of write.fields) edge.set(fieldKey(write.typeName, field), deriver.name)
    }
  }
  return { node, edge }
}

const findCycleFrom = (start: string, derivers: readonly Deriver[]): readonly string[] | null => {
  const byName = new Map<string, Deriver>()
  for (const deriver of derivers) byName.set(deriver.name, deriver)
  const stack: string[] = []
  const onStack = new Set<string>()
  const visited = new Set<string>()
  const walk = (name: string): readonly string[] | null => {
    if (onStack.has(name)) return stack.slice(stack.indexOf(name))
    if (visited.has(name)) return null
    const spec = byName.get(name)
    if (spec === undefined) return null
    visited.add(name)
    stack.push(name)
    onStack.add(name)
    for (const dep of spec.dependsOn) {
      const cycle = walk(dep)
      if (cycle) return cycle
    }
    stack.pop()
    onStack.delete(name)
    return null
  }
  return walk(start)
}

export const validateDeriverRegistration = (
  spec: Deriver,
  existing: readonly Deriver[]
): undefined => {
  if (existing.some((deriver) => deriver.name === spec.name)) {
    throw new Error(`graph: deriver already registered: ${spec.name}`)
  }
  const claims = collectFieldClaims(existing)
  for (const write of spec.nodeFieldWrites) {
    for (const field of write.fields) {
      const owner = claims.node.get(fieldKey(write.typeName, field))
      if (owner !== undefined) {
        throw new Error(
          `graph: deriver '${spec.name}' conflicts with '${owner}' on node-type '${write.typeName}' field '${field}'`
        )
      }
    }
  }
  for (const write of spec.edgeFieldWrites) {
    for (const field of write.fields) {
      const owner = claims.edge.get(fieldKey(write.typeName, field))
      if (owner !== undefined) {
        throw new Error(
          `graph: deriver '${spec.name}' conflicts with '${owner}' on edge-type '${write.typeName}' field '${field}'`
        )
      }
    }
  }
  const cycle = findCycleFrom(spec.name, [...existing, spec])
  if (cycle && cycle.length > 0) {
    throw new Error(
      `graph: cycle detected in deriver dependsOn: ${cycle.join(" -> ")} -> ${cycle[0]}`
    )
  }
  const known = new Set(existing.map((deriver) => deriver.name))
  known.add(spec.name)
  for (const dep of spec.dependsOn) {
    if (!known.has(dep)) {
      throw new Error(`graph: deriver '${spec.name}' depends on unknown deriver '${dep}'`)
    }
  }
}

const topoSort = (derivers: readonly Deriver[]): readonly Deriver[] => {
  const byName = new Map<string, Deriver>()
  for (const deriver of derivers) byName.set(deriver.name, deriver)
  const indegree = new Map<string, number>()
  for (const deriver of derivers) indegree.set(deriver.name, deriver.dependsOn.length)
  const dependents = new Map<string, string[]>()
  for (const deriver of derivers) {
    for (const dep of deriver.dependsOn) {
      const list = dependents.get(dep) ?? []
      list.push(deriver.name)
      dependents.set(dep, list)
    }
  }
  const queue: string[] = []
  for (const deriver of derivers) {
    if ((indegree.get(deriver.name) ?? 0) === 0) queue.push(deriver.name)
  }
  const order: Deriver[] = []
  while (queue.length > 0) {
    const name = queue.shift()
    if (name === undefined) break
    const spec = byName.get(name)
    if (spec === undefined) continue
    order.push(spec)
    for (const dependent of dependents.get(name) ?? []) {
      const next = (indegree.get(dependent) ?? 0) - 1
      indegree.set(dependent, next)
      if (next === 0) queue.push(dependent)
    }
  }
  return order
}

const applyNodePatches = (
  nodes: readonly Node[],
  patches: readonly DeriverNodePatch[]
): readonly Node[] => {
  if (patches.length === 0) return [...nodes]
  const byId = new Map<NodeId, Node>()
  for (const node of nodes) byId.set(node.id, node)
  for (const patch of patches) {
    const existing = byId.get(patch.id)
    if (existing === undefined) continue
    byId.set(patch.id, { ...existing, derived: { ...existing.derived, ...patch.derived } })
  }
  return [...byId.values()]
}

const edgeKey = (edge: Pick<Edge, "type" | "from" | "to">): string =>
  `${edge.type}${KEY_JOIN}${edge.from}${KEY_JOIN}${edge.to}`

const applyEdgePatches = (
  edges: readonly Edge[],
  patches: readonly DeriverEdgePatch[]
): readonly Edge[] => {
  if (patches.length === 0) return [...edges]
  const patchByKey = new Map<string, Record<string, unknown>>()
  for (const patch of patches) {
    const key = edgeKey(patch)
    patchByKey.set(key, { ...(patchByKey.get(key) ?? {}), ...patch.derived })
  }
  return edges.map((edge) => {
    const overlay = patchByKey.get(edgeKey(edge))
    return overlay === undefined ? edge : { ...edge, derived: { ...edge.derived, ...overlay } }
  })
}

export const runDerivers = (graph: Graph, derivers: readonly Deriver[]): Graph => {
  if (derivers.length === 0) return graph
  let nodes: readonly Node[] = graph.nodes()
  let edges: readonly Edge[] = graph.edges()
  let working: Graph = graph
  for (const deriver of topoSort(derivers)) {
    const out: DeriverOutput = deriver.derive(working)
    nodes = applyNodePatches(nodes, out.nodePatches)
    edges = applyEdgePatches(edges, out.edgePatches)
    working = createGraph(nodes, edges)
  }
  return working
}
