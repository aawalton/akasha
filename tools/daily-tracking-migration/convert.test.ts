import { describe, expect, test } from "bun:test"
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { exportedAs } from "../../akasha/pages-system/page/page-export-name/page-export-name.module.code.ts"
import { besideAt } from "../../akasha/pages-system/page/page-file-name/page-file-name.module.code.ts"
import { uuidVersion7 } from "../../akasha/command-system/value-minting/value-minting.module.code.ts"
import {
  type Converted,
  convertDay,
  type DaySource,
  exportNameOf,
  isUuidV7,
  refused,
} from "./convert.ts"
import { readDays } from "./read-days.ts"
import { DAY_FIELDS, SESSIONS_SLUG } from "./shape.ts"

/**
 * Real input, copied out of the repo.
 *
 * The converter is never proved against the corpus itself. `DAILY_TRACKING_COPY` names a copy; with
 * none named the corpus-wide cases are skipped and the hand-built ones still run.
 */
const COPY = process.env["DAILY_TRACKING_COPY"] ?? ""

const HAVE_COPY =
  COPY !== "" && statSync(COPY, { throwIfNoEntry: false })?.isDirectory() === true

const V7 = "01a05f80-3969-7000-8ccd-6284909fc036"

const V5 = "695df57f-5d77-53ea-a82f-45b5508c2733"

function mintOnce(): () => string {
  let called = 0
  return () => {
    called += 1
    if (called > 1) throw new Error("the mint was reached more than once for one day")
    return "01a06000-0000-7000-8000-000000000001"
  }
}

function dayOf(over: Partial<DaySource> & { frontmatter: Record<string, unknown> }): DaySource {
  return {
    day: "2026-03-05",
    sessions: [],
    completedTasks: [],
    ...over,
  }
}

const BARE = {
  id: V7,
  "page-type-slug": "daily-tracking",
  slug: "2026-03-05",
  title: "@date:2026-03-05",
  date: "2026-03-05",
}

function done(source: DaySource, mint = mintOnce()): Converted {
  const outcome = convertDay(source, mint)
  if (refused(outcome)) throw new Error(`refused: ${outcome.refused.join("; ")}`)
  return outcome
}

describe("the names a day takes", () => {
  test("the slug is the date with the prefix akasha needs to export it", () => {
    const one = done(dayOf({ frontmatter: BARE }))
    expect(one.slug).toBe("day-2026-03-05")
    expect(one.exportName).toBe("day20260305")
    expect(one.pageName).toBe("day-2026-03-05.daily-tracking.ts")
  })

  test("a bare date makes no export name, which is why the prefix is there", () => {
    expect(exportNameOf("2026-03-05")).toBe("20260305")
    expect(/^[A-Za-z_$]/.test(exportNameOf("2026-03-05"))).toBe(false)
    expect(/^[A-Za-z_$]/.test(exportNameOf("day-2026-03-05"))).toBe(true)
  })

  test("this export name rule is akasha's own", () => {
    for (const slug of ["day-2026-03-05", "completed-tasks", "sessions", "day-2026-12-31"]) {
      expect(exportNameOf(slug)).toBe(exportedAs(slug))
    }
  })

  test("the entry files sit where akasha's own naming puts them", () => {
    const one = done(
      dayOf({
        frontmatter: BARE,
        sessions: [{ raw: JSON.stringify({ id: "a", "daily-tracking": V7 }), row: { id: "a", "daily-tracking": V7 } }],
        completedTasks: [{ raw: JSON.stringify({ id: "b" }), row: { id: "b" } }],
      })
    )
    for (const file of one.entries) {
      const slug = file.name.includes(`.${SESSIONS_SLUG}.`) ? "sessions" : "completed-tasks"
      expect(file.name).toBe(besideAt(one.pageName, slug, "jsonl"))
    }
  })
})

describe("identity", () => {
  test("a uuid v7 day keeps the identity it has and the mint is never reached", () => {
    const one = done(dayOf({ frontmatter: BARE }))
    expect(one.idIs).toBe(V7)
    expect(one.reminted).toBe(false)
  })

  test("a uuid v5 day is re-minted as a v7", () => {
    const one = done(dayOf({ frontmatter: { ...BARE, id: V5 } }))
    expect(one.idWas).toBe(V5)
    expect(one.reminted).toBe(true)
    expect(isUuidV7(one.idIs)).toBe(true)
  })

  test("re-minting re-points every session row that named the old identity", () => {
    const rows = [
      { id: "s1", "daily-tracking": V5, title: "one" },
      { id: "s2", "daily-tracking": V5, title: "two" },
    ]
    const one = done(
      dayOf({
        frontmatter: { ...BARE, id: V5 },
        sessions: rows.map((row) => ({ raw: JSON.stringify(row), row })),
      })
    )
    const file = one.entries[0]!
    expect(file.repointed).toBe(2)
    for (const line of file.text.trim().split("\n")) {
      expect((JSON.parse(line) as Record<string, unknown>)["daily-tracking"]).toBe(one.idIs)
    }
  })

  test("a day whose identity stays keeps its rows byte for byte", () => {
    const raw = `{"id":"s1","daily-tracking":"${V7}","title":"kept"}`
    const one = done(
      dayOf({
        frontmatter: BARE,
        sessions: [{ raw, row: JSON.parse(raw) as Record<string, unknown> }],
      })
    )
    expect(one.entries[0]!.text).toBe(`${raw}\n`)
    expect(one.entries[0]!.repointed).toBe(0)
  })

  test("a row naming another day's identity is refused rather than re-pointed", () => {
    const row = { id: "s1", "daily-tracking": "01a00000-0000-7000-8000-00000000ffff" }
    const outcome = convertDay(
      dayOf({ frontmatter: BARE, sessions: [{ raw: JSON.stringify(row), row }] }),
      mintOnce()
    )
    expect(refused(outcome)).toBe(true)
  })
})

