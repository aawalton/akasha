
export const summary = "Stamp completedAt on a session and report its duration"

import { fieldStr } from "@collections/exercises/cli/fields"
import { resolveOpenSession } from "@collections/exercises/cli/resolve"
import { patchPage } from "@collections/exercises/pages/access"
import type { Json } from "@collections/exercises/pages/page"
import { loadSessionVolume } from "@collections/exercises/tracking/day-volume"
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
    {
      name: "--notes",
      argLabel: "<markdown>",
      valueShape: "prose",
      description: "Notes to append",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  positionals: [
    { name: "session", required: false, aliasOfFlag: "--session", description: "Session ref" },
  ],
  exits: [
    { code: 0, meaning: "session finished" },
    { code: 1, meaning: "no open session or patch failure" },
  ],
  examples: ["ops exercise session-finish", "ops exercise session-finish --notes-file ./notes.md"],
}

export default async function exerciseSessionFinish(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const notes = parsed.string("--notes")
  const json = parsed.boolean("--json")

  const session = await resolveOpenSession(parsed.string("--session"))
  if (session.slug === null) throw new Error(`session ${session.id} carries no slug`)

  const completedAt = new Date().toISOString()
  const existingNotes = fieldStr(session, "notes")
  const mergedNotes =
    notes !== undefined
      ? existingNotes !== undefined && existingNotes !== ""
        ? `${existingNotes}\n\n${notes}`
        : notes
      : undefined

  console.error(`Finishing session ${session.id}…`)
  const values: Record<string, Json> = {
    completedAt,
    ...(mergedNotes !== undefined ? { notes: mergedNotes } : {}),
  }
  await patchPage("workout-session", session.slug, values)

  const startedAtStr = fieldStr(session, "startedAt")
  const startedMs = startedAtStr !== undefined ? Date.parse(startedAtStr) : Number.NaN
  const durationMin = Number.isNaN(startedMs)
    ? null
    : Math.max(0, Math.round((Date.parse(completedAt) - startedMs) / 60_000))

  const totalVolume = await loadSessionVolume(session.slug, readBodyweight())

  if (json) {
    process.stdout.write(
      `${JSON.stringify({ id: session.id, completedAt, durationMin, totalVolume })}\n`
    )
    return
  }
  process.stdout.write(
    `id\t${session.id}\nduration\t${durationMin ?? "-"}m\ntotalVolume\t${totalVolume}\n`
  )
}
