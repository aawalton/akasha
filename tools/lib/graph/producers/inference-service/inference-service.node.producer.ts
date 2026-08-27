import { defineNodeProducer } from "../../define-node-producer.ts"
import type { NodeInit } from "../../types.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { discoverInferenceServices } from "./discover.ts"
import { INFERENCE_SERVICE_NODE_TYPE, type InferenceServiceAttrs } from "./types.ts"

export const buildInferenceServiceNodes = (
  services: readonly InferenceServiceAttrs[]
): readonly NodeInit[] =>
  services.map((service): NodeInit<"inference-service", InferenceServiceAttrs> => ({
    type: INFERENCE_SERVICE_NODE_TYPE,
    repo: CODE_REPO,
    key: service.name,
    attrs: service,
  }))

export const inferenceServiceNodeProducer = defineNodeProducer({
  name: "inference-service",
  nodeTypes: [INFERENCE_SERVICE_NODE_TYPE],
  dependsOn: [],
  build: (ctx) => ({ nodes: buildInferenceServiceNodes(discoverInferenceServices(ctx)) }),
})

export default inferenceServiceNodeProducer
