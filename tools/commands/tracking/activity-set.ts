export const summary =
  "Set an activity's default difficulty (upsert by title) — the catalog start/switch/log rate a block from, and what they point at when a title matches nothing"

import type { CommandHelp } from "@akasha/command-system/command-declaring"
import { parseArgs } from "@akasha/command-system/parse-args"
import { inputError } from "../../lib/exit.ts"
import { pagesClient, trackingLevels, trackingResolve } from "../../lib/tracking-capability.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--title",
      argLabel: "<text>",
      valueShape: "prose",
      description: "Activity name, matched within a session title (required)",
    },
    {
      name: "--difficulty",
      argLabel: "<level>",
      valueShape: "token",
      description: "Difficulty level 0…5 (half-steps) a matching block rates at (required)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  positionals: [
    {
      name: "title",
      required: false,
      aliasOfFlag: "--title",
      description: "Activity name, matched within a session title",
    },
  ],
  exits: [
    { code: 0, meaning: "activity default written — created, or patched in place" },
    { code: 1, meaning: "missing title, missing/invalid --difficulty, or bad input" },
  ],
  examples: [
    'ops tracking activity-set "Read" --difficulty 1',
    'ops tracking activity-set --title "Piano" --difficulty 3',
    'ops tracking activity-set "Jen" --difficulty 4 --json',
  ],
}

export default async function trackingActivitySet(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const titleRaw = parsed.string("--title")
  if (titleRaw === undefined || titleRaw.trim() === "") {
    throw inputError(
      'an activity --title is required (e.g. `ops tracking activity-set "Read" --difficulty 1`)'
    )
  }
  const title = titleRaw.trim()
  const difficultyRaw = parsed.string("--difficulty")
  if (difficultyRaw === undefined || difficultyRaw.trim() === "") {
    throw inputError("--difficulty is required (the level a block matching this activity rates at)")
  }
  const { parseDifficulty } = await trackingLevels()
  const difficulty = parseDifficulty(difficultyRaw)
  const json = parsed.boolean("--json")

  const { getPageAccessClient } = await pagesClient()
  const { setActivityDefault } = await trackingResolve()

  console.error(`Rating "${title}" at difficulty ${difficulty}…`)
  const landed = await setActivityDefault(getPageAccessClient(), title, Number(difficulty))
  const envelope = { id: landed.id, at: landed.at, created: landed.created, title, difficulty }

  if (json) {
    process.stdout.write(`${JSON.stringify(envelope)}\n`)
    return
  }
  process.stdout.write(
    `id\t${landed.id}\nat\t${landed.at}\ntitle\t${title}\ndifficulty\t${difficulty}\n`
  )
}
