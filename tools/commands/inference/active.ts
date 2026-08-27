export const summary = "Print the pool's currently live service (via the traffic cop)"

import type { CommandHelp } from "../../ops/surface.ts"
import { inferenceCop } from "../../lib/inference-cop.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  positionals: [],
  flags: [],
  examples: ["ops inference active"],
}

export default async function inferenceActive(args: readonly string[]): Promise<void> {
  parseArgs(help, args)
  const cop = await inferenceCop()
  const resident = await cop.copActive(cop.findCop())
  process.stdout.write(`${resident.length > 0 ? resident.join(", ") : "(none resident)"}\n`)
}
