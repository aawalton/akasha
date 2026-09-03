import { existsSync, readdirSync, unwatchFile, watchFile } from "node:fs"
import { stat } from "node:fs/promises"
import type { ObjectStore } from "@akasha/object-store/seaweedfs-store"
import { keepSeatTranscript } from "@akasha/seat-system/supervisor-heartbeat-beat"
import { sessionOf } from "../../akasha/seat-system/seat-session/seat-session.module.code.ts"
import { transcriptOf } from "../../akasha/seat-system/seat-transcript-path/seat-transcript-path.module.code.ts"
import { readTranscriptSessionId } from "./session-jsonl.ts"
import {
  getDefaultObjectStore,
  sessionObjectKeyFor,
  syncSessionFileToObjectStore,
} from "./session-stream.ts"

const FALLBACK_AFTER_MS = 15_000

const DISCOVER_INTERVAL_MS = 2_000

const SESSION_ID_PROBE_BYTES = 256 * 1024

const RECHECK_CEILING = 5

interface Reached {
  readonly store: ObjectStore
}

async function reach(): Promise<Reached | null> {
  const store = getDefaultObjectStore()
  if (store === null) {
    console.log("[session-watch] streaming disabled — no object store, so the watch is a no-op")
    return null
  }
  return { store }
}

async function transcriptSessionId(at: Reached, filePath: string): Promise<string | null> {
  try {
    return readTranscriptSessionId(await Bun.file(filePath).slice(0, SESSION_ID_PROBE_BYTES).text())
  } catch {
    return null
  }
}

async function newestJsonlAfter(projDir: string, startedAt: number): Promise<string | null> {
  if (!existsSync(projDir)) return null
  let newest: { name: string; mtimeMs: number } | null = null
  for (const name of readdirSync(projDir).filter((one) => one.endsWith(".jsonl"))) {
    const seen = await stat(`${projDir}/${name}`).catch(() => null)
    if (seen === null || seen.mtimeMs < startedAt - 5_000) continue
    if (newest === null || seen.mtimeMs > newest.mtimeMs) newest = { name, mtimeMs: seen.mtimeMs }
  }
  return newest === null ? null : `${projDir}/${newest.name}`
}

export function watchSessionFile(agentId: string, _sessionId: string, projDir: string): () => void {
  let stopped = false
  let watchedPath: string | null = null
  let uploading = false
  let expectedSessionId: string | null = null
  const startedAt = Date.now()
  const syncState = { lastFlushedOffset: 0 }
  const refused = new Set<string>()
  const reached = reach().catch((err) => {
    console.error(
      "[session-watch] the object store did not answer:",
      err instanceof Error ? err.message : String(err)
    )
    return null
  })

  const doUpload = async (at: Reached, filePath: string): Promise<void> => {
    if (uploading) return
    uploading = true
    try {
      if (expectedSessionId !== null) {
        const held = await transcriptSessionId(at, filePath)
        if (held !== null && held !== expectedSessionId) {
          console.error(
            `[session-watch] REFUSING flush for agent ${agentId}: ${filePath} holds session ${held}, expected ${expectedSessionId} — cross-agent transcript wiring prevented (#13186)`
          )
          return
        }
      }
      const key = sessionObjectKeyFor(agentId)
      for (let round = 0; round < RECHECK_CEILING; round += 1) {
        const before = await stat(filePath).catch(() => null)
        if (before === null) break
        await syncSessionFileToObjectStore(at.store, key, filePath, syncState)
        const after = await stat(filePath).catch(() => null)
        if (after === null || after.size === before.size) break
      }
    } catch (err) {
      console.error("[session-watch] append error:", err)
    } finally {
      uploading = false
    }
  }

  const onChange = (curr: import("node:fs").Stats, prev: import("node:fs").Stats): void => {
    if (curr.mtimeMs === prev.mtimeMs || watchedPath === null) return
    void reached.then((at) => {
      if (at === null || watchedPath === null) return
      return doUpload(at, watchedPath)
    })
  }

  const beginWatching = async (
    at: Reached,
    path: string,
    via: "seat" | "fallback"
  ): Promise<boolean> => {
    if (refused.has(path)) return false
    const own = sessionOf(agentId)?.value ?? null
    const held = await transcriptSessionId(at, path)
    if (own !== null && held !== null && held !== own) {
      refused.add(path)
      console.error(
        `[session-watch] REFUSING ${via} bind for agent ${agentId}: candidate ${path} holds session ${held} but this agent owns session ${own} — cross-agent transcript wiring prevented (#13186)`
      )
      return false
    }
    expectedSessionId = own ?? held
    watchedPath = path
    keepSeatTranscript(agentId, path)
    console.log(`[session-watch] watching ${path} (via ${via})`)
    watchFile(path, { interval: 3_000 }, onChange)
    void doUpload(at, path).catch((err) =>
      console.error("[session-watch] initial upload error:", err)
    )
    return true
  }

  let discovering = false
  const discoverInterval = setInterval(() => {
    if (stopped) {
      clearInterval(discoverInterval)
      return
    }
    if (discovering) return
    discovering = true
    void (async () => {
      try {
        const at = await reached
        if (at === null) {
          clearInterval(discoverInterval)
          return
        }
        const stated = transcriptOf(agentId)
        if (stated !== null) {
          if (existsSync(stated.value)) {
            if (await beginWatching(at, stated.value, "seat")) clearInterval(discoverInterval)
          }
          return
        }
        if (Date.now() - startedAt < FALLBACK_AFTER_MS) return
        const newest = await newestJsonlAfter(projDir, startedAt)
        if (newest === null) return
        console.log("[session-watch] the seat states no transcript — using newest-jsonl fallback")
        if (await beginWatching(at, newest, "fallback")) clearInterval(discoverInterval)
      } catch (err) {
        console.error("[session-watch] discovery error:", err)
      } finally {
        discovering = false
      }
    })()
  }, DISCOVER_INTERVAL_MS)

  return () => {
    stopped = true
    clearInterval(discoverInterval)
    if (watchedPath !== null) unwatchFile(watchedPath, onChange)
  }
}
