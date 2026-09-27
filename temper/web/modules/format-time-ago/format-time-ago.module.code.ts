import {
  heldWebPhrases,
  phraseIn,
  type WebPhrases,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { formatTimeAgoDay } from "akasha/temper/web/phrase/pages/format-time-ago-day.temper-web-phrase.ts"
import { formatTimeAgoDays } from "akasha/temper/web/phrase/pages/format-time-ago-days.temper-web-phrase.ts"
import { formatTimeAgoHour } from "akasha/temper/web/phrase/pages/format-time-ago-hour.temper-web-phrase.ts"
import { formatTimeAgoHours } from "akasha/temper/web/phrase/pages/format-time-ago-hours.temper-web-phrase.ts"
import { formatTimeAgoJustNow } from "akasha/temper/web/phrase/pages/format-time-ago-just-now.temper-web-phrase.ts"
import { formatTimeAgoMinute } from "akasha/temper/web/phrase/pages/format-time-ago-minute.temper-web-phrase.ts"
import { formatTimeAgoMinutes } from "akasha/temper/web/phrase/pages/format-time-ago-minutes.temper-web-phrase.ts"

export function ago(iso: string | null, phrases: WebPhrases | null = heldWebPhrases()): string {
  const said = formatTimeAgo(iso, new Date(), phrases)
  return said === "" ? "" : ` ${said}`
}

export function formatTimeAgo(
  date: Date | string | null,
  now: Date = new Date(),
  phrases: WebPhrases | null = heldWebPhrases()
): string {
  if (date === null) return ""
  const then = typeof date === "string" ? new Date(date) : date
  if (Number.isNaN(then.getTime())) return ""
  const diffMs = now.getTime() - then.getTime()
  const counted = (count: number, one: string, many: string) =>
    phraseIn(phrases, count === 1 ? one : many, { count })

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (diffMs < 0 || seconds < 60) {
    return phraseIn(phrases, formatTimeAgoJustNow.slug)
  }

  if (minutes < 60) {
    return counted(minutes, formatTimeAgoMinute.slug, formatTimeAgoMinutes.slug)
  }

  if (hours < 24) {
    return counted(hours, formatTimeAgoHour.slug, formatTimeAgoHours.slug)
  }

  return counted(days, formatTimeAgoDay.slug, formatTimeAgoDays.slug)
}
