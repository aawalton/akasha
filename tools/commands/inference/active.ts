export const summary = "Print the pool's currently live service (via the traffic cop)"

import { copActive, findCop } from "@akasha/inference-pool/cop-admin"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [],
  flags: [],
  examples: ["ops inference active"],
}

export default async function inferenceActive(args: readonly string[]): Promise<void> {
  parseArgs(help, args)
  const resident = await copActive(findCop())
  process.stdout.write(`${resident.length > 0 ? resident.join(", ") : "(none resident)"}\n`)
}
