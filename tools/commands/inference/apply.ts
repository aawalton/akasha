export const summary = "Reconcile declared inference services onto their non-cluster host (apply + prune)"

import type { CommandHelp } from "../../ops/surface.ts"
import { codeRoot } from "../../lib/code-root.ts"
import { inferenceReconcile } from "../../lib/inference-reconcile.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  positionals: [],
  flags: [],
  examples: ["ops inference apply"],
}

export default async function inferenceApply(args: readonly string[]): Promise<void> {
  parseArgs(help, args)
  const module = await inferenceReconcile()
  const workspace = codeRoot()
  const summary = await module.reconcile({ workspace, dryRun: false })
  process.stdout.write(
    `inference reconcile done: ${summary.applied} applied, ${summary.skipped} skipped, ${summary.pruned} pruned\n`
  )
}
