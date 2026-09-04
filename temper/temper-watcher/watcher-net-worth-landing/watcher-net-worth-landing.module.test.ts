import { expect, test } from "bun:test"
import type { LandingDeps } from "../watcher-page-landing/watcher-page-landing.module.code.ts"
import {
  capturedAtOf,
  landNetWorthReading,
  netWorthCommitMessage,
  netWorthHourBody,
  netWorthHourLinesPath,
  netWorthHourPagePath,
  netWorthHourSlug,
  netWorthHourTitle,
  readingLine,
  snapshotsWith,
} from "./watcher-net-worth-landing.module.code.ts"

const FIRST_MS = 1777473705275

const FIRST_AT = "2026-04-29T14:41:45.275Z"

const HOUR_SLUG = "hour-2026-04-29-14"

const PAGE_PATH = `akasha/temper/temper-holdings/net-worth-hours/pages/${HOUR_SLUG}/${HOUR_SLUG}.temper-net-worth-hour.ts`

const LINES_PATH = `akasha/temper/temper-holdings/net-worth-hours/pages/${HOUR_SLUG}/${HOUR_SLUG}.temper-net-worth-hour.snapshots.jsonl`

const FIRST = {
  id: "01a06009-45d7-758a-9196-9597c258a996",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  capturedAt: FIRST_AT,
  totalValue: 509169347,
}

const LATER = {
  ...FIRST,
  id: "01a06009-45d7-7490-bb32-efa1fdf631b5",
  capturedAt: "2026-04-29T14:57:43.718Z",
  totalValue: 509189826,
}

type Body = { readonly path: string; readonly content: string | null }

function store(
  bodies: readonly Body[],
  answers: readonly ({ ok: true; at: string } | { ok: false; why: string })[]
): { deps: LandingDeps; puts: unknown[]; reads: unknown[] } {
  const puts: unknown[] = []
  const reads: unknown[] = []
  let at = 0
  const deps: LandingDeps = {
    waiting: async () => undefined,
    read: (async (paths: readonly string[]) => {
      reads.push(paths)
      return {
        ok: true,
        at: "read-commit",
        bodies: paths.map((path) => ({
          path,
          content: bodies.find((one) => one.path === path)?.content ?? null,
        })),
        unplaced: [],
      }
    }) as LandingDeps["read"],
    write: (async (
      given: unknown,
      writer: string,
      message: string,
      _fetcher: unknown,
      _rest: unknown,
      read: string | null
    ) => {
      puts.push({ given, writer, message, read })
      const answer = answers[at] ?? { ok: false, why: "no answer was set up" }
      at++
      return answer
    }) as LandingDeps["write"],
  }
  return { deps, puts, reads }
}

test("the instant a scan was taken at is the epoch milliseconds read back in UTC", () => {
  expect(capturedAtOf(FIRST_MS)).toBe(FIRST_AT)
})

test("a scan gathers into an hour rather than into a day", () => {
  expect(netWorthHourSlug(FIRST_AT)).toBe(HOUR_SLUG)
  expect(netWorthHourSlug("2026-04-29T21:00:00.000Z")).toBe("hour-2026-04-29-21")
  expect(netWorthHourSlug("2026-04-29T00:00:00.000Z")).toBe("hour-2026-04-29-00")
})

test("an hour is titled by the day and the hour it opens, in UTC", () => {
  expect(netWorthHourTitle(FIRST_AT)).toBe("2026-04-29 14:00 UTC")
  expect(netWorthHourTitle("2026-04-29T00:00:00.000Z")).toBe("2026-04-29 00:00 UTC")
})

test("an hour names the page and the lines beside it", () => {
  expect(netWorthHourPagePath(HOUR_SLUG)).toBe(PAGE_PATH)
  expect(netWorthHourLinesPath(HOUR_SLUG)).toBe(LINES_PATH)
})

test("a reading line is the landed line, key for key", () => {
  expect(readingLine(FIRST)).toBe(
    '{"id":"01a06009-45d7-758a-9196-9597c258a996","accountPage":"9ba554f7-cb18-48bb-a709-ec935a895ca7","capturedAt":"2026-04-29T14:41:45.275Z","totalValue":509169347}'
  )
})

test("a reading line carries what a reading broke its total into, where it broke one out", () => {
  expect(
    readingLine({
      id: "01a06009-45d7-7490-bb32-efa1fdf631b5",
      accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
      capturedAt: "2026-04-29T14:57:43.718Z",
      totalValue: 509189826,
      goldAmount: 1,
      currencyGoldValue: 2,
      itemValue: 3,
      excludedGuildBankValue: 4,
    })
  ).toBe(
    '{"id":"01a06009-45d7-7490-bb32-efa1fdf631b5","accountPage":"9ba554f7-cb18-48bb-a709-ec935a895ca7","capturedAt":"2026-04-29T14:57:43.718Z","totalValue":509189826,"goldAmount":1,"currencyGoldValue":2,"itemValue":3,"excludedGuildBankValue":4}'
  )
})

test("a reading line writes a zero rather than leaving it out", () => {
  expect(
    readingLine({ id: "i", accountPage: "a", capturedAt: FIRST_AT, totalValue: 0, goldAmount: 0 })
  ).toBe(
    '{"id":"i","accountPage":"a","capturedAt":"2026-04-29T14:41:45.275Z","totalValue":0,"goldAmount":0}'
  )
})

