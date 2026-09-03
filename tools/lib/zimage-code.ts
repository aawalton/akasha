import { enforceSpawnAdmission } from "@akasha/utils-system/memory-guard"
import { buildModelGraph, type RenderParams } from "@akasha/zimage/zimage-graph"
import { MODEL_IDS, MODELS, type ModelSpec, toModelId } from "@akasha/zimage/zimage-models"
import { fetchImage, freeComfyMemory, runComfyGraph } from "./inference/cli/comfy-client.ts"

export type ComfyGraph = unknown

export type { ModelSpec, RenderParams }

export interface ImageRef {
  readonly filename: string
  readonly subfolder: string
  readonly type: string
}

export interface ZimageCode {
  readonly runComfyGraph: typeof runComfyGraph
  readonly fetchImage: typeof fetchImage
  readonly freeComfyMemory: typeof freeComfyMemory
  readonly MODEL_IDS: typeof MODEL_IDS
  readonly MODELS: typeof MODELS
  readonly toModelId: typeof toModelId
  readonly buildModelGraph: typeof buildModelGraph
  readonly enforceSpawnAdmission: (label: string) => void
}

export async function zimageCode(): Promise<ZimageCode> {
  return {
    runComfyGraph,
    fetchImage,
    freeComfyMemory,
    MODEL_IDS,
    MODELS,
    toModelId,
    buildModelGraph,
    enforceSpawnAdmission,
  }
}
