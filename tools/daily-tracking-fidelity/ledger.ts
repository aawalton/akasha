/**
 * What each key of a tracked day is allowed to become, so a migration is judged rather than trusted.
 *
 * A key absent from these tables is reported as `key-unledgered` rather than compared some default
 * way, which is the only reason a key nobody thought about cannot slip through.
 *
 * Counts here were measured over `pages/daily-tracking/` on 2026-09-01: 133 days, 780 session rows
 * across 64 files, 1028 task rows across 97 files. Count session rows per file, never by catting
 * them together — `2026-08-29` and `2026-08-30` end without a newline, so `cat` welds each one's
 * last row onto the next file's first and answers 778. That undercount is the exact shape of defect
 * this checker exists to catch, and it is where the figure 778 in the original brief came from.
 *
 * ON ROW ORDER, WHICH NEEDS NO ORDINAL.
 *
 * Row order is real and no field in a row rebuilds it. Sessions carry no ordering key at all, and
 * ordering them by `start-time` moves 12 rows across 2026-06-19, 08-21, 08-25 and 08-27, two of
 * which share a `start-time` exactly and so cannot be ordered by it even in principle. Tasks carry
 * `seq`, but on 2026-07-17 file order and `seq` order genuinely disagree — file order is 4,3,5,2,1
 * by seq rank — which moves 5 more. Those 17 are what a shape that turns each row into its own page
 * cannot avoid, and an ordinal key does not rescue it: adding one raises 780 `key-unledgered` faults
 * because no session ledger declares such a key, so page-per-row cannot reach zero here.
 *
 * Under the landed entries shape the question does not arise. Each row keeps the line it was on, so
 * line order simply is the order and nothing needs to state it. Do not go looking for an ordinal to
 * add. What each line is rewritten for is its keys: a row beside an akasha page is camel-keyed, and
 * the keys named here are kebab, which is the one spelling both halves are judged in.
 */
export type Policy =
  | "exact"
  | "reminted-id"
  | "reminted-reference"
  | "slug-prefixed"
  | "calendar-date"
  | "instant"
  | "declared-number-from-text"
  | "declared-text-from-number"

export type Entry = {
  policy: Policy
  optional: boolean
  note: string
  mintedWhenAbsent?: "day-slug" | "day-reference"
  mintedConstant?: string
}

export type Ledger = Readonly<Record<string, Entry>>

const exact = (note: string, optional = true): Entry => ({ policy: "exact", optional, note })

export const DAY_LEDGER: Ledger = {
  id: { policy: "reminted-id", optional: false, note: "30 of 133 are uuid v5 and must be re-minted" },
  slug: {
    policy: "slug-prefixed",
    optional: true,
    mintedWhenAbsent: "day-slug",
    note: "absent on 5 days; akasha requires one, so those five are minted from the date",
  },
  "page-type-slug": exact("page type name", false),
  title: exact("day title", false),
  date: { policy: "calendar-date", optional: false, note: "a yaml 1.1 reader turns this into a Date" },
  version: exact("float-looking text that must not become a number"),
  "last-viewed-at": { policy: "instant", optional: true, note: "on 2 days only" },
  "safety-level": {
    policy: "declared-number-from-text",
    optional: true,
    note: "integer-looking text on every day that carries it",
  },
  "persona-days": exact("uuid list pointing outside this corpus; order carries meaning"),
  meals: exact("uuid list pointing outside this corpus; order carries meaning"),
  "health-points": exact("integer on some days, float on others"),
  "task-points": exact("integer"),
  "wealth-points": exact("integer on some days, float on others"),
  "faith-points": exact("integer on some days, float on others"),
  "love-points": exact("integer on some days, float on others"),
  "sleep-points": exact("integer"),
  "strength-volume": exact("integer"),
  "nutrition-points": exact("integer"),
  "breathing-points": exact("integer"),
  "fun-points": exact("integer on some days, float on others"),
  "learn-points": exact("integer on some days, float on others"),
  "strength-points": exact("integer, on 7 days only"),
  "cardio-points": exact("integer, on 3 days only"),
  "active-calories": exact("integer on some days, float on others"),
  "completion-snapshot": exact("integer"),
  "words-read-points": exact("integer"),
  "words-read-snapshot": exact("integer"),
  "inbox-tasks": exact("integer"),
  "inbox-tasks-cleared-today": exact("boolean"),
  "inbox-temper-tasks": exact("integer"),
  "inbox-temper-tasks-cleared-today": exact("boolean"),
  "inbox-texts": exact("integer"),
  "inbox-texts-cleared-today": exact("boolean"),
  "inbox-calendar": exact("integer"),
  "inbox-calendar-cleared-today": exact("boolean"),
  sessions: {
    policy: "exact",
    optional: true,
    mintedConstant: "jsonl",
    note: "the page naming the file its session rows sit in; the markdown day named it by filename",
  },
  "completed-tasks": {
    policy: "exact",
    optional: true,
    mintedConstant: "jsonl",
    note: "the page naming the file its task rows sit in; the markdown day named it by filename",
  },
}

export const SESSION_LEDGER: Ledger = {
  id: exact("row identity, uuid v7 already", false),
  "daily-tracking": {
    policy: "reminted-reference",
    optional: false,
    note: "every one of the 780 rows names its own day, so a re-mint re-points them",
  },
  title: exact("session title", false),
  "start-time": { policy: "instant", optional: false, note: "utc with 3-digit fraction" },
  "end-time": { policy: "instant", optional: true, note: "absent on the row still running" },
  "safety-level": {
    policy: "declared-number-from-text",
    optional: true,
    note: "integer-looking and float-looking text",
  },
  "difficulty-level": {
    policy: "declared-number-from-text",
    optional: true,
    note: "integer-looking and float-looking text",
  },
  "capacity-rate": exact("real number, integer on some rows and float on others"),
  version: exact("float-looking text that must not become a number"),
  relationships: exact("uuid list that is an empty list on some rows and absent on others"),
  "asserted-at": { policy: "instant", optional: true, note: "on a minority of rows" },
  owner: exact("text, on 10 rows"),
  "breathing-sets": exact("integer, on 1 row"),
}

export const TASK_LEDGER: Ledger = {
  id: exact("row identity, uuid v7 already", false),
  "daily-tracking": {
    policy: "reminted-reference",
    optional: true,
    mintedWhenAbsent: "day-reference",
    note: "no task row carries one; under the entries shape its day is the file it sits in",
  },
  seq: exact("integer, begins at 1 on 1 of 97 files, and disagrees with file order on 2026-07-17", false),
  title: exact("task title", false),
  "completed-at": { policy: "instant", optional: false, note: "utc with 3-digit fraction" },
  "due-date": { policy: "calendar-date", optional: true, note: "absent on 6 rows" },
  "value-slug": exact("text"),
  recurrence: exact("text"),
  category: exact("text"),
  "to-do-slug": exact("text"),
  priority: exact("text"),
  "anchored-from-completion": exact("boolean, on 57 rows"),
  description: exact("text, on 22 rows"),
}

export const LEDGERS = {
  day: DAY_LEDGER,
  session: SESSION_LEDGER,
  task: TASK_LEDGER,
} as const

export type Kind = keyof typeof LEDGERS
