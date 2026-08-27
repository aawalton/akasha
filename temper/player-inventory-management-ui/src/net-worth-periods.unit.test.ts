import { describe, expect, it } from "bun:test"
import { NET_WORTH_PERIODS, readNetWorthPeriods } from "./net-worth-periods"

const MS_PER_DAY = 86_400_000

function row(id: string, date: number, netWorth: number) {
  return { id, date, netWorth }
}

const JUL_24 = Date.UTC(2026, 6, 24, 14, 32, 13)
const JUL_05 = Date.UTC(2026, 6, 5, 16, 5, 51)
const JUN_24 = Date.UTC(2026, 5, 24, 13, 58, 3)
const APR_29 = Date.UTC(2026, 3, 29, 14, 41, 45)

const LIVE_SERIES = [
  row("apr29", APR_29, 509_169_347),
  row("jun24", JUN_24, 206_755_169),
  row("jul05", JUL_05, 177_903_600),
  row("jul24", JUL_24, 588_486_659),
]

function readingFor(label: string, history = LIVE_SERIES) {
  const reading = readNetWorthPeriods(history).find((r) => r.label === label)
  if (reading === undefined) throw new Error(`no reading for ${label}`)
  return reading
}

describe("readNetWorthPeriods", () => {
  it("reports every period unmeasured for an account with no snapshots", () => {
    const readings = readNetWorthPeriods([])

    expect(readings).toHaveLength(NET_WORTH_PERIODS.length)
    expect(readings.every((r) => r.state === "unmeasured")).toBe(true)
  })

  it("reports every period unmeasured when only one snapshot exists", () => {
    const readings = readNetWorthPeriods([row("only", JUL_24, 588_486_659)])

    expect(readings.every((r) => r.state === "unmeasured")).toBe(true)
  })

  it("says a period is unmeasured when the series does not reach that far back", () => {
    expect(readingFor("90d").state).toBe("unmeasured")
    expect(readingFor("365d").state).toBe("unmeasured")
  })

  it("measures a period the series does reach, with the delta and percent", () => {
    const thirty = readingFor("30d")

    expect(thirty).toEqual({
      label: "30d",
      state: "measured",
      diff: 381_731_490,
      percent: 185,
      comparedAt: JUN_24,
      onHorizon: true,
    })
  })

  it("keeps a zero change as a measured reading rather than dropping it", () => {
    const flat = [row("then", JUL_24 - 40 * MS_PER_DAY, 500_000), row("now", JUL_24, 500_000)]

    const thirty = readNetWorthPeriods(flat).find((r) => r.label === "30d")

    expect(thirty?.state).toBe("measured")
    expect(thirty).toMatchObject({ diff: 0, percent: 0 })
  })

  it("measures a loss as readily as a gain", () => {
    const losing = [
      row("then", JUL_24 - 40 * MS_PER_DAY, 200_000_000),
      row("now", JUL_24, 150_000_000),
    ]

    expect(readNetWorthPeriods(losing).find((r) => r.label === "30d")).toMatchObject({
      state: "measured",
      diff: -50_000_000,
      percent: -25,
    })
  })

  it("carries the snapshot the delta was actually computed against", () => {
    expect(readingFor("1d")).toMatchObject({ state: "measured", comparedAt: JUL_05 })
    expect(readingFor("7d")).toMatchObject({ state: "measured", comparedAt: JUL_05 })
    expect(readingFor("1d")).toMatchObject({ diff: 410_583_059 })
    expect(readingFor("7d")).toMatchObject({ diff: 410_583_059 })
  })

  it("flags a comparison point that does not land on the horizon's day", () => {
    expect(readingFor("1d")).toMatchObject({ onHorizon: false })
    expect(readingFor("7d")).toMatchObject({ onHorizon: false })
  })

  it("leaves a point that lands on the horizon's day unqualified", () => {
    expect(readingFor("30d")).toMatchObject({ onHorizon: true })
  })

  it("states no percent when the comparison point is zero", () => {
    const fromZero = [row("then", JUL_24 - 40 * MS_PER_DAY, 0), row("now", JUL_24, 1_000)]

    expect(readNetWorthPeriods(fromZero).find((r) => r.label === "30d")).toMatchObject({
      state: "measured",
      diff: 1_000,
      percent: null,
    })
  })

  it("returns one reading per requested period, in order", () => {
    const readings = readNetWorthPeriods(LIVE_SERIES)

    expect(readings.map((r) => r.label)).toEqual(NET_WORTH_PERIODS.map((p) => p.label))
  })
})
