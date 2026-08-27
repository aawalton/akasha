import type { BuildContext, EdgeInit, Graph, Producer } from "./types.ts"

export type EdgeProducerOutput = {
  readonly edges: readonly EdgeInit[]
  readonly nodes?: never
}

export type EdgeProducerSpec = {
  readonly name: string
  readonly edgeTypes: readonly string[]
  readonly dependsOn?: readonly string[]
  readonly build: (
    ctx: BuildContext,
    upstream: Graph
  ) => Promise<EdgeProducerOutput> | EdgeProducerOutput
  readonly nodeTypes?: never
}

export const defineEdgeProducer = (spec: EdgeProducerSpec): Producer => ({
  name: spec.name,
  nodeTypes: [],
  edgeTypes: spec.edgeTypes,
  ...(spec.dependsOn !== undefined ? { dependsOn: spec.dependsOn } : {}),
  build: async (ctx, upstream) => {
    const out = await spec.build(ctx, upstream)
    return { nodes: [], edges: out.edges }
  },
})
