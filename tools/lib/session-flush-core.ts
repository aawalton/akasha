
import { existsSync, readFileSync } from "node:fs"
import { type FlushStatus, flushOutcome } from "./session-flush-decide.ts"
import type { ObjectStore } from "./object-store.ts"
import {
  getDefaultObjectStore,
  sessionObjectKeyFor,
  syncSessionFileToObjectStore,
} from "./session-stream.ts"
import { transcriptCarriesSession } from "./transcript-materialize.ts"

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

const TRANSCRIPT_TIMEOUT_MS = 10_000

const TRANSCRIPT_POLL_MS = 250

export async function flushTranscriptFirstObject(opts: {
  store: ObjectStore | null
  key: string
  transcriptPath: string
  sessionId: string
  timeoutMs: number
  pollMs: number
}): Promise<{ bytes: number; status: FlushStatus }> {
  const deadline = Date.now() + opts.timeoutMs
  let ready = false
  while (Date.now() < deadline) {
    if (
      existsSync(opts.transcriptPath) &&
      transcriptCarriesSession(readFileSync(opts.transcriptPath, "utf-8"), opts.sessionId)
    ) {
      ready = true
      break
    }
    await sleep(opts.pollMs)
  }

  const storePresent = opts.store !== null
  let bytes = 0
  if (ready && storePresent) {
    bytes = await syncSessionFileToObjectStore(opts.store, opts.key, opts.transcriptPath, {
      lastFlushedOffset: 0,
    })
  }
  return { bytes, status: flushOutcome({ storePresent, ready, bytes }) }
}

export async function flushSession(
  agentId: string,
  sessionId: string,
  transcriptPath: string
): Promise<void> {
  try {
    await flushTranscriptFirstObject({
      store: getDefaultObjectStore(),
      key: sessionObjectKeyFor(agentId),
      transcriptPath,
      sessionId,
      timeoutMs: TRANSCRIPT_TIMEOUT_MS,
      pollMs: TRANSCRIPT_POLL_MS,
    })
  } catch (err) {
    process.stderr.write(`[session-flush] flush failed for ${agentId}: ${String(err)}\n`)
  }
}
