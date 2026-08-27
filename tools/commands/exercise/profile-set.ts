
export const summary = "Set the client bodyweight profile used for volume math"

import { parseDecimalFlag } from "@collections/exercises/cli/fields"
import type { CommandHelp } from "../../ops/surface.ts"
import { writeBodyweight } from "../../lib/exercise-pages.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--bodyweight",
      argLabel: "<lb>",
      valueShape: "token",
      required: true,
      description: "Bodyweight in pounds",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "profile set" },
    { code: 1, meaning: "bad input or write failure" },
  ],
  examples: ["ops exercise profile-set --bodyweight 178.5"],
}

export default async function exerciseProfileSet(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const bodyweight = parseDecimalFlag("--bodyweight", parsed.requireString("--bodyweight"))
  if (bodyweight === undefined) throw inputError("--bodyweight is required")
  const json = parsed.boolean("--json")

  const at = writeBodyweight(bodyweight)

  if (json) {
    process.stdout.write(`${JSON.stringify({ at, bodyweight })}\n`)
    return
  }
  process.stdout.write(`at\t${at}\nbodyweight\t${bodyweight}\n`)
}
