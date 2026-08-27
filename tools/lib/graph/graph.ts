import type { Edge, EdgeFilter, Graph, Node, NodeId } from "./types.ts"

const narrowByType = (
  edges: readonly Edge[],
  types?: string | readonly string[]
): readonly Edge[] => {
  if (types === undefined) return edges
  if (typeof types === "string") return edges.filter((edge) => edge.type === types)
  if (types.length === 0) return edges
  const set = new Set(types)
  return edges.filter((edge) => set.has(edge.type))
}

export const createGraph = (nodes: readonly Node[], edges: readonly Edge[]): Graph => {
  const nodesById = new Map<NodeId, Node>()
  const nodesByType = new Map<string, Node[]>()
  const nodesByKey = new Map<string, Node[]>()
  for (const node of nodes) {
    nodesById.set(node.id, node)
    const bucket = nodesByType.get(node.type) ?? []
    bucket.push(node)
    nodesByType.set(node.type, bucket)
    const keyed = nodesByKey.get(node.key) ?? []
    keyed.push(node)
    nodesByKey.set(node.key, keyed)
  }

  const outByFrom = new Map<NodeId, Edge[]>()
  const inByTo = new Map<NodeId, Edge[]>()
  const allEdges: Edge[] = []
  for (const edge of edges) {
    allEdges.push(edge)
    const out = outByFrom.get(edge.from) ?? []
    out.push(edge)
    outByFrom.set(edge.from, out)
    const incoming = inByTo.get(edge.to) ?? []
    incoming.push(edge)
    inByTo.set(edge.to, incoming)
  }

  const selectEdges = (filter?: EdgeFilter): readonly Edge[] => {
    if (!filter) return allEdges
    let result: readonly Edge[] = allEdges
    if (filter.from !== undefined) {
      result = outByFrom.get(filter.from) ?? []
    } else if (filter.to !== undefined) {
      result = inByTo.get(filter.to) ?? []
    }
    return narrowByType(result, filter.type)
  }

  return {
    node: (id) => nodesById.get(id),
    nodes: (typeName) => {
      if (typeName === undefined) return [...nodesById.values()]
      if (typeof typeName === "string") return nodesByType.get(typeName) ?? []
      const out: Node[] = []
      for (const name of typeName) {
        const bucket = nodesByType.get(name)
        if (bucket) out.push(...bucket)
      }
      return out
    },
    nodesByKey: (key, repo) => {
      const held = nodesByKey.get(key) ?? []
      return repo === undefined ? held : held.filter((node) => node.repo === repo)
    },
    edges: selectEdges,
    outEdges: (from, types) => narrowByType(outByFrom.get(from) ?? [], types),
    inEdges: (to, types) => narrowByType(inByTo.get(to) ?? [], types),
  }
}
