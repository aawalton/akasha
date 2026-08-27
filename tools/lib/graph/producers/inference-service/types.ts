import { z } from "zod"

export type InferenceServiceNodeType = "inference-service"
export const INFERENCE_SERVICE_NODE_TYPE: InferenceServiceNodeType = "inference-service"

export type InferenceServiceSourceEdgeType = "inference-service-source"
export const INFERENCE_SERVICE_SOURCE_EDGE_TYPE: InferenceServiceSourceEdgeType =
  "inference-service-source"

export type InferenceServiceAttrs = {
  readonly name: string
  readonly hostname: string
  readonly sourceRoot: string
}

export const InferenceServiceAttrsSchema = z
  .object({
    name: z.string(),
    hostname: z.string(),
    sourceRoot: z.string(),
  })
  .passthrough()

export type InferenceServiceSourceAttrs = Record<string, never>
