import { describe, expect, it } from "bun:test"
import { toDailyCloses, toGuildBankBasisChange, toNetWorthHistory } from "./net-worth-history"

const OLDEST = { id: "a", dataTimestamp: 1_781_503_457_000, totalValue: 100_000_000 }
const MIDDLE = { id: "b", dataTimestamp: 1_784_268_257_000, totalValue: 111_111_111 }
const NEWEST = { id: "c", dataTimestamp: 1_784_959_457_000, totalValue: 123_456_789 }

describe("toNetWorthHistory", () => {
  it("is empty for an account with no snapshots", () => {
    expect(toNetWorthHistory([])).toEqual([])
  })

  it("returns a newest-first read in chronological order", () => {
    const history = toNetWorthHistory([NEWEST, MIDDLE, OLDEST])

    expect(history.map((r) => r.id)).toEqual(["a", "b", "c"])
    expect(history[history.length - 1]?.netWorth).toBe(123_456_789)
  })

  it("puts the newest snapshot last, where consumers read the current total", () => {
    const history = toNetWorthHistory([NEWEST, MIDDLE, OLDEST])

    expect(history.at(-1)).toEqual({ id: "c", date: 1_784_959_457_000, netWorth: 123_456_789 })
  })

  it("substitutes no value for a row missing its total or stamp", () => {
    expect(toNetWorthHistory([{ id: "x" }])).toEqual([{ id: "x", date: 0, netWorth: 0 }])
  })
})

const DAY = 86_400_000
const JUL_24_AM = Date.UTC(2026, 6, 24, 9, 0, 0)
const JUL_24_PM = Date.UTC(2026, 6, 24, 21, 0, 0)

describe("toDailyCloses", () => {
  it("is empty for an account with no snapshots", () => {
    expect(toDailyCloses([])).toEqual([])
  })

  it("keeps one point per day, the close", () => {
    const closes = toDailyCloses([
      { id: "a", date: JUL_24_AM, netWorth: 100 },
      { id: "b", date: JUL_24_PM, netWorth: 300 },
    ])

    expect(closes).toEqual([{ date: "2026-07-24", dateEpoch: JUL_24_PM, netWorth: 300 }])
  })

  it("keeps days in chronological order", () => {
    const closes = toDailyCloses([
      { id: "a", date: JUL_24_AM - DAY, netWorth: 1 },
      { id: "b", date: JUL_24_AM, netWorth: 2 },
    ])

    expect(closes.map((c) => c.date)).toEqual(["2026-07-23", "2026-07-24"])
  })
})

describe("toGuildBankBasisChange", () => {
  const OLD_BASIS = { id: "old", dataTimestamp: JUL_24_AM - 10 * DAY, totalValue: 100 }
  const NEW_BASIS = {
    id: "new",
    dataTimestamp: JUL_24_PM,
    totalValue: 60,
    excludedGuildBankValue: 40,
  }

  it("reports no basis change when nothing ever measured the exclusion", () => {
    expect(toGuildBankBasisChange([OLD_BASIS, { ...OLD_BASIS, id: "old2" }])).toBeNull()
  })

  it("reports no basis change when every snapshot measured the exclusion", () => {
    expect(toGuildBankBasisChange([NEW_BASIS, { ...NEW_BASIS, id: "new2" }])).toBeNull()
  })

  it("reports the change when the series straddles the two bases", () => {
    expect(toGuildBankBasisChange([OLD_BASIS, NEW_BASIS])).toEqual({
      since: JUL_24_PM,
      latestValue: 40,
    })
  })

  it("takes both figures only from rows that measured the exclusion", () => {
    const later = { id: "later", dataTimestamp: JUL_24_PM + DAY, totalValue: 70 }

    expect(toGuildBankBasisChange([OLD_BASIS, NEW_BASIS, later])).toEqual({
      since: JUL_24_PM,
      latestValue: 40,
    })
  })
})
