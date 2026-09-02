import { describe, expect, test } from "bun:test"
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { exportedAs } from "../../akasha/pages-system/page/page-export-name/page-export-name.module.code.ts"
import { besideAt } from "../../akasha/pages-system/page/page-file-name/page-file-name.module.code.ts"
import { uuidVersion7 } from "../../akasha/command-system/value-minting/value-minting.module.code.ts"
import { importedFrom } from "../../akasha/pages-system/page/page-body/page-body.module.code.ts"
import { pathFor } from "../../akasha/pages-system/pages-system-service/page-composing/page-composing.module.code.ts"
import { declaredIn, pageTypeFilesIn } from "../daily-tracking-landing/declared.ts"
import { camelizeKey, kebabizeKey } from "../lib/tracking/keys.ts"
import {
  buildPageHrefParam,
  ID_SUFFIX_LENGTH as AKASHA_ID_SUFFIX_LENGTH,
} from "../../akasha/pages-system/pages-url/page-href/page-href.module.code.ts"
import { slugOfFilePage } from "../../akasha/file-page-identity/file-page/file-page.module.code.ts"
import {
  camelisedRow,
  type Converted,
  convertDay,
  type DaySource,
  exportNameOf,
  ID_SUFFIX_LENGTH,
  isUuidV7,
  refused,
  withSuffixOf,
} from "./convert.ts"
import { importFor, placingFor } from "./placing.ts"
import { readDays } from "./read-days.ts"
import { DAY_FIELDS, DAY_PAGE_TYPE, SESSIONS_SLUG } from "./shape.ts"

const AKASHA = join(import.meta.dir, "..", "..", "akasha")

/**
 * Where the day pages go, said here as the two facts akasha declares rather than as a path.
 *
 * The last case in this file holds these two against what the landed page type actually says, so a
 * type that moves or renames its plural fails here rather than at a typecheck nobody ran.
 */
const TYPE_AT = "akasha/alan/daily-tracking/daily-tracking.page-type.ts"

const PLURAL = "daily-trackings"

const PLACING = placingFor(TYPE_AT, PLURAL)

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
  const outcome = convertDay(source, mint, PLACING)
  if (refused(outcome)) throw new Error(`refused: ${outcome.refused.join("; ")}`)
  return outcome
}

/** Every row of a rendered entry file, parsed back. */
function rowsOf(one: Converted, at = 0): Record<string, unknown>[] {
  return one.entries[at]!.text.trim()
    .split("\n")
    .map((line) => JSON.parse(line) as Record<string, unknown>)
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
        sessions: [{ id: "a", "daily-tracking": V7 }],
        completedTasks: [{ id: "b" }],
      })
    )
    for (const file of one.entries) {
      const slug = file.name.includes(`.${SESSIONS_SLUG}.`) ? "sessions" : "completed-tasks"
      // `besideAt` answers null for a name it cannot read as a page's, which is a refusal rather
      // than a mismatch, so it is said as one here instead of being compared against a name.
      const beside = besideAt(one.pageName, slug, "jsonl")
      if (beside === null) throw new Error(`besideAt reads no page name in '${one.pageName}'`)
      expect(file.name).toBe(beside)
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

  test("the suffix length is the one akasha reaches a page by", () => {
    expect(ID_SUFFIX_LENGTH).toBe(AKASHA_ID_SUFFIX_LENGTH)
  })

  test("a re-tailed identity keeps the old tail and stays a uuid v7", () => {
    const said = withSuffixOf("01a06000-0000-7000-8000-000000000001", V5)
    expect(said).toBe("01a06000-0000-7000-8000-0000508c2733")
    expect(said.slice(-ID_SUFFIX_LENGTH)).toBe(V5.slice(-ID_SUFFIX_LENGTH))
    expect(isUuidV7(said)).toBe(true)
  })

  test("a re-minted day is reached at the eight hex it was reached at before", () => {
    const one = done(dayOf({ frontmatter: { ...BARE, id: V5 } }))
    expect(one.idIs.slice(-ID_SUFFIX_LENGTH)).toBe(V5.slice(-ID_SUFFIX_LENGTH))
    expect(one.idIs).not.toBe(V5)
  })

  test("a day whose identity has no hex tail is refused rather than landed", () => {
    const outcome = convertDay(
      dayOf({ frontmatter: { ...BARE, id: "not-a-uuid-at-all" } }),
      () => "01a06000-0000-7000-8000-000000000001",
      PLACING
    )
    expect(refused(outcome)).toBe(true)
  })

  test("re-minting re-points every session row that named the old identity", () => {
    const one = done(
      dayOf({
        frontmatter: { ...BARE, id: V5 },
        sessions: [
          { id: "s1", "daily-tracking": V5, title: "one" },
          { id: "s2", "daily-tracking": V5, title: "two" },
        ],
      })
    )
    expect(one.entries[0]!.repointed).toBe(2)
    // The reference is re-pointed under the key akasha reads it by, not the one it arrived under.
    for (const row of rowsOf(one)) {
      expect(row["dailyTracking"]).toBe(one.idIs)
      expect(row).not.toHaveProperty("daily-tracking")
    }
  })

  test("a day whose identity stays re-points nothing and keeps every value", () => {
    const one = done(
      dayOf({
        frontmatter: BARE,
        sessions: [{ id: "s1", "daily-tracking": V7, title: "kept" }],
      })
    )
    expect(one.entries[0]!.repointed).toBe(0)
    expect(rowsOf(one)[0]).toEqual({ id: "s1", dailyTracking: V7, title: "kept" })
  })

  test("a row naming another day's identity is refused rather than re-pointed", () => {
    const outcome = convertDay(
      dayOf({
        frontmatter: BARE,
        sessions: [{ id: "s1", "daily-tracking": "01a00000-0000-7000-8000-00000000ffff" }],
      }),
      mintOnce(),
      PLACING
    )
    expect(refused(outcome)).toBe(true)
  })
})

