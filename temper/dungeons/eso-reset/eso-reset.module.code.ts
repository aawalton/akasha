import { __TS__CivilFromDays } from "akasha/language-design/lua-compiler/lualibs/civil-from-days/civil-from-days.lualib.code.ts"
import { __TS__DaysFromCivil } from "akasha/language-design/lua-compiler/lualibs/days-from-civil/days-from-civil.lualib.code.ts"

const SECONDS_PER_DAY = 86_400
const RESET_OFFSET_SECONDS = 6 * 3600
const EDT_OFFSET_SECONDS = -4 * 3600
const EST_OFFSET_SECONDS = -5 * 3600

function dowFromDays(daysSinceEpoch: number): number {
  const raw = (daysSinceEpoch + 4) % 7
  return raw < 0 ? raw + 7 : raw
}

function nthSundayOfMonthDays(year: number, month: number, n: number): number {
  const firstOfMonth = __TS__DaysFromCivil(year, month, 1)
  const dowOfFirst = dowFromDays(firstOfMonth)
  const firstSundayOffset = (7 - dowOfFirst) % 7
  return firstOfMonth + firstSundayOffset + (n - 1) * 7
}

function nyOffsetSec(utcSec: number): number {
  const days = Math.floor(utcSec / SECONDS_PER_DAY)
  const { year } = __TS__CivilFromDays(days)
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
  const { year, month1, day } = __TS__CivilFromDays(days)
  const mm = month1 < 10 ? `0${month1}` : `${month1}`
  const dd = day < 10 ? `0${day}` : `${day}`
  return `${year}-${mm}-${dd}`
}
