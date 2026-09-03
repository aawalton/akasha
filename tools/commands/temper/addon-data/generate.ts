export const summary =
  "Generate the addon data files Temper's packages and addons carry, from the pages that hold their source"

import { realpathSync } from "node:fs"
import { codeRoot } from "@akasha/pages-system/code-root"
import { dataError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [],
  flags: [
    {
      name: "--code-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The checkout to read game data from and write the generated files into. Defaults to $CODE_ROOT, else this repository.",
    },
  ],
  envVars: [
    { name: "CODE_ROOT", description: "The checkout to work in, when --code-root is absent." },
  ],
  exits: [
    { code: 2, meaning: "the emitted data no longer matches the hand-written equipment mappings" },
  ],
  examples: [
    "ops temper addon-data generate --code-root ~/repos/akasha",
    "CODE_ROOT=~/repos/akasha ops temper addon-data generate",
  ],
}

export default async function temperAddonDataGenerate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const named = parsed.string("--code-root")
  const root = realpathSync(named ?? codeRoot())

  process.env.CODE_ROOT = root

  const { generateAddonData, EquipmentMappingsStale } = await import(
    "@akasha/temper-addon-data/generate-addon-data"
  )
  try {
    await generateAddonData()
  } catch (error) {
    if (error instanceof EquipmentMappingsStale) throw dataError(error.message)
    throw error
  }
}
