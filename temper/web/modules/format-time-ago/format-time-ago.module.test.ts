import { expect, test } from "bun:test"
import {
  ago,
  formatTimeAgo,
} from "akasha/temper/web/modules/format-time-ago/format-time-ago.module.code.ts"
import type { WebPhrases } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { formatTimeAgoDay } from "akasha/temper/web/phrase/pages/format-time-ago-day.temper-web-phrase.ts"
import { formatTimeAgoDays } from "akasha/temper/web/phrase/pages/format-time-ago-days.temper-web-phrase.ts"
import { formatTimeAgoHour } from "akasha/temper/web/phrase/pages/format-time-ago-hour.temper-web-phrase.ts"
import { formatTimeAgoHours } from "akasha/temper/web/phrase/pages/format-time-ago-hours.temper-web-phrase.ts"
import { formatTimeAgoJustNow } from "akasha/temper/web/phrase/pages/format-time-ago-just-now.temper-web-phrase.ts"
import { formatTimeAgoMinute } from "akasha/temper/web/phrase/pages/format-time-ago-minute.temper-web-phrase.ts"
import { formatTimeAgoMinutes } from "akasha/temper/web/phrase/pages/format-time-ago-minutes.temper-web-phrase.ts"

const NOW = new Date("2026-09-24T12:00:00.000Z")

const PHRASES: WebPhrases = new Map(
  [
    formatTimeAgoJustNow,
    formatTimeAgoMinute,
    formatTimeAgoMinutes,
    formatTimeAgoHour,
    formatTimeAgoHours,
    formatTimeAgoDay,
    formatTimeAgoDays,
  ].map((page) => [page.slug, { title: page.title, description: null }])
)

test("an instant a moment ago reads as the just-now phrase", () => {
  expect(formatTimeAgo("2026-09-24T11:59:30.000Z", NOW, PHRASES)).toBe(formatTimeAgoJustNow.title)
  expect(formatTimeAgo("2026-09-24T12:00:05.000Z", NOW, PHRASES)).toBe(formatTimeAgoJustNow.title)
})

test("an instant further back reads in minutes, hours or days", () => {
  expect(formatTimeAgo("2026-09-24T11:55:00.000Z", NOW, PHRASES)).toBe("5 minutes ago")
  expect(formatTimeAgo("2026-09-24T09:00:00.000Z", NOW, PHRASES)).toBe("3 hours ago")
  expect(formatTimeAgo("2026-09-23T12:00:00.000Z", NOW, PHRASES)).toBe("1 day ago")
})

test("no instant, or one that is no date, reads as no words rather than 1970", () => {
  expect(formatTimeAgo(null, NOW, PHRASES)).toBe("")
  expect(formatTimeAgo("not a date", NOW, PHRASES)).toBe("")
  expect(formatTimeAgo(new Date(Number.NaN), NOW, PHRASES)).toBe("")
  expect(ago(null, PHRASES)).toBe("")
  expect(ago("not a date", PHRASES)).toBe("")
})

test("an instant reads as no words while no phrases are held", () => {
  expect(formatTimeAgo("2026-09-24T11:55:00.000Z", NOW, null)).toBe("")
})
