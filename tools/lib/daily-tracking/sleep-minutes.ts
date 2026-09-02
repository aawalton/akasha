import { dayByDate, sessionsOfDay } from "../tracking/day-place.ts"
import { MINUTE_WORDS, titleMatchesAnyWord } from "../tracking/title-words.ts"

const MS_PER_MINUTE = 60_000

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

/**
 * How long Alan slept on a day, summed from that day's sleep sessions.
 *
 * The day is asked for by date, not by id, because the caller has a day string and nothing else.
 * `dayByDate` is the funnel's by-date reader, so this asks where the day is kept before it looks —
 * which is the whole point once one day is markdown and the next is akasha.
 *
 * This used to take `askComposed` from `./tracking-modules.ts`, which is `@shared/pages-query/ask`:
 * the remote half of the query facade, fixed at "the checkout is not here", so it went to the page
 * store over HTTP. The store answers `daily-tracking` names no page type the index holds, so both
 * reads below refused and this function threw for every day it was asked about. The funnel's readers
 * ask the checkout on this machine, which is where the days are.
 *
 * The sessions beside the day are read by `sessionsOfDay` for the same reason the day itself is:
 * the query over `session-tracking` used to be composed here and handed to the page client, which
 * decided where the rows were kept in a file that has no business deciding it.
 */
export async function loadDaySleepMinutes(dayStr: string): Promise<number> {
  const daily = await dayByDate(dayStr)
  if (daily === null || daily.id === "") return 0
  const sessions = await sessionsOfDay(daily.id, ["title", "start-time", "end-time"])
  return sumSleepMinutes(
    sessions.map((row) => ({
      title: row.title,
      startTime: row.startTime,
      endTime: row.endTime,
    })),
    MINUTE_WORDS
  )
}