test("an hour's lines open an hour that holds none", () => {
  expect(snapshotsWith(null, FIRST)).toBe(`${readingLine(FIRST)}\n`)
})

test("an hour's lines keep the order the instants were taken in", () => {
  expect(snapshotsWith(`${readingLine(LATER)}\n`, FIRST)).toBe(
    `${readingLine(FIRST)}\n${readingLine(LATER)}\n`
  )
})

test("an hour refuses a reading already there for that account at that instant", () => {
  expect(
    snapshotsWith(`${readingLine(FIRST)}\n`, {
      ...FIRST,
      id: "01a06009-0000-7000-8000-000000000000",
    })
  ).toBeNull()
})

test("an hour takes another account's reading at the same instant", () => {
  const other = { ...FIRST, accountPage: "other", id: "r2", totalValue: 1 }
  expect(snapshotsWith(`${readingLine(FIRST)}\n`, other)).toBe(
    `${readingLine(FIRST)}\n${readingLine(other)}\n`
  )
})

test("an hour page is the body that landed for that hour", () => {
  expect(netWorthHourBody(FIRST_AT, "01a06009-4775-7004-82c8-ee74889a2ada")).toBe(
    [
      'import type { TemperNetWorthHour } from "../../temper-net-worth-hour.page-type.ts"',
      "",
      "export const hour2026042914 = {",
      '  id: "01a06009-4775-7004-82c8-ee74889a2ada",',
      '  pageTypeSlug: "temper-net-worth-hour",',
      '  slug: "hour-2026-04-29-14",',
      '  title: "2026-04-29 14:00 UTC",',
      '  snapshots: "jsonl",',
      "} as const satisfies TemperNetWorthHour",
      "",
    ].join("\n")
  )
})

test("the commit message names the total rounded to gold and the instant", () => {
  expect(netWorthCommitMessage({ ...FIRST, totalValue: 509169347.6 })).toBe(
    "temper: a net worth reading of 509169348 gold at 2026-04-29T14:41:45.275Z"
  )
})

test("an hour no page is there for takes the page and the lines in one write", async () => {
  const { deps, puts, reads } = store([], [{ ok: true, at: "c1" }])
  const landed = await landNetWorthReading(
    FIRST,
    () => "01a06009-4775-7004-82c8-ee74889a2ada",
    deps
  )
  expect(landed).toEqual({ outcome: "landed", at: "c1" })
  expect(reads).toEqual([[PAGE_PATH, LINES_PATH]])
  expect(puts).toEqual([
    {
      given: [
        {
          path: PAGE_PATH,
          content: netWorthHourBody(FIRST_AT, "01a06009-4775-7004-82c8-ee74889a2ada"),
        },
        { path: LINES_PATH, content: `${readingLine(FIRST)}\n` },
      ],
      writer: "temper watcher <watcher@alanwalton.com>",
      message: "temper: a net worth reading of 509169347 gold at 2026-04-29T14:41:45.275Z",
      read: "read-commit",
    },
  ])
})

test("an hour whose page is there takes only the lines", async () => {
  const { deps, puts } = store([{ path: PAGE_PATH, content: "whatever" }], [{ ok: true, at: "c1" }])
  await landNetWorthReading(FIRST, () => "unused", deps)
  expect(puts).toEqual([
    {
      given: [{ path: LINES_PATH, content: `${readingLine(FIRST)}\n` }],
      writer: "temper watcher <watcher@alanwalton.com>",
      message: "temper: a net worth reading of 509169347 gold at 2026-04-29T14:41:45.275Z",
      read: "read-commit",
    },
  ])
})

test("a reading already on the hour counts as landed rather than as a refusal", async () => {
  const { deps, puts } = store([{ path: LINES_PATH, content: `${readingLine(FIRST)}\n` }], [])
  expect(await landNetWorthReading(FIRST, () => "unused", deps)).toEqual({
    outcome: "already",
    at: "read-commit",
  })
  expect(puts).toEqual([])
})

test("a write the store turned back is tried again and the second try lands", async () => {
  const { deps, puts } = store(
    [],
    [
      { ok: false, why: "the store was busy" },
      { ok: true, at: "c2" },
    ]
  )
  expect(await landNetWorthReading(FIRST, () => "minted", deps)).toEqual({
    outcome: "landed",
    at: "c2",
  })
  expect(puts).toHaveLength(2)
})

test("four writes the store turned back are refused, naming the last reason", async () => {
  const { deps } = store(
    [],
    [
      { ok: false, why: "one" },
      { ok: false, why: "two" },
      { ok: false, why: "three" },
      { ok: false, why: "four" },
    ]
  )
  expect(await landNetWorthReading(FIRST, () => "minted", deps)).toEqual({
    outcome: "refused",
    why: "four — 4 attempts were spent",
  })
})

test("a read the store turned back names the lines in the refusal", async () => {
  const deps: LandingDeps = {
    waiting: async () => undefined,
    read: (async () => ({ ok: false, why: "the store answered nothing" })) as LandingDeps["read"],
  }
  expect(await landNetWorthReading(FIRST, () => "minted", deps)).toEqual({
    outcome: "refused",
    why: "the store answered nothing — 4 attempts were spent",
  })
})
