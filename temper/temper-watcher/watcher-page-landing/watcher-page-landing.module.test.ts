import { expect, test } from "bun:test"
import type { Landing, ReadPages, Tried } from "./watcher-page-landing.module.code.ts"
import {
  besidePathOf,
  besidePathsFor,
  closingFor,
  contentIn,
  exportNameFor,
  insertedByInstant,
  jsonlBodyOf,
  jsonlLinesOf,
  jsonRowOf,
  LANDING_ATTEMPTS,
  LANDING_PAUSE_MS,
  landOverAttempts,
  noPagePathWhy,
  PAGE_LANDING_WRITER,
  pageBodyFor,
  pagePathIn,
  pageTypeImportFor,
  readingFor,
  removingFor,
  rowsPathIn,
  textIn,
  triedFrom,
  typeNameFor,
  waitFor,
  writingFor,
} from "./watcher-page-landing.module.code.ts"

const HOURS = "akasha/temper/temper-holdings/net-worth-hours/pages"

const DAYS = "akasha/temper/temper-progress/completed-days/pages"

const TASKS = "akasha/temper/temper-progress/tasks/pages"

test("the writer is the name and address every landing was already committing under", () => {
  expect(PAGE_LANDING_WRITER).toBe("temper watcher <watcher@alanwalton.com>")
})

test("an export name is the slug in lower camel case", () => {
  const slugs = ["hour-2026-04-29-14", "day-2026-03-05", "", "-", "a", "a--b", "-lead", "trail-"]
  expect(slugs.map((one) => exportNameFor(one))).toEqual([
    "hour2026042914",
    "day20260305",
    "",
    "",
    "a",
    "aB",
    "lead",
    "trail",
  ])
})

test("a type name is the page type slug in upper camel case", () => {
  expect(typeNameFor("temper-net-worth-hour")).toBe("TemperNetWorthHour")
  expect(typeNameFor("temper-completed-day")).toBe("TemperCompletedDay")
  expect(typeNameFor("temper-task")).toBe("TemperTask")
})

test("a closing line satisfies the type the page type slug names", () => {
  expect(closingFor("temper-task")).toBe("} as const satisfies TemperTask")
  expect(closingFor("temper-net-worth-hour")).toBe("} as const satisfies TemperNetWorthHour")
})

test("a page type import reaches two folders up for the page type file", () => {
  expect(pageTypeImportFor("temper-task")).toBe("../../temper-task.page-type.ts")
})

test("a page path and the jsonl path beside it are the paths the landings already wrote", () => {
  expect(pagePathIn(HOURS, "hour-2026-04-29-14", "temper-net-worth-hour")).toBe(
    "akasha/temper/temper-holdings/net-worth-hours/pages/hour-2026-04-29-14/hour-2026-04-29-14.temper-net-worth-hour.ts"
  )
  expect(rowsPathIn(HOURS, "hour-2026-04-29-14", "temper-net-worth-hour", "snapshots")).toBe(
    "akasha/temper/temper-holdings/net-worth-hours/pages/hour-2026-04-29-14/hour-2026-04-29-14.temper-net-worth-hour.snapshots.jsonl"
  )
  expect(pagePathIn(DAYS, "day-2026-03-05", "temper-completed-day")).toBe(
    "akasha/temper/temper-progress/completed-days/pages/day-2026-03-05/day-2026-03-05.temper-completed-day.ts"
  )
  expect(rowsPathIn(DAYS, "day-2026-03-05", "temper-completed-day", "completions")).toBe(
    "akasha/temper/temper-progress/completed-days/pages/day-2026-03-05/day-2026-03-05.temper-completed-day.completions.jsonl"
  )
  expect(pagePathIn(TASKS, "hireling-mails", "temper-task")).toBe(
    "akasha/temper/temper-progress/tasks/pages/hireling-mails/hireling-mails.temper-task.ts"
  )
  expect(rowsPathIn(TASKS, "hireling-mails", "temper-task", "progress")).toBe(
    "akasha/temper/temper-progress/tasks/pages/hireling-mails/hireling-mails.temper-task.progress.jsonl"
  )
})

test("a page body is the body the hour landing wrote, byte for byte", () => {
  expect(
    pageBodyFor(
      "temper-net-worth-hour",
      "hour-2026-04-29-14",
      "01a06009-4775-7004-82c8-ee74889a2ada",
      [
        ["title", "2026-04-29 14:00 UTC"],
        ["snapshots", "jsonl"],
      ]
    )
  ).toBe(
    'import type { TemperNetWorthHour } from "../../temper-net-worth-hour.page-type.ts"\n\nexport const hour2026042914 = {\n  id: "01a06009-4775-7004-82c8-ee74889a2ada",\n  pageTypeSlug: "temper-net-worth-hour",\n  slug: "hour-2026-04-29-14",\n  title: "2026-04-29 14:00 UTC",\n  snapshots: "jsonl",\n} as const satisfies TemperNetWorthHour\n'
  )
})

