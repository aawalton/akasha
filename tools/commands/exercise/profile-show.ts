
export const summary = "Show the client bodyweight profile"

import type { CommandHelp } from "../../ops/surface.ts"
import { readBodyweight } from "../../lib/exercise-pages.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [{ name: "--json", description: "Emit a JSON envelope instead of TSV lines" }],
  exits: [
    { code: 0, meaning: "profile shown" },
    { code: 1, meaning: "no profile page stands, or it states no bodyweight" },
  ],
  examples: ["ops exercise profile-show"],
}

export default async function exerciseProfileShow(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const bodyweight = readBodyweight()

  if (json) {
    process.stdout.write(`${JSON.stringify({ bodyweight })}\n`)
    return
  }
  process.stdout.write(`bodyweight\t${bodyweight}\n`)
}
