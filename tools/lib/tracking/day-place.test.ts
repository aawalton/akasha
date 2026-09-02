import { describe, expect, mock, test } from "bun:test"
import { readdirSync } from "node:fs"
import { join } from "node:path"

const HERE = import.meta.dir

const REPO = join(HERE, "..", "..", "..")

const CORPUS = join(REPO, "pages", "daily-tracking")

const DAY_PAGE = /^(\d{4}-\d{2}-\d{2})\.daily-tracking\.md$/

interface Reached {
  readonly verb: string
  readonly act: string
  readonly pageType: string
  readonly name: string
}

const reached: Reached[] = []

const landed = { ok: true as const, at: "reached-nothing" }

mock.module(join(HERE, "..", "page-query-client.ts"), () => ({
  askComposed: () => Promise.resolve({ ok: true, rows: [], n: 0, unfound: [] }),
  askTaking: () => Promise.resolve({ ok: true, rows: [], n: 0, unfound: [] }),
  pageLanding: (act: string, pageType: string, name: string) => {
    reached.push({ verb: "pageLanding", act, pageType, name })
    return Promise.resolve(landed)
  },
  patchPage: (pageType: string, name: string) => {
    reached.push({ verb: "patchPage", act: "patch", pageType, name })
    return Promise.resolve(landed)
  },
  rowLanding: (act: string, pageType: string, name: string) => {
    reached.push({ verb: "rowLanding", act, pageType, name })
    return Promise.resolve(landed)
  },
  rowsLanding: (act: string, pageType: string, name: string) => {
    reached.push({ verb: "rowsLanding", act, pageType, name })
    return Promise.resolve(landed)
  },
  removeRow: (pageType: string, name: string) => {
    reached.push({ verb: "removeRow", act: "remove-row", pageType, name })
    return Promise.resolve(landed)
  },
}))

const {
  AKASHA,
  DAILY_TRACKING,
  MARKDOWN,
  MIGRATED_DAYS,
  SESSION_TRACKING,
  dayNameIn,
  dayNameOf,
  dayOfName,
  dayPageAt,
  dayPlaceIn,
  dayPlaceOf,
  dropSessionRow,
  landDayPage,
  landSessionRow,
  sessionRowAt,
} = await import("./day-place.ts")

function daysOnDisk(): readonly string[] {
  const found: string[] = []
  for (const name of readdirSync(CORPUS)) {
    const day = DAY_PAGE.exec(name)
    if (day !== null) found.push(day[1] as string)
  }
  return found.sort()
}

async function whileMigrated(dayStr: string, run: () => Promise<void>): Promise<void> {
  const held = MIGRATED_DAYS as Set<string>
  held.add(dayStr)
  try {
    await run()
  } finally {
    held.delete(dayStr)
  }
}

describe("where a day is kept", () => {
  test("every day of the corpus is markdown today", () => {
    const days = daysOnDisk()
    expect(days.length).toBeGreaterThan(100)
    for (const day of days) expect(dayPlaceOf(day)).toBe(MARKDOWN)
    expect(MIGRATED_DAYS.size).toBe(0)
  })

  test("the name a markdown day answers to is the name on disk", () => {
    for (const name of readdirSync(CORPUS)) {
      const day = DAY_PAGE.exec(name)
      if (day === null) continue
      const dayStr = day[1] as string
      expect(`${dayNameOf(dayStr)}.${DAILY_TRACKING}.md`).toBe(name)
    }
  })

  test("a sessions sidecar is named beside the day page it belongs to", () => {
    let seen = 0
    for (const name of readdirSync(CORPUS)) {
      if (!name.endsWith(`.${DAILY_TRACKING}.sessions.jsonl`)) continue
      const dayStr = name.slice(0, name.indexOf(`.${DAILY_TRACKING}.`))
      expect(dayNameOf(dayStr)).toBe(dayStr)
      expect(dayPlaceOf(dayStr)).toBe(MARKDOWN)
      seen += 1
    }
    expect(seen).toBeGreaterThan(0)
  })

  test("a day named migrated is answered akasha and no other day is", () => {
    const migrated = new Set(["2026-03-05"])
    expect(dayPlaceIn(migrated, "2026-03-05")).toBe(AKASHA)
    expect(dayPlaceIn(migrated, "2026-03-06")).toBe(MARKDOWN)
  })

  test("an akasha day is named with its date prefixed, and the name reads back", () => {
    expect(dayNameIn(AKASHA, "2026-03-05")).toBe("day-2026-03-05")
    expect(dayNameIn(MARKDOWN, "2026-03-05")).toBe("2026-03-05")
    expect(dayOfName("day-2026-03-05")).toBe("2026-03-05")
    expect(dayOfName("2026-03-05")).toBe("2026-03-05")
  })
})

