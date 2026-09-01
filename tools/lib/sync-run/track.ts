import { patchPage, patchRow, writeRow } from "@shared/pages-query"
import { askPage } from "@shared/pages-query/ask"
import type { SyncResult } from "./result.ts"

const SYNC_RUN_SLUG = "sync-run"
const SYNC_SLUG = "sync"

export const SYNC_WRITER = "sync-run-tracker"

const STALE_RUN_THRESHOLD_MS = 7 * 60 * 60 * 1000

type Row = Record<string, string | number | boolean>

function millisAt(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null
  if (typeof value !== "string" || value === "") return null
  const parsed = Date.parse(value)
  return Number.isNaN(parsed) ? null : parsed
}

async function sweepStaleRun(
  source: string,
  startedAtMs: number,
  staleAfterMs: number
): Promise<void> {
  const asked = await askPage(SYNC_SLUG, source)
  if (asked.outcome === "absent") return
  if (asked.outcome === "unasked") {
    throw new Error(
      `sweepStaleRun(${source}): whether a run of this sync is still marked running went unread, so a stale one could not be swept: ${asked.why}`
    )
  }
  const values = asked.page.values
  const runId = values["running-run"]
  if (typeof runId !== "string" || runId === "") return
  const sinceMs = millisAt(values["running-since-at"])
  if (sinceMs !== null && sinceMs >= startedAtMs - staleAfterMs) return
  await patchRow(
    SYNC_RUN_SLUG,
    source,
    {
      id: runId,
      status: "failed",
      "completed-at": new Date(startedAtMs).toISOString(),
      "error-message": "stale: process terminated before recording completion",
    },
    SYNC_WRITER
  )
}

export async function trackSyncRun(
  source: string,
  syncFn: () => Promise<SyncResult>,
  staleAfterMs: number = STALE_RUN_THRESHOLD_MS
): Promise<void> {
  const startedAtMs = Date.now()
  const startedAt = new Date(startedAtMs).toISOString()

  await sweepStaleRun(source, startedAtMs, staleAfterMs)

  const runId = Bun.randomUUIDv7()
  await writeRow(
    SYNC_RUN_SLUG,
    source,
    { id: runId, source, status: "running", "started-at": startedAt },
    SYNC_WRITER
  )
  await patchPage(
    SYNC_SLUG,
    source,
    { "running-run": runId, "running-since-at": startedAt },
    SYNC_WRITER
  )

  let recorded = false
  const finalize = async (set: Row): Promise<void> => {
    recorded = true
    await patchRow(SYNC_RUN_SLUG, source, { id: runId, ...set }, SYNC_WRITER)
    await patchPage(SYNC_SLUG, source, { "running-run": "", "running-since-at": "" }, SYNC_WRITER)
  }

  const onSignal = (signal: NodeJS.Signals, code: number): undefined => {
    if (recorded) return
    recorded = true
    const completedAtMs = Date.now()
    void patchRow(
      SYNC_RUN_SLUG,
      source,
      {
        id: runId,
        status: "failed",
        "completed-at": new Date(completedAtMs).toISOString(),
        "duration-ms": completedAtMs - startedAtMs,
        "error-message": `terminated by ${signal} before completion`,
      },
      SYNC_WRITER
    ).finally(() => process.exit(code))
  }
  const onSigterm = (): undefined => onSignal("SIGTERM", 143)
  const onSigint = (): undefined => onSignal("SIGINT", 130)
  process.once("SIGTERM", onSigterm)
  process.once("SIGINT", onSigint)

  try {
    let result: SyncResult
    try {
      result = await syncFn()
    } catch (thrown) {
      const completedAtMs = Date.now()
      await finalize({
        status: "failed",
        "completed-at": new Date(completedAtMs).toISOString(),
        "duration-ms": completedAtMs - startedAtMs,
        "error-message": String(thrown).slice(0, 2000),
      })
      throw thrown
    }

    const completedAtMs = Date.now()
    const hasFailures = result.failed > 0
    await finalize({
      status: hasFailures ? "failed" : "success",
      "completed-at": new Date(completedAtMs).toISOString(),
      "duration-ms": completedAtMs - startedAtMs,
      "created-count": result.created,
      "updated-count": result.updated,
      "skipped-count": result.skipped,
      "failed-count": result.failed,
      ...(hasFailures && {
        "error-message": `sync completed with ${result.failed} item failure${result.failed === 1 ? "" : "s"}`,
      }),
    })

    if (hasFailures) {
      throw new Error(
        `sync "${source}" recorded ${result.failed} item failure${result.failed === 1 ? "" : "s"}, so this exits non-zero`
      )
    }
  } finally {
    process.off("SIGTERM", onSigterm)
    process.off("SIGINT", onSigint)
  }
}
