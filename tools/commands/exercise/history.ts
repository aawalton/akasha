
export const summary = "Recent sets + best set for an exercise (--exercise, --limit)"

import { displayTitle, fieldNum, fieldStr } from "@collections/exercises/cli/fields"
import { resolveExercise } from "@collections/exercises/cli/resolve"
import { getPages } from "@collections/exercises/pages/access"
import { bestSet, type SetLine } from "@collections/exercises/tracking/history-core"
import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--exercise",
      argLabel: "<ref>",
      valueShape: "token",
      required: true,
      description: "Catalog exercise (id / title / substring)",
    },
    {
      name: "--limit",
      argLabel: "<n>",
      valueShape: "token",
      default: "20",
      description: "Max sets fetched (default 20)",
      aliases: ["--tail"],
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  positionals: [
    { name: "exercise", required: false, aliasOfFlag: "--exercise", description: "Exercise ref" },
  ],
  exits: [
    { code: 0, meaning: "history printed" },
    { code: 1, meaning: "resolution failure" },
  ],
  examples: [
    'ops exercise history "Barbell Bench Press"',
    "ops exercise history --exercise bench --limit 50 --json",
  ],
}

export default async function exerciseHistory(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const limit = parsed.nonNegativeInt("--limit") ?? 20
  const json = parsed.boolean("--json")

  const exercise = await resolveExercise(parsed.requireString("--exercise"))
  if (exercise.slug === null) throw new Error(`exercise ${exercise.id} carries no slug`)

  const setLogs = await getPages({
    pageTypeSlug: "set-log",
    where: [{ key: "exerciseSlug", eq: exercise.slug }],
    order: [
      { by: "loggedAt", dir: "desc" },
      { by: "id", dir: "desc" },
    ],
    limit,
  })

  const sessionSlugs = [
    ...new Set(
      setLogs.rows.map((row) => fieldStr(row, "sessionSlug")).filter((slug) => slug !== undefined)
    ),
  ]
  const dateBySession = new Map<string, string>()
  if (sessionSlugs.length > 0) {
    const sessions = await getPages({
      pageTypeSlug: "workout-session",
      where: [{ key: "slug", in: sessionSlugs }],
      select: ["id", "slug", "date"],
    })
    for (const row of sessions.rows) {
      const date = fieldStr(row, "date")
      if (date !== undefined && row.slug !== null) dateBySession.set(row.slug, date)
    }
  }

  const lines: SetLine[] = setLogs.rows.map((row) => {
    const sessionSlug = fieldStr(row, "sessionSlug")
    return {
      date: sessionSlug !== undefined ? (dateBySession.get(sessionSlug) ?? null) : null,
      setNumber: fieldNum(row, "setNumber") ?? null,
      reps: fieldNum(row, "reps") ?? null,
      weight: fieldNum(row, "weight") ?? null,
      rpe: fieldNum(row, "rpe") ?? null,
    }
  })
  const best = bestSet(lines)

  if (json) {
    process.stdout.write(
      `${JSON.stringify({ exercise: displayTitle(exercise), sets: lines, best })}\n`
    )
    return
  }

  let out = `exercise\t${displayTitle(exercise)}\n`
  for (const line of lines) {
    out += `set\t${line.date ?? "-"}\t${line.setNumber ?? "-"}\t${line.reps ?? "-"}\t${line.weight ?? "-"}\t${line.rpe ?? "-"}\n`
  }
  out +=
    best !== null
      ? `best\t${best.date ?? "-"}\t${best.weight}\t×${best.reps ?? "-"}\n`
      : "best\t-\n"
  process.stdout.write(out)
}