describe("create, edit and delete agree on where a day is", () => {
  const day = "2026-03-05"

  test("markdown: one page type, one name, for every act", () => {
    const acts = [
      dayPageAt(MARKDOWN, "patch", day),
      dayPageAt(MARKDOWN, "write", day),
    ]
    for (const at of acts) {
      expect(at.place).toBe(MARKDOWN)
      expect(at.pageType).toBe(DAILY_TRACKING)
      expect(at.name).toBe(day)
    }
    const rows = [
      sessionRowAt(MARKDOWN, "write-row", day),
      sessionRowAt(MARKDOWN, "patch-row", day),
      sessionRowAt(MARKDOWN, "remove-row", day),
    ]
    for (const at of rows) {
      expect(at.place).toBe(MARKDOWN)
      expect(at.pageType).toBe(SESSION_TRACKING)
      expect(at.name).toBe(day)
    }
  })

  test("akasha: every act refuses, and the refusal names the day", () => {
    const asked = [
      (): unknown => dayPageAt(AKASHA, "patch", day),
      (): unknown => dayPageAt(AKASHA, "write", day),
      (): unknown => sessionRowAt(AKASHA, "write-row", day),
      (): unknown => sessionRowAt(AKASHA, "patch-row", day),
      (): unknown => sessionRowAt(AKASHA, "remove-row", day),
    ]
    for (const one of asked) expect(one).toThrow(day)
  })
})

describe("what reaches the file layer", () => {
  const day = "2026-03-05"

  test("an unmigrated day is written exactly where it was written before", async () => {
    reached.length = 0
    await landDayPage("patch", day, { date: day }, "ops-tracking")
    await landSessionRow("write-row", day, { id: "one" }, "ops-tracking")
    await landSessionRow("patch-row", day, { id: "one" }, "ops-tracking")
    await dropSessionRow(day, "one", "ops-tracking")
    expect(reached).toEqual([
      { verb: "pageLanding", act: "patch", pageType: DAILY_TRACKING, name: day },
      { verb: "rowLanding", act: "write-row", pageType: SESSION_TRACKING, name: day },
      { verb: "rowLanding", act: "patch-row", pageType: SESSION_TRACKING, name: day },
      { verb: "removeRow", act: "remove-row", pageType: SESSION_TRACKING, name: day },
    ])
  })

  test("a migrated day is not written to the old place by any verb", async () => {
    await whileMigrated(day, async () => {
      reached.length = 0
      expect(dayPlaceOf(day)).toBe(AKASHA)
      expect(() => landDayPage("patch", day, { date: day }, "ops-tracking")).toThrow(day)
      expect(() => landSessionRow("write-row", day, { id: "one" }, "ops-tracking")).toThrow(day)
      expect(() => landSessionRow("patch-row", day, { id: "one" }, "ops-tracking")).toThrow(day)
      expect(() => dropSessionRow(day, "one", "ops-tracking")).toThrow(day)
      expect(reached).toEqual([])
    })
    expect(dayPlaceOf(day)).toBe(MARKDOWN)
  })

  test("one migrated day does not move its neighbours", async () => {
    await whileMigrated(day, async () => {
      reached.length = 0
      await landSessionRow("write-row", "2026-03-06", { id: "two" }, "ops-tracking")
      expect(reached).toEqual([
        { verb: "rowLanding", act: "write-row", pageType: SESSION_TRACKING, name: "2026-03-06" },
      ])
    })
  })
})
