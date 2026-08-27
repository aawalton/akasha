export const summary = "Print the inference reconcile plan without executing it (dry run)"

import type { CommandHelp } from "../../ops/surface.ts"
import { codeRoot } from "../../lib/code-root.ts"
import { inferenceReconcile } from "../../lib/inference-reconcile.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  positionals: [],
  flags: [],
  examples: ["ops inference plan"],
}

export default async function inferencePlan(args: readonly string[]): Promise<void> {
  parseArgs(help, args)
  const module = await inferenceReconcile()
  const workspace = codeRoot()
  await module.reconcile({ workspace, dryRun: true })
}
