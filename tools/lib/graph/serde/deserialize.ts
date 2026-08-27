import { createGraph } from "../graph.ts"
import { nodeKey } from "../key.ts"
import type { Edge, Graph, Node } from "../types.ts"
import { SerializedGraphSchema } from "./types.ts"

export const parseSerializedGraph = (raw: unknown): Graph => {
  const parsed = SerializedGraphSchema.parse(raw)
  const nodes: Node[] = parsed.nodes.map((node) => {
    const parts =
      node.repo === undefined
        ? { type: node.type, key: node.key }
        : { type: node.type, repo: node.repo, key: node.key }
    return { ...parts, id: nodeKey(parts), attrs: node.attrs, derived: node.derived }
  })
  const edges: Edge[] = parsed.edges.map((edge) => ({
    type: edge.type,
    from: edge.from,
    to: edge.to,
    attrs: edge.attrs,
    derived: edge.derived,
  }))
  return createGraph(nodes, edges)
}
