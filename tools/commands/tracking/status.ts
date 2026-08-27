export const summary = "Show the open session and a day's tracked blocks (read-only)"

import type { CommandHelp } from "../../ops/surface.ts"
import { getEsoDayStr } from "../../lib/eso-day.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  homeTimes,
  type Page,
  pagesAccess,
  pagesClient,
  sleepTitleWords,
  titleWordMatch,
  trackingFormat,
  trackingResolve,
} from "../../lib/tracking-capability.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--date",
      argLabel: "<YYYY-MM-DD>",
      valueShape: "token",
      description: "ESO day to summarize (default today)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "summary printed" },
    { code: 1, meaning: "bad input" },
  ],
  examples: ["ops tracking status", "ops tracking status --date 2026-06-18"],
}

interface SessionView {
  readonly id: string
  readonly title: string
  readonly start: string | undefined
  readonly end: string | undefined
  readonly startMt: string | undefined
  readonly endMt: string | undefined
  readonly turnsDay: boolean
  readonly open: boolean
  readonly durationSeconds: number | undefined
  readonly safety: string | undefined
  readonly difficulty: string | undefined
  readonly breathingSets: number | undefined
}

export default async function trackingStatus(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")
  const now = new Date()
  const dayStr = parsed.string("--date") ?? getEsoDayStr(now)

  const format = await trackingFormat()
  const { mtWallHm } = await homeTimes()
  const { titleMatchesAnyWord } = await titleWordMatch()
  const { getPage } = await pagesAccess()
  const { getPageAccessClient } = await pagesClient()
  const { findOpenSession, listDaySessions } = await trackingResolve()
  const { DAY_TURN_WORDS: dayTurnWords } = await sleepTitleWords()

  const mtHmOrUndef = (iso: string | undefined): string | undefined => {
    if (iso === undefined) return undefined
    const d = new Date(iso)
    return Number.isNaN(d.getTime()) ? undefined : mtWallHm(d)
  }

  const viewSession = (s: Page, nowIso: string, dayTurnWords: readonly string[]): SessionView => {
    const start = format.fieldStr(s, "startTime")
    const end = format.fieldStr(s, "endTime")
    const open = end === undefined
    const title = format.displayTitle(s)
    return {
      id: s.id,
      title,
      start,
      end,
      startMt: mtHmOrUndef(start),
      endMt: mtHmOrUndef(end),
      turnsDay: titleMatchesAnyWord(title, dayTurnWords),
      open,
      durationSeconds: format.durationSeconds(start, end ?? nowIso),
      safety: format.fieldStr(s, "safetyLevel"),
      difficulty: format.fieldStr(s, "difficultyLevel"),
      breathingSets: typeof s.breathingSets === "number" ? s.breathingSets : undefined,
    }
  }

  const sb = getPageAccessClient()
  const daily = await getPage(sb, {
    pageTypeSlug: "daily-tracking",
    where: [{ key: "date", eq: dayStr }],
  })
  const open = await findOpenSession(sb)
  const sessions = daily != null ? await listDaySessions(sb, daily.id) : []
  const nowIso = now.toISOString()
  const views = sessions.map((s) => viewSession(s, nowIso, dayTurnWords))

  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        day: dayStr,
        open:
          open != null
            ? {
                id: open.id,
                title: format.displayTitle(open),
                startTime: format.fieldStr(open, "startTime") ?? null,
              }
            : null,
        sessions: views,
      })}\n`
    )
    return
  }

  let out = `day\t${dayStr}\n`
  out +=
    open != null
      ? `open\t${format.displayTitle(open)}\t${format.fmtMtHm(format.fieldStr(open, "startTime"))}\n`
      : "open\t-\n"
  for (const v of views) {
    const span = `${format.fmtMtHm(v.start)}–${v.open ? "now" : format.fmtMtHm(v.end)}`
    const dur = v.durationSeconds !== undefined ? format.fmtDuration(v.durationSeconds) : "-"
    const breathing = v.breathingSets !== undefined ? `\tb:${v.breathingSets}` : ""
    out += `session\t${v.title}\t${span}\t${dur}\ts:${v.safety ?? "-"}\td:${v.difficulty ?? "-"}${breathing}\n`
  }
  process.stdout.write(out)
}
