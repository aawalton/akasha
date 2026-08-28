import { oldGraphGone } from "./graph-gone.ts"
import type { Deriver, DeriverFieldWrite, DeriverNodePatch, Edge, Graph, Node } from "./types.ts"

export type NodeDeriverSpec<_NodeShape extends Node = Node, _EdgeShape extends Edge = Edge> = {
  readonly name: string
  readonly nodeTypesRead: readonly string[]
  readonly edgeTypesRead?: readonly string[]
  readonly nodeFieldWrites: readonly DeriverFieldWrite[]
  readonly dependsOn: readonly string[]
  readonly derive: (graph: Graph) => NodeDeriverOutput
  readonly edgeFieldWrites?: never
}
export type NodeDeriverOutput = {
  readonly nodePatches: readonly DeriverNodePatch[]
  readonly edgePatches?: never
}
export const defineNodeDeriver: <NodeShape extends Node = Node, EdgeShape extends Edge = Edge>(
  spec: NodeDeriverSpec<NodeShape, EdgeShape>
) => Deriver<NodeShape, EdgeShape> = () => oldGraphGone("defineNodeDeriver")
