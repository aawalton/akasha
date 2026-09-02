import type { Page } from "../daily-tracking/tracking-types.ts"
import { dataError, operationalError } from "../exit.ts"
import {
  type Answered,
  askComposed,
  type Landed,
  pageLanding,
  removeRow,
  rowLanding,
} from "../page-query-client.ts"
import { pageOf } from "./pages.ts"

export const DAILY_TRACKING = "daily-tracking"

export const SESSION_TRACKING = "session-tracking"

export const MARKDOWN = "markdown"

export const AKASHA = "akasha"

export type DayPlace = typeof MARKDOWN | typeof AKASHA

export type DayAct = "write" | "patch"

export type SessionAct = "write-row" | "patch-row" | "remove-row"

/**
 * Which half of the corpus one of Alan's days is kept in.
 *
 * Every reach that writes a day, or writes a session beside a day, asks this first, and nothing
 * reaches the file layer around it. That is the whole point of this file: while the migration is
 * partly done, one day is markdown and the next is akasha, and a reach that decides for itself
 * would write a new day to the old place after that day had already moved — two files for one day,
 * each holding half of it, and nothing saying which is the day.
 *
 * Today no day has moved, so this answers `markdown` for all of them and every write lands exactly
 * where it landed before. When a day moves, name it here. When they all have, this returns `akasha`
 * outright and dies with the migration.
 */
export const MIGRATED_DAYS: ReadonlySet<string> = new Set<string>()

export function dayPlaceIn(migrated: ReadonlySet<string>, dayStr: string): DayPlace {
  return migrated.has(dayStr) ? AKASHA : MARKDOWN
}

export function dayPlaceOf(dayStr: string): DayPlace {
  return dayPlaceIn(MIGRATED_DAYS, dayStr)
}

/**
 * The name a day's page answers to, and the day that name is for.
 *
 * A markdown day is named by its date, so both of these are the date itself. An akasha day is to be
 * named `day-2026-03-05`, because `20260305` is no identifier and a bare date reads as a number.
 * Both directions live here so that the day a session says it is beside and the day a writer names
 * are read by one rule rather than two.
 */
export function dayNameIn(place: DayPlace, dayStr: string): string {
  return place === AKASHA ? `day-${dayStr}` : dayStr
}

export function dayNameOf(dayStr: string): string {
  return dayNameIn(dayPlaceOf(dayStr), dayStr)
}

export function dayOfName(name: string): string {
  return name.startsWith("day-") ? name.slice("day-".length) : name
}

export interface DayLanding {
  readonly place: DayPlace
  readonly act: string
  readonly pageType: string
  readonly name: string
}

/**
 * Refuse a write to a day that has moved.
 *
 * The akasha half of every verb here is deliberately empty. Until the akasha read path is built, a
 * day named migrated has nowhere to be written, and the only wrong answer is to fall back to the
 * old place — that is the corpus splitting in two. So this refuses out loud and names the day.
 */
function unmoved(dayStr: string, what: string): never {
  throw operationalError(
    `${what} for ${dayStr} was asked of akasha, and no day is written there yet. ` +
      "`dayPlaceOf` in tools/lib/tracking/day-place.ts is the one thing that says where a day is " +
      "kept, and it named this day migrated. Writing it to the old markdown place anyway would " +
      "leave two files for one day, each holding half of it. Build the akasha half of this verb, " +
      "or take the day out of the migrated set."
  )
}

export function dayPageAt(place: DayPlace, act: DayAct, dayStr: string): DayLanding {
  if (place === AKASHA) unmoved(dayStr, `a \`${act}\` of the day page`)
  return { place, act, pageType: DAILY_TRACKING, name: dayNameIn(place, dayStr) }
}

export function sessionRowAt(place: DayPlace, act: SessionAct, dayStr: string): DayLanding {
  if (place === AKASHA) unmoved(dayStr, `a \`${act}\` of a session`)
  return { place, act, pageType: SESSION_TRACKING, name: dayNameIn(place, dayStr) }
}

export function landDayPage(
  act: DayAct,
  dayStr: string,
  values: Readonly<Record<string, unknown>>,
  writer: string
): Promise<Landed> {
  const at = dayPageAt(dayPlaceOf(dayStr), act, dayStr)
  return pageLanding(act, at.pageType, at.name, values, writer)
}

export function landSessionRow(
  act: "write-row" | "patch-row",
  dayStr: string,
  values: Readonly<Record<string, unknown>>,
  writer: string
): Promise<Landed> {
  const at = sessionRowAt(dayPlaceOf(dayStr), act, dayStr)
  return rowLanding(act, at.pageType, at.name, values, writer)
}

export function dropSessionRow(dayStr: string, named: string, writer: string): Promise<Landed> {
  const at = sessionRowAt(dayPlaceOf(dayStr), "remove-row", dayStr)
  return removeRow(at.pageType, at.name, named, writer)
}

export function askDayByDate(dayStr: string): Promise<Answered> {
  return askComposed({
    "page-type": DAILY_TRACKING,
    where: { date: { is: dayStr } },
    limit: 1,
  })
}

export function askDayById(dailyId: string): Promise<Answered> {
  return askComposed({
    "page-type": DAILY_TRACKING,
    where: { id: { is: dailyId } },
    limit: 1,
  })
}

async function only(asked: Promise<Answered>): Promise<Page | null> {
  const answer = await asked
  if (!answer.ok) throw dataError(`reading ${DAILY_TRACKING} pages: ${answer.why}`)
  const row = answer.rows[0]
  return row === undefined ? null : pageOf(row.values)
}

export function dayByDate(dayStr: string): Promise<Page | null> {
  return only(askDayByDate(dayStr))
}

export function dayById(dailyId: string): Promise<Page | null> {
  return only(askDayById(dailyId))
}
