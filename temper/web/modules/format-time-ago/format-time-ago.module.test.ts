import { expect, test } from "bun:test"
import {
  ago,
  formatTimeAgo,
} from "akasha/temper/web/modules/format-time-ago/format-time-ago.module.code.ts"

const NOW = new Date("2026-09-24T12:00:00.000Z")

test("an instant a moment ago reads as just now", () => {
  expect(formatTimeAgo("2026-09-24T11:59:30.000Z", NOW)).toBe("Just now")
  expect(formatTimeAgo("2026-09-24T12:00:05.000Z", NOW)).toBe("Just now")
})

test("an instant further back reads in minutes, hours or days", () => {
  expect(formatTimeAgo("2026-09-24T11:55:00.000Z", NOW)).toBe("5 minutes ago")
  expect(formatTimeAgo("2026-09-24T09:00:00.000Z", NOW)).toBe("3 hours ago")
  expect(formatTimeAgo("2026-09-23T12:00:00.000Z", NOW)).toBe("1 day ago")
})

test("no instant, or one that is no date, reads as no words rather than 1970", () => {
  expect(formatTimeAgo(null, NOW)).toBe("")
  expect(formatTimeAgo("not a date", NOW)).toBe("")
  expect(formatTimeAgo(new Date(Number.NaN), NOW)).toBe("")
  expect(ago(null)).toBe("")
  expect(ago("not a date")).toBe("")
})
