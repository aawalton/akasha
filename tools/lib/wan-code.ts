import {
  WAN_DEFAULT_NEGATIVE_PROMPT,
  WAN_FPS,
  WAN_FULL_STEPS,
  WAN_LIGHTNING_STEPS,
} from "@infra/wan/cli/wan-backbone"
import { codeModule } from "./code-import.ts"
import { fetchImage, runComfyGraph } from "./inference/cli/comfy-client.ts"
import { buildInferenceRunRecord, sha256Hex } from "./inference/inference-run-record.ts"
import { recordInferenceRun } from "./inference/inference-run-store.ts"


import * as extendGraphModule from "@infra/wan/cli/extend-graph"
import * as i2vGraphModule from "@infra/wan/cli/i2v-graph"

const REQUIRE_MATCH_POSITIONAL = "shared/utils-narrow/src/require-match-positional.ts"
const ZOD = "zod"

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

export type Schema = object

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
  readonly parseSizeOrNull: (raw: string) => { readonly width: number; readonly height: number } | null
}

interface RequireMatchPositional {
  readonly requireMatchPositional: (
    re: RegExp,
    schema: Schema,
    input: string,
    label?: string
  ) => readonly [number, number]
}

interface Zod {
  readonly z: {
    readonly tuple: (items: readonly Schema[]) => Schema
    readonly coerce: {
      readonly number: () => { readonly int: () => { readonly positive: () => Schema } }
    }
  }
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
  const [narrow, zod] = await Promise.all([
    codeModule<RequireMatchPositional>(REQUIRE_MATCH_POSITIONAL),
    codeModule<Zod>(ZOD),
  ])
  const sizeSchema = zod.z.tuple([
    zod.z.coerce.number().int().positive(),
    zod.z.coerce.number().int().positive(),
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
        const [width, height] = narrow.requireMatchPositional(
          /^(\d+)x(\d+)$/,
          sizeSchema,
          raw,
          "--size"
        )
        return { width, height }
      } catch {
        return null
      }
    },
  }
}
