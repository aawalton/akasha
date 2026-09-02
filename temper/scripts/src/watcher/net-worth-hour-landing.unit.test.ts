import { describe, expect, test } from "bun:test"
import {
  capturedAtOf,
  netWorthHourBody,
  netWorthHourLinesPath,
  netWorthHourPagePath,
  netWorthHourSlug,
  netWorthHourTitle,
  readingLine,
  snapshotsWith,
} from "./net-worth-hour-landing.ts"

// Every fixture here is a reading the old `temper-net-worth-day` store holds and the line
// `akasha/temper/temper-holdings/net-worth-hours` now holds for it, copied unchanged.
const FIRST_MS = 1777473705275

const FIRST_AT = "2026-04-29T14:41:45.275Z"

describe("the instant a scan was taken at", () => {
  test("is the epoch milliseconds the scan states, read back in UTC", () => {
    expect(capturedAtOf(FIRST_MS)).toBe(FIRST_AT)
  })

  test("gathers into an hour rather than into a day", () => {
    expect(netWorthHourSlug(FIRST_AT)).toBe("hour-2026-04-29-14")
    expect(netWorthHourSlug("2026-04-29T21:00:00.000Z")).toBe("hour-2026-04-29-21")
  })

  test("titles the hour it opens", () => {
    expect(netWorthHourTitle(FIRST_AT)).toBe("2026-04-29 14:00 UTC")
  })

  test("names the page and the lines beside it", () => {
    expect(netWorthHourPagePath("hour-2026-04-29-14")).toBe(
      "akasha/temper/temper-holdings/net-worth-hours/pages/hour-2026-04-29-14/hour-2026-04-29-14.temper-net-worth-hour.ts"
    )
    expect(netWorthHourLinesPath("hour-2026-04-29-14")).toBe(
      "akasha/temper/temper-holdings/net-worth-hours/pages/hour-2026-04-29-14/hour-2026-04-29-14.temper-net-worth-hour.snapshots.jsonl"
    )
  })
})

describe("a reading line", () => {
  test("is the landed line, key for key", () => {
    expect(
      readingLine({
        id: "01a06009-45d7-758a-9196-9597c258a996",
        accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
        capturedAt: FIRST_AT,
        totalValue: 509169347,
      })
    ).toBe(
      '{"id":"01a06009-45d7-758a-9196-9597c258a996","accountPage":"9ba554f7-cb18-48bb-a709-ec935a895ca7","capturedAt":"2026-04-29T14:41:45.275Z","totalValue":509169347}'
    )
  })

  test("carries what a reading broke its total into, where it broke one out", () => {
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
})

describe("an hour's lines", () => {
  const first = {
    id: "01a06009-45d7-758a-9196-9597c258a996",
    accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
    capturedAt: FIRST_AT,
    totalValue: 509169347,
  }
  const later = { ...first, id: "01a06009-45d7-7490-bb32-efa1fdf631b5", capturedAt: "2026-04-29T14:57:43.718Z", totalValue: 509189826 }

  test("open an hour that holds none", () => {
    expect(snapshotsWith(null, first)).toBe(`${readingLine(first)}\n`)
  })

  test("stay ordered by the instant each was taken at", () => {
    expect(snapshotsWith(`${readingLine(later)}\n`, first)).toBe(
      `${readingLine(first)}\n${readingLine(later)}\n`
    )
  })

  test("refuse a reading already standing for that account at that instant", () => {
    expect(snapshotsWith(`${readingLine(first)}\n`, { ...first, id: "01a06009-0000-7000-8000-000000000000" })).toBeNull()
  })
})

describe("an hour page", () => {
  test("is the body that landed for that hour", () => {
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
})
