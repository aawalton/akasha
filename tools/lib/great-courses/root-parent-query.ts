import { patchPage } from "@shared/pages-query"
import { classifyError, logError, toError } from "../sync-run/result.ts"
import { pageTitled, textAt, WRITER } from "./page-query.ts"

const GREAT_COURSES_COLLECTION_SLUG = "great-courses-collection"
const ROOT_TIMER_TITLE = "The Great Courses"
const SYNC_INTERVAL_DAYS = 30

function todayYYYYMMDD(): string {
  return daysAgoYYYYMMDD(0)
}

function daysAgoYYYYMMDD(days: number): string {
  const now = new Date()
  now.setUTCDate(now.getUTCDate() - days)
  const y = now.getUTCFullYear()
  const m = String(now.getUTCMonth() + 1).padStart(2, "0")
  const d = String(now.getUTCDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export async function shouldRunGreatCoursesSync(): Promise<boolean> {
  try {
    const root = await pageTitled(GREAT_COURSES_COLLECTION_SLUG, ROOT_TIMER_TITLE, ["lastSyncedAt"])
    if (root === null) {
      console.log(`${ROOT_TIMER_TITLE} root not found, running sync anyway`)
      return true
    }

    const lastSyncedAt = textAt(root, "lastSyncedAt")
    if (lastSyncedAt == null) return true

    const shouldRun = lastSyncedAt < daysAgoYYYYMMDD(SYNC_INTERVAL_DAYS)
    if (!shouldRun) {
      console.log(
        `Great Courses: Last synced ${lastSyncedAt} (within ${SYNC_INTERVAL_DAYS} days)`
      )
    }
    return shouldRun
  } catch (thrown) {
    const err = toError(thrown)
    logError("Root parent query", "shouldRunGreatCoursesSync", err, classifyError(err))
    return true
  }
}

export async function updateRootParentLastSyncedAt(): Promise<void> {
  try {
    const root = await pageTitled(GREAT_COURSES_COLLECTION_SLUG, ROOT_TIMER_TITLE, [])
    const slug = root === null ? null : textAt(root, "slug")
    if (slug == null) {
      console.warn(`${ROOT_TIMER_TITLE} root not found, so nothing recorded when it last synced`)
      return
    }
    const written = await patchPage(
      GREAT_COURSES_COLLECTION_SLUG,
      slug,
      { lastSyncedAt: todayYYYYMMDD() },
      WRITER
    )
    if (!written.ok) throw new Error(written.why)
  } catch (thrown) {
    const err = toError(thrown)
    logError("Root parent update", "updateRootParentLastSyncedAt", err, classifyError(err))
  }
}
