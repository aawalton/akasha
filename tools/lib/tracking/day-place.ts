import { kebabisedRow } from "@akasha/pages-system/akasha-page-values"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { asking } from "@akasha/pages-system-service/asking"
import type { Page } from "../../../akasha/alan/tracking/daily/day-narrow-types/day-narrow-types.module.code.ts"
import { dataError } from "../exit.ts"
import {
  type Answered,
  type AnsweredRow,
  type Landed,
  pageLanding,
  removeRow,
  rowLanding,
} from "../page-query-client.ts"
import { landAkashaDayPage, landAkashaSessionRow } from "./akasha-day.ts"
import { camelizeKey } from "./keys.ts"
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
 * reaches the file layer around it. That is the whole point of this file: while the migration was
 * partly done, one day was markdown and the next was akasha, and a reach that decided for itself
 * would write a new day to the old place after that day had already moved — two files for one day,
 * each holding half of it, and nothing saying which is the day.
 *
 * Every day has moved, so this answers `akasha` outright. What stood here until it did was
 * `MIGRATED_DAYS`, a set naming the 133 days already carried across, and a day it did not name was
 * answered `markdown`. That set could only ever be right for the day it was last edited on: it
 * named up to 2026-09-01 while the day being tracked was 2026-09-02, so today's day was written to
 * `pages/daily-tracking/` after every day before it had moved, and the migration that would have
 * carried it over afterwards had already been deleted as dead. Naming one more day would have put
 * the same lag back at the next midnight. A constant is the wrong instrument for a question whose
 * answer changes while nobody is editing this file.
 *
 * The days the set named are in this file's history, and the pages themselves are the record that
 * they moved. `dayStr` is taken and not read, because every caller has a day in hand and the audit
 * in `tools/lib/tracking-funnel.ts` reads a reach as funnelled by its asking here.
 */
export function dayPlaceOf(_dayStr: string): DayPlace {
  return AKASHA
}

/**
 * The name a day's page answers to, and the day that name is for.
 *
 * A markdown day is named by its date, so both of these are the date itself. An akasha day is to be
 * named `wake-day-2026-03-05`, because `20260305` is no identifier and a bare date reads as a number.
 * Both directions live here so that the day a session says it is beside and the day a writer names
 * are read by one rule rather than two.
 */
export function dayNameIn(place: DayPlace, dayStr: string): string {
  return place === AKASHA ? `wake-day-${dayStr}` : dayStr
}

export function dayNameOf(dayStr: string): string {
  return dayNameIn(dayPlaceOf(dayStr), dayStr)
}

