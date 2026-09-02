import type { Page } from "../daily-tracking/tracking-types.ts"
import { dataError } from "../exit.ts"
import {
  type Answered,
  type AnsweredRow,
  askComposed,
  type Landed,
  pageLanding,
  removeRow,
  rowLanding,
} from "../page-query-client.ts"
import { addressOf } from "../../../page/page-address.ts"
import { landAkashaDayPage, landAkashaSessionRow } from "./akasha-day.ts"
import { pageOf } from "./pages.ts"

export const DAILY_TRACKING = "daily-tracking"

export const SESSION_TRACKING = "session-tracking"

/** The page type a page type is, and the page type a property definition is. */
const PAGE_TYPE = "page-type"

const PROPERTY_DEFINITION = "page-property-definition"

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
export const MIGRATED_DAYS: ReadonlySet<string> = new Set<string>([
  "2026-03-05",
  "2026-03-06",
  "2026-03-07",
  "2026-03-08",
  "2026-03-09",
  "2026-03-14",
  "2026-03-15",
  "2026-03-19",
  "2026-03-20",
  "2026-03-21",
  "2026-03-23",
  "2026-03-24",
  "2026-03-25",
  "2026-03-26",
  "2026-03-29",
  "2026-04-05",
  "2026-04-26",
  "2026-04-27",
  "2026-04-28",
  "2026-04-29",
  "2026-04-30",
  "2026-05-02",
  "2026-05-03",
  "2026-05-04",
  "2026-05-05",
  "2026-05-06",
  "2026-05-07",
  "2026-05-08",
  "2026-05-11",
  "2026-05-13",
  "2026-05-14",
  "2026-05-15",
  "2026-05-16",
  "2026-05-20",
  "2026-05-25",
  "2026-05-26",
  "2026-05-27",
  "2026-05-29",
  "2026-05-30",
  "2026-05-31",
  "2026-06-01",
  "2026-06-02",
  "2026-06-03",
  "2026-06-04",
  "2026-06-05",
  "2026-06-06",
  "2026-06-07",
  "2026-06-08",
  "2026-06-09",
  "2026-06-10",
  "2026-06-11",
  "2026-06-12",
  "2026-06-13",
  "2026-06-14",
  "2026-06-15",
  "2026-06-16",
  "2026-06-17",
  "2026-06-18",
  "2026-06-19",
  "2026-06-20",
  "2026-06-21",
  "2026-06-22",
  "2026-06-23",
  "2026-06-24",
  "2026-06-25",
  "2026-06-26",
  "2026-06-27",
  "2026-06-28",
  "2026-06-29",
  "2026-06-30",
  "2026-07-01",
  "2026-07-02",
  "2026-07-03",
  "2026-07-04",
  "2026-07-05",
  "2026-07-06",
  "2026-07-07",
  "2026-07-08",
  "2026-07-09",
  "2026-07-10",
  "2026-07-11",
  "2026-07-12",
  "2026-07-13",
  "2026-07-14",
  "2026-07-15",
  "2026-07-16",
  "2026-07-17",
  "2026-07-18",
  "2026-07-19",
  "2026-07-20",
  "2026-07-21",
  "2026-07-22",
  "2026-07-23",
  "2026-07-24",
  "2026-07-25",
  "2026-07-26",
  "2026-07-27",
  "2026-07-28",
  "2026-07-29",
  "2026-07-30",
  "2026-07-31",
  "2026-08-01",
  "2026-08-02",
  "2026-08-03",
  "2026-08-04",
  "2026-08-05",
  "2026-08-06",
  "2026-08-07",
  "2026-08-08",
  "2026-08-09",
  "2026-08-10",
  "2026-08-11",
  "2026-08-12",
  "2026-08-13",
  "2026-08-14",
  "2026-08-15",
  "2026-08-16",
  "2026-08-17",
  "2026-08-18",
  "2026-08-19",
  "2026-08-20",
  "2026-08-21",
  "2026-08-22",
  "2026-08-23",
  "2026-08-24",
  "2026-08-25",
  "2026-08-26",
  "2026-08-27",
  "2026-08-28",
  "2026-08-29",
  "2026-08-30",
  "2026-08-31",
  "2026-09-01",
])

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

export function dayPageAt(place: DayPlace, act: DayAct, dayStr: string): DayLanding {
  return { place, act, pageType: DAILY_TRACKING, name: dayNameIn(place, dayStr) }
}

export function sessionRowAt(place: DayPlace, act: SessionAct, dayStr: string): DayLanding {
  return { place, act, pageType: SESSION_TRACKING, name: dayNameIn(place, dayStr) }
}

