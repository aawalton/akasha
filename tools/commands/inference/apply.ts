export const summary =
  "Reconcile declared inference services onto their non-cluster host (apply + prune)"

import { reconcile } from "@akasha/inference-pool/inference-reconcile"
import { codeRoot } from "@akasha/pages-system/code-root"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [],
  flags: [],
  examples: ["ops inference apply"],
}

export default async function inferenceApply(args: readonly string[]): Promise<void> {
  parseArgs(help, args)
  const workspace = codeRoot()
  const summary = await reconcile({ workspace, dryRun: false })
  process.stdout.write(
    `inference reconcile done: ${summary.applied} applied, ${summary.skipped} skipped, ${summary.pruned} pruned\n`
  )
}
