import type { BuildContext, Graph, NodeInit, Producer } from "./types.ts"

export type NodeProducerOutput = {
  readonly nodes: readonly NodeInit[]
  readonly edges?: never
}

export type NodeProducerSpec = {
  readonly name: string
  readonly nodeTypes: readonly string[]
  readonly dependsOn?: readonly string[]
  readonly build: (
    ctx: BuildContext,
    upstream: Graph
  ) => Promise<NodeProducerOutput> | NodeProducerOutput
  readonly edgeTypes?: never
}

export const defineNodeProducer = (spec: NodeProducerSpec): Producer => ({
  name: spec.name,
  nodeTypes: spec.nodeTypes,
  edgeTypes: [],
  ...(spec.dependsOn !== undefined ? { dependsOn: spec.dependsOn } : {}),
  build: async (ctx, upstream) => {
    const out = await spec.build(ctx, upstream)
    return { nodes: out.nodes, edges: [] }
  },
})
