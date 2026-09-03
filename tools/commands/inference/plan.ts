export const summary = "Print the inference reconcile plan without executing it (dry run)"

import { reconcile } from "@akasha/inference-pool/inference-reconcile"
import { codeRoot } from "@akasha/pages-system/code-root"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [],
  flags: [],
  examples: ["ops inference plan"],
}

export default async function inferencePlan(args: readonly string[]): Promise<void> {
  parseArgs(help, args)
  const workspace = codeRoot()
  await reconcile({ workspace, dryRun: true })
}