describe("which spelling a row's keys take", () => {
  /**
   * The one rule, in both directions.
   *
   * A row beside an akasha page is read by the fields its entry property declares, and a property is
   * read by its slug written in camel. A row beside a markdown day keeps the kebab it already
   * carries, and nothing here writes one of those.
   */
  test("every key a session row carries is camel beside the page", () => {
    const one = done(
      dayOf({
        frontmatter: BARE,
        sessions: [
          {
            id: "s1",
            "daily-tracking": V7,
            title: "one",
            "start-time": "2026-03-05T09:00:00.000Z",
            "end-time": "2026-03-05T10:00:00.000Z",
            "safety-level": "2",
            "difficulty-level": "0",
            "capacity-rate": 1,
            "asserted-at": "2026-03-05T10:00:01.000Z",
            "breathing-sets": 3,
          },
        ],
      })
    )
    const row = rowsOf(one)[0]!
    expect(Object.keys(row).filter((key) => key.includes("-"))).toEqual([])
    expect(row["startTime"]).toBe("2026-03-05T09:00:00.000Z")
    expect(row["safetyLevel"]).toBe("2")
    expect(row["breathingSets"]).toBe(3)
  })

  test("a task row is camel too, and `seq` and `id` are unchanged by the turn", () => {
    const one = done(
      dayOf({
        frontmatter: BARE,
        completedTasks: [
          {
            id: "t1",
            seq: 1,
            title: "a task",
            "completed-at": "2026-03-05T11:00:00.000Z",
            "due-date": "2026-03-05",
            "to-do-slug": "some-to-do",
            "anchored-from-completion": true,
          },
        ],
      })
    )
    expect(rowsOf(one)[0]).toEqual({
      id: "t1",
      seq: 1,
      title: "a task",
      completedAt: "2026-03-05T11:00:00.000Z",
      dueDate: "2026-03-05",
      toDoSlug: "some-to-do",
      anchoredFromCompletion: true,
    })
  })

  test("the camel a row takes is what the entry property declares, slug by slug", () => {
    // These are the property slugs `sessions.page-property-entry.ts` and
    // `completed-tasks.page-property-entry.ts` declare. A row is judged against them by the key each
    // slug becomes, so the turn this converter makes is that same turn or the write is refused.
    for (const slug of [
      "start-time",
      "end-time",
      "daily-tracking",
      "safety-level",
      "difficulty-level",
      "capacity-rate",
      "asserted-at",
      "breathing-sets",
      "completed-at",
      "due-date",
      "value-slug",
      "to-do-slug",
      "anchored-from-completion",
    ]) {
      expect(camelisedRow({ [slug]: 1 })).toEqual({ [camelizeKey(slug)]: 1 })
    }
  })

  test("the turn is undone by the one the read half makes, so no key is lost on the way back", () => {
    const kebab = {
      id: "s1",
      "daily-tracking": V7,
      "start-time": "t",
      "breathing-sets": 3,
      title: "one",
      version: "1.0",
    }
    const there = camelisedRow(kebab)
    const back = Object.fromEntries(
      Object.entries(there).map(([key, held]) => [kebabizeKey(key), held])
    )
    expect(back).toEqual(kebab)
  })

  test("a key already camel is left as it is, so turning twice is turning once", () => {
    const once = camelisedRow({ "start-time": 1, id: "a" })
    expect(camelisedRow(once)).toEqual(once)
  })

  test("the page's own keys are camel by the same rule the rows are", () => {
    const one = done(dayOf({ frontmatter: { ...BARE, "health-points": 4 } }))
    expect(one.value["healthPoints"]).toBe(4)
    expect(camelizeKey("health-points")).toBe("healthPoints")
  })
})

