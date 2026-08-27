import { askComposed, getEsoDayWindow, numberOf } from "./tracking-modules.ts"

const MAX_DAY_SESSIONS = 200

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

export async function loadDayBreathingSets(dayStr: string): Promise<number> {
  const window = getEsoDayWindow(dayStr)
  const asked = await askComposed({
    "page-type": "session-tracking",
    where: {
      "start-time": {
        "at-or-after": window.start.toISOString(),
        before: window.end.toISOString(),
      },
    },
    "sort-by": "start-time",
    limit: MAX_DAY_SESSIONS,
    keys: ["start-time", "breathing-sets"],
  })
  if (!asked.ok) throw new Error(`loadDayBreathingSets: ${asked.why}`)
  return sumBreathingSetsForDay(
    asked.answer.rows.map((r) => ({
      startTime: r.values["start-time"],
      breathingSets: r.values["breathing-sets"],
    })),
    dayStr
  )
}
