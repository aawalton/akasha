import { WAKE_DAY, type Woke } from "./wake-day.ts"

export function compare(left: string, right: string): number {
  const a = Number(left)
  const b = Number(right)
  const numeric = left.trim() !== "" && right.trim() !== "" && Number.isFinite(a) && Number.isFinite(b)
  if (numeric) return a === b ? 0 : a < b ? -1 : 1
  return left < right ? -1 : left > right ? 1 : 0
}

export const NOW = "now"

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

export function stated(value: string, type: string | null, at: number, woke: Woke | null): string {
  if (value === WAKE_DAY && woke !== null) {
    if (type === CALENDAR_DATE) return woke.day
    if (type === INSTANT) return woke.instant
    return value
  }
  if (type !== INSTANT) return value
  return value === NOW ? new Date(at).toISOString() : value
}
