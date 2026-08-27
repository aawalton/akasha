export type WatcherSyncSourceCounts = {
  count: number
  lastContactAt: string | null
  capturedAt: string | null
}

export type WatcherSyncInput = {
  connectedAt: string | null
  characters: WatcherSyncSourceCounts
  inventory: WatcherSyncSourceCounts
}

export type WatcherSyncVerdict =
  | "not-connected"
  | "connected-no-data"
  | "data-without-watcher"
  | "syncing"
  | "connected-stale-data"

export type WatcherSyncSummary = WatcherSyncInput & {
  verdict: WatcherSyncVerdict
  lastContactAt: string | null
  dataCapturedAt: string | null
}

const STALE_AFTER_MS = 60 * 60 * 1000

function toTime(iso: string | null): number | null {
  if (iso === null) return null
  const t = new Date(iso).getTime()
  return Number.isFinite(t) ? t : null
}

function newestInstant(
  input: WatcherSyncInput,
  pick: (source: WatcherSyncSourceCounts) => string | null
): string | null {
  const candidates = [input.characters, input.inventory]
    .map((source) => ({ iso: pick(source), time: toTime(pick(source)) }))
    .filter((c): c is { iso: string; time: number } => c.iso !== null && c.time !== null)

  if (candidates.length === 0) return null
  return candidates.reduce((best, c) => (c.time > best.time ? c : best)).iso
}

export function newestContactAt(input: WatcherSyncInput): string | null {
  return newestInstant(input, (source) => source.lastContactAt)
}

export function newestCaptureAt(input: WatcherSyncInput): string | null {
  return newestInstant(input, (source) => source.capturedAt)
}

function isDataStale(input: WatcherSyncInput): boolean {
  const captured = toTime(newestCaptureAt(input))
  const contact = toTime(newestContactAt(input))
  if (captured === null || contact === null) return false
  return contact - captured > STALE_AFTER_MS
}

export function deriveWatcherSyncVerdict(input: WatcherSyncInput): WatcherSyncVerdict {
  const hasData = input.characters.count > 0 || input.inventory.count > 0
  const isConnected = input.connectedAt !== null

  if (!isConnected) return hasData ? "data-without-watcher" : "not-connected"
  if (!hasData) return "connected-no-data"
  return isDataStale(input) ? "connected-stale-data" : "syncing"
}

export function summarizeWatcherSync(input: WatcherSyncInput): WatcherSyncSummary {
  return {
    ...input,
    verdict: deriveWatcherSyncVerdict(input),
    lastContactAt: newestContactAt(input),
    dataCapturedAt: newestCaptureAt(input),
  }
}
