const SECONDS_PER_DAY = 86_400
const RESET_OFFSET_SECONDS = 6 * 3600
const EDT_OFFSET_SECONDS = -4 * 3600
const EST_OFFSET_SECONDS = -5 * 3600

function civilFromDays(daysSinceEpoch: number): {
  year: number
  month: number
  day: number
} {
  const z = daysSinceEpoch + 719468
  const era = Math.floor((z >= 0 ? z : z - 146096) / 146097)
  const doe = z - era * 146097
  const yoe = Math.floor(
    (doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365
  )
  const y = yoe + era * 400
  const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100))
  const mp = Math.floor((5 * doy + 2) / 153)
  const day = doy - Math.floor((153 * mp + 2) / 5) + 1
  const month = mp + (mp < 10 ? 3 : -9)
  const year = y + (month <= 2 ? 1 : 0)
  return { year, month, day }
}

function daysFromCivil(year: number, month: number, day: number): number {
  const yAdj = month <= 2 ? year - 1 : year
  const era = Math.floor(yAdj / 400)
  const yoe = yAdj - era * 400
  const monthIndex = month > 2 ? month - 3 : month + 9
  const doy = Math.floor((153 * monthIndex + 2) / 5) + day - 1
  const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy
  return era * 146097 + doe - 719468
}

function dowFromDays(daysSinceEpoch: number): number {
  const raw = (daysSinceEpoch + 4) % 7
  return raw < 0 ? raw + 7 : raw
}

function nthSundayOfMonthDays(year: number, month: number, n: number): number {
  const firstOfMonth = daysFromCivil(year, month, 1)
  const dowOfFirst = dowFromDays(firstOfMonth)
  const firstSundayOffset = (7 - dowOfFirst) % 7
  return firstOfMonth + firstSundayOffset + (n - 1) * 7
}

function nyOffsetSec(utcSec: number): number {
  const days = Math.floor(utcSec / SECONDS_PER_DAY)
  const { year } = civilFromDays(days)
  const springDays = nthSundayOfMonthDays(year, 3, 2)
  const fallDays = nthSundayOfMonthDays(year, 11, 1)
  const springSec = springDays * SECONDS_PER_DAY + 7 * 3600
  const fallSec = fallDays * SECONDS_PER_DAY + 6 * 3600
  if (utcSec >= springSec && utcSec < fallSec) {
    return EDT_OFFSET_SECONDS
  }
  return EST_OFFSET_SECONDS
}

export function getEsoResetTimestampSec(nowSec: number): number {
  const offset = nyOffsetSec(nowSec)
  const nyShifted = nowSec + offset
  const nyMidnight = Math.floor(nyShifted / SECONDS_PER_DAY) * SECONDS_PER_DAY
  let candidate = nyMidnight + RESET_OFFSET_SECONDS - offset
  if (candidate > nowSec) {
    const earlierUtc = candidate - SECONDS_PER_DAY
    const earlierOffset = nyOffsetSec(earlierUtc)
    const earlierShifted = earlierUtc + earlierOffset
    const earlierMidnight = Math.floor(earlierShifted / SECONDS_PER_DAY) * SECONDS_PER_DAY
    candidate = earlierMidnight + RESET_OFFSET_SECONDS - earlierOffset
  }
  return candidate
}

export function getEsoDayStringFromSec(nowSec: number): string {
  const resetSec = getEsoResetTimestampSec(nowSec)
  const offset = nyOffsetSec(resetSec)
  const nyMidnightShifted = resetSec + offset - RESET_OFFSET_SECONDS
  const days = Math.floor(nyMidnightShifted / SECONDS_PER_DAY)
  const { year, month, day } = civilFromDays(days)
  const mm = month < 10 ? `0${month}` : `${month}`
  const dd = day < 10 ? `0${day}` : `${day}`
  return `${year}-${mm}-${dd}`
}
