
export const summary = "Log one performed set (setNumber auto-increments per exercise)"

import { displayTitle, fieldNum, parseDecimalFlag } from "@collections/exercises/cli/fields"
import { resolveExercise, resolveOpenSession } from "@collections/exercises/cli/resolve"
import { createPage, getPages } from "@collections/exercises/pages/access"
import type { Json } from "@collections/exercises/pages/page"
import { nextSetNumber, setLogSlug } from "@collections/exercises/tracking/derive"
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
      name: "--reps",
      argLabel: "<n>",
      valueShape: "token",
      required: true,
      description: "Reps performed",
    },
    { name: "--weight", argLabel: "<n>", valueShape: "token", description: "Weight used" },
    {
      name: "--rpe",
      argLabel: "<n>",
      valueShape: "token",
      description: "Rate of perceived exertion",
    },
    {
      name: "--note",
      argLabel: "<text>",
      valueShape: "prose",
      description: "Free-text feel/note for this set",
    },
    { name: "--warmup", description: "Mark the set as a warmup" },
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
    { code: 0, meaning: "set logged" },
    { code: 1, meaning: "no open session, resolution failure, or create failure" },
  ],
  examples: [
    'ops exercise log-set --exercise "Barbell Bench Press" --reps 8 --weight 185',
    'ops exercise log-set --exercise "Bench" --reps 12 --weight 135 --warmup',
    'ops exercise log-set "Barbell Bench Press" --reps 8 --weight 185',
  ],
}

export default async function exerciseLogSet(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const reps = parsed.requireNonNegativeInt("--reps")
  const weight = parseDecimalFlag("--weight", parsed.string("--weight"))
  const rpe = parseDecimalFlag("--rpe", parsed.string("--rpe"))
  const note = parsed.string("--note")
  const warmup = parsed.boolean("--warmup")
  const setNumberOverride = parsed.nonNegativeInt("--set-number")
  const json = parsed.boolean("--json")

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
    title: `${exerciseTitle} set ${setNumber}`,
    slug,
    sessionSlug: session.slug,
    exerciseSlug: exercise.slug,
    loggedAt: new Date().toISOString(),
    setNumber,
    reps,
    ...(weight !== undefined ? { weight } : {}),
    ...(rpe !== undefined ? { rpe } : {}),
    ...(note !== undefined ? { note } : {}),
    isWarmup: warmup,
  }

  console.error(`Logging ${exerciseTitle} set ${setNumber}…`)
  const setLog = await createPage("set-log", slug, properties)

  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        id: setLog.id,
        exercise: exerciseTitle,
        setNumber,
        reps,
        weight: weight ?? null,
        rpe: rpe ?? null,
        note: note ?? null,
        isWarmup: warmup,
        session: session.slug,
      })}\n`
    )
    return
  }
  process.stdout.write(
    `id\t${setLog.id}\n` +
      `exercise\t${exerciseTitle}\n` +
      `setNumber\t${setNumber}\n` +
      `reps\t${reps}\n` +
      `weight\t${weight ?? "-"}\n` +
      `note\t${note ?? "-"}\n`
  )
}
