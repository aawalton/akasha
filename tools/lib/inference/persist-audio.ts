import { OperationalError } from "@shared/errors-core/exit"
import { seaweedFSObjectStoreFromEnv } from "../object-store.ts"
import { audioObjectKey } from "../object-store-keys"
import type { Json } from "@shared/supabase-database/generated/database"
import { landRow } from "./generation-log"
import type { InferenceRunRecord } from "./inference-run-record"
import { persistInferenceMedia, shouldPersistMedia } from "./persist-media"

export const AUDIO_PAGE_TYPE_SLUG = "audio"

const AUDIO_OPERATIONS = new Set(["voice-design", "voice-clone", "music"])

export function deriveAudioEngine(service: string, operation: string): string {
  if (operation === "music") return "ace-step"
  return service
}

export function shouldPersistAudio(operation: string, persist: boolean | undefined): boolean {
  return shouldPersistMedia(operation, persist, AUDIO_OPERATIONS)
}

export interface AudioPersistInput {
  readonly record: InferenceRunRecord
  readonly inferenceRunId: string
  readonly outputPath: string
}

export function buildAudioPageProperties(input: AudioPersistInput): Record<string, Json> {
  const { record, inferenceRunId, outputPath } = input
  return {
    title: record.title,
    engine: deriveAudioEngine(record.service, record.operation),
    service: record.service,
    operation: record.operation,
    model: record.model,
    ...(record.prompt !== undefined ? { prompt: record.prompt } : {}),
    ...(record.seed !== undefined ? { seed: record.seed } : {}),
    ...(record.instruct !== undefined ? { instruct: record.instruct } : {}),
    ...(record.text !== undefined ? { text: record.text } : {}),
    ...(record.duration !== undefined ? { durationSeconds: record.duration } : {}),
    audioPath: outputPath,
    inferenceRun: inferenceRunId,
  }
}

export interface PersistAudioDeps {
  readonly createAudioPage: (properties: Record<string, Json>) => Promise<string>
  readonly publishAudio: (pageId: string, bytes: Uint8Array) => Promise<void>
}

export function defaultPersistAudioDeps(): PersistAudioDeps {
  return {
    createAudioPage: async (properties) => landRow(AUDIO_PAGE_TYPE_SLUG, properties),
    publishAudio: async (pageId, bytes) => {
      const store = seaweedFSObjectStoreFromEnv()
      if (store === null) {
        throw new OperationalError(
          "object store not configured — set SEAWEEDFS_S3_ENDPOINT / SEAWEEDFS_BUCKET / SEAWEEDFS_ACCESS_KEY / SEAWEEDFS_SECRET_KEY"
        )
      }
      await store.put(audioObjectKey(pageId), new Uint8Array(bytes))
    },
  }
}

export async function persistInferenceAudio(
  deps: PersistAudioDeps,
  input: AudioPersistInput & { readonly outputBytes: Uint8Array }
): Promise<string> {
  return persistInferenceMedia(
    { createPage: deps.createAudioPage, publishBytes: deps.publishAudio },
    { properties: buildAudioPageProperties(input), outputBytes: input.outputBytes }
  )
}