/**
 * A *derived* read of a day, which reaches both halves.
 *
 * `sleepBlocksOn` in tools/lib/wake-day.ts reads day rows and session rows straight off the
 * deriver. It is synchronous, and it is called from inside the page query engine itself
 * (tools/lib/page-query.ts, wherever a query's `where` names `wake-day`), so it cannot await
 * `dayByDate` — the readers below are async and asking one from there would be the engine asking
 * itself. What it could do until the akasha half was read was refuse.
 *
 * It no longer refuses, because the deriver reads both halves. `filedPagesOf` in
 * tools/lib/page-derive.ts reads whichever kind of file a scanned page is, and the `daily-tracking`
 * page type states both places in its `files:`, so a moved day derives its rows where it stands. A
 * day this call was asked about is a day the derive can see, and nothing is left to decide.
 */
export function derivedDayIn(_place: DayPlace, _dayStr: string): void {
  return
}

export function derivedDayOf(dayStr: string): void {
  derivedDayIn(dayPlaceOf(dayStr), dayStr)
}

/**
 * The day page, landed where the day is kept.
 *
 * The two halves take different roads because they are different acts. A markdown day is a file this
 * process writes and commits itself, through `pageLanding`. An akasha day is composed and handed to
 * `akasha write`, because nothing writes under `akasha/` but akasha's own verb. What they share is
 * this call: no reach above here knows which road its day took.
 */
export function landDayPage(
  act: DayAct,
  dayStr: string,
  values: Readonly<Record<string, unknown>>,
  writer: string
): Promise<Landed> {
  const at = dayPageAt(dayPlaceOf(dayStr), act, dayStr)
  if (at.place === AKASHA) return landAkashaDayPage(act, at.name, values, writer)
  return pageLanding(act, at.pageType, at.name, values, writer)
}

export function landSessionRow(
  act: "write-row" | "patch-row",
  dayStr: string,
  values: Readonly<Record<string, unknown>>,
  writer: string
): Promise<Landed> {
  const at = sessionRowAt(dayPlaceOf(dayStr), act, dayStr)
  if (at.place === AKASHA) {
    const id = values["id"]
    return landAkashaSessionRow(act, at.name, values, typeof id === "string" ? id : "", writer)
  }
  return rowLanding(act, at.pageType, at.name, values, writer)
}