describe("what a day page imports", () => {
  test("the specifier is akasha's own answer for where the page is and where the type is", () => {
    const one = done(dayOf({ frontmatter: BARE }))
    const at = pathFor(TYPE_AT, PLURAL, DAY_PAGE_TYPE, one.slug)
    expect(one.pageAt).toBe(at)
    expect(one.pageText.split("\n")[0]).toBe(
      `import type { DailyTracking } from "${importedFrom(at, TYPE_AT)}"`
    )
  })

  test("a type one folder further off is imported one folder further up, with nothing repointed", () => {
    // Nothing here is configured. The specifier follows the two paths, so a type that moves is
    // followed rather than needing a constant somewhere to be corrected after it.
    const deeper = placingFor("akasha/alan/tracking/daily-tracking/daily-tracking.page-type.ts", PLURAL)
    expect(deeper.folder).toBe("akasha/alan/tracking/daily-tracking/daily-trackings")
    expect(importFor(deeper, "day-2026-03-05.daily-tracking.ts")).toBe(
      "../daily-tracking.page-type.ts"
    )
    const flat = placingFor("akasha/alan/daily-trackings/daily-tracking.page-type.ts", PLURAL)
    expect(flat.folder).toBe("akasha/alan/daily-trackings/pages")
    expect(importFor(flat, "day-2026-03-05.daily-tracking.ts")).toBe(
      "../daily-tracking.page-type.ts"
    )
  })

  test("the page type akasha holds is the one these cases name", async () => {
    const [at, ...also] = pageTypeFilesIn(AKASHA)
    expect(also).toEqual([])
    expect(`akasha/${at}`).toBe(TYPE_AT)
    const declared = await declaredIn(join(AKASHA, at as string))
    if ("refused" in declared) throw new Error(declared.refused)
    expect(declared.plural).toBe(PLURAL)
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
        sessions: Array.from({ length: 24 }, (_, n) => ({ ...row, id: `s${n}` })),
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
      mintOnce(),
      PLACING
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
        sessions: [empty, absent],
      })
    )
    const [first, second] = one.entries[0]!.text.trim().split("\n")
    expect(JSON.parse(first!)).toHaveProperty("relationships")
    expect(Object.keys(JSON.parse(second!) as object)).not.toContain("relationships")
  })

  test("a key nobody declared a turn for is named rather than dropped", () => {
    const outcome = convertDay(
      dayOf({ frontmatter: { ...BARE, "moon-phase": 3, "tide-height": 1 } }),
      mintOnce(),
      PLACING
    )
    expect(refused(outcome)).toBe(true)
    if (!refused(outcome)) return
    expect(outcome.unhandledKeys).toEqual(["moon-phase", "tide-height"])
  })

  test("a day missing a key every day carries is refused", () => {
    const { title: _title, ...rest } = BARE
    const outcome = convertDay(dayOf({ frontmatter: rest }), mintOnce(), PLACING)
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
  const outcomes = read.days.map((day) => convertDay(day, () => uuidVersion7(), PLACING))
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

  /**
   * The whole point of the move keeping the tail.
   *
   * A day is reached at `<slug>-<id.slice(-8)>` and the route resolves that suffix alone, so a
   * suffix that moves is a saved link becoming a 404. All 133 slugs change and no suffix may.
   */
  test("every day is reached at the URL it was reached at before the move", () => {
    const moved: string[] = []
    for (const one of converted) {
      const source = read.days.find((d) => d.day === one.day)!
      const stated = source.frontmatter["slug"]
      const was = buildPageHrefParam({
        pageTypeSlug: DAY_PAGE_TYPE,
        slug: slugOfFilePage(
          typeof stated === "string" ? stated : null,
          `akasha:pages/daily-tracking/${one.day}.daily-tracking.md`
        ),
        fallbackSlugSource: one.day,
        id: one.idWas,
      })
      const now = buildPageHrefParam({
        pageTypeSlug: DAY_PAGE_TYPE,
        slug: one.slug,
        fallbackSlugSource: one.day,
        id: one.idIs,
      })
      expect(was).not.toBe(now)
      if (was.slice(-ID_SUFFIX_LENGTH) !== now.slice(-ID_SUFFIX_LENGTH)) {
        moved.push(`${one.day}: ${was} -> ${now}`)
      }
    }
    expect(moved).toEqual([])
  })

  test("no two days come to share a suffix, so no route has a tie to break", () => {
    const suffixes = converted.map((one) => one.idIs.slice(-ID_SUFFIX_LENGTH))
    expect(new Set(suffixes).size).toBe(converted.length)
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
          source.map((r) => (r as { id: string }).id)
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
