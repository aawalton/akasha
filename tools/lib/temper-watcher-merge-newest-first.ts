import type { ParsedLogLine } from "./temper-watcher-parse-log-line.ts"

interface AnnotatedLine {
  readonly record: ParsedLogLine
  readonly epochMs: number
}

function annotate(records: readonly ParsedLogLine[], cutoffMs: number): readonly AnnotatedLine[] {
  const out: AnnotatedLine[] = []
  for (const record of records) {
    const epochMs = Date.parse(record.timestamp)
    if (epochMs >= cutoffMs) out.push({ record, epochMs })
  }
  return out
}

export function mergeNewestFirst(
  watcherRecords: readonly ParsedLogLine[],
  trayRecords: readonly ParsedLogLine[],
  cutoffMs: number
): readonly ParsedLogLine[] {
  const merged = [...annotate(watcherRecords, cutoffMs), ...annotate(trayRecords, cutoffMs)]
  merged.sort((a, b) => {
    if (a.epochMs !== b.epochMs) return b.epochMs - a.epochMs
    if (a.record.source === b.record.source) return 0
    return a.record.source < b.record.source ? -1 : 1
  })
  return merged.map((m) => m.record)
}
