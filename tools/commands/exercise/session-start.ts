
export const summary = "Start a session for today (or --date) from the active schedule's day"

import { z } from "zod"
import { fieldStr } from "@collections/exercises/cli/fields"
import { resolveActiveSchedule, resolveScheduleDay } from "@collections/exercises/cli/resolve"
import { createPage, getPages } from "@collections/exercises/pages/access"
import type { Json } from "@collections/exercises/pages/page"
import {
  capitalizeDayOfWeek,
  dayOfWeekFromDayStr,
} from "@collections/exercises/tracking/day-of-week"
import { freeSlug, sessionSlugStem } from "@collections/exercises/tracking/derive"
import { closeAbandonedSessions } from "@collections/exercises/tracking/session-close"
import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { getEsoDayStr } from "../../lib/eso-day.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--date",
      argLabel: "<YYYY-MM-DD>",
      valueShape: "token",
      description: "Session date (default: today by the ESO logical day)",
    },
    { name: "--force", description: "Start even when the scheduled focus is rest" },
    { name: "--notes", argLabel: "<markdown>", valueShape: "prose", description: "Session notes" },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "session created" },
    { code: 1, meaning: "rest-day refusal, resolution failure, or create failure" },
  ],
  examples: [
    "ops exercise session-start",
    "ops exercise session-start --date 2026-06-14 --force",
  ],
}

export default async function exerciseSessionStart(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const dateFlag = parsed.string("--date")
  const force = parsed.boolean("--force")
  const notes = parsed.string("--notes")
  const json = parsed.boolean("--json")

  const dayStrSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD")
  const dayStr = dateFlag !== undefined ? dayStrSchema.parse(dateFlag) : getEsoDayStr(new Date())
  const day = dayOfWeekFromDayStr(dayStr)

  const closed = await closeAbandonedSessions(dayStr)
  for (const c of closed) {
    console.error(`Closed abandoned session "${c.title}" (${c.date}) at ${c.completedAt}`)
  }

  console.error(`Resolving schedule for ${dayStr} (${day})…`)
  const schedule = await resolveActiveSchedule()
  const scheduleDay = schedule?.slug != null ? await resolveScheduleDay(schedule.slug, day) : null
  const focus = scheduleDay != null ? fieldStr(scheduleDay, "focus") : undefined

  if (focus === "rest" && !force) {
    throw inputError(`${dayStr} (${day}) is a rest day — pass --force to start anyway`)
  }

  const titleHead =
    focus !== undefined ? `${capitalizeDayOfWeek(day)} ${focus}` : capitalizeDayOfWeek(day)
  const title = `${titleHead} — ${dayStr}`

  const sameDay = await getPages({
    pageTypeSlug: "workout-session",
    where: [{ key: "date", eq: dayStr }],
    select: ["id", "slug"],
  })
  const taken = new Set(
    sameDay.rows.map((row) => row.slug).filter((slug): slug is string => slug !== null)
  )
  const slug = freeSlug(sessionSlugStem(day, focus, dayStr), taken)

  const properties: Record<string, Json> = {
    title,
    slug,
    date: dayStr,
    startedAt: new Date().toISOString(),
    ...(scheduleDay?.slug != null ? { scheduleDaySlug: scheduleDay.slug } : {}),
    ...(notes !== undefined ? { notes } : {}),
  }

  console.error(`Starting session "${title}"…`)
  const session = await createPage("workout-session", slug, properties)

  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        id: session.id,
        slug,
        title,
        date: dayStr,
        dayOfWeek: day,
        focus: focus ?? null,
        closedAbandoned: closed,
      })}\n`
    )
    return
  }

  let out = ""
  for (const c of closed) out += `closed-abandoned\t${c.title}\t${c.completedAt}\n`
  out += `id\t${slug}\n` + `focus\t${focus ?? "-"}\n`
  process.stdout.write(out)
}
