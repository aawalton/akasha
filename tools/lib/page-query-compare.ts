import { pageQueryTimeIn } from "@shared/pages-core/view/page-query-times"
import { getEsoDayStr, getEsoDayWindow } from "./eso-day.ts"
import { dayAfter, WAKE_DAY, type Woke } from "./wake-day.ts"

export function compare(left: string, right: string): number {
  const a = Number(left)
  const b = Number(right)
  const numeric = left.trim() !== "" && right.trim() !== "" && Number.isFinite(a) && Number.isFinite(b)
  if (numeric) return a === b ? 0 : a < b ? -1 : 1
  return left < right ? -1 : left > right ? 1 : 0
}

export const NOW = "now"

const ESO_DAY = "eso-day"

const ESO_DAY_NEXT = "eso-day-next"

const INSTANT = "instant"
const CALENDAR_DATE = "calendar-date"

function momentOf(text: string): number | null {
  const ms = Date.parse(text)
  return Number.isFinite(ms) ? ms : null
}

export function comparing(type: string | null): (left: string, right: string) => number {
  if (type !== INSTANT) return compare
  return (left, right) => {
    const a = momentOf(left)
    const b = momentOf(right)
    if (a === null || b === null) return compare(left, right)
    return a === b ? 0 : a < b ? -1 : 1
  }
}

function asStated(day: string, instant: string, type: string | null, value: string): string {
  if (type === CALENDAR_DATE) return day
  if (type === INSTANT) return instant
  return value
}

function esoDay(at: number, next: boolean, type: string | null, value: string): string {
  const day = next ? dayAfter(getEsoDayStr(new Date(at))) : getEsoDayStr(new Date(at))
  return asStated(day, getEsoDayWindow(day).start.toISOString(), type, value)
}

export function stated(value: string, type: string | null, at: number, woke: Woke | null): string {
  const named = pageQueryTimeIn(value)
  if (named === null) return value
  switch (named) {
    case NOW:
      if (type === INSTANT) return new Date(at).toISOString()
      if (type === CALENDAR_DATE) return getEsoDayStr(new Date(at))
      return value
    case ESO_DAY:
      return esoDay(at, false, type, value)
    case ESO_DAY_NEXT:
      return esoDay(at, true, type, value)
    case WAKE_DAY:
      return woke === null ? value : asStated(woke.day, woke.instant, type, value)
  }
}