describe("what a day carries", () => {
  test("a day with no sessions and no tasks declares neither entry property", () => {
    const one = done(dayOf({ frontmatter: BARE }))
    expect(one.entries).toHaveLength(0)
    expect(one.value["sessions"]).toBeUndefined()
    expect(one.value["completedTasks"]).toBeUndefined()
    expect(one.pageText).not.toContain("jsonl")
  })

  test("a day with rows states the extension its rows are held in", () => {
    const row = { id: "s1", "daily-tracking": V7 }
    const one = done(
      dayOf({
        frontmatter: BARE,
        sessions: Array.from({ length: 24 }, (_, n) => {
          const held = { ...row, id: `s${n}` }
          return { raw: JSON.stringify(held), row: held }
        }),
      })
    )
    expect(one.value["sessions"]).toBe("jsonl")
    expect(one.entries[0]!.rows).toBe(24)
    expect(one.entries[0]!.text.split("\n").filter((l) => l !== "")).toHaveLength(24)
  })

  test("keys are camel on the page and every declared key is turned", () => {
    const front: Record<string, unknown> = { ...BARE }
    for (const field of DAY_FIELDS) {
      if (field.key in front) continue
      if (field.key === "safety-level") front[field.key] = "3"
      else if (field.key === "persona-days" || field.key === "meals") front[field.key] = ["x"]
      else if (field.key.endsWith("-cleared-today")) front[field.key] = true
      else if (field.key === "version" || field.key === "last-viewed-at") front[field.key] = "1.0"
      else front[field.key] = 1.5
    }
    const one = done(dayOf({ frontmatter: front }))
    for (const field of DAY_FIELDS) expect(one.value[field.name]).toBeDefined()
    expect(Object.keys(one.value)).not.toContain("safety-level")
    expect(one.value["safetyLevel"]).toBe("3")
    expect(one.value["version"]).toBe("1.0")
  })

  test("numeric-looking text stays text, because Number() eats the form", () => {
    const one = done(
      dayOf({ frontmatter: { ...BARE, version: "1.0", "safety-level": "3" } })
    )
    expect(one.value["version"]).toBe("1.0")
    expect(one.value["safetyLevel"]).toBe("3")
    expect(one.pageText).toContain('  version: "1.0",')
    expect(String(Number("1.0"))).not.toBe("1.0")
  })

  test("a calendar day that arrived as a Date is refused rather than guessed at", () => {
    const outcome = convertDay(
      dayOf({ frontmatter: { ...BARE, date: new Date("2026-03-05T00:00:00Z") } }),
      mintOnce()
    )
    expect(refused(outcome)).toBe(true)
    if (!refused(outcome)) return
    expect(outcome.refused.join(" ")).toContain("Date")
  })

  test("a day with no slug is given one, and no slug is ever rebuilt from an export name", () => {
    const { slug: _slug, ...rest } = BARE
    const one = done(dayOf({ frontmatter: rest }))
    expect(one.value["slug"]).toBe("day-2026-03-05")
    expect(exportNameOf(one.slug)).toBe("day20260305")
    expect(one.slug).not.toBe(exportNameOf(one.slug))
  })

  test("an empty list beside an absent key stays a different thing", () => {
    const empty = { id: "s1", "daily-tracking": V7, relationships: [] }
    const absent = { id: "s2", "daily-tracking": V7 }
    const one = done(
      dayOf({
        frontmatter: BARE,
        sessions: [empty, absent].map((row) => ({ raw: JSON.stringify(row), row })),
      })
    )
    const [first, second] = one.entries[0]!.text.trim().split("\n")
    expect(JSON.parse(first!)).toHaveProperty("relationships")
    expect(Object.keys(JSON.parse(second!) as object)).not.toContain("relationships")
  })

  test("a key nobody declared a turn for is named rather than dropped", () => {
    const outcome = convertDay(
      dayOf({ frontmatter: { ...BARE, "moon-phase": 3, "tide-height": 1 } }),
      mintOnce()
    )
    expect(refused(outcome)).toBe(true)
    if (!refused(outcome)) return
    expect(outcome.unhandledKeys).toEqual(["moon-phase", "tide-height"])
  })

  test("a day missing a key every day carries is refused", () => {
    const { title: _title, ...rest } = BARE
    const outcome = convertDay(dayOf({ frontmatter: rest }), mintOnce())
    expect(refused(outcome)).toBe(true)
    if (!refused(outcome)) return
    expect(outcome.refused.join(" ")).toContain("'title'")
  })

  test("the page it renders parses and declares one object", () => {
    const one = done(dayOf({ frontmatter: { ...BARE, "persona-days": ["a", "b"], meals: [] } }))
    expect(one.pageText.startsWith("import type { DailyTracking }")).toBe(true)
    expect(one.pageText).toContain("export const day20260305 = {")
    expect(one.pageText.trimEnd().endsWith("} as const satisfies DailyTracking")).toBe(true)
    expect(one.pageText).toContain('  slug: "day-2026-03-05",')
    expect(one.pageText).toContain("  meals: [],")
  })
})

