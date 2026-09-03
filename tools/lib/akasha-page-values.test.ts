import { describe, expect, test } from "bun:test"
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import {
  akashaValuesAt,
  isAkashaPage,
  kebabisedRow,
  valuesOfDeclared,
} from "@akasha/pages-system/akasha-page-values"
import { dropDerivers } from "./deriver-hold.ts"
import { answer } from "./page-query.ts"
import { forgetRowsPages } from "./page-rows.ts"

const REPO = resolve(import.meta.dir, "..", "..")

const DAY = "wake-day-2026-08-31.wake-day.ts"

const DAY_BODY = `import type { WakeDay } from "../../wake-day.page-type.ts"

export const wakeDay20260831 = {
  id: "01a05582-adf0-7000-973b-9313436f9e7e",
  pageTypeSlug: "wake-day",
  slug: "wake-day-2026-08-31",
  title: "@date:2026-08-31",
  date: "2026-08-31",
  version: "3.0",
  healthPoints: 2.2166,
  inboxTasksClearedToday: false,
  meals: ["one", "two"],
  sessions: "jsonl",
} as const satisfies WakeDay
`

/** The same day as akasha's own composer writes one: the file name states the slug and the type. */
const COMPOSED = "wake-day-2026-09-02.wake-day.ts"

const COMPOSED_BODY = `import type { WakeDay } from "../../wake-day.page-type.ts"

export const wakeDay20260902 = {
  id: "01a05fff-0000-7000-8000-000000000001",
  title: "@date:2026-09-02",
  date: "2026-09-02",
} as const satisfies WakeDay
`

/** A row beside an akasha page is camel, because that is the spelling `akasha write` judges. */
const ROWS = `${JSON.stringify({
  id: "01a054fb-5e96-7000-9f4d-1696db9a5975",
  title: "Sleep",
  startTime: "2026-08-30T23:22:00.000Z",
  endTime: "2026-08-31T01:50:00.000Z",
  dailyTracking: "01a05582-adf0-7000-973b-9313436f9e7e",
})}\n`

function corpus(): string {
  const root = mkdtempSync(join(tmpdir(), "akasha-page-values-"))
  cpSync(join(REPO, "pages", "page-type"), join(root, "pages", "page-type"), { recursive: true })
  cpSync(
    join(REPO, "pages", "page-property-definition"),
    join(root, "pages", "page-property-definition"),
    { recursive: true }
  )
  const days = join(root, "akasha", "alan", "tracking", "daily", "wake-days", "pages")
  mkdirSync(days, { recursive: true })
  writeFileSync(join(days, DAY), DAY_BODY)
  writeFileSync(join(days, COMPOSED), COMPOSED_BODY)
  writeFileSync(join(days, "wake-day-2026-08-31.wake-day.sessions.jsonl"), ROWS)
  dropDerivers()
  forgetRowsPages()
  return root
}

describe("the values an akasha page declares", () => {
  test("a `.ts` page is one and a `.md` page is not", () => {
    expect(isAkashaPage("akasha/alan/x/wake-day-2026-03-05.wake-day.ts")).toBe(true)
    expect(isAkashaPage("pages/daily-tracking/2026-03-05.daily-tracking.md")).toBe(false)
  })

  test("camel keys become kebab and every value is carried as text", () => {
    const values = valuesOfDeclared("x/wake-day-2026-03-05.wake-day.ts", {
      healthPoints: 2.2166,
      inboxTasksClearedToday: false,
      meals: ["one", "two"],
    })
    expect(values["health-points"]).toBe("2.2166")
    expect(values["inbox-tasks-cleared-today"]).toBe("false")
    expect(values["meals"]).toEqual(["one", "two"])
  })

  test("a body stating no slug and no page type takes both off its file name", () => {
    const values = valuesOfDeclared("x/wake-day-2026-03-05.wake-day.ts", { date: "2026-03-05" })
    expect(values["slug"]).toBe("wake-day-2026-03-05")
    expect(values["page-type-slug"]).toBe("wake-day")
  })

  test("a body stating them keeps what it states", () => {
    const values = valuesOfDeclared("x/wake-day-2026-03-05.wake-day.ts", {
      slug: "wake-day-2026-03-05",
      pageTypeSlug: "wake-day",
    })
    expect(values["slug"]).toBe("wake-day-2026-03-05")
    expect(values["page-type-slug"]).toBe("wake-day")
  })

  test("a camel row is turned and a kebab row is left as it stands", () => {
    expect(kebabisedRow({ startTime: "a", dailyTracking: "b" })).toEqual({
      "start-time": "a",
      "daily-tracking": "b",
    })
    expect(kebabisedRow({ "start-time": "a", id: "b" })).toEqual({ "start-time": "a", id: "b" })
  })
})

describe("the query engine reads both halves of one page type", () => {
  test("an akasha day answers to a query naming its date, and its rows stand beside it", () => {
    const root = corpus()
    try {
      const roots = { akasha: root }
      const days = answer(roots, { pageType: "daily-tracking" })
      expect(days).not.toBeNull()
      expect(days?.n).toBe(2)
      expect(days?.faults).toEqual([])

      const one = answer(roots, {
        pageType: "daily-tracking",
        where: [{ key: "date", is: "2026-08-31" }],
      })
      expect(one?.n).toBe(1)
      expect(one?.rows[0]?.values["health-points"]).toBe("2.2166")
      expect(one?.rows[0]?.values["slug"]).toBe("wake-day-2026-08-31")

      // The day whose body states neither slug nor page type is found all the same.
      const composed = answer(roots, {
        pageType: "daily-tracking",
        where: [{ key: "date", is: "2026-09-02" }],
      })
      expect(composed?.n).toBe(1)
      expect(composed?.rows[0]?.values["slug"]).toBe("wake-day-2026-09-02")

      const sessions = answer(roots, { pageType: "session-tracking" })
      expect(sessions?.n).toBe(1)
      const row = sessions?.rows[0]?.values
      expect(row?.["start-time"]).toBe("2026-08-30T23:22:00.000Z")
      expect(row?.["daily-tracking"]).toBe("01a05582-adf0-7000-973b-9313436f9e7e")
      expect(row?.["daily-tracking-slug"]).toBe("wake-day-2026-08-31")
    } finally {
      rmSync(root, { recursive: true, force: true })
      dropDerivers()
      forgetRowsPages()
    }
  })

  test("a page whose body will not load answers with nothing rather than with an empty page", () => {
    const root = mkdtempSync(join(tmpdir(), "akasha-page-values-"))
    try {
      writeFileSync(join(root, "broken.daily-tracking.ts"), "this is not TypeScript {{{")
      expect(akashaValuesAt(root, "broken.daily-tracking.ts")).toBeNull()
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})
