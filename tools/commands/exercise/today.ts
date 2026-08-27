
export const summary = "Today's scheduled focus and session status"

import { displayTitle, fieldStr } from "@collections/exercises/cli/fields"
import { resolveActiveSchedule, resolveScheduleDay } from "@collections/exercises/cli/resolve"
import { getPages } from "@collections/exercises/pages/access"
import { dayOfWeekFromDayStr } from "@collections/exercises/tracking/day-of-week"
import { z } from "zod"
import type { CommandHelp } from "../../ops/surface.ts"
import { getEsoDayStr } from "../../lib/eso-day.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--date",
      argLabel: "<YYYY-MM-DD>",
      valueShape: "token",
      description: "Date to report (default: today by the ESO logical day)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "day reported" },
    { code: 1, meaning: "query failure" },
  ],
  examples: ["ops exercise today", "ops exercise today --date 2026-06-14 --json"],
}

export default async function exerciseToday(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const dateFlag = parsed.string("--date")
  const json = parsed.boolean("--json")

  const dayStrSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD")
  const dayStr = dateFlag !== undefined ? dayStrSchema.parse(dateFlag) : getEsoDayStr(new Date())
  const day = dayOfWeekFromDayStr(dayStr)

  const schedule = await resolveActiveSchedule()
  const scheduleDay = schedule?.slug != null ? await resolveScheduleDay(schedule.slug, day) : null
  const focus = scheduleDay != null ? fieldStr(scheduleDay, "focus") : undefined

  const sessions = await getPages({
    pageTypeSlug: "workout-session",
    where: [{ key: "date", eq: dayStr }],
    order: [{ by: "startedAt", dir: "desc" }],
    limit: 5,
  })
  const session = sessions.rows[0]
  const sessionCompleted = session !== undefined && fieldStr(session, "completedAt") !== undefined

  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        date: dayStr,
        dayOfWeek: day,
        schedule: schedule != null ? { id: schedule.id, title: displayTitle(schedule) } : null,
        focus: focus ?? null,
        session:
          session !== undefined
            ? { id: session.id, completed: sessionCompleted, count: sessions.rows.length }
            : null,
      })}\n`
    )
    return
  }

  process.stdout.write(
    `date\t${dayStr}\n` +
      `dayOfWeek\t${day}\n` +
      `focus\t${focus ?? "-"}\n` +
      `session\t${session !== undefined ? session.id : "-"}\n` +
      `sessionCompleted\t${session !== undefined ? String(sessionCompleted) : "-"}\n`
  )
}
