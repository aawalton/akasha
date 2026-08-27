
export const summary = "Log one cardio/mobility activity (duration/distance instead of reps/weight)"

import { displayTitle, fieldNum, parseDecimalFlag } from "@collections/exercises/cli/fields"
import { resolveExercise, resolveOpenSession } from "@collections/exercises/cli/resolve"
import { createPage, getPages } from "@collections/exercises/pages/access"
import type { Json } from "@collections/exercises/pages/page"
import { nextSetNumber, setLogSlug } from "@collections/exercises/tracking/derive"
import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

const ACTIVITY_TYPES = ["cardio", "mobility"] as const
type ActivityType = (typeof ACTIVITY_TYPES)[number]

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
      name: "--type",
      argLabel: "<cardio|mobility>",
      valueShape: "token",
      required: true,
      description: "Activity type — cardio or mobility",
    },
    {
      name: "--duration",
      argLabel: "<min>",
      valueShape: "token",
      description: "Duration in minutes (→ durationSeconds)",
    },
    {
      name: "--hold",
      argLabel: "<sec>",
      valueShape: "token",
      description:
        "Mobility hold in seconds (→ durationSeconds; mutually exclusive with --duration)",
    },
    {
      name: "--distance",
      argLabel: "<miles>",
      valueShape: "token",
      description: "Distance covered in miles",
    },
    {
      name: "--note",
      argLabel: "<text>",
      valueShape: "prose",
      description: "Free-text feel/note for this activity",
    },
    {
      name: "--session",
      argLabel: "<ref>",
      valueShape: "token",
      description: "Session (id / title / substring; default: most recent open session)",
    },
    {
      name: "--set-number",
      argLabel: "<n>",
      valueShape: "token",
      description: "Explicit set number override",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  positionals: [
    {
      name: "exercise",
      required: false,
      aliasOfFlag: "--exercise",
      description: "Catalog exercise (id / title / substring)",
    },
  ],
  exits: [
    { code: 0, meaning: "activity logged" },
    { code: 1, meaning: "no open session, resolution failure, bad input, or create failure" },
  ],
  examples: [
    'ops exercise log-activity --exercise "Running" --type cardio --duration 30 --distance 3.1',
    'ops exercise log-activity --exercise "Hamstring Stretch" --type mobility --hold 60',
    'ops exercise log-activity "Running" --type cardio --duration 30 --distance 3.1',
  ],
}

export default async function exerciseLogActivity(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const parseActivityType = async (raw: string): Promise<ActivityType> => {
    const match = ACTIVITY_TYPES.find((t) => t === raw)
    if (match === undefined) {
      throw inputError(`--type must be one of ${ACTIVITY_TYPES.join(" | ")}, got: ${raw}`)
    }
    return match
  }

  const activityType = await parseActivityType(parsed.requireString("--type"))
  const durationMin = parseDecimalFlag("--duration", parsed.string("--duration"))
  const holdSec = parseDecimalFlag("--hold", parsed.string("--hold"))
  const distance = parseDecimalFlag("--distance", parsed.string("--distance"))
  const note = parsed.string("--note")
  const setNumberOverride = parsed.nonNegativeInt("--set-number")
  const json = parsed.boolean("--json")

  if (durationMin !== undefined && holdSec !== undefined) {
    throw inputError(
      "pass at most one of --duration and --hold (both map to durationSeconds)"
    )
  }
  const durationSeconds =
    durationMin !== undefined
      ? Math.round(durationMin * 60)
      : holdSec !== undefined
        ? holdSec
        : undefined

  console.error("Resolving session and exercise…")
  const [session, exercise] = await Promise.all([
    resolveOpenSession(parsed.string("--session")),
    resolveExercise(parsed.requireString("--exercise")),
  ])

  if (session.slug === null) throw new Error(`session ${session.id} carries no slug`)
  if (exercise.slug === null) throw new Error(`exercise ${exercise.id} carries no slug`)

  const existing = await getPages({
    pageTypeSlug: "set-log",
    where: [
      { key: "sessionSlug", eq: session.slug },
      { key: "exerciseSlug", eq: exercise.slug },
    ],
    select: ["id", "setNumber"],
  })
  const setNumber =
    setNumberOverride ??
    nextSetNumber(
      existing.rows.map((row) => fieldNum(row, "setNumber")).filter((n) => n !== undefined)
    )

  const exerciseTitle = displayTitle(exercise)
  const slug = setLogSlug(session.slug, exercise.slug, setNumber)
  const properties: Record<string, Json> = {
    title: `${exerciseTitle} ${activityType} ${setNumber}`,
    slug,
    sessionSlug: session.slug,
    exerciseSlug: exercise.slug,
    loggedAt: new Date().toISOString(),
    setNumber,
    activityType,
    ...(durationSeconds !== undefined ? { durationSeconds } : {}),
    ...(distance !== undefined ? { distance } : {}),
    ...(note !== undefined ? { note } : {}),
  }

  console.error(`Logging ${exerciseTitle} ${activityType} ${setNumber}…`)
  const setLog = await createPage("set-log", slug, properties)

  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        id: setLog.id,
        exercise: exerciseTitle,
        setNumber,
        activityType,
        durationSeconds: durationSeconds ?? null,
        distance: distance ?? null,
        note: note ?? null,
        session: session.slug,
      })}\n`
    )
    return
  }
  process.stdout.write(
    `id\t${setLog.id}\n` +
      `exercise\t${exerciseTitle}\n` +
      `setNumber\t${setNumber}\n` +
      `activityType\t${activityType}\n` +
      `durationSeconds\t${durationSeconds ?? "-"}\n` +
      `distance\t${distance ?? "-"}\n` +
      `note\t${note ?? "-"}\n`
  )
}
