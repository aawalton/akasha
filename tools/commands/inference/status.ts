export const summary = "Print the actual managed inference state on each host"

import type { CommandHelp } from "../../ops/surface.ts"
import { inferenceBuildScript, inferenceReconcile } from "../../lib/inference-reconcile.ts"
import { inferenceHosts } from "../../lib/inference-registry.ts"
import { inferenceSsh } from "../../lib/inference-ssh.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  positionals: [],
  flags: [],
  examples: ["ops inference status"],
}

export default async function inferenceStatus(args: readonly string[]): Promise<void> {
  parseArgs(help, args)
  const { HOSTS } = await inferenceHosts()
  const { buildQueryScript } = await inferenceBuildScript()
  const { runSshCapture } = await inferenceSsh()
  const { parseActualState } = await inferenceReconcile()

  for (const host of Object.values(HOSTS)) {
    process.stdout.write(`\n=== ${host.name} (${host.address}) ===\n`)
    const target = { user: host.user, host: host.address, keyPath: host.keyPath }
    const actual = parseActualState(await runSshCapture(target, buildQueryScript(host)))
    if (actual.length === 0) {
      process.stdout.write("  (no managed services)\n")
      continue
    }
    for (const r of actual) {
      process.stdout.write(
        `  ${r.name}: dir=${r.dirPresent} env=${r.condaEnvPresent} launchd=${r.launchdLoaded} hash=${r.inputsHash ?? "none"}\n`
      )
    }
  }
}
