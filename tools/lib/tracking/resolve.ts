import type { Page } from "../daily-tracking/tracking-types.ts"
import { dataError, inputError, operationalError } from "../exit.ts"
import { askComposed } from "../page-query-client.ts"
import { askDayById, askDayByDate, DAILY_TRACKING, landDayPage, SESSION_TRACKING } from "./day-place.ts"
import { displayTitle, fieldStr } from "./format.ts"
import { pageOf, type PageAccessClient } from "./pages.ts"

const MAX_DAY_SESSIONS = 200

const PRIOR_SCAN_LIMIT = 5

export const TRACKING_WRITER = "ops-tracking"

export const DAILY_TRACKING_VERSION = "3.0"

export async function findOpenSession(_sb: PageAccessClient): Promise<Page | null> {
  const asked = await askComposed({
    "page-type": SESSION_TRACKING,
    where: { "end-time": { empty: true } },
    "sort-by": "start-time",
    descending: true,
    limit: 1,
  })
  if (!asked.ok) throw dataError(`finding the open session: ${asked.why}`)
  const row = asked.rows[0]
  return row === undefined ? null : pageOf(row.values)
}

export async function requireOpenSession(sb: PageAccessClient): Promise<Page> {
  const session = await findOpenSession(sb)
  if (session === null) {
    throw inputError('no open session — start one with `ops tracking start "<title>"`')
  }
  return session
}

export async function ensureNoOpenSession(sb: PageAccessClient): Promise<void> {
  const session = await findOpenSession(sb)
  if (session !== null) {
    throw inputError(
      `a session is already open: "${displayTitle(session)}" — ` +
        "close it with `ops tracking close`, or transition with `ops tracking switch`"
    )
  }
}

export async function findPriorClosedSession(
  _sb: PageAccessClient,
  beforeInstant: Date
): Promise<Page | null> {
  const asked = await askComposed({
    "page-type": SESSION_TRACKING,
    where: { "start-time": { before: beforeInstant.toISOString() } },
    "sort-by": "start-time",
    descending: true,
    limit: PRIOR_SCAN_LIMIT,
  })
  if (!asked.ok) throw dataError(`finding the prior closed session: ${asked.why}`)
  for (const raw of asked.rows) {
    const row = pageOf(raw.values)
    if (fieldStr(row, "endTime") !== undefined) return row
  }
  return null
}

export async function blockDay(
  _sb: PageAccessClient,
  session: Page | null
): Promise<string | undefined> {
  if (session === null) return undefined
  const dailyId = fieldStr(session, "dailyTracking")
  if (dailyId === undefined) return undefined
  const asked = await askDayById(dailyId)
  if (!asked.ok) throw dataError(`finding the day a block stands in: ${asked.why}`)
  const row = asked.rows[0]
  if (row === undefined) return undefined
  return fieldStr(pageOf(row.values), "date")
}

export async function resolveOrCreateDaily(
  _sb: PageAccessClient,
  dayStr: string
): Promise<{ readonly id: string; readonly created: boolean }> {
  const asked = await askDayByDate(dayStr)
  if (!asked.ok) throw dataError(`finding the day ${dayStr}: ${asked.why}`)
  const standing = asked.rows[0]
  const held = standing === undefined ? undefined : standing.values.id
  if (typeof held === "string") return { id: held, created: false }

  const id = Bun.randomUUIDv7()
  const landed = await landDayPage(
    "patch",
    dayStr,
    { id, title: `@date:${dayStr}`, date: dayStr, version: DAILY_TRACKING_VERSION },
    TRACKING_WRITER
  )
  if (!landed.ok) {
    throw operationalError(`the day ${dayStr} did not land as a file: ${landed.why}`)
  }
  return { id, created: true }
}

export async function listDaySessions(
  _sb: PageAccessClient,
  dailyId: string
): Promise<readonly Page[]> {
  const asked = await askComposed({
    "page-type": SESSION_TRACKING,
    where: { [DAILY_TRACKING]: { is: dailyId } },
    "sort-by": "start-time",
    limit: MAX_DAY_SESSIONS,
  })
  if (!asked.ok) throw dataError(`listing the sessions of a day: ${asked.why}`)
  return asked.rows.map((row) => pageOf(row.values))
}
