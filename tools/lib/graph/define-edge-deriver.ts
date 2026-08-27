import type {
  Deriver,
  DeriverEdgePatch,
  DeriverFieldWrite,
  Edge,
  Graph,
  Node,
} from "./types.ts"

export type EdgeDeriverOutput = {
  readonly edgePatches: readonly DeriverEdgePatch[]
  readonly nodePatches?: never
}

export type EdgeDeriverSpec<_NodeShape extends Node = Node, _EdgeShape extends Edge = Edge> = {
  readonly name: string
  readonly edgeTypesRead: readonly string[]
  readonly nodeTypesRead?: readonly string[]
  readonly edgeFieldWrites: readonly DeriverFieldWrite[]
  readonly dependsOn: readonly string[]
  readonly derive: (graph: Graph) => EdgeDeriverOutput
  readonly nodeFieldWrites?: never
}

export const defineEdgeDeriver = <NodeShape extends Node = Node, EdgeShape extends Edge = Edge>(
  spec: EdgeDeriverSpec<NodeShape, EdgeShape>
): Deriver<NodeShape, EdgeShape> => ({
  name: spec.name,
  nodeTypesRead: spec.nodeTypesRead ?? [],
  edgeTypesRead: spec.edgeTypesRead,
  nodeFieldWrites: [],
  edgeFieldWrites: spec.edgeFieldWrites,
  dependsOn: spec.dependsOn,
  derive: (graph) => {
    const out = spec.derive(graph)
    return { nodePatches: [], edgePatches: out.edgePatches }
  },
})
