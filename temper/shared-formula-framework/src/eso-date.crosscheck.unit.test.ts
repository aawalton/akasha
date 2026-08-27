import { describe, expect, it } from "bun:test"
import { getEsoDayStr, getEsoResetTime } from "../../../day/day"
import {
  getEsoDayStringFromSec,
  getEsoResetTimestampSec,
} from "@temper/shared-foundation-misc-dungeons/eso-day"
import { getEsoDateString } from "./eso-date"

function expectFormsAgree(label: string, utcMs: number): undefined {
  expect(utcMs % 1000, `${label}: fixture must be whole-second`).toBe(0)
  const sec = utcMs / 1000

  const dateReset = getEsoResetTime(new Date(utcMs)).getTime()
  const intReset = getEsoResetTimestampSec(sec) * 1000
  expect(intReset, `${label}: reset instant`).toBe(dateReset)

  const dateDay = getEsoDayStr(new Date(utcMs))
  const intDay = getEsoDayStringFromSec(sec)
  expect(intDay, `${label}: logical day`).toBe(dateDay)

  expect(dateReset % 60_000, `${label}: reset aligned to minute`).toBe(0)
  expect(dateReset, `${label}: reset not in the future`).toBeLessThanOrEqual(utcMs)
}

const NAMED_INSTANTS: ReadonlyArray<readonly [string, number]> = [
  ["midwinter EST midday", Date.UTC(2026, 0, 15, 12, 0, 0)],
  ["midsummer EDT midday", Date.UTC(2026, 6, 15, 12, 0, 0)],
  ["year boundary", Date.UTC(2026, 0, 1, 5, 0, 0)],

  ["1s before summer reset", Date.UTC(2026, 6, 15, 9, 59, 59)],
  ["at summer reset", Date.UTC(2026, 6, 15, 10, 0, 0)],
  ["1s after summer reset", Date.UTC(2026, 6, 15, 10, 0, 1)],

  ["spring day, pre-reset", Date.UTC(2026, 2, 8, 9, 0, 0)],
  ["spring day, at reset", Date.UTC(2026, 2, 8, 10, 0, 0)],
  ["spring day, post-reset", Date.UTC(2026, 2, 8, 11, 0, 0)],
  ["spring day, at wall-clock jump", Date.UTC(2026, 2, 8, 7, 0, 0)],

  ["fall day, fold instant", Date.UTC(2026, 10, 1, 6, 0, 0)],
  ["fall day, ambiguous window", Date.UTC(2026, 10, 1, 6, 30, 0)],
  ["fall day, pre-reset", Date.UTC(2026, 10, 1, 10, 30, 0)],
  ["fall day, at reset", Date.UTC(2026, 10, 1, 11, 0, 0)],
  ["fall day, post-reset", Date.UTC(2026, 10, 1, 12, 0, 0)],
]

describe("ESO reset math — Form 1 (integer) vs Form 2 (Date) agreement", () => {
  for (const [label, utcMs] of NAMED_INSTANTS) {
    it(`agrees at: ${label}`, () => {
      expectFormsAgree(label, utcMs)
    })
  }

  it("agrees across a dense deterministic sweep spanning both DST regimes", () => {
    const start = Date.UTC(2026, 0, 1, 0, 0, 0)
    const end = Date.UTC(2028, 0, 1, 0, 0, 0)
    const stepMs = 25_200_000
    for (let t = start; t < end; t += stepMs) {
      expectFormsAgree(`sweep@${t}`, t)
    }
  })
})

describe("ESO reset math — Form 3 (wrapper) delegates to Form 2", () => {
  it("getEsoDateString() equals the canonical current logical day", () => {
    const now = new Date()
    expect(getEsoDateString()).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(getEsoDateString()).toBe(getEsoDayStr(now))
  })
})
