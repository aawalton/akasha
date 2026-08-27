const MS_PER_HOUR = 3_600_000

function nthWeekdayOfMonth(year: number, month: number, targetDow: number, n: number): number {
  const dowOfFirst = new Date(Date.UTC(year, month, 1)).getUTCDay()
  return 1 + ((targetDow - dowOfFirst + 7) % 7) + (n - 1) * 7
}

function springTransitionMs(year: number): number {
  const day = nthWeekdayOfMonth(year, 2, 0, 2)
  return Date.UTC(year, 2, day, 9, 0, 0, 0)
}

function fallTransitionMs(year: number): number {
  const day = nthWeekdayOfMonth(year, 10, 0, 1)
  return Date.UTC(year, 10, day, 8, 0, 0, 0)
}

function mtOffsetMs(instantMs: number): number {
  const year = new Date(instantMs).getUTCFullYear()
  const spring = springTransitionMs(year)
  const fall = fallTransitionMs(year)
  const isMdt = instantMs >= spring && instantMs < fall
  return isMdt ? -6 * MS_PER_HOUR : -7 * MS_PER_HOUR
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n)
}

export function mtWallToInstant(dayStr: string, hh: number, mm: number): Date {
  const [y, m, d] = dayStr.split("-").map(Number)
  if (y === undefined || m === undefined || d === undefined) {
    return new Date(Number.NaN)
  }
  const wallAsUtcMs = Date.UTC(y, m - 1, d, hh, mm, 0, 0)
  const estimatedOffset = mtOffsetMs(wallAsUtcMs)
  const candidateMs = wallAsUtcMs - estimatedOffset
  const realOffset = mtOffsetMs(candidateMs)
  return new Date(realOffset === estimatedOffset ? candidateMs : wallAsUtcMs - realOffset)
}

export function mtWallHm(instant: Date): string {
  const ms = instant.getTime()
  const shifted = new Date(ms + mtOffsetMs(ms))
  return `${pad2(shifted.getUTCHours())}:${pad2(shifted.getUTCMinutes())}`
}

export function getMountainEveningDayStr(now: Date): string {
  const nowMs = now.getTime()
  const offset = mtOffsetMs(nowMs)
  const shifted = new Date(nowMs + offset)
  const dayOffset = shifted.getUTCHours() >= 18 ? 1 : 0
  const labeled = new Date(
    Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate() + dayOffset)
  )
  return `${labeled.getUTCFullYear()}-${pad2(labeled.getUTCMonth() + 1)}-${pad2(labeled.getUTCDate())}`
}