describe.if(HAVE_COPY)("over real input copied out of the repo", () => {
  const read = readDays(COPY)
  const outcomes = read.days.map((day) => convertDay(day, () => uuidVersion7()))
  const converted = outcomes.filter((o): o is Converted => !refused(o))

  test("the copy is not the repo", () => {
    expect(COPY).not.toContain("/repos/akasha/pages/")
  })

  test("every day the copy holds converts", () => {
    const stuck = outcomes.filter(refused)
    expect(stuck.map((s) => `${s.day}: ${s.refused.join("; ")}`)).toEqual([])
    expect(read.faults).toEqual([])
  })

  test("thirty of the days are re-minted and their new identities are all distinct", () => {
    const fresh = converted.filter((one) => one.reminted)
    expect(fresh).toHaveLength(30)
    expect(new Set(fresh.map((one) => one.idIs)).size).toBe(30)
    for (const one of fresh) expect(isUuidV7(one.idIs)).toBe(true)
  })

  test("every page name and every export name is distinct", () => {
    expect(new Set(converted.map((one) => one.pageName)).size).toBe(converted.length)
    expect(new Set(converted.map((one) => one.exportName)).size).toBe(converted.length)
  })

  test("the days with no sidecar carry no entry property", () => {
    const bare = converted.filter((one) => one.entries.length === 0)
    expect(bare.length).toBeGreaterThan(0)
    for (const one of bare) expect(one.pageText).not.toContain("jsonl")
  })

  test("every row in the copy is carried over", () => {
    const rowsIn = (suffix: string): number =>
      readdirSync(COPY)
        .filter((name) => name.endsWith(suffix))
        .reduce(
          (n, name) =>
            n +
            readFileSync(join(COPY, name), "utf8")
              .split("\n")
              .filter((line) => line.trim() !== "").length,
          0
        )
    const out = (slug: string): number =>
      converted.reduce(
        (n, one) => n + (one.entries.find((f) => f.name.includes(`.${slug}.`))?.rows ?? 0),
        0
      )
    expect(out("sessions")).toBe(rowsIn(".daily-tracking.sessions.jsonl"))
    expect(out("completed-tasks")).toBe(rowsIn(".daily-tracking.completed-tasks.jsonl"))
  })

  test("the five days with no slug are given one and the rest keep theirs", () => {
    const minted = read.days.filter((day) => day.frontmatter["slug"] === undefined)
    expect(minted).toHaveLength(5)
    for (const source of minted) {
      const one = converted.find((c) => c.day === source.day)
      expect(one?.value["slug"]).toBe(`day-${source.day}`)
    }
    expect(new Set(converted.map((one) => one.value["slug"])).size).toBe(converted.length)
  })

  test("no day carrying a v5 identity carries a session row, so nothing real is re-pointed", () => {
    const fresh = converted.filter((one) => one.reminted)
    for (const one of fresh) {
      expect(one.entries.some((f) => f.name.includes(`.${SESSIONS_SLUG}.`))).toBe(false)
    }
  })

  test("every entry file's rows are the file's rows in the file's order", () => {
    for (const one of converted) {
      for (const file of one.entries) {
        const lines = file.text.split("\n").filter((l) => l !== "")
        expect(lines).toHaveLength(file.rows)
        const source = file.name.includes(`.${SESSIONS_SLUG}.`)
          ? read.days.find((d) => d.day === one.day)!.sessions
          : read.days.find((d) => d.day === one.day)!.completedTasks
        expect(lines.map((l) => (JSON.parse(l) as { id: string }).id)).toEqual(
          source.map((r) => (r.row as { id: string }).id)
        )
      }
    }
  })

  test("a key on some days and not others is on the page only where the day carries it", () => {
    for (const field of DAY_FIELDS) {
      if (field.onEveryDay) continue
      const on = converted.filter((one) => one.value[field.name] !== undefined).length
      expect(on).toBeLessThanOrEqual(converted.length)
    }
    const rare = converted.filter((one) => one.value["cardioPoints"] !== undefined)
    expect(rare.length).toBe(3)
    const five = converted.filter((one) => one.slug === `day-${one.day}`)
    expect(five).toHaveLength(converted.length)
  })
})
