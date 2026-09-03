export const summary = "Swap the pool's live service to <name> (evict current, cold-load target)"

import { copActivate, findCop } from "@akasha/inference-pool/cop-admin"
import { operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "name",
      required: true,
      description: "the pool service to make live (e.g. image-gen, kokoro)",
    },
  ],
  flags: [],
  examples: ["ops inference activate image-gen", "ops inference activate kokoro"],
}

export default async function inferenceActivate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const name = parsed.positionals[0]
  if (name === undefined) {
    throw operationalError("missing <name>")
  }
  const cop = findCop()
  if (!cop.poolNames.includes(name)) {
    throw operationalError(`'${name}' is not a pool service. valid: ${cop.poolNames.join(", ")}`)
  }
  process.stdout.write(`activating ${name} (cold-load may take up to ~3 min)...\n`)
  const resident = await copActivate(cop, name)
  process.stdout.write(`resident: ${resident.join(", ")}\n`)
}
