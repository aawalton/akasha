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

/**
 * One moment, spelled the way the key's own type compares values.
 *
 * A NAMED TIME IS A DAY AND AN INSTANT AT ONCE, and which of the two a comparison wants is
 * settled by the type of the key it is compared against, never by the name. A key stating
 * neither type is left the name itself: there is no spelling of a moment that a comparison
 * against text or a slug would read, and inventing one would match something by accident.
 */
function asStated(day: string, instant: string, type: string | null, value: string): string {
  if (type === CALENDAR_DATE) return day
  if (type === INSTANT) return instant
  return value
}

function esoDay(at: number, next: boolean, type: string | null, value: string): string {
  const day = next ? dayAfter(getEsoDayStr(new Date(at))) : getEsoDayStr(new Date(at))
  return asStated(day, getEsoDayWindow(day).start.toISOString(), type, value)
}

/**
 * A stated value with a named time swapped for the moment it stands for.
 *
 * EVERY NAME THE LIST PAGE STATES IS RESOLVED HERE, and the switch is exhaustive over the union
 * `PAGE_QUERY_TIMES` states, so a name added to the list page and its projection stops this
 * compiling until it is given a meaning. `eso-day` and `eso-day-next` were admitted by the view
 * path and unknown here, so a query naming one compared the row against those eight or thirteen
 * characters — nothing carries them, and a test matching no row is a legal answer of zero, which
 * is what a true zero looks like.
 *
 * `now` ON A CALENDAR DATE IS THE ESO DAY IT FALLS IN. It resolved for an instant alone and was
 * left as the literal `now` against a day-typed key, which is the same silent miss under another
 * name.
 *
 * WAKE DAY ALONE CAN BE UNANSWERABLE, because it is read off a sleep session rather than
 * computed from the clock. Where the wake instant was not derived the name is left standing,
 * which compares as itself rather than as some other day.
 */
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
