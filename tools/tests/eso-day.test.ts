import { expect, test } from "bun:test"
import { getEsoDayWindow } from "../lib/eso-day.ts"

test("a day's window is 23h at spring-forward and 25h at fall-back", () => {
  const hours = (ds: string): number => {
    const w = getEsoDayWindow(ds)
    return (w.end.getTime() - w.start.getTime()) / 3_600_000
  }
  expect(hours("2025-03-08")).toBe(23)
  expect(hours("2025-11-01")).toBe(25)
  expect(hours("2025-06-01")).toBe(24)
})
