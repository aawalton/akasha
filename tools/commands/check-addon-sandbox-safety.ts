export const summary = "Static post-emit scan of `temper/addons/dist/**/*.lua` for Lua stdlib symbols ESO's sandbox strips"

import type { CommandHelp } from "../ops/surface.ts"
import { dataError, inputError } from "../lib/exit.ts"
import "../lib/command-entry.ts"
import { runAddonSandboxSafety } from "../../temper/shared-build-deploy-checks/src/check-addon-sandbox-safety.ts"
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
    "ops check-addon-sandbox-safety",
    "ops check-addon-sandbox-safety --file temper/addons/dist/TemperInventory/TemperInventory.lua",
  ],
}

function singleFileOf(args: readonly string[]): string | null {
  try {
    const { flags } = parseArgs(args, { file: { kind: "string" } }, { passthrough: true })
    return flags.file ?? null
  } catch (err) {
    throw dataError(`addon-sandbox-safety: ${err instanceof Error ? err.message : String(err)}`)
  }
}

export default async function checkAddonSandboxSafety(args: readonly string[]): Promise<void> {
  const singleFile = singleFileOf(args)
  const exitCode = runAddonSandboxSafety({ singleFile })
  if (exitCode === 0) return
  if (exitCode === 1) {
    throw inputError("addon-sandbox-safety: banned symbol(s) found (see stderr)")
  }
  if (exitCode === 2) {
    throw dataError("addon-sandbox-safety: no verdict — nothing to examine, or the tool failed (see stderr)")
  }
  throw dataError(`addon-sandbox-safety: unexpected exit code ${exitCode}`)
}
