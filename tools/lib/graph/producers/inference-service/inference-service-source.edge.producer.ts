import { defineEdgeProducer } from "../../define-edge-producer.ts"
import type { EdgeInit } from "../../types.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import {
  INFERENCE_SERVICE_NODE_TYPE,
  INFERENCE_SERVICE_SOURCE_EDGE_TYPE,
  InferenceServiceAttrsSchema,
  type InferenceServiceSourceAttrs,
} from "./types.ts"

export const inferenceServiceSourceEdgeProducer = defineEdgeProducer({
  name: "inference-service-source",
  edgeTypes: [INFERENCE_SERVICE_SOURCE_EDGE_TYPE],
  dependsOn: ["inference-service", "file"],
  build: (_ctx, graph) => {
    const edges: EdgeInit[] = []
    const attrs: InferenceServiceSourceAttrs = {}
    const all = graph.nodes()
    for (const service of graph.nodes(INFERENCE_SERVICE_NODE_TYPE)) {
      const held = InferenceServiceAttrsSchema.parse(service.attrs)
      const under = `${held.sourceRoot}/`
      for (const node of all) {
        if (node.repo !== CODE_REPO) continue
        if (!node.key.startsWith(under)) continue
        edges.push({
          type: INFERENCE_SERVICE_SOURCE_EDGE_TYPE,
          from: service.id,
          to: node.id,
          attrs,
        })
      }
    }
    return { edges }
  },
})

export default inferenceServiceSourceEdgeProducer
