
import { getEsoDayStr, getEsoDayWindow } from "./eso-day.ts"

export const MS_PER_HOUR = 60 * 60 * 1000
export const ONE_DAY_MS = 24 * MS_PER_HOUR
export const SEVEN_DAY_MS = 7 * ONE_DAY_MS

export const SCALE_HOURS = 144

export const HOURS_FALLBACK = SCALE_HOURS

export const MIN_HOURS_REMAINING = 0.001

const FIVE_HOUR_MS = 5 * 60 * 60 * 1000
const TOTAL_MS_EXCL_SUNDAY = SCALE_HOURS * MS_PER_HOUR

export type PacingDerivations = {
  burnRateNeeded: number
  paceHoursDiff: number
  fiveHourStartedAt: string | null
  sevenDayStartedAt: string | null
}

export function sundayOverlapMs(startMs: number, endMs: number): number {
  if (endMs <= startMs) return 0
  const firstMidnight = Math.floor(startMs / ONE_DAY_MS) * ONE_DAY_MS
  let total = 0
  for (let dayMidnight = firstMidnight; dayMidnight < endMs; dayMidnight += ONE_DAY_MS) {
    const epochDay = dayMidnight / ONE_DAY_MS
    if ((epochDay + 4) % 7 !== 0) continue
    const slabEnd = dayMidnight + ONE_DAY_MS
    const overlapStart = Math.max(startMs, dayMidnight)
    const overlapEnd = Math.min(endMs, slabEnd)
    if (overlapEnd > overlapStart) total += overlapEnd - overlapStart
  }
  return total
}

function parseResetMs(reset: string | null): number | null {
  if (reset == null) return null
  const t = new Date(reset).getTime()
  return Number.isNaN(t) ? null : t
}

function endOfTodayMs(now: number): number {
  return getEsoDayWindow(getEsoDayStr(new Date(now))).end.getTime()
}

export function elapsedFraction(args: { now: number; sevenDayResetsAt: string | null }): number {
  const resetMs = parseResetMs(args.sevenDayResetsAt)
  if (resetMs == null) return 1
  const windowStart = resetMs - SEVEN_DAY_MS
  const effectiveEnd = Math.min(endOfTodayMs(args.now), resetMs)
  const elapsedRaw = Math.max(0, effectiveEnd - windowStart)
  const sundayMs = sundayOverlapMs(windowStart, effectiveEnd)
  const elapsedExcl = Math.max(0, elapsedRaw - sundayMs)
  const fraction = elapsedExcl / TOTAL_MS_EXCL_SUNDAY
  return Math.max(0, Math.min(1, fraction))
}

export function paceHoursDiff(args: { elapsedFraction: number; usedFraction: number }): number {
  return (args.elapsedFraction - args.usedFraction) * SCALE_HOURS
}

export function effectiveSessionUtilization(args: {
  fiveHourUtil: number
  sevenDayUtil: number
}): number {
  return args.sevenDayUtil >= 100 ? 100 : args.fiveHourUtil
}

export function hoursRemaining(args: { now: number; sevenDayResetsAt: string | null }): number {
  const resetMs = parseResetMs(args.sevenDayResetsAt)
  if (resetMs == null) return HOURS_FALLBACK
  const rawMs = resetMs - args.now
  const sundayMs = sundayOverlapMs(args.now, resetMs)
  const exclMs = rawMs - sundayMs
  return Math.max(MIN_HOURS_REMAINING, exclMs / MS_PER_HOUR)
}

export function hoursUntilReset(args: { now: number; sevenDayResetsAt: string | null }): number {
  const resetMs = parseResetMs(args.sevenDayResetsAt)
  if (resetMs == null) return HOURS_FALLBACK
  const rawMs = resetMs - args.now
  if (rawMs <= 0) return HOURS_FALLBACK
  return rawMs / MS_PER_HOUR
}

function subtractIsoMs(iso: string | null, ms: number): string | null {
  const t = parseResetMs(iso)
  if (t == null) return null
  return new Date(t - ms).toISOString()
}

export function computePacingDerivations(args: {
  now: number
  sevenDayUtil: number
  sevenDayResetsAt: string | null
  fiveHourResetsAt: string | null
}): PacingDerivations {
  const fiveHourStartedAt = subtractIsoMs(args.fiveHourResetsAt, FIVE_HOUR_MS)
  const sevenDayStartedAt = subtractIsoMs(args.sevenDayResetsAt, SEVEN_DAY_MS)

  const remainingFraction = Math.max(0, (100 - args.sevenDayUtil) / 100)
  const hRem = hoursRemaining({ now: args.now, sevenDayResetsAt: args.sevenDayResetsAt })
  const burnRateNeeded = remainingFraction / hRem

  const elapsedFr = elapsedFraction({
    now: args.now,
    sevenDayResetsAt: args.sevenDayResetsAt,
  })
  const usedFr = args.sevenDayUtil / 100
  const paceHrs = paceHoursDiff({ elapsedFraction: elapsedFr, usedFraction: usedFr })

  return {
    burnRateNeeded,
    paceHoursDiff: paceHrs,
    fiveHourStartedAt,
    sevenDayStartedAt,
  }
}

export function formatPaceHours(hours: number): string {
  const hoursX100 = Math.abs(Math.round(hours * 100))
  const sign = hours >= 0 ? "+" : "-"
  const whole = Math.floor(hoursX100 / 100)
  const frac = hoursX100 % 100
  return `${sign}${whole}.${String(frac).padStart(2, "0")}`
}
