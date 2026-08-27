import { expect, test } from "bun:test"
import {
  HIRELING_MAILS_DAILY_TARGET,
  hirelingCountForToday,
  nextHirelingMailCount,
} from "./hireling-mail-count"

test("HIRELING_MAILS_DAILY_TARGET is the full-account daily expectation", () => {
  expect(HIRELING_MAILS_DAILY_TARGET).toBe(100)
})

test("hirelingCountForToday returns 0 when there is no record", () => {
  expect(hirelingCountForToday(undefined, "2026-05-31")).toBe(0)
})

test("hirelingCountForToday returns the stored count on the same day", () => {
  expect(hirelingCountForToday({ date: "2026-05-31", count: 45 }, "2026-05-31")).toBe(45)
})

test("hirelingCountForToday treats a prior-day record as stale (0)", () => {
  expect(hirelingCountForToday({ date: "2026-05-30", count: 100 }, "2026-05-31")).toBe(0)
})

test("nextHirelingMailCount seeds the day from no prior record", () => {
  expect(nextHirelingMailCount(undefined, "2026-05-31", 5)).toEqual({
    date: "2026-05-31",
    count: 5,
  })
})

test("nextHirelingMailCount accumulates across same-day mailbox opens", () => {
  const afterFirst = nextHirelingMailCount(undefined, "2026-05-31", 5)
  const afterSecond = nextHirelingMailCount(afterFirst, "2026-05-31", 5)
  expect(afterSecond).toEqual({ date: "2026-05-31", count: 10 })
})

test("nextHirelingMailCount resets the base when the day rolls over", () => {
  const yesterday = { date: "2026-05-30", count: 100 }
  expect(nextHirelingMailCount(yesterday, "2026-05-31", 5)).toEqual({
    date: "2026-05-31",
    count: 5,
  })
})
