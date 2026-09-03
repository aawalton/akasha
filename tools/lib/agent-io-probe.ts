import { closeSync, openSync, readSync, statSync } from "node:fs"
import {
  type TranscriptRecord,
  transcriptOf,
} from "../../akasha/seat-system/seat-transcript-path/seat-transcript-path.module.code.ts"

export function readTranscriptMtimeMs(agentId: string): number | null {
  const stated = transcriptOf(agentId)
  if (stated === null) return null
  const st = statSync(stated.value, { throwIfNoEntry: false })
  return st ? st.mtimeMs : null
}

export function readOwnTranscriptTail(
  agentId: string,
  maxBytes = 65_536,
  readTranscript: (id: string) => TranscriptRecord | null = transcriptOf
): string | null {
  const stated = readTranscript(agentId)
  if (stated === null) return null
  const st = statSync(stated.value, { throwIfNoEntry: false })
  if (!st) return null
  const start = Math.max(0, st.size - maxBytes)
  const length = st.size - start
  if (length <= 0) return ""
  const fd = openSync(stated.value, "r")
  try {
    const buf = Buffer.alloc(length)
    const read = readSync(fd, buf, 0, length, start)
    return buf.toString("utf8", 0, read)
  } finally {
    closeSync(fd)
  }
}
