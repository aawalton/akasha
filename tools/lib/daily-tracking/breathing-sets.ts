import { sessionsInSpan } from "../tracking/day-place.ts"
import { getEsoDayWindow, numberOf } from "./tracking-modules.ts"

export type BreathingRowInput = {
  readonly startTime: unknown
  readonly breathingSets: unknown
}

function breathingSetsOf(row: BreathingRowInput): number {
  const value = numberOf(row.breathingSets)
  if (value === undefined || value < 0) return 0
  return value
}

export function sumBreathingSets(rows: readonly BreathingRowInput[]): number {
  let total = 0
  for (const row of rows) total += breathingSetsOf(row)
  return total
}

export function sumBreathingSetsForDay(rows: readonly BreathingRowInput[], dayStr: string): number {
  const window = getEsoDayWindow(dayStr)
  const startMs = window.start.getTime()
  const endMs = window.end.getTime()
  let total = 0
  for (const row of rows) {
    if (typeof row.startTime !== "string") continue
    const rowStartMs = Date.parse(row.startTime)
    if (Number.isNaN(rowStartMs)) continue
    if (rowStartMs < startMs || rowStartMs >= endMs) continue
    total += breathingSetsOf(row)
  }
  return total
}

/**
 * The breathing sets Alan did on a day, summed from that day's sessions.
 *
 * The span is asked for through the funnel. This used to compose the query here and hand it to
 * `askComposed` off `./tracking-modules.ts` — the remote half of the query facade, which answers
 * that `session-tracking` names no page type the index holds, so this refused for every day it was
 * asked about and the reduction below had never once run.
 */
export async function loadDayBreathingSets(dayStr: string): Promise<number> {
  const window = getEsoDayWindow(dayStr)
  const rows = await sessionsInSpan(window.start, window.end, ["start-time", "breathing-sets"])
  return sumBreathingSetsForDay(
    rows.map((row) => ({ startTime: row.startTime, breathingSets: row.breathingSets })),
    dayStr
  )
}
