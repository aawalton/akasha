import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import {
  WAN_DEFAULT_NEGATIVE_PROMPT,
  WAN_FPS,
  WAN_FULL_STEPS,
  WAN_LIGHTNING_STEPS,
} from "@akasha/wan/wan-backbone"
import * as extendGraphModule from "@akasha/wan/wan-extend-graph"
import * as i2vGraphModule from "@akasha/wan/wan-i2v-graph"
import { z } from "zod"
import { fetchImage, runComfyGraph } from "./inference/cli/comfy-client.ts"
import { buildInferenceRunRecord, sha256Hex } from "./inference/inference-run-record.ts"
import { recordInferenceRun } from "./inference/inference-run-store.ts"

export type ComfyGraph = unknown
export type InferenceRunRecord = unknown

export interface ImageRef {
  readonly filename: string
  readonly subfolder: string
  readonly type: string
}

export interface InferenceRunResult {
  readonly outputPath: string
  readonly outputBytes: Uint8Array
}

export interface WanCode {
  readonly runComfyGraph: typeof runComfyGraph
  readonly fetchImage: typeof fetchImage
  readonly buildInferenceRunRecord: typeof buildInferenceRunRecord
  readonly sha256Hex: typeof sha256Hex
  readonly recordInferenceRun: typeof recordInferenceRun
  readonly WAN_DEFAULT_NEGATIVE_PROMPT: string
  readonly WAN_FPS: number
  readonly WAN_FULL_STEPS: number
  readonly WAN_LIGHTNING_STEPS: number
  readonly parseSizeOrNull: (
    raw: string
  ) => { readonly width: number; readonly height: number } | null
}

export type I2vGraph = typeof i2vGraphModule

export type ExtendGraph = typeof extendGraphModule

export async function i2vGraph(): Promise<I2vGraph> {
  return i2vGraphModule
}

export async function extendGraph(): Promise<ExtendGraph> {
  return extendGraphModule
}

export async function wanCode(): Promise<WanCode> {
  const sizeSchema = z.tuple([
    z.coerce.number().int().positive(),
    z.coerce.number().int().positive(),
  ])
  return {
    runComfyGraph,
    fetchImage,
    buildInferenceRunRecord,
    sha256Hex,
    recordInferenceRun,
    WAN_DEFAULT_NEGATIVE_PROMPT,
    WAN_FPS,
    WAN_FULL_STEPS,
    WAN_LIGHTNING_STEPS,
    parseSizeOrNull: (raw) => {
      try {
        const [width, height] = requireMatchPositional(/^(\d+)x(\d+)$/, sizeSchema, raw, "--size")
        return { width, height }
      } catch {
        return null
      }
    },
  }
}
