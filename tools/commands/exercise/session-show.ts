
export const summary = "Show a session's header and logged sets grouped by exercise"

import { displayTitle, fieldBool, fieldNum, fieldStr } from "@collections/exercises/cli/fields"
import { resolveOpenSession } from "@collections/exercises/cli/resolve"
import { getPage, getPages } from "@collections/exercises/pages/access"
import type { Page } from "@collections/exercises/pages/page"
import type { VolumeSetInput } from "@collections/exercises/tracking/volume"
import { computeSessionVolume } from "@collections/exercises/tracking/volume"
import type { CommandHelp } from "../../ops/surface.ts"
import { readBodyweight } from "../../lib/exercise-pages.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--session",
      argLabel: "<ref>",
      valueShape: "token",
      description: "Session (id / title / substring; default: most recent open session)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  positionals: [
    { name: "session", required: false, aliasOfFlag: "--session", description: "Session ref" },
  ],
  exits: [
    { code: 0, meaning: "session printed" },
    { code: 1, meaning: "no open session or resolution failure" },
  ],
  examples: ["ops exercise session-show", "ops exercise session-show --session 2026-06-12 --json"],
}

interface ExerciseInfo {
  readonly title: string
  readonly loadFactor: number | undefined
  readonly implementCount: number | undefined
}

interface SetLine {
  readonly exercise: string
  readonly setNumber: number
  readonly reps: number | undefined
  readonly weight: number | undefined
  readonly rpe: number | undefined
  readonly isWarmup: boolean
  readonly note: string | undefined
  readonly activityType: string | undefined
  readonly durationSeconds: number | undefined
  readonly distance: number | undefined
}

async function titleBySlug(
  pageTypeSlug: string,
  slug: string | undefined
): Promise<string | undefined> {
  if (slug === undefined) return undefined
  const page = await getPage({ pageTypeSlug, where: [{ key: "slug", eq: slug }] })
  return page !== null ? displayTitle(page) : undefined
}

function toSetLines(
  rows: readonly Page[],
  exercises: ReadonlyMap<string, ExerciseInfo>
): readonly SetLine[] {
  const mapped = rows.map((row) => {
    const exerciseSlug = fieldStr(row, "exerciseSlug")
    const info = exerciseSlug !== undefined ? exercises.get(exerciseSlug) : undefined
    return {
      exercise: info?.title ?? exerciseSlug ?? "-",
      setNumber: fieldNum(row, "setNumber") ?? 0,
      reps: fieldNum(row, "reps"),
      weight: fieldNum(row, "weight"),
      rpe: fieldNum(row, "rpe"),
      isWarmup: fieldBool(row, "isWarmup") ?? false,
      note: fieldStr(row, "note"),
      activityType: fieldStr(row, "activityType"),
      durationSeconds: fieldNum(row, "durationSeconds"),
      distance: fieldNum(row, "distance"),
    }
  })
  return mapped.sort((a, b) => {
    const byExercise = a.exercise.localeCompare(b.exercise)
    return byExercise !== 0 ? byExercise : a.setNumber - b.setNumber
  })
}

export default async function exerciseSessionShow(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const session = await resolveOpenSession(parsed.string("--session"))
  if (session.slug === null) throw new Error(`session ${session.id} carries no slug`)

  const setLogs = await getPages({
    pageTypeSlug: "set-log",
    where: [{ key: "sessionSlug", eq: session.slug }],
  })
  const exerciseSlugs = [
    ...new Set(
      setLogs.rows.map((row) => fieldStr(row, "exerciseSlug")).filter((slug) => slug !== undefined)
    ),
  ]
  const exercises = new Map<string, ExerciseInfo>()
  if (exerciseSlugs.length > 0) {
    const rows = await getPages({
      pageTypeSlug: "exercise",
      where: [{ key: "slug", in: exerciseSlugs }],
      select: ["id", "slug", "title", "loadFactor", "implementCount"],
    })
    for (const row of rows.rows) {
      if (row.slug === null) continue
      exercises.set(row.slug, {
        title: fieldStr(row, "title") ?? row.slug,
        loadFactor: fieldNum(row, "loadFactor"),
        implementCount: fieldNum(row, "implementCount"),
      })
    }
  }

  const scheduleDayTitle = await titleBySlug("schedule-day", fieldStr(session, "scheduleDaySlug"))
  const bodyweight = readBodyweight()

  const lines = toSetLines(setLogs.rows, exercises)

  const volumeInputs: readonly VolumeSetInput[] = setLogs.rows.map((row) => {
    const exerciseSlug = fieldStr(row, "exerciseSlug")
    const info = exerciseSlug !== undefined ? exercises.get(exerciseSlug) : undefined
    return {
      reps: fieldNum(row, "reps"),
      weight: fieldNum(row, "weight"),
      isWarmup: fieldBool(row, "isWarmup"),
      activityType: fieldStr(row, "activityType"),
      loadFactor: info?.loadFactor,
      implementCount: info?.implementCount,
    }
  })
  const totalVolume = computeSessionVolume(volumeInputs, bodyweight)

  const header = {
    id: session.id,
    title: displayTitle(session),
    date: fieldStr(session, "date") ?? null,
    scheduleDay: scheduleDayTitle ?? null,
    startedAt: fieldStr(session, "startedAt") ?? null,
    completedAt: fieldStr(session, "completedAt") ?? null,
    totalVolume,
  }

  if (json) {
    process.stdout.write(`${JSON.stringify({ ...header, sets: lines })}\n`)
    return
  }

  let out = ""
  for (const [key, value] of Object.entries(header)) out += `${key}\t${value ?? "-"}\n`
  for (const line of lines) {
    out +=
      `set\t${line.exercise}\t${line.setNumber}` +
      `\t${line.activityType ?? "strength"}` +
      `\t${line.reps ?? "-"}\t${line.weight ?? "-"}\t${line.rpe ?? "-"}` +
      `\t${line.durationSeconds ?? "-"}\t${line.distance ?? "-"}` +
      `\t${line.note ?? "-"}` +
      `${line.isWarmup ? "\twarmup" : ""}\n`
  }
  process.stdout.write(out)
}
