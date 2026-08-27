
const MS_PER_DAY = 86_400_000
const MS_PER_HOUR = 3_600_000

function nthWeekdayOfMonth(year: number, month: number, targetDow: number, n: number): number {
  const dowOfFirst = new Date(Date.UTC(year, month, 1)).getUTCDay()
  return 1 + ((targetDow - dowOfFirst + 7) % 7) + (n - 1) * 7
}

function springTransitionMs(year: number): number {
  const day = nthWeekdayOfMonth(year, 2, 0, 2)
  return Date.UTC(year, 2, day, 7, 0, 0, 0)
}

function fallTransitionMs(year: number): number {
  const day = nthWeekdayOfMonth(year, 10, 0, 1)
  return Date.UTC(year, 10, day, 6, 0, 0, 0)
}

function nyOffsetMs(instantMs: number): number {
  const year = new Date(instantMs).getUTCFullYear()
  const spring = springTransitionMs(year)
  const fall = fallTransitionMs(year)
  const isEdt = instantMs >= spring && instantMs < fall
  return isEdt ? -4 * MS_PER_HOUR : -5 * MS_PER_HOUR
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n)
}

function nyDateStr(instantMs: number, offset: number): string {
  const shifted = new Date(instantMs + offset)
  return `${shifted.getUTCFullYear()}-${pad2(shifted.getUTCMonth() + 1)}-${pad2(shifted.getUTCDate())}`
}

export function getEsoDayStr(now: Date): string {
  const nowMs = now.getTime()
  const offset = nyOffsetMs(nowMs)
  const shifted = new Date(nowMs + offset)
  const hour = shifted.getUTCHours()
  if (hour < 6) {
    const earlierMs = nowMs - MS_PER_DAY
    const earlierOffset = nyOffsetMs(earlierMs)
    return nyDateStr(earlierMs, earlierOffset)
  }
  return nyDateStr(nowMs, offset)
}

function esoResetInstantForDay(dayStr: string): number | undefined {
  const [y, m, d] = dayStr.split("-").map(Number)
  if (
    y === undefined ||
    m === undefined ||
    d === undefined ||
    Number.isNaN(y) ||
    Number.isNaN(m) ||
    Number.isNaN(d)
  ) {
    return undefined
  }
  const candidateNyMs = Date.UTC(y, m - 1, d, 6, 0, 0, 0)
  const approx = candidateNyMs - nyOffsetMs(candidateNyMs)
  return candidateNyMs - nyOffsetMs(approx)
}

export function getEsoDayWindow(dayStr: string): { start: Date; end: Date } {
  const startMs = esoResetInstantForDay(dayStr)
  const [y, m, d] = dayStr.split("-").map(Number)
  if (startMs === undefined || y === undefined || m === undefined || d === undefined) {
    return { start: new Date(0), end: new Date(0) }
  }
  const nextDayAnchor = new Date(Date.UTC(y, m - 1, d + 1, 12, 0, 0, 0))
  const nextDayStr = `${nextDayAnchor.getUTCFullYear()}-${pad2(nextDayAnchor.getUTCMonth() + 1)}-${pad2(nextDayAnchor.getUTCDate())}`
  const endMs = esoResetInstantForDay(nextDayStr)
  if (endMs === undefined) {
    return { start: new Date(0), end: new Date(0) }
  }
  return { start: new Date(startMs), end: new Date(endMs) }
}

export function nyWallToInstant(dayStr: string, hh: number, mm: number): Date {
  const [y, m, d] = dayStr.split("-").map(Number)
  if (y === undefined || m === undefined || d === undefined) return new Date(Number.NaN)
  const wallAsUtcMs = Date.UTC(y, m - 1, d, hh, mm, 0, 0)
  const estimatedOffset = nyOffsetMs(wallAsUtcMs)
  const candidateMs = wallAsUtcMs - estimatedOffset
  const realOffset = nyOffsetMs(candidateMs)
  return new Date(realOffset === estimatedOffset ? candidateMs : wallAsUtcMs - realOffset)
}