test("a page body is the body the day landing wrote, byte for byte", () => {
  expect(
    pageBodyFor("temper-completed-day", "day-2026-03-05", "01a05fe3-09ca-7e72-8b3e-e6b34e0d2978", [
      ["title", "2026-03-05"],
      ["day", "2026-03-05"],
      ["completions", "jsonl"],
    ])
  ).toBe(
    'import type { TemperCompletedDay } from "../../temper-completed-day.page-type.ts"\n\nexport const day20260305 = {\n  id: "01a05fe3-09ca-7e72-8b3e-e6b34e0d2978",\n  pageTypeSlug: "temper-completed-day",\n  slug: "day-2026-03-05",\n  title: "2026-03-05",\n  day: "2026-03-05",\n  completions: "jsonl",\n} as const satisfies TemperCompletedDay\n'
  )
})

test("a blank line is dropped on the way out of a jsonl body", () => {
  expect(jsonlLinesOf('\n\n{"id":"a"}\n\n')).toEqual(['{"id":"a"}'])
  expect(jsonlLinesOf(null)).toEqual([])
  expect(jsonlLinesOf("")).toEqual([])
})

test("a jsonl body holding no line is empty rather than one newline", () => {
  expect(jsonlBodyOf([])).toBe("")
  expect(jsonlBodyOf(["a", "b"])).toBe("a\nb\n")
})

test("a line that is no JSON reads back as empty text for every key", () => {
  expect(textIn("not json", "id")).toBe("")
  expect(textIn("null", "id")).toBe("")
  expect(textIn("5", "id")).toBe("")
  expect(textIn('{"id":7}', "id")).toBe("")
  expect(textIn('{"id":"a"}', "id")).toBe("a")
})

test("a line goes in ahead of the first line marked later than it", () => {
  const early = '{"at":"2026-03-05T12:00:00.000Z"}'
  const late = '{"at":"2026-03-05T13:00:00.000Z"}'
  const put = '{"at":"2026-03-05T12:30:00.000Z"}'
  expect(insertedByInstant([early, late], put, "at", "2026-03-05T12:30:00.000Z")).toEqual([
    early,
    put,
    late,
  ])
})

test("a line marked at the same instant as the last goes after it", () => {
  const held = '{"at":"2026-03-05T12:00:00.000Z","n":1}'
  const put = '{"at":"2026-03-05T12:00:00.000Z","n":2}'
  expect(insertedByInstant([held], put, "at", "2026-03-05T12:00:00.000Z")).toEqual([held, put])
})

test("a line that is no JSON keeps whatever it holds and takes the new line after it", () => {
  const put = '{"at":"2026-03-05T12:00:00.000Z"}'
  expect(insertedByInstant(["not json"], put, "at", "2026-03-05T12:00:00.000Z")).toEqual([
    "not json",
    put,
  ])
})

test("a key told nothing is left out of a jsonl line and a zero is kept", () => {
  expect(
    jsonRowOf([
      ["id", "i"],
      ["total", 0],
      ["gold", undefined],
      ["items", 3],
    ])
  ).toBe('{"id":"i","total":0,"items":3}')
})

test("the content for a path is the body read at it, and absent where nothing was read", () => {
  const bodies = [
    { path: "a", content: "one" },
    { path: "b", content: null },
  ]
  expect(contentIn(bodies, "a")).toBe("one")
  expect(contentIn(bodies, "b")).toBeNull()
  expect(contentIn(bodies, "c")).toBeNull()
})

test("a write that committed is landed and a write that did not is tried again", () => {
  expect(triedFrom({ ok: true, at: "c1" } as Landing)).toEqual({ outcome: "landed", at: "c1" })
  expect(triedFrom({ ok: false, why: "the store was busy" } as Landing)).toEqual({
    outcome: "again",
    why: "the store was busy",
  })
})

test("four attempts are made at the most and the refusal names how many were spent", async () => {
  const waited: number[] = []
  let tries = 0
  const landed = await landOverAttempts(
    "no attempt to land anything was made",
    async () => {
      tries++
      return { outcome: "again", why: `try ${tries} was refused` } satisfies Tried
    },
    {
      waiting: async (ms) => {
        waited.push(ms)
        return undefined
      },
    }
  )
  expect(tries).toBe(LANDING_ATTEMPTS)
  expect(waited).toEqual([LANDING_PAUSE_MS, LANDING_PAUSE_MS, LANDING_PAUSE_MS])
  expect(landed).toEqual({ outcome: "refused", why: "try 4 was refused — 4 attempts were spent" })
})