export function dayOfName(name: string): string {
  return name.startsWith("wake-day-") ? name.slice("wake-day-".length) : name
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

/**
 * One of Alan's days, read off the akasha page it is kept on.
 *
 * These three readers asked `daily-tracking` of the markdown query engine until this. They were
 * already reading the akasha pages when they did: `pages/page-type/daily-tracking.page-type.md`
 * names a glob over `akasha/alan/tracking/daily/wake-days` in its `files:`, so the deriver scanned
 * the very same 135 files and `kebabisedRow` turned their camel keys back to kebab on the way out.
 * The page type name was the last thing about a day that was still markdown, and one declaration
 * file was holding eight workstation readings up.
 *
 * SO WHAT CHANGES IS THE ROAD AND NOT THE PAGES. Measured over all 135 days: every key a day
 * carries — `id`, `date`, the fourteen point counts, the four inbox pairs, `meals`, `persona-days`,
 * `safety-level`, `slug`, `title`, `version` and the rest — answers the same on both roads, taking
 * a number and its own spelling as one value. `statedAt`, which every readout reducer reads a day
 * through, takes a number and a string alike, so the akasha road handing back `3.4354` where the
 * deriver handed back `"3.4354"` reaches no reader as a difference.
 *
 * WHAT THE DERIVER ADDED AND THIS DOES NOT. Sixteen keys were the deriver's own arithmetic rather
 * than anything on a day: `activity-calories`, `strength-calories`, six `*-level`, six
 * `*-stoplight`, `stoplights` and `total-level`, plus `sleep-hours`, `spend-hours`,
 * `surplus-hours` and the `owner` default. `asking` declares the sixteen and fills none of them.
 * Measured over the same 135 days, ten of those are null on every day, and the ones that are not
 * are what all-null inputs reduce to: `⚫` six times, `0` for `stoplights`, `0` for `total-level`,
 * and `0` for `surplus-hours` out of `({sleep-hours} ?? 0) - ({spend-hours} ?? 0)`. Nothing in the
 * repo reads `owner`, a level or a stoplight off a day. Two readers do read the hours, and both
 * are better for the change: `sleepIn` already answered null, and `surplus-reading.ts` says in its
 * own head that a `0` there is "a healthy rung, on a tile that ought to be dark".
 *
 * `sessions` and `completed-tasks` are the one shape that reads differently. The deriver answered
 * the declared extension, the word `jsonl`; `asking` reads the file beside the page and answers the
 * rows themselves. No reader of a day takes either key — the rows are asked for through
 * `sessionsOfDay` and the readers below — so the wider answer costs nothing and hides nothing.
 *
 * `at` names the day page rather than a file path, as it does for a stretch above. Nothing reads it
 * off a day; every caller takes `values`.
 */
function dayAnswered(
  where: Readonly<Record<string, Readonly<Record<string, unknown>>>>,
  keys: readonly string[] | undefined
): Answered {
  const root = checkoutRoot()
  const asked = asking(root, {
    pageTypeSlug: WAKE_DAY,
    where,
    limit: 1,
    ...(keys === undefined ? {} : { keys: keys.map(camelizeKey) }),
  } as never)
  if ("refused" in asked) return { ok: false, why: asked.refused }
  const rows: AnsweredRow[] = asked.rows.map((one) => {
    const row = one as Readonly<Record<string, unknown>>
    return {
      at: typeof row["slug"] === "string" ? row["slug"] : "",
      values: kebabisedRow(row),
    }
  })
  return { ok: true, rows, n: rows.length, unfound: [] }
}

export function askDayByDate(dayStr: string): Promise<Answered> {
  return Promise.resolve(dayAnswered({ date: { is: dayStr } }, undefined))
}

export function askDayById(dailyId: string): Promise<Answered> {
  return Promise.resolve(dayAnswered({ id: { is: dailyId } }, undefined))
}

async function only(asked: Promise<Answered>): Promise<Page | null> {
  const answer = await asked
  if (!answer.ok) throw dataError(`reading ${WAKE_DAY} pages: ${answer.why}`)
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
 * day with a function written against the kebab spelling — the readout engine's `activityIn`, which
 * reads `active-calories` — needs the values untouched, so it asks here instead of camelizing and
 * then spelling every key a second way.
 *
 * `keys` is spelled kebab here and camel on the way in, because a key is reached by its property
 * slug written in camel. A key the day page type declares nothing for is refused by `asking` and
 * the refusal is thrown, rather than answered as a row with the key absent: a caller summing a key
 * no property declares would read an instrument's silence as a measurement. That is the same rule
 * `entryKeysDeclared` keeps for a stretch, one level up, and it is why
 * `tools/lib/surplus-fall/readout.ts` no longer names `surplus-hours`, `sleep-hours` and
 * `spend-hours` — the deriver worked those three out and `wake-day` declares none of them.
 */
export async function dayValuesByDate(
  dayStr: string,
  keys?: readonly string[]
): Promise<Readonly<Record<string, unknown>> | null> {
  const answer = dayAnswered({ date: { is: dayStr } }, keys)
  if (!answer.ok) throw dataError(`reading the ${WAKE_DAY} ${dayStr}: ${answer.why}`)
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
 * A stretch is no longer a page, so it is no longer asked for as one. `session-tracking` was a page
 * type only while the rows were markdown files; in akasha a stretch is a row of the `sessions` entry
 * property hanging off the day it was part of, and `sessions.page-property-entry.ts` states that
 * outright — "A stretch is a row here rather than a page a query may ask of." Asking the old
 * registry for a page type by that name is what took Alan's safety and capacity tiles dark: the
 * registry answers `names no page type whose pages are files`, and no restore of the declaration
 * could fix it, because the declaration is right and the query was wrong.
 *
 * So the rows are read off the days. `asking` refuses rather than answering nothing where it cannot
 * read — an unknown page type and an undeclared key are both refusals — which is why the reach is
 * made through it rather than through `valuesOfType`, which answers `[]` for a page type that does
 * not exist and would put the silent zero back. The narrowing, sorting and limiting are done here
 * because they are over rows of an entry rather than over pages, and `asking` narrows pages.
 */
const WAKE_DAY = "wake-day"

const SESSIONS = "sessions"

/**
 * The entry a finished round of a to-do is a row of, and the key a day states it under.
 *
 * These two differ where `sessions` has them the same, so one name would be wrong on one side of
 * the read: the entry property is filed as `completed-tasks` and a day's own file spells the key
 * `completedTasks`.
 */
const COMPLETED_TASKS = "completed-tasks"

const COMPLETED_TASKS_KEY = "completedTasks"

/** What a completion has to carry for a day's task points to be read off it. */
const COMPLETION_KEYS = ["toDoSlug", "completedAt", "valueSlug"] as const

const ENTRY_PROPERTY = "page-property-entry"

function checkoutRoot(): string {
  const roots = resolveRoots() as unknown as Readonly<Record<string, string>>
  const root = roots[AKASHA]
  if (root === undefined || root === "") {
    throw dataError("no akasha checkout stands here, so no stretch of Alan's day can be read")
  }
  return root
}

/**
 * The keys an entry beside a day is declared as able to carry, read off the entry property itself.
 *
 * `asking` guards a key against the page type it is asked of, and these are keys of an entry rather
 * than of a page, so that guard does not reach them. Without this a caller asking for a key no row
 * carries would be handed rows with the key absent from every one, and a sum over them would state
 * an instrument's silence as a measurement. That is the same defect as the silent zero, one level
 * down, so it refuses in the same way.
 */
function entryKeysDeclared(root: string, entrySlug: string, said: string): ReadonlySet<string> {
  const asked = asking(root, {
    pageTypeSlug: ENTRY_PROPERTY,
    where: { slug: { is: entrySlug } },
    limit: 1,
  } as never)
  if ("refused" in asked) {
    throw dataError(`reading what ${said} may carry: ${asked.refused}`)
  }
  const row = asked.rows[0]
  const stated = row === undefined ? undefined : row["properties"]
  if (!Array.isArray(stated)) {
    throw dataError(
      `the \`${entrySlug}\` entry property states no properties, so what ${said} may carry is ` +
        "unknown rather than nothing"
    )
  }
  const keys = new Set<string>(["id"])
  for (const one of stated) {
    const slug = (one as { readonly pagePropertySlug?: unknown }).pagePropertySlug
    if (typeof slug === "string") keys.add(camelizeKey(slug))
  }
  return keys
}

function meetsTest(held: unknown, test: Readonly<Record<string, unknown>>, key: string): boolean {
  const absent = held === undefined || held === null || held === ""
  for (const [how, want] of Object.entries(test)) {
    switch (how) {
      case "empty":
        if (absent !== (want === true)) return false
        break
      case "is":
        if (absent || String(held) !== String(want)) return false
        break
      case "before":
        if (absent || !(String(held) < String(want))) return false
        break
      case "at-or-after":
        if (absent || !(String(held) >= String(want))) return false
        break
      default:
        throw dataError(
          `no test is named \`${how}\`, so the stretches narrowed by \`${key}\` are unknown ` +
            "rather than none; the tests are `empty`, `is`, `before` and `at-or-after`"
        )
    }
  }
  return true
}

/**
 * Every stretch akasha holds, as rows, with the day each stands beside naming it.
 *
 * `at` names the day page the row stands beside rather than a file path. Nothing reads it as a
 * path — `allSessions`'s one caller takes `values` alone — and a stretch has no file of its own to
 * name, so naming the day is the truest thing available.
 */
function sessionsAnswered(query: Readonly<Record<string, unknown>>): Answered {
  const root = checkoutRoot()
  const asked = asking(root, { pageTypeSlug: WAKE_DAY, keys: ["slug", SESSIONS] } as never)
  if ("refused" in asked) return { ok: false, why: asked.refused }

  const wanted = query["keys"]
  if (wanted !== undefined) {
    const declared = entryKeysDeclared(root, SESSIONS, "a stretch of Alan's day")
    for (const key of wanted as readonly string[]) {
      const camel = camelizeKey(key)
      if (declared.has(camel)) continue
      return {
        ok: false,
        why:
          `\`keys\` names \`${key}\`, and a stretch of Alan's day declares no such key. the keys ` +
          `are ${[...declared].sort().join(", ")}`,
      }
    }
  }

  let rows: AnsweredRow[] = []
  for (const day of asked.rows) {
    const held = day[SESSIONS]
    if (held === undefined) continue
    if (!Array.isArray(held)) {
      return {
        ok: false,
        why: `the stretches beside \`${String(day["slug"])}\` are no list, so they are unread`,
      }
    }
    const at = typeof day["slug"] === "string" ? day["slug"] : ""
    for (const one of held) {
      rows.push({ at, values: one as Readonly<Record<string, unknown>> })
    }
  }

  const where = query["where"] as Readonly<Record<string, Record<string, unknown>>> | undefined
  if (where !== undefined) {
    for (const [key, test] of Object.entries(where)) {
      const camel = camelizeKey(key)
      rows = rows.filter((row) => meetsTest(row.values[camel], test, key))
    }
  }

  const sortBy = query["sort-by"]
  if (typeof sortBy === "string") {
    const camel = camelizeKey(sortBy)
    const said = (row: AnsweredRow): string => String(row.values[camel] ?? "")
    rows.sort((one, other) => (said(one) < said(other) ? -1 : said(one) > said(other) ? 1 : 0))
    if (query["descending"] === true) rows.reverse()
  }

  // The count is taken before the limit, so a caller comparing the two reads a short answer as
  // short rather than as the whole of what there is.
  const n = rows.length
  const limit = query["limit"]
  if (typeof limit === "number") rows = rows.slice(0, limit)

  if (wanted !== undefined) {
    const keys = (wanted as readonly string[]).map(camelizeKey)
    rows = rows.map((row) => {
      const held: Record<string, unknown> = {}
      for (const key of keys) if (key in row.values) held[key] = row.values[key]
      return { at: row.at, values: held }
    })
  }

  return { ok: true, rows, n, unfound: [] }
}

function askSessions(query: Readonly<Record<string, unknown>>): Promise<Answered> {
  return Promise.resolve(sessionsAnswered(query))
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

/**
 * Every round of a to-do Alan finished within a span, oldest first.
 *
 * A completion is a row of the `completed-tasks` entry beside the day it happened on, exactly as a
 * stretch is a row of `sessions`. It was a `completed-task` page while the rows were markdown, and
 * asking the store for that page type is what left `loadDayHealthTaskPoints` throwing on every
 * call — the registry answers `names no page type whose pages are files`, so the day's task points
 * were read off nothing at all.
 *
 * The span is taken rather than a day because an ESO day begins at 6am and so lies across two wake
 * days. Both are read, and the completion's own instant decides which ESO day it fell in.
 */
export function completedTasksInSpan(
  fromInstant: Date,
  beforeInstant: Date
): readonly Readonly<Record<string, unknown>>[] {
  const root = checkoutRoot()
  const declared = entryKeysDeclared(root, COMPLETED_TASKS, "a round of a to-do Alan finished")
  for (const key of COMPLETION_KEYS) {
    if (declared.has(key)) continue
    throw dataError(
      `a round of a to-do Alan finished declares no \`${key}\`, so what he finished is unknown ` +
        `rather than nothing. the keys are ${[...declared].sort().join(", ")}`
    )
  }
  const asked = asking(root, {
    pageTypeSlug: WAKE_DAY,
    keys: ["slug", COMPLETED_TASKS_KEY],
  } as never)
  if ("refused" in asked) {
    throw dataError(`reading the rounds of to-dos Alan finished: ${asked.refused}`)
  }
  const from = fromInstant.toISOString()
  const before = beforeInstant.toISOString()
  const rows: Readonly<Record<string, unknown>>[] = []
  for (const day of asked.rows) {
    const held = day[COMPLETED_TASKS_KEY]
    if (held === undefined) continue
    if (!Array.isArray(held)) {
      throw dataError(
        `the rounds finished beside \`${String(day["slug"])}\` are no list, so they are unread`
      )
    }
    for (const one of held) {
      const row = one as Readonly<Record<string, unknown>>
      const at = row["completedAt"]
      if (typeof at !== "string" || at < from || at >= before) continue
      rows.push(row)
    }
  }
  const at = (row: Readonly<Record<string, unknown>>): string => String(row["completedAt"])
  rows.sort((one, other) => (at(one) < at(other) ? -1 : at(one) > at(other) ? 1 : 0))
  return rows
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
 * Why a property may not be scored across stretches, or nothing where it may.
 *
 * A caller that sums a property the entry declares nothing for gets 0 from every row and cannot
 * tell that apart from a real total of nothing, so it would write an instrument's silence as a
 * measurement.
 *
 * What a stretch may carry is asked of the `sessions` entry property, which is where a stretch's
 * fields are declared now that a stretch is a row beside a day rather than a page. This asked the
 * markdown `page-property-definition` page type until that page type was taken away, after which
 * the read threw on every call and the two writers above it threw with it.
 */
export function sessionPropertyUndeclared(propertyKey: string): Promise<string | null> {
  const declared = entryKeysDeclared(checkoutRoot(), SESSIONS, "a stretch of Alan's day")
  if (declared.has(camelizeKey(propertyKey))) return Promise.resolve(null)
  return Promise.resolve(
    `the \`${SESSIONS}\` entry declares no \`${propertyKey}\`, so every stretch scores 0 and ` +
      "any total written from it would state an instrument's silence as a measurement"
  )
}
