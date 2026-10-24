import { expect, test } from "bun:test"
import {
  type BuildReading,
  KEPT_PER_BUILD,
  readingsWith,
  resultOf,
} from "akasha/temper/player/character/stat/modules/build-reading-lines/build-reading-lines.module.code.ts"

const READING: BuildReading = {
  character: "Khelta the Eternal",
  buildHash: "ATQI",
  bar: "frontBar",
  reading: { capturedAt: 1, stats: { "1": 26112, "2": 300 }, inCombat: false },
}

test("a reading taken again later is the same result", () => {
  const later = { ...READING, reading: { ...READING.reading, capturedAt: 9 } }
  expect(resultOf(later)).toBe(resultOf(READING))
})

test("a reading's keys in another order are the same result", () => {
  const reordered = {
    ...READING,
    reading: { inCombat: false, stats: { "2": 300, "1": 26112 }, capturedAt: 1 },
  }
  expect(resultOf(reordered)).toBe(resultOf(READING))
})

test("another build, bar or stat is another result", () => {
  expect(resultOf({ ...READING, buildHash: "ATQJ" })).not.toBe(resultOf(READING))
  expect(resultOf({ ...READING, bar: "backBar" })).not.toBe(resultOf(READING))
  const stronger = { ...READING, reading: { ...READING.reading, stats: { "1": 26113 } } }
  expect(resultOf(stronger)).not.toBe(resultOf(READING))
})

test("a result already held lands nothing", () => {
  const body = readingsWith(null, [READING])
  expect(body).not.toBe(null)
  const later = { ...READING, reading: { ...READING.reading, capturedAt: 9 } }
  expect(readingsWith(body, [later])).toBe(null)
})

test("a new result is added after the results held, once", () => {
  const body = readingsWith(null, [READING])
  const back = { ...READING, bar: "backBar" }
  const written = readingsWith(body, [back, back]) ?? ""
  expect(written.split("\n").filter((line) => line !== "")).toHaveLength(2)
  expect(written.startsWith(body ?? "")).toBe(true)
})

test("a build keeps its latest readings, and the oldest goes as a newer one lands", () => {
  const takenAt = (at: number): BuildReading => ({
    ...READING,
    reading: { ...READING.reading, capturedAt: at, stats: { "1": at } },
  })
  const full = readingsWith(
    null,
    Array.from({ length: KEPT_PER_BUILD }, (_, at) => takenAt(at + 1))
  )
  const other = { ...takenAt(0), buildHash: "ATQJ" }
  const written = readingsWith(full, [takenAt(KEPT_PER_BUILD + 1), other]) ?? ""
  const lines = written.split("\n").filter((line) => line !== "")
  expect(lines).toHaveLength(KEPT_PER_BUILD + 1)
  expect(lines.some((line) => line.includes('"capturedAt":1,'))).toBe(false)
  expect(lines.at(-1)).toContain("ATQJ")
})

test("a capture a line holds lands nothing, though its result is new", () => {
  const body = readingsWith(null, [READING])
  const repaired = { ...READING, buildHash: "ATQJ" }
  expect(readingsWith(body, [repaired])).toBe(null)
})

test("a capture the removed readings name lands nothing", () => {
  const removed = `${JSON.stringify({ id: "01a1", bar: "frontBar", capturedAt: 1 })}\n`
  expect(readingsWith(null, [READING], removed)).toBe(null)
  const later = { ...READING, reading: { ...READING.reading, capturedAt: 9, inCombat: true } }
  expect(readingsWith(null, [later], removed)).not.toBe(null)
})

test("a removed capture on the other bar keeps this bar's capture landing", () => {
  const removed = `${JSON.stringify({ id: "01a1", bar: "backBar", capturedAt: 1 })}\n`
  expect(readingsWith(null, [READING], removed)).not.toBe(null)
})
