import { expect, test } from "bun:test"
import {
  decideSessionTotalWrite,
  filterSessionsInWindow,
  resolveSessionPointsForValue,
  sumSessionPointsForValue,
  sumSessionPointsForWindow,
} from "./session-points-compute.ts"

const KEY = "prayer-points"

const WALKED_AND_PRAYED = [
  { "start-time": "2026-06-19T15:00:00.000Z", [KEY]: "15" },
  { "start-time": "2026-06-20T15:00:00.000Z", [KEY]: "14.27565" },
  { "start-time": "2026-06-21T15:00:00.000Z", [KEY]: "30" },
]

test("a figure the store worked out arrives as text and still counts", () => {
  expect(resolveSessionPointsForValue({ [KEY]: "15" }, KEY)).toBe(15)
  expect(resolveSessionPointsForValue({ [KEY]: 15 }, KEY)).toBe(15)
})

test("a stretch the formula scored at nothing counts nothing", () => {
  expect(resolveSessionPointsForValue({ [KEY]: "0" }, KEY)).toBe(0)
  expect(resolveSessionPointsForValue({ [KEY]: null }, KEY)).toBe(0)
  expect(resolveSessionPointsForValue({}, KEY)).toBe(0)
  expect(resolveSessionPointsForValue({ [KEY]: "" }, KEY)).toBe(0)
})

test("a total is the sum of every stretch, whatever each arrived as", () => {
  expect(sumSessionPointsForValue(WALKED_AND_PRAYED, KEY)).toBeCloseTo(59.27565, 5)
  expect(sumSessionPointsForValue([], KEY)).toBe(0)
})

test("a window takes the stretches that started inside it, its end excluded", () => {
  const window = {
    start: new Date("2026-06-20T00:00:00.000Z"),
    end: new Date("2026-06-21T15:00:00.000Z"),
  }
  expect(filterSessionsInWindow(WALKED_AND_PRAYED, window)).toHaveLength(1)
  expect(sumSessionPointsForWindow(WALKED_AND_PRAYED, KEY, window)).toBeCloseTo(14.27565, 5)
})

test("a stretch with no start time falls outside every window", () => {
  const window = { start: new Date(0), end: new Date("2100-01-01T00:00:00.000Z") }
  expect(filterSessionsInWindow([{ [KEY]: "15" }], window)).toHaveLength(0)
})

test("a total already standing is not written again", () => {
  expect(decideSessionTotalWrite(59.27565, 59.27565)).toBeNull()
  expect(decideSessionTotalWrite(undefined, 59.27565)).toBe(59.27565)
  expect(decideSessionTotalWrite(59.27565, 74.27565)).toBe(74.27565)
})
