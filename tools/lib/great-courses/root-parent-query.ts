import { classifyError, logError, toError } from "../sync-run/result.ts"
import { pageTitled, textAt } from "./page-query.ts"

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
    // A READ THAT FAILED IS NOT A GATE THAT OPENED. This used to log the failure and answer
    // `true`, which reads as "the sync is due" when what happened is "whether it is due went
    // unread". Measured 2026-09-02, that is not hypothetical: the read is refused 400,
    // `great-courses-collection` names no page type the index holds, so every run took this
    // branch, called itself due, and then died two steps later in `getAllGreatCoursesParentSlug`
    // against the same unread page type — naming the second read rather than the first, which is
    // the one that would have said why. Refusing here puts the cause in the first line of the
    // failure instead of the third.
    const err = toError(thrown)
    logError("Root parent query", "shouldRunGreatCoursesSync", err, classifyError(err))
    throw new Error(
      `whether the Great Courses sync is due went unread, so it is neither due nor not due and ` +
        `nothing may be decided against it: ${err.message}`
    )
  }
}

// THE TIMER THIS SETS IS THE ONE `shouldRunGreatCoursesSync` READS. `patchPage` has refused every
// call since 4c1f05a264 — the store writes a path and a whole body, not the keys a page carries —
// so `lastSyncedAt` has not moved since. That leaves the read above answering an ever-staler date,
// which is why the sync judges itself due on every run: the thirty-day gate can never close while
// nothing can write the date it gates on.
//
// What that costs, measured 2026-09-02: the page holds `lastSyncedAt: 2026-08-24`, and the gate
// opens once today less thirty days passes that date. Computed rather than reckoned by eye, the
// cutoff first passes it on 2026-09-24. So on the arithmetic the gate is shut today, and from that
// morning the timer at 07:35 would run a whole sync every day rather than monthly, for good.
//
// The arithmetic is not what happens, because the date it reasons about is never read. Measured by
// running the sync on 2026-09-02, `pageTitled` is refused 400 — `great-courses-collection` names no
// page type the index holds — so `lastSyncedAt` never reaches the comparison at all. The gate is
// not shut; it is unreadable, which is a different thing and fails differently.
//
// This cannot be repaired here. `great-courses-collection` names no page type the store's index
// holds — its three pages are markdown under `pages/` — and nothing in the repository renders a
// page body out of its keys, which is what setting one key would need. Writing the frontmatter by
// hand from here would mean settling key order and quoting in a sync client, which belongs with
// the checks rather than here. So this reports that it could not record the date, and the caller
// counts that as a failure rather than printing a summary that reads as though it had.
const NO_RENDER =
  "the store writes a path and a whole body, and nothing renders a `great-courses-collection` page's body out of its keys, so `lastSyncedAt` cannot be set here. land the page's whole body with `patchFiles`, or set it through the akasha command line"

/** Whether the date was recorded. False every time today, for the reason above. */
export async function updateRootParentLastSyncedAt(): Promise<boolean> {
  const root = await pageTitled(GREAT_COURSES_COLLECTION_SLUG, ROOT_TIMER_TITLE, [])
  const slug = root === null ? null : textAt(root, "slug")
  if (slug == null) {
    console.warn(`${ROOT_TIMER_TITLE} root not found, so nothing recorded when it last synced`)
    return false
  }
  const err = toError(
    new Error(`\`${GREAT_COURSES_COLLECTION_SLUG}/${slug}\` kept ${todayYYYYMMDD()}: ${NO_RENDER}`)
  )
  logError("Root parent update", "updateRootParentLastSyncedAt", err, classifyError(err))
  return false
}