export function dropSessionRow(dayStr: string, named: string, writer: string): Promise<Landed> {
  const at = sessionRowAt(dayPlaceOf(dayStr), "remove-row", dayStr)
  if (at.place === AKASHA) {
    return landAkashaSessionRow("remove-row", at.name, {}, named, writer)
  }
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

/**
 * A day's values as the store holds them, in the store's own key spelling.
 *
 * `dayByDate` above hands back a `Page`, whose keys have been camelized. A caller that reduces a
 * day with a function written against the kebab spelling — the readout engine's `surplusIn`, which
 * reads `surplus-hours` — needs the values untouched, so it asks here instead of camelizing and
 * then spelling every key a second way.
 */
export async function dayValuesByDate(
  dayStr: string,
  keys?: readonly string[]
): Promise<Readonly<Record<string, unknown>> | null> {
  const answer = await askComposed({
    "page-type": DAILY_TRACKING,
    where: { date: { is: dayStr } },
    ...(keys === undefined ? {} : { keys }),
    limit: 1,
  })
  if (!answer.ok) throw dataError(`reading the ${DAILY_TRACKING} day ${dayStr}: ${answer.why}`)
  const row = answer.rows[0]
  return row === undefined ? null : row.values
}

/**
 * How many session rows one day is read as holding at the outside.
 *
 * Every by-day session read below carries it, so the three callers that used to hold a copy of this
 * number each — `lib/tracking/resolve.ts`, `lib/daily-tracking/sleep-minutes.ts` and
 * `lib/daily-tracking/breathing-sets.ts` — cannot drift apart from one another.
 */
export const MAX_DAY_SESSIONS = 200

/**
 * The session rows of a day, wherever that day is kept.
 *
 * These readers exist because a session row is half of a day, and every caller that wanted one used
 * to compose its own query over `session-tracking` and hand it to the page client directly. That is
 * the same fault as writing a day around `landSessionRow`: the reach decides for itself where the
 * rows are, and once one day is markdown and the next is akasha it answers out of one half and
 * reports the other half as empty.
 *
 * A `where` over a field rather than over a page name reaches both halves as it is, because the
 * `session-tracking` page type names both places in its `files:`. What the funnel adds is that the
 * decision is made in one file: when the two halves stop being readable by one query, these change
 * and no caller does.
 */
function askSessions(query: Readonly<Record<string, unknown>>): Promise<Answered> {
  return askComposed({ "page-type": SESSION_TRACKING, ...query })
}

async function sessionRows(asked: Promise<Answered>, doing: string): Promise<readonly Page[]> {
  const answer = await asked
  if (!answer.ok) throw dataError(`${doing}: ${answer.why}`)
  return answer.rows.map((row) => pageOf(row.values))
}

/** The one session left open, newest first, or nothing where none is open. */
export async function openSession(): Promise<Page | null> {
  const rows = await sessionRows(
    askSessions({
      where: { "end-time": { empty: true } },
      "sort-by": "start-time",
      descending: true,
      limit: 1,
    }),
    "finding the open session"
  )
  return rows[0] ?? null
}

/** The sessions begun before an instant, newest first. */
export function sessionsBefore(beforeInstant: Date, limit: number): Promise<readonly Page[]> {
  return sessionRows(
    askSessions({
      where: { "start-time": { before: beforeInstant.toISOString() } },
      "sort-by": "start-time",
      descending: true,
      limit,
    }),
    "finding the prior closed session"
  )
}

/** The sessions beside one day, named by that day's id, oldest first. */
export function sessionsOfDay(dailyId: string, keys?: readonly string[]): Promise<readonly Page[]> {
  return sessionRows(
    askSessions({
      where: { [DAILY_TRACKING]: { is: dailyId } },
      "sort-by": "start-time",
      limit: MAX_DAY_SESSIONS,
      ...(keys === undefined ? {} : { keys }),
    }),
    "listing the sessions of a day"
  )
}

/** The sessions begun within a span, oldest first. */
export function sessionsInSpan(
  fromInstant: Date,
  beforeInstant: Date,
  keys?: readonly string[]
): Promise<readonly Page[]> {
  return sessionRows(
    askSessions({
      where: {
        "start-time": {
          "at-or-after": fromInstant.toISOString(),
          before: beforeInstant.toISOString(),
        },
      },
      "sort-by": "start-time",
      limit: MAX_DAY_SESSIONS,
      ...(keys === undefined ? {} : { keys }),
    }),
    "reading the sessions of a span"
  )
}

/**
 * The session row carrying an id, wherever that row is kept.
 *
 * `commands/tracking/edit.ts` and `commands/tracking/delete.ts` hold a session id and no day: which
 * day the row is beside is only known once the row is back, so neither can ask `dayPlaceOf` before
 * it reads. An id is unique across both halves, so the honest shape is a reader that answers "the
 * row with this id, wherever it is kept" and lets the caller take the day off the row it got. Every
 * by-id lookup the migration needs is this shape.
 */
export async function sessionById(sessionId: string): Promise<Page | null> {
  const rows = await sessionRows(
    askSessions({ where: { id: { is: sessionId } }, limit: 1 }),
    `finding the session ${sessionId}`
  )
  return rows[0] ?? null
}

export interface AllSessions {
  /** How many rows the store counted, which a caller compares against what it was handed. */
  readonly n: number
  readonly rows: readonly AnsweredRow[]
}

/**
 * Every session row there is, unfiltered, with the store's own count beside it.
 *
 * Two callers total sessions over the whole history rather than over a day, and a total summed from
 * a short read is low without anything saying so. That comparison is made here, because a short read
 * of *every* row is wrong for any caller of this — there is no reading it could be right for. The
 * count is handed back beside the rows all the same, so a caller with a further check of its own
 * makes it against the number the store gave rather than against one this call invented.
 *
 * The rows are handed back whole rather than as `Page`s, because a caller that works out which day
 * a row was part of reads it off the row's `at` — the sidecar file the row is kept in — and
 * camelizing the values would leave that behind.
 */
export async function allSessions(): Promise<AllSessions> {
  const answer = await askSessions({})
  if (!answer.ok) throw dataError(`reading every ${SESSION_TRACKING} row: ${answer.why}`)
  if (answer.rows.length !== answer.n) {
    throw dataError(
      `the ${SESSION_TRACKING} read came back with ${answer.rows.length} of ${answer.n} row(s), ` +
        "so any total summed from it would be low"
    )
  }
  return { n: answer.n, rows: answer.rows }
}

/**
 * What a session row is declared as able to carry.
 *
 * This is asked of the page type rather than of a day, but it names the session page type to do it,
 * so it is asked here: the one file that knows what a session page type is called is the one that
 * names it.
 */
export async function sessionPropertyDefinitions(): Promise<
  readonly Readonly<Record<string, unknown>>[]
> {
  const answer = await askComposed({
    "page-type": PROPERTY_DEFINITION,
    where: { "defined-on-slug": { is: addressOf(PAGE_TYPE, SESSION_TRACKING) } },
  })
  if (!answer.ok) throw dataError(`reading what a ${SESSION_TRACKING} row may carry: ${answer.why}`)
  return answer.rows.map((row) => row.values)
}

/**
 * Why a property may not be scored across sessions, or nothing where it may.
 *
 * A caller that sums a property no definition declares gets 0 from every row and cannot tell that
 * apart from a real total of nothing, so it would write an instrument's silence as a measurement.
 * The answer is a sentence rather than a `false` because the sentence has to name the session page
 * type to be worth reading, and this is where that name is kept.
 */
export async function sessionPropertyUndeclared(propertyKey: string): Promise<string | null> {
  const defs = await sessionPropertyDefinitions()
  const declared = defs.some((def) => (def as { readonly key?: unknown }).key === propertyKey)
  if (declared) return null
  return (
    `no property definition declares \`${propertyKey}\` on \`${SESSION_TRACKING}\`, so every ` +
    "session scores 0 and any total written from it would state an instrument's silence as a " +
    "measurement"
  )
}
