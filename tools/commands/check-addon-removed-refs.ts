export const summary = "Static post-emit scan of `temper/addons/dist/**/*.lua` for references to the removed external-addon globals listed in `addon-removed-refs.manifest.ts`"

import type { CommandHelp } from "../ops/surface.ts"
import { dataError, inputError } from "../lib/exit.ts"
import "../lib/command-entry.ts"
import { runAddonRemovedRefs } from "../../temper/shared-build-deploy-checks/src/check-addon-removed-refs.ts"
import { parseArgs } from "../../infra/cluster-checks/src/lib/cli-args.ts"

export const help: CommandHelp = {
  positionals: [],
  flags: [
    {
      name: "--file",
      argLabel: "<path>",
      valueShape: "token",
      description: "Scan a single .lua file instead of the addons dist/ tree",
    },
  ],
  examples: [
    "ops check-addon-removed-refs",
    "ops check-addon-removed-refs --file temper/addons/dist/TemperInventory/TemperInventory.lua",
  ],
}

function singleFileOf(args: readonly string[]): string | null {
  try {
    const { flags } = parseArgs(args, { file: { kind: "string" } }, { passthrough: true })
    return flags.file ?? null
  } catch (err) {
    throw dataError(`addon-removed-refs: ${err instanceof Error ? err.message : String(err)}`)
  }
}

export default async function checkAddonRemovedRefs(args: readonly string[]): Promise<void> {
  const singleFile = singleFileOf(args)
  const exitCode = runAddonRemovedRefs({ singleFile })
  if (exitCode === 0) return
  if (exitCode === 1) {
    throw inputError(
      "addon-removed-refs: removed external-addon reference(s) found (see stderr)"
    )
  }
  if (exitCode === 2) {
    throw dataError("addon-removed-refs: no verdict — nothing to examine, or the tool failed (see stderr)")
  }
  throw dataError(`addon-removed-refs: unexpected exit code ${exitCode}`)
}
