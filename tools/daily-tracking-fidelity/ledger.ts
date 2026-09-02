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
}

export const SESSION_LEDGER: Ledger = {
  id: exact("row identity, uuid v7 already", false),
  "page-type-slug": {
    policy: "exact",
    optional: true,
    mintedConstant: "tracking-session",
    note: "a jsonl row names no page type; a page must",
  },
  slug: { policy: "exact", optional: true, mintedConstant: "", note: "a migrated row needs a slug akasha can export" },
  "daily-tracking": {
    policy: "reminted-reference",
    optional: false,
    note: "points at the day page whose id may be re-minted",
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
  "page-type-slug": {
    policy: "exact",
    optional: true,
    mintedConstant: "completed-task",
    note: "a jsonl row names no page type; a page must",
  },
  slug: { policy: "exact", optional: true, mintedConstant: "", note: "a migrated row needs a slug akasha can export" },
  "daily-tracking": {
    policy: "reminted-reference",
    optional: true,
    mintedWhenAbsent: "day-reference",
    note: "no task row carries a day reference; the day lives only in the sidecar's filename",
  },
  seq: exact("integer ordering key that does not begin at 1 on 96 of 97 files", false),
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
