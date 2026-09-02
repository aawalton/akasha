import type { Page } from "../daily-tracking/tracking-types.ts"
import { pageStem } from "../exercise-page-stem.ts"
import { operationalError } from "../exit.ts"
import { pageLanding } from "../page-query-client.ts"
import { displayTitle, fieldNum, fieldStr } from "./format.ts"
import type { ActivityDifficulty } from "./levels.ts"
import { getPages, type PageAccessClient } from "./pages.ts"
import { TRACKING_WRITER } from "./resolve.ts"

const MAX_SESSION_ACTIVITIES = 500

const SESSION_ACTIVITY = "session-activity"

const ACTIVITY_DIFFICULTY_KEY = "default-difficulty"

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

/**
 * An activity is no day.
 *
 * This is the one write in the tracking lib that reaches the file layer without asking
 * `day-place.ts` where to go, and it is allowed to because a `session-activity` page names a kind
 * of thing Alan does rather than one of his days. It lives in a file of its own so that no reach
 * for a day can hide beside it.
 */
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
