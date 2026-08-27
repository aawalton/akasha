
export const summary = "Show the selection-policy page (goal weights + selector tunables)"

import type { CommandHelp } from "../../ops/surface.ts"
import { selectionPolicyStated } from "../../lib/exercise-pages.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [{ name: "--json", description: "Emit a JSON envelope instead of TSV lines" }],
  exits: [
    { code: 0, meaning: "policy shown" },
    { code: 1, meaning: "no policy page stands, or one of its numbers is missing" },
  ],
  examples: ["ops exercise policy-show", "ops exercise policy-show --json"],
}

export default async function exercisePolicyShow(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const stated = selectionPolicyStated()

  if (json) {
    process.stdout.write(`${JSON.stringify(Object.fromEntries(stated))}\n`)
    return
  }
  process.stdout.write([...stated].map(([key, value]) => `${key}\t${value}\n`).join(""))
}
