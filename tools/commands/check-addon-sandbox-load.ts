export const summary = "Runtime post-emit load of each emitted `.lua` bundle inside a sandboxed Lua 5.1 VM with ESO-shaped `_G`"

import type { CommandHelp } from "../ops/surface.ts"
import { dataError, inputError } from "../lib/exit.ts"
import "../lib/command-entry.ts"
import { codeModule } from "../lib/code-import.ts"
import { parseArgs } from "../../infra/cluster-checks/src/lib/cli-args.ts"

const CHECK = "temper/shared-build-deploy-checks/src/check-addon-sandbox-load.ts"

export const help: CommandHelp = {
  positionals: [],
  flags: [
    {
      name: "--file",
      argLabel: "<path>",
      valueShape: "token",
      description: "Load a single .lua file instead of the addons dist/ tree",
    },
  ],
  examples: [
    "ops check-addon-sandbox-load",
    "ops check-addon-sandbox-load --file temper/addons/dist/TemperInventory/TemperInventory.lua",
  ],
}

interface SandboxLoadCheck {
  readonly runAddonSandboxLoad: (options: { readonly singleFile: string | null }) => Promise<number>
}

function singleFileOf(args: readonly string[]): string | null {
  try {
    const { flags } = parseArgs(args, { file: { kind: "string" } }, { passthrough: true })
    return flags.file ?? null
  } catch (err) {
    throw dataError(`addon-sandbox-load: ${err instanceof Error ? err.message : String(err)}`)
  }
}

export default async function checkAddonSandboxLoad(args: readonly string[]): Promise<void> {
  const singleFile = singleFileOf(args)
  const { runAddonSandboxLoad } = await codeModule<SandboxLoadCheck>(CHECK)
  const exitCode = await runAddonSandboxLoad({ singleFile })
  if (exitCode === 0) return
  if (exitCode === 1) {
    throw inputError("addon-sandbox-load: bundle(s) failed runtime load (see stderr)")
  }
  if (exitCode === 2) {
    throw dataError("addon-sandbox-load: no verdict — nothing to examine, or the tool failed (see stderr)")
  }
  throw dataError(`addon-sandbox-load: unexpected exit code ${exitCode}`)
}
