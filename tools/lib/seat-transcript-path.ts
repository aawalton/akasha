import { pageTextOf } from "./seat-page-values.ts"

const KEY = "transcript-path"

export interface TranscriptRecord {
  readonly value: string
}

export function transcriptOf(agent: string): TranscriptRecord | null {
  const held = pageTextOf(agent, KEY)
  return held === null ? null : { value: held }
}

export function transcriptRecordOf(value: string | null): TranscriptRecord | null {
  return value === null || value === "" ? null : { value }
}