test("a first attempt that lands waits for nothing and answers at once", async () => {
  const waited: number[] = []
  let tries = 0
  const landed = await landOverAttempts(
    "no attempt to land anything was made",
    async () => {
      tries++
      return { outcome: "landed", at: "c1" } satisfies Tried
    },
    {
      waiting: async (ms) => {
        waited.push(ms)
        return undefined
      },
    }
  )
  expect(tries).toBe(1)
  expect(waited).toEqual([])
  expect(landed).toEqual({ outcome: "landed", at: "c1" })
})

test("a refusal the attempt states reaches the caller without another attempt", async () => {
  let tries = 0
  const landed = await landOverAttempts(
    "no attempt to land anything was made",
    async () => {
      tries++
      return { outcome: "refused", why: "the store holds no body at a" } satisfies Tried
    },
    { waiting: async () => undefined }
  )
  expect(tries).toBe(1)
  expect(landed).toEqual({ outcome: "refused", why: "the store holds no body at a" })
})

test("an attempt never made leaves the opening reason in the refusal", async () => {
  const landed = await landOverAttempts(
    "no attempt to land a reading on some/path was made",
    async () => ({ outcome: "again", why: "" }) satisfies Tried,
    { waiting: async () => undefined }
  )
  expect(landed).toEqual({ outcome: "refused", why: " — 4 attempts were spent" })
})

test("a caller handing in nothing gets what reaches the store", () => {
  expect(typeof readingFor({})).toBe("function")
  expect(typeof writingFor({})).toBe("function")
  expect(typeof removingFor({})).toBe("function")
})

test("a caller handing one in gets the one it handed in", () => {
  const read = (async () => ({ ok: false, why: "mine" })) as ReturnType<typeof readingFor>
  expect(readingFor({ read })).toBe(read)
})

test("waiting answers once the milliseconds asked for have gone", async () => {
  const before = Date.now()
  expect(await waitFor(5)).toBeUndefined()
  expect(Date.now() - before).toBeGreaterThanOrEqual(4)
})

const HOUR_PAGE = `${HOURS}/hour-2026-04-29-14/hour-2026-04-29-14.temper-net-worth-hour.ts`

function pagesAnswering(paths: readonly string[], unplaced: readonly string[] = []): ReadPages {
  return async () => ({
    ok: true,
    at: "c1",
    bodies: paths.map((path) => ({ path, content: "" })),
    unplaced: [...unplaced],
  })
}

test("a beside path is the page path with the page ending swapped for the property's", () => {
  expect(besidePathOf(HOUR_PAGE, "completion", "json")).toBe(
    `${HOURS}/hour-2026-04-29-14/hour-2026-04-29-14.temper-net-worth-hour.completion.json`
  )
  expect(besidePathOf("pages/azandar.temper-companion-progress.ts", "completion", "json")).toBe(
    "pages/azandar.temper-companion-progress.completion.json"
  )
})

test("a path that is no page file has no beside path", () => {
  expect(besidePathOf("pages/azandar.temper-companion-progress.json", "completion", "json")).toBe(
    null
  )
  expect(besidePathOf("", "completion", "json")).toBe(null)
})

test("beside paths come back against the slugs they were asked for", async () => {
  const found = await besidePathsFor(
    pagesAnswering(["pages/a.thing.ts", "pages/b.thing.ts"]),
    "thing",
    ["a", "b"],
    "completion",
    "json"
  )
  expect([...found]).toEqual([
    ["a", "pages/a.thing.completion.json"],
    ["b", "pages/b.thing.completion.json"],
  ])
})

test("a slug the pages placed no file for is refused rather than skipped", async () => {
  await expect(
    besidePathsFor(pagesAnswering(["pages/a.thing.ts"], ["thing/b"]), "thing", ["a", "b"], "c", "j")
  ).rejects.toThrow(noPagePathWhy("thing", "a, b"))
})

test("a read that did not answer is refused with what the store said", async () => {
  const refusing: ReadPages = async () => ({ ok: false, why: "the store was unreachable" })
  await expect(besidePathsFor(refusing, "thing", ["a"], "c", "j")).rejects.toThrow(
    "the store was unreachable"
  )
})

test("no slug asks the pages nothing", async () => {
  let asked = 0
  const counting: ReadPages = async () => {
    asked += 1
    return { ok: true, at: "c1", bodies: [], unplaced: [] }
  }
  expect([...(await besidePathsFor(counting, "thing", [], "c", "j"))]).toEqual([])
  expect(asked).toBe(0)
})
