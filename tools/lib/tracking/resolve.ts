import type { Page } from "../daily-tracking/tracking-types.ts"
import { pageStem } from "../exercise-page-stem.ts"
import { dataError, inputError, operationalError } from "../exit.ts"
import { askComposed, pageLanding } from "../page-query-client.ts"
import { displayTitle, fieldNum, fieldStr } from "./format.ts"
import type { ActivityDifficulty } from "./levels.ts"
import { getPages, pageOf, type PageAccessClient } from "./pages.ts"

const MAX_DAY_SESSIONS = 200

const MAX_SESSION_ACTIVITIES = 500

const PRIOR_SCAN_LIMIT = 5

const SESSION_ACTIVITY = "session-activity"

const ACTIVITY_DIFFICULTY_KEY = "default-difficulty"

export const TRACKING_WRITER = "ops-tracking"

export const DAILY_TRACKING_VERSION = "3.0"

export async function findOpenSession(_sb: PageAccessClient): Promise<Page | null> {
  const asked = await askComposed({
    "page-type": "session-tracking",
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
    "page-type": "session-tracking",
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
  const asked = await askComposed({
    "page-type": "daily-tracking",
    where: { id: { is: dailyId } },
    limit: 1,
  })
  if (!asked.ok) throw dataError(`finding the day a block stands in: ${asked.why}`)
  const row = asked.rows[0]
  if (row === undefined) return undefined
  return fieldStr(pageOf(row.values), "date")
}

export async function resolveOrCreateDaily(
  _sb: PageAccessClient,
  dayStr: string
): Promise<{ readonly id: string; readonly created: boolean }> {
  const asked = await askComposed({
    "page-type": "daily-tracking",
    where: { date: { is: dayStr } },
    limit: 1,
  })
  if (!asked.ok) throw dataError(`finding the day ${dayStr}: ${asked.why}`)
  const standing = asked.rows[0]
  const held = standing === undefined ? undefined : standing.values.id
  if (typeof held === "string") return { id: held, created: false }

  const id = Bun.randomUUIDv7()
  const landed = await pageLanding(
    "patch",
    "daily-tracking",
    dayStr,
    { id, title: `@date:${dayStr}`, date: dayStr, version: DAILY_TRACKING_VERSION },
    TRACKING_WRITER
  )
  if (!landed.ok) {
    throw operationalError(`the day ${dayStr} did not land as a file: ${landed.why}`)
  }
  return { id, created: true }
}

export function normalizeSessionActivities(
  rows: readonly Page[]
): readonly ActivityDifficulty[] {
  return rows.map((row) => ({
    title: displayTitle(row),
    defaultDifficulty: fieldNum(row, "defaultDifficulty"),
  }))
}

async function listActivityPages(sb: PageAccessClient): Promise<readonly Page[]> {
  const { rows } = await getPages(sb, {
    pageTypeSlug: SESSION_ACTIVITY,
    limit: MAX_SESSION_ACTIVITIES,
  })
  return rows
}

export async function listSessionActivities(
  sb: PageAccessClient
): Promise<readonly ActivityDifficulty[]> {
  return normalizeSessionActivities(await listActivityPages(sb))
}

export interface ActivityLanded {
  readonly id: string
  readonly name: string
  readonly at: string
  readonly created: boolean
}

export async function setActivityDefault(
  sb: PageAccessClient,
  title: string,
  difficulty: number
): Promise<ActivityLanded> {
  const name = pageStem(title)
  const standing = (await listActivityPages(sb)).find(
    (row) => pageStem(displayTitle(row)) === name
  )
  const held = standing === undefined ? undefined : fieldStr(standing, "id")
  const id = held ?? Bun.randomUUIDv7()
  const landed = await pageLanding(
    "patch",
    SESSION_ACTIVITY,
    name,
    { id, title, [ACTIVITY_DIFFICULTY_KEY]: difficulty },
    TRACKING_WRITER
  )
  if (!landed.ok) {
    throw operationalError(`the activity "${title}" did not land as a file: ${landed.why}`)
  }
  return { id, name, at: landed.at, created: held === undefined }
}

export async function listDaySessions(
  _sb: PageAccessClient,
  dailyId: string
): Promise<readonly Page[]> {
  const asked = await askComposed({
    "page-type": "session-tracking",
    where: { "daily-tracking": { is: dailyId } },
    "sort-by": "start-time",
    limit: MAX_DAY_SESSIONS,
  })
  if (!asked.ok) throw dataError(`listing the sessions of a day: ${asked.why}`)
  return asked.rows.map((row) => pageOf(row.values))
}
