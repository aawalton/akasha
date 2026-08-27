import { numberOf } from "./tracking-modules.ts"

export interface WeightedDayTally {
  readonly points: number
  readonly ratedRows: number
  readonly unratedRows: number
  readonly openRows: number
}

export function closedIntervalHours(row: Readonly<Record<string, unknown>>): number | null {
  const startRaw = row["start-time"]
  const endRaw = row["end-time"]
  if (typeof startRaw !== "string" || typeof endRaw !== "string") return null
  const start = new Date(startRaw).getTime()
  const end = new Date(endRaw).getTime()
  if (Number.isNaN(start) || Number.isNaN(end)) return null
  if (end < start) return null
  return (end - start) / 3_600_000
}

export function intervalWeight(
  row: Readonly<Record<string, unknown>>,
  weightField: string
): number | null {
  return numberOf(row[weightField]) ?? null
}

export function startsInWindow(
  row: Readonly<Record<string, unknown>>,
  window: { readonly start: Date; readonly end: Date }
): boolean {
  const raw = row["start-time"]
  if (typeof raw !== "string") return false
  const t = new Date(raw).getTime()
  if (Number.isNaN(t)) return false
  return t >= window.start.getTime() && t < window.end.getTime()
}

export function tallyWeightedIntervals(
  rows: readonly Readonly<Record<string, unknown>>[],
  weightField: string
): WeightedDayTally {
  let total = 0
  let ratedRows = 0
  let unratedRows = 0
  let openRows = 0
  for (const row of rows) {
    const hours = closedIntervalHours(row)
    if (hours === null) {
      openRows += 1
      continue
    }
    const weight = intervalWeight(row, weightField)
    if (weight === null) {
      unratedRows += 1
      continue
    }
    total += hours * weight
    ratedRows += 1
  }
  return { points: Math.floor(Math.max(0, total)), ratedRows, unratedRows, openRows }
}
