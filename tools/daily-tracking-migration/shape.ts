/**
 * The shape one of Alan's tracked days takes as an akasha page.
 *
 * This file is the whole decision, stated as data so the converter can be read against it and so a
 * key nobody thought about refuses instead of vanishing. Nothing here reads a file.
 *
 * The day itself becomes one page. Its frontmatter keys become page properties, kebab in the
 * markdown and camel on the page, because an akasha page is a TypeScript object literal and every
 * page under `akasha/` spells its keys camel.
 *
 * The two jsonl sidecars become `page-property-entry` properties. That page type is landed
 * (`akasha/pages-system/page-property-entries/page-property-entry.page-type.ts`) and its read path
 * is landed (`akasha/pages-system/page/page-entries/page-entries.module.code.ts`). A page states
 * such a property as the extension of the file beside it — `sessions: "jsonl"` — and `besideAt` in
 * `page-file-name.module.code.ts` builds that file's name as the page's path with the extension
 * dropped, then the property slug, then what the file holds. For a page at
 * `day-2026-03-05.daily-tracking.ts` that is `day-2026-03-05.daily-tracking.sessions.jsonl`, which
 * is the sidecar's name today with `day-` put on the front. So the rows move by being renamed.
 */

export const DAY_PAGE_TYPE = "daily-tracking"

export const SLUG_PREFIX = "day-"

export const SESSIONS_SLUG = "sessions"

export const COMPLETED_TASKS_SLUG = "completed-tasks"

export const ENTRY_EXTENSION = "jsonl"

/**
 * The import the rendered page states, and the type it satisfies.
 *
 * No `daily-tracking.page-type.ts` exists under `akasha/` yet. The converter renders this line
 * anyway, because a page that does not name its type is not a page, and the dry run counts the
 * property pages the type still needs. Change these two when the type lands somewhere else.
 */
export const DECLARING_IMPORT = "@akasha/alan/daily-tracking"

export const DECLARING_TYPE = "DailyTracking"

/** How a markdown value becomes a page value. */
export type Turn =
  /** Carried across untouched. */
  | "as-it-stands"
  /** The page's own identity: kept when it is already a uuid v7, minted afresh when it is not. */
  | "identity"
  /** `2026-03-05` becomes `day-2026-03-05`, and is minted from the date on the five days with none. */
  | "day-slug"
  /** Must name the page type this converter writes. */
  | "page-type"

export type DayField = {
  /** The key the markdown frontmatter carries. */
  readonly key: string
  /** The key the page carries. */
  readonly name: string
  readonly turn: Turn
  /** Whether every one of the 133 days carries it. */
  readonly onEveryDay: boolean
}

const carried = (key: string, name: string, onEveryDay = false): DayField => ({
  key,
  name,
  turn: "as-it-stands",
  onEveryDay,
})

/**
 * Every frontmatter key the 133 markdown days carry, in the order the rendered page states them.
 *
 * Measured over `pages/daily-tracking/*.daily-tracking.md` on 2026-09-01: 33 keys, of which four
 * are on all 133 days and `slug` is on 128. A key off this list is refused by name rather than
 * dropped, which is the only reason the dry run can say the corpus converts clean.
 */
export const DAY_FIELDS: readonly DayField[] = [
  { key: "id", name: "id", turn: "identity", onEveryDay: true },
  { key: "page-type-slug", name: "pageTypeSlug", turn: "page-type", onEveryDay: true },
  { key: "slug", name: "slug", turn: "day-slug", onEveryDay: false },
  carried("title", "title", true),
  carried("date", "date", true),
  carried("version", "version"),
  carried("last-viewed-at", "lastViewedAt"),
  /**
   * Text, not a number.
   *
   * `tools/daily-tracking-fidelity/ledger.ts:36` declares this `declared-number-from-text`, so the
   * checker takes either. It is carried across as the text it is for two reasons. A session row
   * carries a key of this same name and rows move across untouched, so a number here would make one
   * property two types on one day. And `version` beside it is text that reads as a number and is
   * ruined by becoming one — all 102 day values and all 617 row values, measured 2026-09-01 — so
   * the rule that numeric-looking text stays text is worth holding to everywhere rather than in the
   * one place it is known to bite.
   */
  carried("safety-level", "safetyLevel"),
  carried("persona-days", "personaDays"),
  carried("meals", "meals"),
  carried("health-points", "healthPoints"),
  carried("task-points", "taskPoints"),
  carried("wealth-points", "wealthPoints"),
  carried("faith-points", "faithPoints"),
  carried("love-points", "lovePoints"),
  carried("sleep-points", "sleepPoints"),
  carried("fun-points", "funPoints"),
  carried("learn-points", "learnPoints"),
  carried("strength-points", "strengthPoints"),
  carried("strength-volume", "strengthVolume"),
  carried("cardio-points", "cardioPoints"),
  carried("nutrition-points", "nutritionPoints"),
  carried("breathing-points", "breathingPoints"),
  carried("active-calories", "activeCalories"),
  carried("completion-snapshot", "completionSnapshot"),
  carried("words-read-points", "wordsReadPoints"),
  carried("words-read-snapshot", "wordsReadSnapshot"),
  carried("inbox-tasks", "inboxTasks"),
  carried("inbox-tasks-cleared-today", "inboxTasksClearedToday"),
  carried("inbox-temper-tasks", "inboxTemperTasks"),
  carried("inbox-temper-tasks-cleared-today", "inboxTemperTasksClearedToday"),
  carried("inbox-texts", "inboxTexts"),
  carried("inbox-texts-cleared-today", "inboxTextsClearedToday"),
  carried("inbox-calendar", "inboxCalendar"),
  carried("inbox-calendar-cleared-today", "inboxCalendarClearedToday"),
]

export const DAY_FIELD_BY_KEY: ReadonlyMap<string, DayField> = new Map(
  DAY_FIELDS.map((field) => [field.key, field])
)

/**
 * The key a session row carries naming the day it belongs to.
 *
 * Every one of the 780 rows carries it and every one of them names its own day's page identity,
 * measured 2026-09-01. So a day whose identity is re-minted has to have its rows re-pointed, and
 * that is the only edit any row takes.
 */
export const DAY_REFERENCE_KEY = "daily-tracking"

/**
 * Which property page each key needs before a day can land.
 *
 * `akasha` holds a page property page for `title` alone out of all of these, so this list is what
 * stands between a converted day and a landed one. The dry run prints it.
 */
export const PROPERTY_PAGES_NEEDED: readonly string[] = [
  ...DAY_FIELDS.filter((f) => f.key !== "id" && f.key !== "page-type-slug" && f.key !== "slug").map(
    (f) => f.key
  ),
  SESSIONS_SLUG,
  COMPLETED_TASKS_SLUG,
]
