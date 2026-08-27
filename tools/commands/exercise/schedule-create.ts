
export const summary = "Create the weekly schedule + 7 schedule-days from per-day focus flags"

import { z } from "zod"
import { createPage, getPages, patchPage } from "@collections/exercises/pages/access"
import {
  capitalizeDayOfWeek,
  DAYS_OF_WEEK_MONDAY_FIRST,
} from "@collections/exercises/tracking/day-of-week"
import { freeSlug, scheduleDaySlug, slugStem } from "@collections/exercises/tracking/derive"
import type { CommandHelp, HelpFlag } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { SCHEDULE_DAY_FOCUS_OPTIONS } from "../../lib/exercise-vocabularies.ts"

const DAYS_MONDAY_FIRST = DAYS_OF_WEEK_MONDAY_FIRST

function capitalizeDay(day: string): string {
  return day.charAt(0).toUpperCase() + day.slice(1)
}

const dayFlags: readonly HelpFlag[] = DAYS_MONDAY_FIRST.map((day) => ({
  name: `--${day}`,
  argLabel: "<focus>",
  valueShape: "token",
  required: true,
  choices: SCHEDULE_DAY_FOCUS_OPTIONS,
  description: `Focus for ${capitalizeDay(day)}`,
}))

export const help: CommandHelp = {
  flags: [
    {
      name: "--title",
      argLabel: "<title>",
      valueShape: "prose",
      default: "Weekly Schedule",
      description: 'Schedule title (default "Weekly Schedule")',
    },
    {
      name: "--description",
      argLabel: "<markdown>",
      valueShape: "prose",
      description: "Markdown description",
    },
    ...dayFlags,
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "schedule + 7 days created" },
    { code: 1, meaning: "input or create failure" },
  ],
  examples: [
    "ops exercise schedule-create --monday push --tuesday pull --wednesday legs " +
      "--thursday rest --friday push --saturday conditioning --sunday rest",
  ],
}

export default async function exerciseScheduleCreate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const title = parsed.requireString("--title")
  const description = parsed.string("--description")
  const json = parsed.boolean("--json")

  const focusSchema = z.enum(SCHEDULE_DAY_FOCUS_OPTIONS)
  const focusByDay = new Map<string, string>()
  for (const day of DAYS_MONDAY_FIRST) {
    focusByDay.set(day, focusSchema.parse(parsed.requireString(`--${day}`)))
  }

  console.error("Deactivating any currently-active schedule…")
  const active = await getPages({
    pageTypeSlug: "workout-schedule",
    where: [{ key: "active", eq: true }],
    select: ["id", "slug"],
  })
  let deactivated = 0
  for (const row of active.rows) {
    if (row.slug === null) continue
    await patchPage("workout-schedule", row.slug, { active: false })
    deactivated += 1
  }
  if (deactivated > 0) console.error(`Deactivated ${deactivated} schedule(s).`)

  const standing = await getPages({ pageTypeSlug: "workout-schedule", select: ["id", "slug"] })
  const taken = new Set(
    standing.rows.map((row) => row.slug).filter((slug): slug is string => slug !== null)
  )
  const scheduleSlug = freeSlug(slugStem(title), taken)

  console.error(`Creating schedule "${title}"…`)
  await createPage("workout-schedule", scheduleSlug, {
    slug: scheduleSlug,
    title,
    active: true,
    ...(description !== undefined ? { description } : {}),
  })

  const days: { day: string; focus: string; slug: string }[] = []
  for (const day of DAYS_MONDAY_FIRST) {
    const focus = focusByDay.get(day)
    if (focus === undefined) continue
    const daySlug = scheduleDaySlug(scheduleSlug, day)
    await createPage("schedule-day", daySlug, {
      slug: daySlug,
      title: `${capitalizeDayOfWeek(day)} — ${focus}`,
      scheduleSlug,
      dayOfWeek: day,
      focus,
    })
    days.push({ day, focus, slug: daySlug })
  }

  if (json) {
    process.stdout.write(`${JSON.stringify({ slug: scheduleSlug, title, days })}\n`)
    return
  }
  let out = `slug\t${scheduleSlug}\n`
  for (const { day, focus, slug } of days) out += `day\t${day}\t${focus}\t${slug}\n`
  process.stdout.write(out)
}
