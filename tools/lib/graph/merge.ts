import { createGraph } from "./graph.ts"
import { nodeKey } from "./key.ts"
import type { Edge, EdgeTypeDef, Graph, Node, NodeTypeDef, ProducerOutput } from "./types.ts"

export type MergeRegistry = {
  readonly nodeTypes: ReadonlyMap<string, NodeTypeDef>
  readonly edgeTypes: ReadonlyMap<string, EdgeTypeDef>
}

const settleNode = (node: ProducerOutput["nodes"][number]): Node => {
  const parts =
    node.repo === undefined
      ? { type: node.type, key: node.key }
      : { type: node.type, repo: node.repo, key: node.key }
  return { ...parts, id: nodeKey(parts), attrs: node.attrs, derived: {} }
}

export const mergeProducerOutputs = (
  outputs: readonly ProducerOutput[],
  registry?: MergeRegistry
): Graph => {
  const allNodes: Node[] = outputs.flatMap((output) => output.nodes.map(settleNode))
  const allEdges: Edge[] = outputs.flatMap((output) =>
    output.edges.map((edge) => ({
      type: edge.type,
      from: edge.from,
      to: edge.to,
      attrs: edge.attrs,
      derived: {},
    }))
  )
  if (registry !== undefined) {
    for (const node of allNodes) {
      if (!registry.nodeTypes.has(node.type)) {
        throw new Error(`graph: emitted node ${node.id} has unregistered type ${node.type}`)
      }
    }
    for (const edge of allEdges) {
      if (!registry.edgeTypes.has(edge.type)) {
        throw new Error(
          `graph: emitted edge ${edge.from}->${edge.to} has unregistered type ${edge.type}`
        )
      }
    }
  }
  return createGraph(allNodes, allEdges)
}
