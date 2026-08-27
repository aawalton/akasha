import { MINUTE_WORDS, titleMatchesAnyWord } from "../tracking/title-words.ts"
import { askComposed } from "./tracking-modules.ts"

const MS_PER_MINUTE = 60_000
const MAX_DAY_SESSIONS = 200

export type SleepBlockInput = {
  readonly title: unknown
  readonly startTime: unknown
  readonly endTime: unknown
}

function sleepSpanMs(block: SleepBlockInput, minuteWords: readonly string[]): number {
  if (!titleMatchesAnyWord(block.title, minuteWords)) return 0
  if (typeof block.startTime !== "string" || typeof block.endTime !== "string") return 0
  const startMs = Date.parse(block.startTime)
  const endMs = Date.parse(block.endTime)
  if (Number.isNaN(startMs) || Number.isNaN(endMs)) return 0
  const spanMs = endMs - startMs
  return spanMs > 0 ? spanMs : 0
}

export function sumSleepMinutes(
  blocks: readonly SleepBlockInput[],
  minuteWords: readonly string[]
): number {
  let totalMs = 0
  for (const block of blocks) totalMs += sleepSpanMs(block, minuteWords)
  return Math.round(totalMs / MS_PER_MINUTE)
}

export async function loadDaySleepMinutes(dayStr: string): Promise<number> {
  const dailyAsked = await askComposed({
    "page-type": "daily-tracking",
    where: { date: { is: dayStr } },
    keys: ["id", "date"],
    limit: 1,
  })
  if (!dailyAsked.ok) throw new Error(`loadDaySleepMinutes: ${dailyAsked.why}`)
  const daily = dailyAsked.answer.rows[0]
  const dailyId = daily === undefined ? undefined : daily.values.id
  if (typeof dailyId !== "string") return 0
  const sessionsAsked = await askComposed({
    "page-type": "session-tracking",
    where: { "daily-tracking": { is: dailyId } },
    "sort-by": "start-time",
    limit: MAX_DAY_SESSIONS,
    keys: ["title", "start-time", "end-time"],
  })
  if (!sessionsAsked.ok) throw new Error(`loadDaySleepMinutes: ${sessionsAsked.why}`)
  return sumSleepMinutes(
    sessionsAsked.answer.rows.map((r) => ({
      title: r.values.title,
      startTime: r.values["start-time"],
      endTime: r.values["end-time"],
    })),
    MINUTE_WORDS
  )
}
